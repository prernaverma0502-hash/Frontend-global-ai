import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Languages,
  User,
  LogOut,
  ChevronDown,
  Globe,
  Home,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { OFFICIAL_LANGUAGES } from '../../data/healthSakhiData';

export default function TopHeader({
  activeView,
  selectedLanguage,
  setSelectedLanguage,
  breadcrumb,
  user,
  onLogout,
  onOpenMobileSidebar,
  onNavigateHome
}) {
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const langRef = useRef(null);
  const userRef = useRef(null);

  const currentLangObj = OFFICIAL_LANGUAGES.find(l => l.id === selectedLanguage) || OFFICIAL_LANGUAGES[0];

  useEffect(() => {
    const handleOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-[#D6E6FA] px-4 sm:px-6 flex items-center justify-between shadow-2xs">
      
      {/* Left: Mobile Toggle & Breadcrumb Title */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-blue-50 border border-slate-200 cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Dynamic Breadcrumb / View Title */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#08165B] max-w-[280px] sm:max-w-md truncate">
          <button
            onClick={onNavigateHome}
            className="text-slate-400 hover:text-[#1677E8] transition-colors flex items-center gap-1 cursor-pointer"
            title="Return to Main Landing Page"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GlobalHealthAI</span>
          </button>
          
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          
          <span className="text-slate-700 truncate">
            {breadcrumb || 'All Categories'}
          </span>
        </div>
      </div>

      {/* Right: Language Pill & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Language Selector Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            type="button"
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-blue-50 border border-[#D6E6FA] text-xs font-bold text-[#08165B] transition-colors cursor-pointer shadow-2xs"
            title="Select Library Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#1677E8]" />
            <span>{currentLangObj.native}</span>
            <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">({currentLangObj.name})</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {langOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-blue-100 p-2 z-50 animate-in fade-in duration-150">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 border-b border-slate-100 mb-1">
                Select Library Language
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {OFFICIAL_LANGUAGES.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setSelectedLanguage(l.id);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      selectedLanguage === l.id
                        ? 'bg-blue-50 text-[#1677E8] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{l.native} ({l.name})</span>
                    {selectedLanguage === l.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F04B0A]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Account Menu */}
        <div className="relative" ref={userRef}>
          <button
            type="button"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white hover:bg-blue-50 border border-[#D6E6FA] text-xs font-bold text-[#08165B] transition-colors cursor-pointer shadow-2xs"
          >
            <div className="w-6 h-6 rounded-full bg-[#08165B] text-white flex items-center justify-center text-[10px] font-bold">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="hidden md:inline font-semibold text-slate-700 max-w-[140px] truncate">
              {user?.email || 'user@gmail.com'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-blue-100 p-2 z-50 animate-in fade-in duration-150 space-y-2">
              <div className="p-2 border-b border-slate-100">
                <div className="text-[11px] font-bold text-[#08165B] truncate">
                  {user?.email || 'user@gmail.com'}
                </div>
                <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>HealthSakhi Member (V1)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of Library</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}
