import React from 'react';
import { Menu, PhoneCall, Sparkles, X } from 'lucide-react';

export default function WorkspaceTopBar({
  activeCategory,
  onSelectCategory,
  onOpenMobileSidebar,
  activeView
}) {
  return (
    <header className="sticky top-0 z-30 h-14 bg-white/80 backdrop-blur-md border-b border-blue-100/80 px-4 sm:px-8 flex items-center justify-between">
      
      {/* Left: Mobile Toggle & Category Pill */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Minimalist Breadcrumb / Focused Mode Pill */}
        <div className="flex items-center gap-2">
          {activeView === 'library' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#08165B] border border-blue-200 text-xs font-semibold">
              <span>Personal Health Library</span>
            </span>
          ) : activeCategory ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-800 border border-blue-200/90 text-xs font-medium shadow-2xs">
              <span className={`w-2 h-2 rounded-full ${activeCategory.dotColor}`} />
              <span className="text-slate-500 text-[11px] font-normal">Focused Mode:</span>
              <span className="font-bold text-[#08165B]">{activeCategory.name}</span>
              <button
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(null)}
                className="ml-1 p-0.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                title="Clear category focus"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-800 border border-blue-200/80 text-xs font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#1677E8] to-[#F04B0A]" />
              <span className="text-slate-500 text-[11px] font-normal">Triage Mode:</span>
              <span className="font-bold text-[#08165B]">All Categories / General</span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Subtle Red Emergency Pill Badge */}
      <div className="flex items-center gap-2">
        <a
          href="tel:112"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/80 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          title="Emergency Helplines: 102 (Ambulance), 112 (National Emergency)"
        >
          <PhoneCall className="w-3.5 h-3.5 text-red-500" />
          <span>Emergency: 102 / 112</span>
        </a>
      </div>

    </header>
  );
}
