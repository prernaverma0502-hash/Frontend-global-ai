import React from 'react';
import {
  LayoutGrid,
  Search,
  Languages,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  X
} from 'lucide-react';

export default function Sidebar({
  activeView,
  setActiveView,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  onLogout,
  onNavigateHome
}) {
  const navItems = [
    { id: 'categories', label: 'All Categories', icon: LayoutGrid },
    { id: 'search', label: 'Find a Book', icon: Search },
    { id: 'languages', label: 'Language', icon: Languages },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSelect = (id) => {
    setActiveView(id);
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-[#D6E6FA] transition-all duration-300 flex flex-col justify-between shadow-xs lg:static
          ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
      >
        {/* Top Header / Branding */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-[#D6E6FA]/80">
            
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer overflow-hidden"
              onClick={onNavigateHome}
              title="Return to Homepage"
            >
              {/* Medical Globe SVG */}
              <div className="w-10 h-10 rounded-xl bg-[#1677E8] flex items-center justify-center shrink-0 shadow-xs">
                <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                  <circle cx="20" cy="20" r="18" fill="#1677E8" />
                  <ellipse cx="20" cy="20" rx="9" ry="18" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
                  <line x1="2" y1="20" x2="38" y2="20" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
                  <rect x="16" y="9" width="8" height="22" rx="2" fill="#F04B0A" stroke="#ffffff" strokeWidth="0.8" />
                  <rect x="9" y="16" width="22" height="8" rx="2" fill="#F04B0A" stroke="#ffffff" strokeWidth="0.8" />
                </svg>
              </div>

              {(!isCollapsed || mobileOpen) && (
                <div className="flex flex-col whitespace-nowrap leading-none animate-in fade-in">
                  <div className="flex items-center">
                    <span className="text-lg font-black text-[#08165B] tracking-tight">GlobalHealth</span>
                    <span className="text-lg font-black text-[#F04B0A] tracking-tight ml-0.5">AI</span>
                  </div>
                  <span className="text-[9px] font-bold text-[#1677E8] tracking-widest uppercase mt-0.5">
                    HEALTHSAKHI V1 LIBRARY
                  </span>
                </div>
              )}
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id || (item.id === 'categories' && ['category-books', 'book-details', 'reader'].includes(activeView));

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[#08165B] to-[#1677E8] text-white shadow-md'
                      : 'text-slate-600 hover:bg-blue-50/70 hover:text-[#08165B]'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-[#1677E8]'
                    }`}
                  />
                  {(!isCollapsed || mobileOpen) && (
                    <span className="whitespace-nowrap font-semibold">{item.label}</span>
                  )}

                  {/* Active Indicator bar */}
                  {isActive && (!isCollapsed || mobileOpen) && (
                    <span className="ml-auto w-1.5 h-5 rounded-full bg-[#F04B0A]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Toggle & Logout */}
        <div className="p-3 border-t border-[#D6E6FA]/80 space-y-2">
          
          {/* Collapse Sidebar Button (Desktop only) */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center justify-center gap-2 p-2 rounded-xl text-slate-400 hover:text-[#08165B] hover:bg-blue-50/50 transition-colors cursor-pointer text-xs font-semibold"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>

          {/* Logout Action */}
          <button
            type="button"
            onClick={onLogout}
            title={isCollapsed ? 'Sign Out' : undefined}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-slate-700 hover:text-red-700 hover:bg-red-50/80 border border-transparent hover:border-red-200 text-xs sm:text-sm font-bold transition-all cursor-pointer group"
          >
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-colors shrink-0" />
            {(!isCollapsed || mobileOpen) && (
              <span className="whitespace-nowrap">Sign Out</span>
            )}
          </button>
        </div>

      </aside>
    </>
  );
}
