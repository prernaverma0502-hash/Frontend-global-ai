import React from 'react';
import { Globe, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { OFFICIAL_LANGUAGES } from '../../data/healthSakhiData';

export default function LanguageView({
  selectedLanguage,
  setSelectedLanguage,
  onContinue
}) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="border-b border-[#D6E6FA] pb-5 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1677E8] text-xs font-bold border border-blue-200">
          <Globe className="w-3.5 h-3.5 text-[#F04B0A]" />
          <span>Multilingual Library Editions</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#08165B] tracking-tight">
          Select Your Preferred Language
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          HealthSakhi V1 supports 9 approved published editions. English is the source edition, accompanied by professional human-reviewed regional translations.
        </p>
      </div>

      {/* Language Cards Grid (9 Languages) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {OFFICIAL_LANGUAGES.map((lang) => {
          const isSelected = selectedLanguage === lang.id;

          return (
            <div
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 group ${
                isSelected
                  ? 'bg-blue-50/80 border-[#1677E8] shadow-md ring-2 ring-[#1677E8]/20'
                  : 'bg-white hover:bg-slate-50/80 border-[#D6E6FA] shadow-2xs hover:shadow-xs'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-base font-black text-[#08165B] tracking-tight">
                    {lang.native}
                  </span>
                  {lang.dir === 'rtl' && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                      RTL
                    </span>
                  )}
                </div>

                <div className="text-xs font-semibold text-slate-500">
                  {lang.name}
                </div>

                <div className="text-[11px] text-slate-400">
                  {lang.id === 'en' ? 'Source Edition' : 'Published Regional Edition'}
                </div>
              </div>

              {/* Selection Radio Indicator */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? 'border-[#1677E8] bg-[#1677E8] text-white'
                    : 'border-slate-300 group-hover:border-slate-400'
                }`}
              >
                {isSelected && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Multilingual Editorial Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed space-y-1">
        <p className="font-bold text-[#08165B]">
          Clinical Translation Standard:
        </p>
        <p>
          HealthSakhi never uses automated machine translation for medical or health education content. Every regional edition undergoes strict editorial review by bilingual healthcare professionals to preserve clinical nuance and clarity.
        </p>
      </div>

      {/* Return to Library Action */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#08165B] to-[#1677E8] hover:from-[#050e3b] hover:to-[#115fc2] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Continue with Selected Language</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
