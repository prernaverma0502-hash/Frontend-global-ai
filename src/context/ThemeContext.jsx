import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Read persisted theme or system preference
  const [theme, setTheme] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('globalhealth_theme');
        if (saved === 'dark' || saved === 'light') return saved;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
      }
    } catch (e) {
      // Fallback
    }
    return 'light';
  });

  const [transitionState, setTransitionState] = useState({
    active: false,
    x: 0,
    y: 0,
    targetTheme: 'dark',
    radius: 0,
    maxRadius: 1200,
    opacity: 1
  });

  const animRef = useRef(null);
  const isDark = theme === 'dark';

  // Apply 'dark' class on document.documentElement AND document.body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
      if (body) {
        body.classList.add('dark');
        body.style.backgroundColor = '#080D1A';
        body.style.color = '#F1F5F9';
      }
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
      if (body) {
        body.classList.remove('dark');
        body.style.backgroundColor = '#F2F7FF';
        body.style.color = '#0F172A';
      }
    }

    try {
      localStorage.setItem('globalhealth_theme', theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  // Bulletproof theme toggle with organic ink bleed animation
  const toggleTheme = (coords) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // 1. Immediately update theme state - NEVER stalls or fails!
    setTheme(nextTheme);

    // 2. Compute animation coordinates
    const clickX = coords?.x && coords.x > 0 ? coords.x : (window.innerWidth - 70);
    const clickY = coords?.y && coords.y > 0 ? coords.y : 50;

    const maxRadius = Math.hypot(
      Math.max(clickX, window.innerWidth - clickX),
      Math.max(clickY, window.innerHeight - clickY)
    ) * 1.35;

    // Cancel any previous in-flight animation
    if (animRef.current) cancelAnimationFrame(animRef.current);

    setTransitionState({
      active: true,
      x: clickX,
      y: clickY,
      targetTheme: nextTheme,
      radius: 0,
      maxRadius,
      opacity: 1
    });

    const startTime = performance.now();
    const duration = 750; // 750ms cinematic organic sweep

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Fluid expansion easing: cubic-bezier(0.16, 1, 0.3, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3.2);
      const currentRadius = easeProgress * maxRadius;

      // Smooth fade-out at end of sweep
      let currentOpacity = 1;
      if (progress > 0.8) {
        currentOpacity = 1 - (progress - 0.8) / 0.2;
      }

      setTransitionState(prev => ({
        ...prev,
        radius: currentRadius,
        opacity: currentOpacity
      }));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setTransitionState(prev => ({ ...prev, active: false }));
      }
    };

    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
      {transitionState.active && (
        <InkBleedOverlay state={transitionState} />
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Organic Liquid Ink Bleed / Grunge Screen-Tear Overlay
 */
function InkBleedOverlay({ state }) {
  const fillColor = state.targetTheme === 'dark' ? '#080D1A' : '#F2F7FF';
  const glowColor = state.targetTheme === 'dark' ? '#1677E8' : '#F04B0A';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
      style={{
        opacity: state.opacity,
        transition: 'opacity 0.08s linear'
      }}
    >
      <svg
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Organic Liquid Fractal Ink Filter */}
          <filter id="liquid-ink-effect" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03"
              numOctaves="4"
              seed="11"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="95"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur
              in="displaced"
              stdDeviation="1.2"
              result="soft"
            />
            <feComposite
              in="displaced"
              in2="soft"
              operator="over"
            />
          </filter>
        </defs>

        {/* Ambient halo ink wave */}
        <circle
          cx={state.x}
          cy={state.y}
          r={Math.max(0, state.radius * 1.04)}
          fill={glowColor}
          opacity="0.14"
          filter="url(#liquid-ink-effect)"
        />

        {/* Main Turbulent Liquid Ink Expansion */}
        <circle
          cx={state.x}
          cy={state.y}
          r={state.radius}
          fill={fillColor}
          filter="url(#liquid-ink-effect)"
        />

        {/* Dense interior core */}
        <circle
          cx={state.x}
          cy={state.y}
          r={Math.max(0, state.radius * 0.8)}
          fill={fillColor}
          opacity="0.95"
        />
      </svg>
    </div>
  );
}
