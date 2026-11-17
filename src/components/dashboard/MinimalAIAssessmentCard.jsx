import React, { useState } from 'react';
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
    <div className="bg-white rounded-2xl border border-blue-200/90 shadow-[0_4px_25px_rgba(8,22,91,0.05)] p-6 sm:p-7 space-y-5 animate-in fade-in duration-200">
      
      {/* 1. Header: Severity Selector Tabs (Normal / Caution / Urgent) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        
        {/* Severity Badge Indicator */}
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${scenario.badgeClass}`}>
            <span className={`w-2 h-2 rounded-full ${scenario.dotClass}`} />
            <span>{scenario.label}</span>
          </span>
        </div>

        {/* Interactive Severity Toggle for Client Demo */}
        <div className="flex items-center bg-blue-50/70 border border-blue-100 rounded-xl p-1 text-xs font-medium self-start sm:self-auto">
          <span className="text-[10px] uppercase font-bold text-[#08165B] px-2 hidden md:inline">Demo Modes:</span>
          <button
            type="button"
            onClick={() => onSelectSeverity('GREEN')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeSeverity === 'GREEN'
                ? 'bg-white text-emerald-800 font-bold shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            🟢 Normal
          </button>
          <button
            type="button"
            onClick={() => onSelectSeverity('YELLOW')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeSeverity === 'YELLOW'
                ? 'bg-white text-amber-900 font-bold shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            🟡 Mild Caution
          </button>
          <button
            type="button"
            onClick={() => onSelectSeverity('RED')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeSeverity === 'RED'
                ? 'bg-white text-red-800 font-bold shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            🔴 Urgent
          </button>
        </div>

      </div>

      {/* 2. Assessment Title & Plain-Language Summary */}
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-bold text-[#08165B] tracking-tight">
          {scenario.title}
        </h3>
        
        <p className="text-sm text-slate-600 leading-relaxed font-normal">
          {scenario.summary}
        </p>
      </div>

      {/* 3. Bulleted Safe Next Steps */}
      <div className="space-y-2.5 pt-1">
        <div className="text-xs font-bold uppercase tracking-wider text-[#08165B]">
          Safe Next Steps:
        </div>
        
        <div className="space-y-2">
          {scenario.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1677E8] shrink-0 mt-2" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Action Buttons (Save, PDF, Share) */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
        
        <div className="flex items-center gap-2">
          {/* Save to Library */}
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/50 text-xs font-medium text-[#08165B] transition-colors cursor-pointer"
          >
            {saved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5 text-[#1677E8]" />}
            <span>{saved ? 'Saved to Library' : 'Save to Library'}</span>
          </button>

          {/* Download PDF / Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/50 text-xs font-medium text-[#08165B] transition-colors cursor-pointer"
            title="Download PDF or Print"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download Summary</span>
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/50 text-xs font-medium text-[#08165B] transition-colors cursor-pointer"
            title="Share via WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share</span>
          </button>
        </div>

        {/* Small Verified Footer Badge */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1677E8]" />
          <span>Grounded in Verified Clinical Research PDFs • No Unverified Advice</span>
        </div>

      </div>

    </div>
  );
}
