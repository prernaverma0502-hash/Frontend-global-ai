import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  BookMarked,
  HelpCircle,
  Settings,
  ChevronRight,
  ChevronDown,
  Check,
  Sparkles,
  LogOut,
  X
} from 'lucide-react';
import { PORTAL_CATEGORIES } from '../../data/portalCategories';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

export default function MinimalSidebar({
  activeCategory,
  onSelectCategory,
  onNewChat,
  onOpenLibrary,
  activeView, // 'workspace' | 'library'
  onOpenHelp,
  onOpenProfile,
  user,
  mobileOpen,
  setMobileOpen,
  onNavigateHome
}) {
  const { isDark } = useTheme();
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoriesDropdownOpen(false);
      }
    }
    if (categoriesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [categoriesDropdownOpen]);
  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* 260px Fixed Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-[260px] border-r flex flex-col justify-between transition-all duration-200 select-none ${
          isDark
            ? 'bg-[#0B132B] border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        } ${mobileOpen ? 'translate-x-0 visible' : '-translate-x-full invisible lg:visible pointer-events-none lg:pointer-events-auto'} lg:translate-x-0`}
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col flex-1 min-h-0">
          
          {/* 1. Minimalist Brand Logo */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <div
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 cursor-pointer group"
              title="Return to Homepage"
            >
              {/* Clean Medical Emblem */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1677E8] to-[#08165B] flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[2.2]">
                  <path d="M12 2v20M2 12h20" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
                </svg>
              </div>

              <div className="flex items-center leading-none">
                <span className="text-[17px] font-bold text-[#08165B] dark:text-white tracking-tight">GlobalHealth</span>
                <span className="text-[17px] font-bold text-[#F04B0A] tracking-tight ml-1">AI</span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Primary CTA: Sleek "+ New Assessment Chat" button */}
          <div className="p-3.5 pb-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                onNewChat();
                if (mobileOpen) setMobileOpen(false);
              }}
              className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#08165B] to-[#122b7a] dark:from-[#1677E8] dark:to-[#08165B] hover:from-[#122b7a] hover:to-[#08165B] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group border border-blue-900/30"
            >
              <Plus className="w-4 h-4 text-[#F04B0A] dark:text-white group-hover:rotate-90 transition-transform stroke-[2.5]" />
              <span>New Assessment Chat</span>
            </button>
          </div>

          {/* 3. Main Menu: Library (Saved Reports & Past Chats) */}
          <div className="px-3.5 py-1 shrink-0">
            <button
              type="button"
              onClick={() => {
                onOpenLibrary();
                if (mobileOpen) setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeView === 'library'
                  ? 'bg-blue-50 dark:bg-slate-800 text-[#08165B] dark:text-blue-300 font-bold border border-blue-200/80 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookMarked className="w-4 h-4 text-[#1677E8]" />
              <span>Library</span>
              <span className="ml-auto text-[10px] text-slate-400 dark:text-slate-500 font-medium">Saved Reports</span>
            </button>
          </div>

          {/* 4. Health Focus Categories (Compact Dropdown Selector) */}
          <div ref={dropdownRef} className="px-3.5 py-3 relative">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Health Focus Categories
              </span>
              <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 px-1.5 py-0.5 rounded-full font-mono">
                12
              </span>
            </div>

              {/* Dropdown Trigger Button */}
              <button
                type="button"
                onClick={() => setCategoriesDropdownOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={categoriesDropdownOpen}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                  categoriesDropdownOpen
                    ? 'bg-white dark:bg-slate-800 border-[#1677E8] shadow-xs ring-2 ring-blue-500/10'
                    : 'bg-slate-50/90 dark:bg-slate-800/80 hover:bg-slate-100/80 dark:hover:bg-slate-800 border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {activeCategory ? (
                    <span className={`w-2.5 h-2.5 rounded-full ${activeCategory.dotColor} shrink-0`} />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#1677E8] to-[#F04B0A] shrink-0" />
                  )}
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {activeCategory ? activeCategory.name : 'All Health Categories'}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 transition-transform duration-200 ${
                    categoriesDropdownOpen ? 'rotate-180 text-[#1677E8]' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu Overlay */}
              {categoriesDropdownOpen && (
                <div className="absolute left-3.5 right-3.5 top-[calc(100%-2px)] z-50 bg-white dark:bg-[#0F1C36] border border-blue-200/80 dark:border-slate-700 rounded-xl shadow-xl p-1.5 max-h-72 overflow-y-auto space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                  {/* Option 1: All Categories (General Triage Mode) */}
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(null);
                      setCategoriesDropdownOpen(false);
                      if (mobileOpen) setMobileOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                      !activeCategory && activeView === 'workspace'
                        ? 'bg-blue-50 dark:bg-blue-900/40 text-[#08165B] dark:text-blue-200 font-bold border border-blue-200/70 dark:border-blue-700/60'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#1677E8] to-[#F04B0A] shrink-0" />
                      <span className="truncate font-semibold">All Categories (General Triage)</span>
                    </div>
                    {!activeCategory && activeView === 'workspace' && (
                      <Check className="w-3.5 h-3.5 text-[#1677E8] shrink-0 stroke-[2.5]" />
                    )}
                  </button>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />

                  {/* 12 Individual Categories */}
                  {PORTAL_CATEGORIES.map((cat) => {
                    const isSelected = activeCategory?.id === cat.id && activeView === 'workspace';

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          onSelectCategory(cat);
                          setCategoriesDropdownOpen(false);
                          if (mobileOpen) setMobileOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-900/40 text-[#08165B] dark:text-blue-200 font-semibold border border-blue-200/70 dark:border-blue-700/60'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-2 h-2 rounded-full ${cat.dotColor} shrink-0`} />
                          <span className="truncate">{cat.name}</span>
                        </div>

                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[#1677E8] shrink-0 stroke-[2.5]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Flexible Spacer */}
            <div className="flex-1" />

          </div>

          {/* 5. Bottom Footer: Theme Toggle, Help & Support and Profile Settings */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 shrink-0 space-y-1.5">
            
            {/* Organic Ink Bleed Theme Toggle in Sidebar */}
            <ThemeToggle variant="sidebar" />

            {/* Help & Support */}
            <button
              type="button"
              onClick={onOpenHelp}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-medium transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Help & Support</span>
            </button>

            {/* Profile Settings with Avatar */}
            <button
              type="button"
              onClick={onOpenProfile}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group text-left"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-bold shrink-0">
                  {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    {user?.name || 'Patient Account'}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                    Profile & Settings
                  </div>
                </div>
              </div>
              
              <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 shrink-0" />
            </button>

          </div>

      </aside>
    </>
  );
}
