import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  User,
  ChevronDown,
  Globe,
  Menu,
  X
} from 'lucide-react';
import ThemeToggle from './common/ThemeToggle';

export default function Header({ onNavigate }) {
  const [activeNav, setActiveNav] = useState('Home');
  const [justClicked, setJustClicked] = useState(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'search-section', label: 'Symptom Checker' },
    { id: 'categories', label: 'Categories' },
    { id: 'categories', label: 'Health Cards (1,000)' },
    { id: 'for-doctors', label: 'For Doctors' },
    { id: 'for-pharmacists', label: 'For Pharmacists' },
    { id: 'resources', label: 'Resources' },
    { id: 'founder', label: 'About' }
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (id, label) => {
    setActiveNav(label);
    setJustClicked(label);
    setTimeout(() => setJustClicked(null), 500);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        window.history.pushState(null, '', `#${id}`);
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white dark:bg-[#0B132B] border-b border-blue-100 dark:border-slate-800 shadow-2xs transition-colors duration-200">
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-[64px] gap-2">
          
          {/* Logo & Tagline */}
          <div
            onClick={() => handleNavClick('home', 'Home')}
            className="flex items-center gap-2 shrink-0 cursor-pointer select-none"
          >
            {/* Globe + Medical Cross Icon */}
            <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
                <circle cx="20" cy="20" r="18" fill="#1d6fd8" />
                <path d="M20 2C10.06 2 2 10.06 2 20s8.06 18 18 18 18-8.06 18-18S29.94 2 20 2z" stroke="#104a93" strokeWidth="1.5" />
                <ellipse cx="20" cy="20" rx="9" ry="18" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
                <line x1="2" y1="20" x2="38" y2="20" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
                <line x1="5" y1="11" x2="35" y2="11" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
                <line x1="5" y1="29" x2="35" y2="29" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
                {/* Gold Cross */}
                <rect x="16" y="8" width="8" height="24" rx="2" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                <rect x="8" y="16" width="24" height="8" rx="2" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center leading-none">
                <span className="text-[20px] sm:text-[22px] font-black text-[#0f2d59] dark:text-white tracking-tight">GlobalHealth</span>
                <span className="text-[20px] sm:text-[22px] font-black text-[#ea580c] tracking-tight">AI</span>
                <span className="text-[10px] font-bold text-[#ea580c] ml-0.5 align-super">™</span>
              </div>
              <div className="text-[8px] sm:text-[8.5px] font-bold text-[#0f2d59] dark:text-slate-300 tracking-wider uppercase mt-0.5 hidden xs:block">
                SYMPTOM EDUCATION <span className="text-[#ea580c]">•</span> CLINICAL GUIDANCE <span className="text-[#ea580c]">•</span> SAFE NEXT STEPS
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links: Clean, Shiny on Hover & Glassy on Click */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5 text-[12px] lg:text-[13px] font-semibold text-[#0f2d59] shrink-0">
            {navItems.map((item) => {
              const isActive = activeNav === item.label;
              const isPopping = justClicked === item.label;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item.id, item.label)}
                  className={`nav-glass-btn relative px-2.5 lg:px-3 py-1 rounded-full text-xs lg:text-[13px] font-bold whitespace-nowrap cursor-pointer transition-all duration-300 ${
                    isPopping ? 'animate-glass-pop' : ''
                  } ${
                    isActive
                      ? 'nav-glass-active shadow-sm font-black'
                      : 'text-[#0f2d59] dark:text-slate-200 hover:text-[#1677E8] dark:hover:text-white hover:bg-blue-50/70 dark:hover:bg-slate-800/70 border border-transparent hover:border-blue-200/60'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-[#ea580c] rounded-full"></span>
                  )}
                </button>
              );
            })}

            {/* Search Icon Button */}
            <button
              type="button"
              onClick={() => handleNavClick('search-section', 'Symptom Checker')}
              className="p-1.5 text-[#0f2d59] dark:text-slate-300 hover:text-[#1d6fd8] dark:hover:text-white transition-colors cursor-pointer rounded-full hover:bg-blue-50 dark:hover:bg-slate-800 ml-1"
              aria-label="Search Symptoms"
              title="Search symptoms"
            >
              <Search className="w-4 h-4 stroke-[2.3]" />
            </button>

            {/* Language Selector (EN) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-blue-200 dark:border-slate-700 text-xs font-bold text-[#0f2d59] dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#1d6fd8]" />
                <span>{selectedLanguage}</span>
                <ChevronDown className="w-3 h-3 text-[#0f2d59] dark:text-slate-300" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-32 bg-white dark:bg-[#0F1C36] rounded-xl shadow-lg border border-blue-100 dark:border-slate-700 p-1 z-50 text-xs">
                  {['EN (English)', 'HI (Hindi)', 'MR (Marathi)'].map(l => (
                    <button
                      key={l}
                      onClick={() => {
                        setSelectedLanguage(l.substring(0, 2));
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg font-medium text-slate-800 dark:text-slate-200"
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle (Dark/Light mode) */}
            <ThemeToggle variant="topbar" />

            {/* Sign In Button */}
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('/login') : (window.location.pathname = '/login')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 dark:border-slate-700 text-[#0f2d59] dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-xs font-bold shadow-2xs"
              aria-label="Sign In or Account"
              title="Sign In to GlobalHealthAI"
            >
              <User className="w-3.5 h-3.5 text-[#1677E8]" />
              <span className="hidden xl:inline">Sign In</span>
            </button>

          </nav>

          {/* Mobile & Tablet hamburger for screens < 1280px */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:hidden">
            <ThemeToggle variant="topbar" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-[#0f2d59] dark:text-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer for phone and tablet screens */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-blue-100 dark:border-slate-800 space-y-1.5 bg-white dark:bg-[#0B132B] text-sm font-semibold">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick(item.id, item.label);
                }}
                className={`w-full text-left px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeNav === item.label
                    ? 'bg-blue-100 text-[#0f2d59] dark:bg-slate-800 dark:text-blue-400 font-black'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800/80'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Language Selector in Mobile Drawer */}
            <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100/60 dark:border-slate-700/60 my-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0f2d59] dark:text-slate-200">
                <Globe className="w-4 h-4 text-[#1d6fd8]" />
                <span>Language:</span>
              </div>
              <div className="flex items-center gap-1">
                {['EN', 'HI', 'MR'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedLanguage === lang
                        ? 'bg-[#1677E8] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigate) onNavigate('/login');
                  else window.location.pathname = '/login';
                }}
                className="w-full text-center px-3.5 py-2.5 bg-gradient-to-r from-[#F04B0A] to-[#ff6224] text-white font-bold rounded-xl cursor-pointer shadow-md text-xs sm:text-sm"
              >
                Sign In to Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
