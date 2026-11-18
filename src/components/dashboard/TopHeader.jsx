import React, { useState, useRef, useEffect } from 'react';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import {
  Menu,
  Languages,
  User,
  LogOut,
  ChevronDown,
  Globe,
  Home,
  ChevronRight,
  ShieldAlert,
  PhoneCall,
  Sparkles
} from 'lucide-react';

export default function TopHeader({
  activeMenu,
  selectedLanguage,
  setSelectedLanguage,
  breadcrumb,
  user,
  onLogout,
  onOpenMobileSidebar,
  onNavigateHome,
  onNavigateNewChat
}) {
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const langRef = useRef(null);
  const userRef = useRef(null);

  const languages = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'हिंदी (Hindi)' },
    { id: 'hinglish', label: 'Hinglish' }
  ];

  const currentLangLabel = languages.find(l => l.id === selectedLanguage)?.label || 'English';

  useEffect(() => {
    const handleOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-[#D6E6FA] px-4 sm:px-6 flex items-center justify-between shadow-2xs">

      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-blue-50 border border-slate-200 cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

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

          <span className="text-slate-700 truncate font-bold">
            {breadcrumb || 'Dashboard'}
          </span>
        </div>
      </div>

      {/* Right: Emergency Guide Pill, Theme Toggle, Language Switcher, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Organic Ink Bleed Theme Toggle */}
        <ThemeToggle variant="topbar" />

        {/* Quick Emergency Hotline Pill */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold">
          <PhoneCall className="w-3 h-3 text-red-600 animate-pulse" />
          <span>Emergency: 102 / 108 / 112</span>
        </div>

        {/* Start Chat Quick CTA Button */}
        {activeMenu !== 'new-chat' && (
          <button
            type="button"
            onClick={onNavigateNewChat}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#F04B0A] to-[#ff6224] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Assessment</span>
          </button>
        )}

        {/* Language Selector Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            type="button"
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-blue-50 border border-[#D6E6FA] text-xs font-bold text-[#08165B] transition-colors cursor-pointer shadow-2xs"
            title="Select Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#1677E8]" />
            <span>{currentLangLabel.split(' ')[0]}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {langOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-blue-100 p-2 z-50 animate-in fade-in duration-150">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 border-b border-slate-100 mb-1">
                Response Language
              </div>
              <div className="space-y-1">
                {languages.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setSelectedLanguage(l.id);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${selectedLanguage === l.id
                      ? 'bg-blue-50 text-[#1677E8] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <span>{l.label}</span>
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
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#08165B] to-[#1677E8] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="hidden md:inline font-semibold text-slate-700 max-w-[130px] truncate">
              {user?.email || 'user@gmail.com'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-blue-100 p-2 z-50 animate-in fade-in duration-150 space-y-1.5">
              <div className="p-2 border-b border-slate-100">
                <div className="text-[11px] font-bold text-[#08165B] truncate">
                  {user?.name || 'Verified Patient User'}
                </div>
                <div className="text-[10px] text-slate-400 font-medium truncate">
                  {user?.email || 'user@gmail.com'}
                </div>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}

