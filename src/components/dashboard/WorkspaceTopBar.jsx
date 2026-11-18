import React from 'react';
import { Menu, PhoneCall, Sparkles, X } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

export default function WorkspaceTopBar({
  activeCategory,
  onSelectCategory,
  onOpenMobileSidebar,
  activeView
}) {
  const { isDark } = useTheme();

  return (
    <header
      className={`sticky top-0 z-30 h-14 backdrop-blur-md border-b px-4 sm:px-8 flex items-center justify-between transition-colors duration-200 ${
        isDark
          ? 'bg-[#080D1A]/95 border-slate-800 text-slate-100'
          : 'bg-white/80 border-blue-100/80 text-slate-800'
      }`}
    >
      
      {/* Left: Mobile Toggle & Category Pill */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Minimalist Breadcrumb / Focused Mode Pill */}
        <div className="flex items-center gap-2">
          {activeView === 'library' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-[#08165B] dark:text-blue-300 border border-blue-200 dark:border-slate-700 text-xs font-semibold">
              <span>Personal Health Library</span>
            </span>
          ) : activeCategory ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-blue-200/90 dark:border-slate-700 text-xs font-medium shadow-2xs">
              <span className={`w-2 h-2 rounded-full ${activeCategory.dotColor}`} />
              <span className="text-slate-500 dark:text-slate-400 text-[11px] font-normal">Focused Mode:</span>
              <span className="font-bold text-[#08165B] dark:text-white">{activeCategory.name}</span>
              <button
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(null)}
                className="ml-1 p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                title="Clear category focus"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-blue-200/80 dark:border-slate-700 text-xs font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#1677E8] to-[#F04B0A]" />
              <span className="text-slate-500 dark:text-slate-400 text-[11px] font-normal">Triage Mode:</span>
              <span className="font-bold text-[#08165B] dark:text-white">All Categories / General</span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Theme Toggle & Emergency Pill Badge */}
      <div className="flex items-center gap-2.5">
        
        {/* Organic Ink-Bleed Theme Toggle */}
        <ThemeToggle variant="topbar" />

        {/* Emergency Helpline Pill */}
        <a
          href="tel:112"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 border border-red-200/80 dark:border-red-900/60 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          title="Emergency Helplines: 102 (Ambulance), 112 (National Emergency)"
        >
          <PhoneCall className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
          <span className="hidden sm:inline">Emergency: 102 / 112</span>
          <span className="sm:hidden">112</span>
        </a>
      </div>

    </header>
  );
}
