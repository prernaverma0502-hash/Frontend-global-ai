import React, { useState } from 'react';
import {
  Play,
  MessageSquare,
  ClipboardList,
  BookOpen,
  ClipboardCheck,
  UserCheck,
  Share2
} from 'lucide-react';

export default function MiddleRow() {
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: 'Ask Your Symptom',
      cardBg: 'bg-gradient-to-b from-[#cce5ff] to-[#b3d7ff] dark:from-[#0d2149] dark:to-[#081530]',
      cardBorder: 'border-blue-300 dark:border-blue-800/60',
      iconColor: 'text-[#1d6fd8]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1d6fd8] dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="13" x2="13" y2="13" />
        </svg>
      )
    },
    {
      title: 'Answer a Few Relevant Questions',
      cardBg: 'bg-gradient-to-b from-[#cce5ff] to-[#b3d7ff] dark:from-[#0d2149] dark:to-[#081530]',
      cardBorder: 'border-blue-300 dark:border-blue-800/60',
      iconColor: 'text-[#1d6fd8]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1d6fd8] dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="M9 12l2 2 4-4" />
          <path d="M9 17l2 2 4-4" />
        </svg>
      )
    },
    {
      title: 'See Your Result (Red / Yellow / Green)',
      cardBg: 'bg-gradient-to-b from-[#ffe6d0] to-[#ffd4b3] dark:from-[#331808] dark:to-[#1c0d04]',
      cardBorder: 'border-orange-300 dark:border-orange-800/60',
      icon: (
        <div className="flex flex-col items-center gap-0.5 bg-slate-900 px-1 py-1 rounded-sm w-4 h-7 justify-center shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
          <span className="w-2 h-2 rounded-full bg-[#facc15]"></span>
          <span className="w-2 h-2 rounded-full bg-[#22c55e]"></span>
        </div>
      )
    },
    {
      title: 'Get a Clear Explanation (≈ 100 words)',
      cardBg: 'bg-gradient-to-b from-[#d4f7dc] to-[#bbf0c8] dark:from-[#0c2918] dark:to-[#06170d]',
      cardBorder: 'border-emerald-300 dark:border-emerald-800/60',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#16a34a] dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      )
    },
    {
      title: 'Know More (Details & Practical Tips)',
      cardBg: 'bg-gradient-to-b from-[#fff0be] to-[#ffe599] dark:from-[#332408] dark:to-[#1c1404]',
      cardBorder: 'border-amber-300 dark:border-amber-800/60',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#d97706] dark:text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <line x1="12" y1="11" x2="12" y2="17" />
          <line x1="9" y1="14" x2="15" y2="14" />
        </svg>
      )
    },
    {
      title: 'Doctor Summary (English)',
      cardBg: 'bg-gradient-to-b from-[#cce5ff] to-[#b3d7ff] dark:from-[#0d2149] dark:to-[#081530]',
      cardBorder: 'border-blue-300 dark:border-blue-800/60',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1d6fd8] dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    },
    {
      title: 'Pharmacist Question Sheet',
      cardBg: 'bg-gradient-to-b from-[#f5d7fd] to-[#ebbcfb] dark:from-[#2e0e3b] dark:to-[#17071e]',
      cardBorder: 'border-purple-300 dark:border-purple-800/60',
      icon: (
        <div className="w-6 h-6 border-2 border-[#a855f7] dark:border-purple-400 rounded-md flex items-center justify-center">
          <span className="text-xs font-black text-[#a855f7] dark:text-purple-400 leading-none">℞</span>
        </div>
      )
    },
    {
      title: 'Share (WhatsApp / Family)',
      cardBg: 'bg-gradient-to-b from-[#d4f7dc] to-[#bbf0c8] dark:from-[#0c2918] dark:to-[#06170d]',
      cardBorder: 'border-emerald-300 dark:border-emerald-800/60',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#16a34a] dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      )
    }
  ];

  return (
    <section id="founder" className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 py-4 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        
        {/* Left Column (approx 34% width): A Message from the Founder */}
        <div className="lg:col-span-4 flex flex-col">
          <h3 className="text-sm sm:text-[15px] font-bold text-[#0c2340] dark:text-white mb-1.5 tracking-tight">
            A Message from the Founder
          </h3>

          <div className="flex-1 bg-[#ebf4fd] dark:bg-[#0F1C36] border border-blue-200/90 dark:border-slate-800 rounded-2xl p-3 flex items-center gap-3 shadow-2xs">
            
            {/* Founder Image with Play Button */}
            <div className="relative w-20 sm:w-24 h-20 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-xs border border-white dark:border-slate-700">
              <img
                src="/assets/founder-video.jpg"
                alt="Dr Pratap Madhukar"
                className="w-full h-full object-cover"
              />
              
              {/* Play Button Overlay */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 m-auto w-7 h-7 rounded-full bg-[#ea580c] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                aria-label="Play Founder Message"
              >
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </button>
            </div>

            {/* Founder Quote */}
            <div className="flex-1 flex flex-col justify-between h-full py-0.5">
              <div>
                <span className="text-[#1d6fd8] dark:text-blue-400 text-xl font-serif leading-none block -mb-1">““</span>
                <p className="text-[10px] sm:text-[10.5px] italic text-[#1e293b] dark:text-slate-200 leading-tight font-medium">
                  My goal is to help people understand their symptoms with clarity, clinical perspective and practical guidance, so they can take timely, appropriate care and make better health decisions.
                </p>
              </div>
              
              <div className="text-right text-[10.5px] font-bold text-[#0c2340] dark:text-white mt-1">
                — Dr Pratap Madhukar
              </div>
            </div>

          </div>
        </div>

        {/* Right Column (approx 66% width): How GlobalHealthAI Helps You (Clinical Protocols for Doctors) */}
        <div id="for-doctors" className="lg:col-span-8 flex flex-col scroll-mt-20">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-sm sm:text-[15px] font-bold text-[#0c2340] dark:text-white tracking-tight">
              How GlobalHealthAI Helps You & Healthcare Providers
            </h3>
            <span className="text-[10px] font-semibold text-[#1677E8] dark:text-blue-400 lg:hidden flex items-center gap-1">
              <span>Scroll steps</span> →
            </span>
          </div>

          <div className="flex-1 bg-[#f4f9ff] dark:bg-[#0F1C36] border border-blue-200/90 dark:border-slate-800 rounded-2xl p-2 sm:p-2.5 flex items-center shadow-2xs overflow-hidden">
            {/* Responsive steps: smooth horizontal swipe on mobile/tablet, fits 8 columns across desktop */}
            <div className="flex items-center w-full gap-1.5 sm:gap-2 overflow-x-auto pb-1 lg:overflow-x-visible lg:justify-between lg:gap-0.5">
              {steps.map((item, idx) => (
                <React.Fragment key={idx}>
                  {/* Step Card matching reference image colors and padding */}
                  <div
                    className={`w-[102px] sm:w-[110px] lg:w-auto lg:flex-1 shrink-0 lg:shrink min-w-[96px] lg:min-w-0 ${item.cardBg} border ${item.cardBorder} rounded-xl p-1.5 flex flex-col items-center justify-start text-center shadow-2xs hover:shadow-sm transition-all h-[108px] sm:h-[110px]`}
                  >
                    {/* Icon container */}
                    <div className="h-7 sm:h-8 flex items-center justify-center mb-1 shrink-0">
                      {item.icon}
                    </div>

                    {/* Full Text without truncation, wrapping cleanly */}
                    <div className="text-[9.5px] sm:text-[9.5px] lg:text-[10px] font-bold text-[#0c2340] dark:text-white leading-[1.2] text-center px-0.5">
                      {item.title}
                    </div>
                  </div>

                  {/* Red Connecting Arrow */}
                  {idx < steps.length - 1 && (
                    <span className="text-[#ef4444] font-bold text-[10px] sm:text-xs shrink-0 select-none px-0.5">
                      →
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Video Modal Preview if clicked */}
      {isPlaying && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setIsPlaying(false)}
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-3">
            <h4 className="text-base font-bold text-slate-900">Dr Pratap Madhukar – Clinical Overview</h4>
            <p className="text-xs text-slate-600">
              Founder message briefing on safe symptom education, early red-flag detection, and 38 years of clinical insight.
            </p>
            <button
              onClick={() => setIsPlaying(false)}
              className="px-4 py-1.5 bg-[#ea580c] text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
