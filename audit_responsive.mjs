import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BREAKPOINTS = [
  { name: '320px (Mobile S)', width: 320, height: 800 },
  { name: '375px (Mobile M - iPhone SE)', width: 375, height: 800 },
  { name: '430px (Mobile L - iPhone 14/15 Pro Max)', width: 430, height: 850 },
  { name: '768px (Tablet Portrait - iPad Mini/Air)', width: 768, height: 1024 },
  { name: '1024px (Tablet Landscape / Small Laptop)', width: 1024, height: 768 },
  { name: '1366px (Standard HD Laptop)', width: 1366, height: 768 },
  { name: '1920px (Full HD Desktop)', width: 1920, height: 1080 }
];

const ROUTES = [
  { id: 'landing', name: 'Landing Page (Home)', url: 'http://127.0.0.1:5173/' },
  { id: 'login', name: 'Authentication / Login Page', url: 'http://127.0.0.1:5173/login' },
  { id: 'user_dashboard', name: 'User Dashboard (Patient View)', url: 'http://127.0.0.1:5173/user/dashboard' },
  { id: 'admin_dashboard', name: 'Admin - Dashboard Overview', url: 'http://127.0.0.1:5173/#admin/dashboard' },
  { id: 'admin_upload', name: 'Admin - Upload Document', url: 'http://127.0.0.1:5173/#admin/upload' },
  { id: 'admin_library', name: 'Admin - Document Library', url: 'http://127.0.0.1:5173/#admin/library' },
  { id: 'admin_ai', name: 'Admin - AI Management', url: 'http://127.0.0.1:5173/#admin/ai' },
  { id: 'admin_users', name: 'Admin - User Management', url: 'http://127.0.0.1:5173/#admin/users' },
  { id: 'admin_settings', name: 'Admin - Platform Settings', url: 'http://127.0.0.1:5173/#admin/settings' }
];

const SCREENSHOT_DIR = path.resolve('public/audit-screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runAudit() {
  console.log('Starting Responsive Layout Audit with Playwright...');
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const allResults = [];

  for (const route of ROUTES) {
    console.log(`\n========================================`);
    console.log(`Auditing Route: ${route.name} (${route.url})`);
    console.log(`========================================`);

    const routeData = {
      routeId: route.id,
      routeName: route.name,
      url: route.url,
      breakpoints: []
    };

    for (const bp of BREAKPOINTS) {
      const page = await browser.newPage();
      await page.setViewportSize({ width: bp.width, height: bp.height });

      // If user dashboard, pre-seed auth & disclaimer in localStorage
      if (route.id === 'user_dashboard') {
        await page.addInitScript(() => {
          localStorage.setItem('globalhealth_auth', JSON.stringify({
            email: 'user@gmail.com',
            name: 'Patient User',
            role: 'user'
          }));
          localStorage.setItem('healthsakhi_disclaimer_accepted', 'true');
        });
      }

      try {
        await page.goto(route.url, { waitUntil: 'networkidle', timeout: 15000 });
      } catch (e) {
        // Fallback wait
        await page.waitForTimeout(2000);
      }

      await page.waitForTimeout(1000); // Allow layout settlement & animations

      // Evaluate layout issues inside browser
      const evaluation = await page.evaluate((bpWidth) => {
        const body = document.body;
        const docEl = document.documentElement;

        const scrollWidth = Math.max(body.scrollWidth, docEl.scrollWidth);
        const clientWidth = window.innerWidth;
        const hasHorizontalOverflow = scrollWidth > clientWidth + 2;
        const overflowDelta = hasHorizontalOverflow ? scrollWidth - clientWidth : 0;

        // Find elements leaking beyond viewport
        const leakingElements = [];
        if (hasHorizontalOverflow) {
          const all = document.querySelectorAll('*');
          for (const el of all) {
            const rect = el.getBoundingClientRect();
            if (rect.right > clientWidth + 2 && rect.width > 0 && rect.height > 0) {
              const tag = el.tagName.toLowerCase();
              const id = el.id ? `#${el.id}` : '';
              let cls = '';
              if (el.className && typeof el.className === 'string') {
                cls = '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.');
              }
              const snippet = (el.innerText || el.getAttribute('aria-label') || '').substring(0, 35).replace(/\n/g, ' ');
              leakingElements.push({
                selector: `${tag}${id}${cls}`,
                right: Math.round(rect.right),
                excessPx: Math.round(rect.right - clientWidth),
                text: snippet
              });
            }
          }
        }

        // Check for text truncation / clip
        const truncatedItems = [];
        const textNodes = document.querySelectorAll('h1, h2, h3, h4, p, span, button');
        for (const el of textNodes) {
          if (el.scrollWidth > el.clientWidth + 4 && window.getComputedStyle(el).textOverflow === 'ellipsis') {
            truncatedItems.push({
              tag: el.tagName.toLowerCase(),
              text: (el.innerText || '').substring(0, 30)
            });
          }
        }

        // Check tables
        const tables = document.querySelectorAll('table');
        const unscrollableTables = [];
        for (const t of tables) {
          const p = t.parentElement;
          const overflowX = p ? window.getComputedStyle(p).overflowX : '';
          if (t.scrollWidth > clientWidth && overflowX !== 'auto' && overflowX !== 'scroll') {
            unscrollableTables.push(t.className || 'table');
          }
        }

        // Check header/nav
        const header = document.querySelector('header');
        let headerOverflow = false;
        if (header) {
          const hRect = header.getBoundingClientRect();
          if (hRect.right > clientWidth + 2) {
            headerOverflow = true;
          }
        }

        return {
          scrollWidth,
          clientWidth,
          hasHorizontalOverflow,
          overflowDelta,
          leakingElements: leakingElements.slice(0, 6),
          truncatedCount: truncatedItems.length,
          unscrollableTables,
          headerOverflow
        };
      }, bp.width);

      // Capture screenshot
      const filename = `${route.id}_${bp.width}px.png`;
      const screenshotPath = path.join(SCREENSHOT_DIR, filename);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      console.log(`[${bp.name}] Width: ${bp.width}px | Scroll: ${evaluation.scrollWidth}px | Overflow: ${evaluation.hasHorizontalOverflow ? `YES (+${evaluation.overflowDelta}px)` : 'NO'}`);

      routeData.breakpoints.push({
        ...bp,
        ...evaluation,
        screenshotFilename: filename,
        screenshotRelative: `/audit-screenshots/${filename}`
      });

      await page.close();
    }

    allResults.push(routeData);
  }

  await browser.close();

  // Save JSON report
  fs.writeFileSync('audit_results.json', JSON.stringify(allResults, null, 2));
  console.log('\nAudit completed! Results saved to audit_results.json and public/audit-screenshots/');
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
