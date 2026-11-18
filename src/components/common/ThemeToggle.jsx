import React, { useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({
  className = '',
  variant = 'default', // 'default' | 'topbar' | 'sidebar'
  showLabel = false
}) {
  const { isDark, toggleTheme } = useTheme();
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    let coords = { x: e.clientX, y: e.clientY };

    // If triggered by keyboard or touch with 0 coordinates, compute button center
    if (!coords.x && !coords.y && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      coords = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }

    toggleTheme(coords);
  };

  if (variant === 'sidebar') {
    return (
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer group ${
          isDark
            ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60'
            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
        } ${className}`}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
              isDark
                ? 'bg-amber-400/15 text-amber-300'
                : 'bg-indigo-500/10 text-indigo-600'
            }`}
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 stroke-[2.2]" />
            ) : (
              <Moon className="w-3.5 h-3.5 stroke-[2.2]" />
            )}
          </div>
          <span className="font-semibold">
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>

        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            isDark
              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
              : 'bg-blue-100 text-[#08165B] border border-blue-200'
          }`}
        >
          {isDark ? 'ON' : 'OFF'}
        </span>
      </button>
    );
  }

  // TopBar / Navbar variant
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode (Ink Bleed)' : 'Switch to Dark Mode (Ink Bleed)'}
      className={`relative p-2 rounded-xl border transition-all cursor-pointer group flex items-center justify-center ${
        isDark
          ? 'bg-slate-800/90 hover:bg-slate-700 border-slate-700 text-amber-300 shadow-sm hover:shadow-amber-500/10'
          : 'bg-white hover:bg-blue-50/80 border-blue-200/90 text-slate-700 shadow-2xs hover:border-blue-400'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12 text-[#08165B]" />
        )}
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-semibold">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
}
