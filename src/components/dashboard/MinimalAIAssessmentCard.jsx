import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Download,
  Share2,
  Bookmark,
  Check
} from 'lucide-react';
import { DEMO_TRIAGE_SCENARIOS } from '../../data/portalCategories';

export default function MinimalAIAssessmentCard({
  activeSeverity = 'GREEN',
  onSelectSeverity,
  customQuery = '',
  onSaveReport
}) {
  const { isDark } = useTheme();
  const [saved, setSaved] = useState(false);

  const scenario = DEMO_TRIAGE_SCENARIOS[activeSeverity] || DEMO_TRIAGE_SCENARIOS.GREEN;

  const handleSave = () => {
    if (onSaveReport) {
      onSaveReport({
        id: `rep-${Date.now()}`,
        title: scenario.title,
        urgency: scenario.severity,
        date: new Date().toISOString(),
        summaryText: scenario.summary,
        sourcesCited: scenario.sources
      });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleShare = () => {
    const text = `*GlobalHealthAI Health Assessment*\nSeverity: ${scenario.label}\nCondition: ${scenario.title}\n\n${scenario.summary}\n\n*Next Steps:*\n${scenario.steps.map(s => `• ${s}`).join('\n')}\n\n${scenario.sources}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className={`rounded-2xl border p-3.5 xs:p-4 sm:p-6 lg:p-7 space-y-4 sm:space-y-5 animate-in fade-in duration-200 transition-colors duration-200 w-full max-w-full overflow-hidden ${
        isDark
          ? 'bg-[#0F1C36] border-slate-700 shadow-[0_4px_25px_rgba(0,0,0,0.4)] text-slate-100'
          : 'bg-white border-blue-200/90 shadow-[0_4px_25px_rgba(8,22,91,0.05)] text-slate-900'
      }`}
    >
      
      {/* 1. Header: Severity Selector Tabs (Normal / Caution / Urgent) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        
        {/* Severity Badge Indicator */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${scenario.badgeClass}`}>
            <span className={`w-2 h-2 rounded-full ${scenario.dotClass}`} />
            <span>{scenario.label}</span>
          </span>
        </div>

        {/* Interactive Severity Toggle for Client Demo */}
        <div className="flex flex-wrap sm:flex-nowrap items-center bg-blue-50/70 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 rounded-xl p-0.5 sm:p-1 text-xs font-medium self-start sm:self-auto max-w-full">
          <span className="text-[10px] uppercase font-bold text-[#08165B] dark:text-blue-300 px-2 hidden md:inline">Demo Modes:</span>
          <button
            type="button"
            onClick={() => onSelectSeverity('GREEN')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeSeverity === 'GREEN'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 font-bold shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🟢 Normal
          </button>
          <button
            type="button"
            onClick={() => onSelectSeverity('YELLOW')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeSeverity === 'YELLOW'
                ? 'bg-white dark:bg-slate-700 text-amber-900 dark:text-amber-300 font-bold shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🟡 Mild Caution
          </button>
          <button
            type="button"
            onClick={() => onSelectSeverity('RED')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeSeverity === 'RED'
                ? 'bg-white dark:bg-slate-700 text-red-800 dark:text-red-300 font-bold shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🔴 Urgent
          </button>
        </div>

      </div>

      {/* 2. Assessment Title & Plain-Language Summary */}
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-bold text-[#08165B] dark:text-white tracking-tight">
          {scenario.title}
        </h3>
        
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {scenario.summary}
        </p>
      </div>

      {/* 3. Bulleted Safe Next Steps */}
      <div className="space-y-2.5 pt-1">
        <div className="text-xs font-bold uppercase tracking-wider text-[#08165B] dark:text-white">
          Safe Next Steps:
        </div>
        
        <div className="space-y-2">
          {scenario.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1677E8] shrink-0 mt-2" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Action Buttons (Save, PDF, Share) */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Save to Library */}
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 hover:bg-blue-50/50 dark:hover:bg-slate-700 text-xs font-medium text-[#08165B] dark:text-slate-200 transition-colors cursor-pointer"
          >
            {saved ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5 text-[#1677E8]" />}
            <span>{saved ? 'Saved to Library' : 'Save to Library'}</span>
          </button>

          {/* Download PDF / Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 hover:bg-blue-50/50 dark:hover:bg-slate-700 text-xs font-medium text-[#08165B] dark:text-slate-200 transition-colors cursor-pointer"
            title="Download PDF or Print"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Download Summary</span>
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 hover:bg-blue-50/50 dark:hover:bg-slate-700 text-xs font-medium text-[#08165B] dark:text-slate-200 transition-colors cursor-pointer"
            title="Share via WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Share</span>
          </button>
        </div>

        {/* Small Verified Footer Badge */}
        <div className="flex items-start sm:items-center gap-1.5 text-[10.5px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium max-w-full">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1677E8] shrink-0 mt-0.5 sm:mt-0" />
          <span className="break-words leading-tight">Grounded in Verified Clinical Research PDFs • No Unverified Advice</span>
        </div>

      </div>

    </div>
  );
}
