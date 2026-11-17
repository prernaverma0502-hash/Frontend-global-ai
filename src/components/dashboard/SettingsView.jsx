import React from 'react';
import {
  Settings,
  Mail,
  Globe,
  Type,
  ShieldCheck,
  Eye,
  LogOut,
  Sparkles,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { OFFICIAL_LANGUAGES } from '../../data/healthSakhiData';
import { DISCLAIMER_VERSION } from './DisclaimerModal';

export default function SettingsView({
  user,
  selectedLanguage,
  setSelectedLanguage,
  accessibility = {},
  setAccessibility,
  onLogout
}) {
  const disclaimerRecord = (() => {
    try {
      const saved = localStorage.getItem('healthsakhi_disclaimer_accepted');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })();

  const currentLangObj = OFFICIAL_LANGUAGES.find(l => l.id === selectedLanguage) || OFFICIAL_LANGUAGES[0];

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="border-b border-[#D6E6FA] pb-5 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1677E8] text-xs font-bold border border-blue-200">
          <Settings className="w-3.5 h-3.5 text-[#F04B0A]" />
          <span>Library Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#08165B] tracking-tight">
          Application Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Manage your basic application preferences, language settings, and view privacy compliance records.
        </p>
      </div>

      {/* 1. Account Section */}
      <div className="bg-white rounded-3xl p-6 border border-[#D6E6FA] shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-[#08165B] uppercase tracking-wider flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#1677E8]" />
          <span>Account Credentials</span>
        </h3>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div>
            <div className="text-xs font-bold text-slate-400">Registered Account Email</div>
            <div className="text-sm font-black text-[#08165B] mt-0.5">{user?.email || 'user@gmail.com'}</div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            Active Session
          </span>
        </div>
      </div>

      {/* 2. Reading & Accessibility Preferences */}
      <div className="bg-white rounded-3xl p-6 border border-[#D6E6FA] shadow-2xs space-y-5">
        <h3 className="text-sm font-bold text-[#08165B] uppercase tracking-wider flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#1677E8]" />
          <span>Reading & Display Preferences</span>
        </h3>

        {/* Language Selection */}
        <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-100">
          <div>
            <div className="text-xs font-bold text-[#08165B]">Default Edition Language</div>
            <div className="text-[11px] text-slate-500 font-normal">Preferred language for opening library e-books</div>
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#08165B] focus:outline-none cursor-pointer"
          >
            {OFFICIAL_LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.native} ({l.name})
              </option>
            ))}
          </select>
        </div>

        {/* High Contrast Mode Toggle */}
        <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-100">
          <div>
            <div className="text-xs font-bold text-[#08165B]">High Contrast Text</div>
            <div className="text-[11px] text-slate-500 font-normal">Increases contrast and black level for high legibility</div>
          </div>
          <input
            type="checkbox"
            checked={!!accessibility.highContrast}
            onChange={(e) => setAccessibility(prev => ({ ...prev, highContrast: e.target.checked }))}
            className="w-4 h-4 rounded text-[#F04B0A] focus:ring-[#F04B0A]/30 cursor-pointer accent-[#F04B0A]"
          />
        </div>

        {/* Reduced Motion Toggle */}
        <div className="flex items-center justify-between gap-4 py-2">
          <div>
            <div className="text-xs font-bold text-[#08165B]">Reduced Motion</div>
            <div className="text-[11px] text-slate-500 font-normal">Disables decorative transitions for sensitive reading</div>
          </div>
          <input
            type="checkbox"
            checked={!!accessibility.reducedMotion}
            onChange={(e) => setAccessibility(prev => ({ ...prev, reducedMotion: e.target.checked }))}
            className="w-4 h-4 rounded text-[#F04B0A] focus:ring-[#F04B0A]/30 cursor-pointer accent-[#F04B0A]"
          />
        </div>
      </div>

      {/* 3. Privacy & Compliance Audit Record */}
      <div className="bg-white rounded-3xl p-6 border border-[#D6E6FA] shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-[#08165B] uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Strict Client Privacy Guarantee (HealthSakhi V1)</span>
        </h3>

        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2 text-xs text-slate-700">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-500">Disclaimer Version:</span>
            <span className="font-bold text-[#08165B]">{disclaimerRecord?.version || DISCLAIMER_VERSION}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-500">Accepted Timestamp:</span>
            <span className="font-mono text-[11px] text-slate-600">
              {disclaimerRecord?.acceptedAt ? new Date(disclaimerRecord.acceptedAt).toLocaleString() : 'Active'}
            </span>
          </div>
          <div className="pt-2 border-t border-blue-200/60 text-[11px] text-slate-600">
            <strong>Zero Health Data Retained:</strong> In strict compliance with client V1 regulations, HealthSakhi does not collect, record, or store any personal symptoms, medical history, age, sex, diagnoses, or bookmarks.
          </div>
        </div>
      </div>

      {/* 4. Logout Action */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onLogout}
          className="w-full py-3 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of GlobalHealthAI Library</span>
        </button>
      </div>

    </div>
  );
}
