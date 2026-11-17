import React from 'react';
import { X, HelpCircle, PhoneCall, ShieldCheck, FileCheck, Stethoscope } from 'lucide-react';

export default function HelpModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0D9488] flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Help & Clinical Guidelines</h3>
              <p className="text-[11px] text-slate-400">GlobalHealthAI Educational Platform</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
          
          {/* Emergency Alert Box */}
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-red-800">
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>Immediate Medical Emergencies</span>
            </div>
            <p className="text-[11px] text-red-700 leading-normal">
              If experiencing crushing chest pain, sudden difficulty breathing, slurred speech, or heavy uncontrolled bleeding, call <strong>102 / 108 / 112</strong> immediately.
            </p>
          </div>

          {/* Clinical Architecture */}
          <div className="space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>How GlobalHealthAI Evaluates Symptoms</span>
            </div>
            <p>
              Our system compares user-described health symptoms against 1,000 clinically reviewed cards and peer-reviewed research PDFs uploaded through the Admin Portal.
            </p>
          </div>

          {/* Privacy Guarantee */}
          <div className="space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Privacy & Confidentiality</span>
            </div>
            <p>
              Your personal symptom queries and generated reports are stored privately in your browser session and are never commercialized.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
}
