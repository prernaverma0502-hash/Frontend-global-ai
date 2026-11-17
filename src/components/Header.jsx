import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  User,
  ChevronDown,
  Globe,
  Menu,
  X,
  Shield
} from 'lucide-react';

export default function Header({ onNavigate }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-2xs">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-[64px] gap-2">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-2 shrink-0 cursor-pointer">
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
                <span className="text-[20px] sm:text-[22px] font-black text-[#0f2d59] tracking-tight">GlobalHealth</span>
                <span className="text-[20px] sm:text-[22px] font-black text-[#ea580c] tracking-tight">AI</span>
                <span className="text-[10px] font-bold text-[#ea580c] ml-0.5 align-super">™</span>
              </div>
              <div className="text-[8px] sm:text-[8.5px] font-bold text-[#0f2d59] tracking-wider uppercase mt-0.5 hidden xs:block">
                SYMPTOM EDUCATION <span className="text-[#ea580c]">•</span> CLINICAL GUIDANCE <span className="text-[#ea580c]">•</span> SAFE NEXT STEPS
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links: Always visible on medium+ screens */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 text-[12px] lg:text-[13px] font-semibold text-[#0f2d59] shrink-0">
            
            {/* 1. Home (Active pill with orange underline bar) */}
            <div className="relative">
              <a
                href="#home"
                className="px-3 lg:px-3.5 py-1 rounded-full bg-[#dcecfe] text-[#0f2d59] font-bold flex items-center justify-center text-xs lg:text-[13px]"
              >
                Home
              </a>
              <span className="absolute -bottom-2 left-2.5 right-2.5 h-[2.5px] bg-[#ea580c] rounded-full"></span>
            </div>

            {/* 2. Symptom Checker */}
            <a
              href="#search-section"
              className="px-1.5 lg:px-2.5 py-1 rounded-lg hover:text-[#1d6fd8] transition-colors whitespace-nowrap"
            >
              Symptom Checker
            </a>

            {/* 3. Categories (Dropdown) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('categories')}
                className="px-1.5 lg:px-2 py-1 rounded-lg flex items-center gap-0.5 hover:text-[#1d6fd8] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Categories</span>
                <ChevronDown className="w-3 h-3 text-[#0f2d59]" />
              </button>

              {activeDropdown === 'categories' && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-blue-100 p-2 z-50 animate-in fade-in">
                  <div className="text-xs font-bold text-slate-400 px-3 py-1 border-b">Categories</div>
                  {['My Symptoms', 'My Personal Health', 'My Men\'s Health', 'My Women\'s Health', 'View All 23 Categories'].map((cat, i) => (
                    <a
                      key={i}
                      href="#categories"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 rounded-lg font-medium"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Health Cards (1,000) */}
            <a
              href="#categories"
              className="px-1.5 lg:px-2.5 py-1 rounded-lg hover:text-[#1d6fd8] transition-colors whitespace-nowrap"
            >
              Health Cards (1,000)
            </a>

            {/* 5. For Doctors (Dropdown) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('doctors')}
                className="px-1.5 lg:px-2 py-1 rounded-lg flex items-center gap-0.5 hover:text-[#1d6fd8] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>For Doctors</span>
                <ChevronDown className="w-3 h-3 text-[#0f2d59]" />
              </button>
              {activeDropdown === 'doctors' && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-blue-100 p-2 z-50 animate-in fade-in">
                  {['Clinical Protocols', 'Red-Flag Escalation', 'Doctor Summary Export'].map((item, i) => (
                    <div key={i} className="px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 rounded-lg cursor-pointer">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 6. For Pharmacists (Dropdown) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('pharmacists')}
                className="px-1.5 lg:px-2 py-1 rounded-lg flex items-center gap-0.5 hover:text-[#1d6fd8] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>For Pharmacists</span>
                <ChevronDown className="w-3 h-3 text-[#0f2d59]" />
              </button>
              {activeDropdown === 'pharmacists' && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-blue-100 p-2 z-50 animate-in fade-in">
                  {['Drug Interactions', 'Question Sheets', 'OTC Guidance'].map((item, i) => (
                    <div key={i} className="px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 rounded-lg cursor-pointer">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 7. Resources (Dropdown) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('resources')}
                className="px-1.5 lg:px-2 py-1 rounded-lg flex items-center gap-0.5 hover:text-[#1d6fd8] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Resources</span>
                <ChevronDown className="w-3 h-3 text-[#0f2d59]" />
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-blue-100 p-2 z-50 animate-in fade-in">
                  {['Red-Yellow-Green Guide', 'Patient Handouts', 'Emergency Helplines'].map((item, i) => (
                    <div key={i} className="px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 rounded-lg cursor-pointer">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 8. About */}
            <a
              href="#founder"
              className="px-1.5 lg:px-2.5 py-1 rounded-lg hover:text-[#1d6fd8] transition-colors whitespace-nowrap"
            >
              About
            </a>

            {/* 9. Search Icon */}
            <button
              type="button"
              className="p-1 text-[#0f2d59] hover:text-[#1d6fd8] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[2.3]" />
            </button>

            {/* 10. Language Selector (EN) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-blue-200 text-xs font-bold text-[#0f2d59] hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#1d6fd8]" />
                <span>{selectedLanguage}</span>
                <ChevronDown className="w-3 h-3 text-[#0f2d59]" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-xl shadow-lg border border-blue-100 p-1 z-50 text-xs">
                  {['EN (English)', 'HI (Hindi)', 'MR (Marathi)'].map(l => (
                    <button
                      key={l}
                      onClick={() => {
                        setSelectedLanguage(l.substring(0, 2));
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-blue-50 rounded-lg font-medium"
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 11. Admin & Sign In Buttons */}
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('/admin/dashboard') : (window.location.hash = '#admin')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#08165B] hover:bg-[#1677E8] text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
              title="Open GlobalHealthAI Admin Panel"
            >
              <Shield className="w-3.5 h-3.5 text-[#F04B0A]" />
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('/login') : (window.location.pathname = '/login')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-blue-200 text-[#0f2d59] hover:bg-blue-50 transition-colors cursor-pointer text-xs font-bold"
              aria-label="Sign In or Account"
              title="Sign In to GlobalHealthAI"
            >
              <User className="w-3.5 h-3.5 text-[#1677E8]" />
              <span className="hidden xl:inline">Sign In</span>
            </button>

          </nav>

          {/* Mobile hamburger for small mobile screens only */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="#admin"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#08165B] text-white text-xs font-bold"
            >
              <Shield className="w-3 h-3 text-[#F04B0A]" />
              <span>Admin</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0f2d59]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer for phone screens */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-blue-100 space-y-2 bg-white text-sm font-semibold">
            <a href="#admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 bg-[#08165B] text-white font-bold rounded-lg">
              <Shield className="w-4 h-4 text-[#F04B0A]" />
              <span>Open Admin Panel</span>
            </a>
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 bg-[#dcecfe] text-[#0f2d59] font-bold rounded-lg">Home</a>
            <a href="#search-section" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 text-slate-700">Symptom Checker</a>
            <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 text-slate-700">Categories</a>
            <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 text-slate-700">Health Cards (1,000)</a>
            <a href="#founder" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 text-slate-700">About</a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigate) onNavigate('/login');
                else window.location.pathname = '/login';
              }}
              className="w-full text-left px-3 py-2 bg-gradient-to-r from-[#F04B0A] to-[#ff6224] text-white font-bold rounded-lg cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
