import React from 'react';
import {
  ShieldCheck,
  LogOut,
  ArrowLeft,
  Activity,
  Users,
  BookOpen,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard({ onNavigate }) {
  const { user, logout } = useAuth();

  // Route protection
  const isAdmin = user && user.role === 'admin';

  const handleLogout = () => {
    logout();
    if (onNavigate) {
      onNavigate('/login');
    } else {
      window.location.pathname = '/login';
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F2F7FF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-red-100 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
            <Lock className="w-6 h-6 stroke-[2.3]" />
          </div>
          <h2 className="text-2xl font-black text-[#08165B]">Admin Access Restricted</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            You must be signed in as an administrator (<strong>admin@gmail.com</strong>) to view the Clinical Administration Dashboard.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate ? onNavigate('/login') : (window.location.pathname = '/login')}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F04B0A] to-[#ff6224] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Go to Login Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F7FF] font-sans antialiased text-slate-800">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-2xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate && onNavigate('/')}>
              <div className="w-9 h-9 rounded-full bg-[#1677E8] flex items-center justify-center text-white font-black text-sm shadow-xs">
                GH
              </div>
              <div className="flex items-center leading-none">
                <span className="text-xl font-black text-[#08165B]">GlobalHealth</span>
                <span className="text-xl font-black text-[#F04B0A]">AI</span>
              </div>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-red-100/80 text-red-800 font-bold text-[11px] border border-red-200">
              Admin Portal
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('/') : (window.location.pathname = '/')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 text-xs font-bold text-[#08165B] hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Homepage</span>
            </button>

            <div className="text-right hidden md:block">
              <div className="text-xs font-bold text-[#08165B]">{user?.name}</div>
              <div className="text-[10px] text-slate-500 font-medium">{user?.email}</div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 font-bold text-xs border border-slate-200 hover:border-red-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* Welcome Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#08165B] via-[#0f2d72] to-[#1677E8] text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-blue-200 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Clinical Administrator Session</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Clinical Administration & Content Controls
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Oversee 1,000 clinically reviewed symptom cards, red-flag escalation algorithms, and doctor-approved patient guides.
            </p>
          </div>

          <div className="shrink-0 flex gap-2">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('/') : (window.location.pathname = '/')}
              className="px-4 py-2 rounded-xl bg-white text-[#08165B] font-bold text-xs shadow-md hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Open Live Site
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Symptom Cards</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1677E8] flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#08165B]">1,000</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">100% Clinically Reviewed</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clinical Practice</span>
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#F04B0A] flex items-center justify-center">
                <Stethoscope className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#08165B]">38 Years</div>
            <div className="text-[11px] text-slate-600 font-medium mt-1">Dr. Pratap Madhukar Guidance</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Red-Flag Alerts</span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#08165B]">Active</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Protocols Operational</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Security</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#08165B]">256-Bit SSL</div>
            <div className="text-[11px] text-slate-600 font-medium mt-1">HIPAA Compliant Standard</div>
          </div>

        </div>

        {/* Clinical Protocols Table Preview */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-2xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#08165B]">Recent Symptom Educational Modules</h3>
              <p className="text-xs text-slate-500">Live symptom education cards available on the platform</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
              Live in Production
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Reviewed Topic</th>
                  <th className="py-3 px-4">Triage Color</th>
                  <th className="py-3 px-4">Lead Physician</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                <tr>
                  <td className="py-3 px-4 font-bold text-[#08165B]">My Symptoms</td>
                  <td className="py-3 px-4">Chest Pain & Breathing Distress</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[10px]">Red - Emergency</span></td>
                  <td className="py-3 px-4">Dr. Pratap Madhukar</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Active ✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#08165B]">My Personal Health</td>
                  <td className="py-3 px-4">Persistent Fever & Fatigue (24-48h)</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px]">Yellow - See Doctor</span></td>
                  <td className="py-3 px-4">Dr. Pratap Madhukar</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Active ✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#08165B]">My Food & Nutrition</td>
                  <td className="py-3 px-4">Mild Seasonal Sore Throat</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">Green - Self Care</span></td>
                  <td className="py-3 px-4">Dr. Pratap Madhukar</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">Active ✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>

    </div>
  );
}
