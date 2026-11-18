import React, { useState } from 'react';
import {
  Settings,
  Globe,
  Sliders,
  ShieldCheck,
  Bell,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { userPortalStorage } from '../../services/userPortalStorage';

export default function SettingsView({
  user,
  onClearAllHistory
}) {
  const [settings, setSettings] = useState(() => userPortalStorage.getSettings(user?.email));
  const [savedSuccess, setSavedSuccess] = useState(false);

  const updateField = (key, val) => {
    const next = { ...settings, [key]: val };
    setSettings(next);
    userPortalStorage.saveSettings(user?.email, next);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportData = () => {
    const conversations = userPortalStorage.getConversations(user?.email);
    const reports = userPortalStorage.getReports(user?.email);
    const profile = userPortalStorage.getProfile(user?.email);

    const fullExport = {
      exportDate: new Date().toISOString(),
      userProfile: profile,
      conversations,
      doctorReports: reports
    };

    const blob = new Blob([JSON.stringify(fullExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GlobalHealthAI_HealthRecords_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">

      {/* Header */}
      <div className="border-b border-[#D6E6FA] pb-5 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#08165B] tracking-tight">
          Portal Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Customize AI clinical guidance depth, language behavior, notification alerts, and data privacy controls.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Preferences updated successfully.</span>
        </div>
      )}

      {/* 1. General Preferences */}
      <div className="bg-white rounded-3xl p-6 border border-[#D6E6FA] shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-[#08165B] uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#1677E8]" />
          <span>General Preferences</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <div className="text-xs font-bold text-[#08165B]">System Language</div>
              <div className="text-[11px] text-slate-500">Language for dashboard navigation & categories</div>
            </div>
            <select
              value={settings.language || 'English'}
              onChange={(e) => updateField('language', e.target.value)}
              className="py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#08165B] focus:outline-none cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Hinglish">Hinglish</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-xs font-bold text-[#08165B]">High Contrast Legibility</div>
              <div className="text-[11px] text-slate-500">Increases text weight and contrast for clarity</div>
            </div>
            <input
              type="checkbox"
              checked={!!settings.highContrast}
              onChange={(e) => updateField('highContrast', e.target.checked)}
              className="w-4 h-4 rounded text-[#F04B0A] focus:ring-[#F04B0A]/30 cursor-pointer accent-[#F04B0A]"
            />
          </div>
        </div>
      </div>

      {/* 2. AI Assistant Preferences */}
      <div className="bg-white rounded-3xl p-6 border border-[#D6E6FA] shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-[#08165B] uppercase tracking-wider flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#1677E8]" />
          <span>AI Clinical Response Behavior</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <div className="text-xs font-bold text-[#08165B]">Clinical Explanation Style</div>
              <div className="text-[11px] text-slate-500">Choose between simple lay explanations or comprehensive medical terminology</div>
            </div>
            <select
              value={settings.responseStyle || 'Detailed Clinical'}
              onChange={(e) => updateField('responseStyle', e.target.value)}
              className="py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#08165B] focus:outline-none cursor-pointer"
            >
              <option value="Detailed Clinical">Detailed Clinical (with research citations)</option>
              <option value="Simple & Conversational">Simple & Conversational</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-xs font-bold text-[#08165B]">Voice Dictation Pace</div>
              <div className="text-[11px] text-slate-500">Dictation speed for voice synthesis</div>
            </div>
            <select
              value={settings.voiceSpeed || '1.0x'}
              onChange={(e) => updateField('voiceSpeed', e.target.value)}
              className="py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#08165B] focus:outline-none cursor-pointer"
            >
              <option value="0.85x">0.85x (Slower)</option>
              <option value="1.0x">1.0x (Normal)</option>
              <option value="1.25x">1.25x (Brisk)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Privacy & Personal Health Data */}
      <div className="bg-white rounded-3xl p-6 border border-[#D6E6FA] shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-[#08165B] uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Privacy & Data Protection</span>
        </h3>

        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-600 space-y-2">
          <div className="font-bold text-[#08165B] flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#1677E8]" />
            <span>256-Bit SSL Encrypted & HIPAA Privacy Architecture</span>
          </div>
          <p className="leading-relaxed">
            Your personal conversations, symptom logs, and doctor summaries belong strictly to you. They are never shared with insurance entities or commercial third parties.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleExportData}
            className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#08165B] font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export All My Health Records (JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to clear your entire conversation history? This cannot be undone.')) {
                if (onClearAllHistory) onClearAllHistory();
              }
            }}
            className="py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Conversation History</span>
          </button>
        </div>
      </div>

    </div>
  );
}

