import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, BookOpen, AlertCircle } from 'lucide-react';

export const DISCLAIMER_VERSION = '1.0';

export default function DisclaimerModal({ onAccept }) {
  const [agreed, setAgreed] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleConfirm = () => {
    if (!agreed) {
      setHasError(true);
      return;
    }
    const auditRecord = {
      version: DISCLAIMER_VERSION,
      acceptedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem('healthsakhi_disclaimer_accepted', JSON.stringify(auditRecord));
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
    if (onAccept) onAccept(auditRecord);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-blue-100 p-6 sm:p-8 space-y-5 text-slate-800">
        
        {/* Header with Emblem */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0 shadow-xs">
            <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#08165B] tracking-tight">
              Educational Library Disclaimer
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              GlobalHealthAI / HealthSakhi • V1.0 Compliance Agreement
            </p>
          </div>
        </div>

        {/* Disclaimer Text Container */}
        <div className="max-h-64 overflow-y-auto pr-2 space-y-3 text-xs leading-relaxed text-slate-600 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
          <p className="font-semibold text-[#08165B]">
            Welcome to the GlobalHealthAI educational digital library. Before exploring our collection of wellness e-books, please carefully read and acknowledge the following terms:
          </p>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#F04B0A]">•</span>
              <span>
                <strong>Purely Educational:</strong> All books, chapters, and audio recordings provided on this platform are for general health education, literacy, and wellness awareness only.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#F04B0A]">•</span>
              <span>
                <strong>Not Medical Advice:</strong> HealthSakhi does not provide clinical diagnoses, personalized medical opinions, treatment protocols, or prescriptions.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#F04B0A]">•</span>
              <span>
                <strong>Consult Your Doctor:</strong> Always consult a qualified, registered medical practitioner for any health concerns or symptoms. Never disregard professional clinical advice based on information in these books.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#F04B0A]">•</span>
              <span>
                <strong>Emergency Notice:</strong> If you believe you or a family member are experiencing a medical emergency, immediately contact your local emergency number or proceed to the nearest hospital emergency department.
              </span>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (hasError) setHasError(false);
              }}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#F04B0A] focus:ring-[#F04B0A]/30 cursor-pointer accent-[#F04B0A]"
            />
            <span className="text-xs font-semibold text-slate-700 leading-normal">
              I have read, understood, and accept that this platform is strictly an educational e-book library and does not substitute for professional medical care.
            </span>
          </label>
        </div>

        {hasError && (
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>Please check the box above to acknowledge the educational disclaimer.</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#F04B0A] via-[#f75e23] to-[#F04B0A] hover:from-[#c2410c] hover:to-[#9a3412] text-white font-bold text-sm shadow-[0_8px_20px_rgba(240,75,10,0.35)] hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Accept & Enter Library</span>
          </button>
        </div>

      </div>
    </div>
  );
}
