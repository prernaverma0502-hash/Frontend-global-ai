import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  UploadCloud,
  BookOpen,
  Cpu,
  Users,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  ExternalLink,
  ChevronDown,
  LogOut,
  User,
  ShieldCheck,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import UploadDocumentScreen from '../screens/UploadDocumentScreen';
import DocumentLibraryScreen from '../screens/DocumentLibraryScreen';
import AIManagementScreen from '../screens/AIManagementScreen';
import UserManagementScreen from '../screens/UserManagementScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default function AdminLayout({ activeScreen, setActiveScreen, onExitToLanding }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const { settings, aiReadinessScore, activities } = useAdminStore();

  // Exactly 6 menus as strictly required
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Document', icon: UploadCloud },
    { id: 'library', label: 'Document Library', icon: BookOpen },
    { id: 'ai', label: 'AI Management', icon: Cpu },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavClick = (id) => {
    setActiveScreen(id);
    setMobileMenuOpen(false);
    window.location.hash = `#admin/${id}`;
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#F2F7FF] text-[#08165B] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-[#08165B] text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-400/30 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Wrapper */}
      <div className="flex flex-1 min-h-screen">

        {/* SIDEBAR (Desktop) */}
        <aside
          className={`hidden md:flex flex-col bg-white border-r border-[#D6E6FA] transition-all duration-300 z-30 shrink-0 sticky top-0 h-screen ${
            sidebarCollapsed ? 'w-[76px]' : 'w-[260px]'
          }`}
        >
          {/* Sidebar Header: Logo & Branding */}
          <div className="h-[68px] px-4 border-b border-[#D6E6FA] flex items-center justify-between">
            <div
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer overflow-hidden"
            >
              {/* Globe + Medical Cross Logo matching landing page */}
              <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                  <circle cx="20" cy="20" r="18" fill="#1677E8" />
                  <ellipse cx="20" cy="20" rx="9" ry="18" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
                  <line x1="2" y1="20" x2="38" y2="20" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
                  <rect x="16" y="8" width="8" height="24" rx="2" fill="#F04B0A" stroke="#ffffff" strokeWidth="1" />
                  <rect x="8" y="16" width="24" height="8" rx="2" fill="#F04B0A" stroke="#ffffff" strokeWidth="1" />
                </svg>
              </div>

              {!sidebarCollapsed && (
                <div className="flex flex-col leading-none">
                  <div className="flex items-center">
                    <span className="text-[17px] font-black text-[#08165B] tracking-tight">GlobalHealth</span>
                    <span className="text-[17px] font-black text-[#F04B0A] tracking-tight">AI</span>
                  </div>
                  <span className="text-[9px] font-bold text-[#1677E8] tracking-widest uppercase mt-0.5">
                    ADMIN CONSOLE
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded-lg text-slate-400 hover:text-[#08165B] hover:bg-slate-100 transition-colors"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar Navigation: EXACTLY 6 Menus */}
          <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
            {!sidebarCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Core Navigation
              </div>
            )}

            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1677E8] text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-[#08165B] hover:bg-blue-50/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  {!sidebarCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                  {!sidebarCollapsed && isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer: AI System Status & Admin Profile Dropdown */}
          <div className="p-3 border-t border-[#D6E6FA] space-y-2 bg-slate-50/50">
            {/* AI Status Badge */}
            {!sidebarCollapsed && (
              <div className="px-3 py-2 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-700">AI Readiness</span>
                </div>
                <span className="text-[11px] font-black text-[#1677E8]">{aiReadinessScore}%</span>
              </div>
            )}

            {/* Admin Profile & Actions */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-white border border-transparent hover:border-[#D6E6FA] transition-all cursor-pointer text-left ${
                  sidebarCollapsed ? 'justify-center' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#08165B] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {settings.profile.avatar}
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-[#08165B] truncate">
                      {settings.profile.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium truncate">
                      Administrator
                    </div>
                  </div>
                )}
                {!sidebarCollapsed && (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-xl shadow-xl border border-[#D6E6FA] p-1.5 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <div className="font-bold text-[#08165B]">{settings.profile.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{settings.profile.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleNavClick('settings');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-blue-50 rounded-lg text-left"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Admin Profile & Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onExitToLanding();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#1677E8] hover:bg-blue-50 rounded-lg text-left font-bold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Back to Live Website</span>
                  </button>
                  <div className="my-1 border-t border-slate-100"></div>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      showToast('Admin session secured.');
                      onExitToLanding();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-left font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
            <div className="relative w-[280px] bg-white h-full flex flex-col z-10 shadow-2xl">
              <div className="h-[64px] px-4 border-b border-[#D6E6FA] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#1677E8] text-white flex items-center justify-center font-bold">
                    GH
                  </div>
                  <span className="font-black text-[#08165B]">GlobalHealthAI</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-[#1677E8] text-white shadow-md'
                          : 'text-slate-700 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 border-t border-[#D6E6FA] space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onExitToLanding();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-50 text-[#1677E8] font-bold text-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Back to Live Website</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Admin Header Bar */}
          <header className="h-[68px] bg-white border-b border-[#D6E6FA] px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-2xs">
            {/* Left: Mobile hamburger + Screen title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 -ml-1 text-slate-500 hover:text-[#08165B]"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-base sm:text-lg font-black text-[#08165B] capitalize">
                  {navigationItems.find(i => i.id === activeScreen)?.label || 'Dashboard'}
                </h1>
                <div className="text-[11px] font-medium text-slate-500 hidden sm:block">
                  GlobalHealthAI Healthcare SaaS • Knowledge Engineering
                </div>
              </div>
            </div>

            {/* Right: Quick actions, notifications, live site button */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Back to Website Pill Button */}
              <button
                onClick={onExitToLanding}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-100/60 text-[#1677E8] font-bold text-xs transition-colors cursor-pointer"
                title="Return to public landing page"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View Website</span>
              </button>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="p-2 rounded-full border border-[#D6E6FA] hover:bg-blue-50 text-slate-600 transition-colors relative cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F04B0A]"></span>
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#D6E6FA] p-3 z-50 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-bold text-[#08165B]">System Notifications</span>
                      <span className="text-[10px] text-slate-400">Live stream</span>
                    </div>
                    <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                      {activities.slice(0, 4).map((act) => (
                        <div key={act.id} className="p-2 bg-slate-50 rounded-xl">
                          <div className="font-bold text-[#08165B]">{act.action}</div>
                          <div className="text-[11px] text-slate-600 truncate">{act.target}</div>
                          <div className="text-[9px] text-slate-400 mt-0.5">{act.timestamp}</div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setNotificationOpen(false)}
                      className="w-full text-center py-1 text-[11px] font-bold text-[#1677E8] hover:underline"
                    >
                      Close Notifications
                    </button>
                  </div>
                )}
              </div>

              {/* Small Admin Indicator */}
              <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-7 h-7 rounded-full bg-[#08165B] text-white font-bold text-[11px] flex items-center justify-center">
                  {settings.profile.avatar}
                </div>
                <div className="text-left text-xs leading-none">
                  <div className="font-bold text-[#08165B]">{settings.profile.name}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">● Admin</div>
                </div>
              </div>

            </div>
          </header>

          {/* Screen Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto w-full">
            {activeScreen === 'dashboard' && (
              <DashboardScreen navigateTo={handleNavClick} showToast={showToast} />
            )}
            {activeScreen === 'upload' && (
              <UploadDocumentScreen navigateTo={handleNavClick} showToast={showToast} />
            )}
            {activeScreen === 'library' && (
              <DocumentLibraryScreen navigateTo={handleNavClick} showToast={showToast} />
            )}
            {activeScreen === 'ai' && (
              <AIManagementScreen navigateTo={handleNavClick} showToast={showToast} />
            )}
            {activeScreen === 'users' && (
              <UserManagementScreen navigateTo={handleNavClick} showToast={showToast} />
            )}
            {activeScreen === 'settings' && (
              <SettingsScreen navigateTo={handleNavClick} showToast={showToast} />
            )}
          </main>

        </div>

      </div>

    </div>
  );
}
