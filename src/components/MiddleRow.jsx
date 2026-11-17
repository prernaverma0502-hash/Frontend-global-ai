import React, { useState } from 'react';
import {
  Play,
  Quote,
  MessageSquare,
  ClipboardList,
  BookOpen,
  ClipboardCheck,
  UserCheck,
  FileSpreadsheet,
  Share2
} from 'lucide-react';

export default function MiddleRow() {
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: 'Ask Your Symptom',
      icon: MessageSquare,
      iconColor: 'text-[#1d6fd8]'
    },
    {
      title: 'Answer a Few Relevant Questions',
      icon: ClipboardList,
      iconColor: 'text-[#1d6fd8]'
    },
    {
      title: 'See Your Result (Red / Yellow / Green)',
      // Traffic light custom icon
      customIcon: (
        <div className="flex flex-col items-center gap-0.5 bg-slate-800 p-1 rounded-sm w-4 h-9 justify-center">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>
      )
    },
    {
      title: 'Get a Clear Explanation (≈ 100 words)',
      icon: BookOpen,
      iconColor: 'text-[#16a34a]'
    },
    {
      title: 'Know More (Details & Practical Tips)',
      icon: ClipboardCheck,
      iconColor: 'text-[#d97706]'
    },
    {
      title: 'Doctor Summary (English)',
      icon: UserCheck,
      iconColor: 'text-[#1d6fd8]'
    },
    {
      title: 'Pharmacist Question Sheet',
      customIcon: (
        <span className="text-sm font-black text-[#9333ea] leading-none">℞</span>
      )
    },
    {
      title: 'Share (WhatsApp / Family)',
      icon: Share2,
      iconColor: 'text-[#16a34a]'
    }
  ];

  return (
    <section id="founder" className="max-w-[1360px] mx-auto px-4 sm:px-6 py-3">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        
        {/* Left Column (5 of 12 cols): A Message from the Founder */}
        <div className="lg:col-span-4 flex flex-col">
          <h3 className="text-sm sm:text-[15px] font-bold text-[#0c2340] mb-1.5 tracking-tight">
            A Message from the Founder
          </h3>

          <div className="flex-1 bg-[#ebf4fd] border border-blue-200/90 rounded-2xl p-2.5 flex items-center gap-3 shadow-2xs">
            
            {/* Founder Image with Play Button */}
            <div className="relative w-24 sm:w-28 h-24 sm:h-28 rounded-xl overflow-hidden shrink-0 shadow-xs border border-white">
              <img
                src="/assets/founder-video.jpg"
                alt="Dr Pratap Madhukar"
                className="w-full h-full object-cover"
              />
              
              {/* Play Button Overlay */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-[#ea580c] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                aria-label="Play Founder Message"
              >
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </button>
            </div>

            {/* Founder Quote */}
            <div className="flex-1 flex flex-col justify-between h-full py-0.5">
              <div>
                <span className="text-[#1d6fd8] text-2xl font-serif leading-none block -mb-1">““</span>
                <p className="text-[10px] sm:text-[10.5px] italic text-[#1e293b] leading-tight font-medium">
                  My goal is to help people understand their symptoms with clarity, clinical perspective and practical guidance, so they can take timely, appropriate care and make better health decisions.
                </p>
              </div>
              
              <div className="text-right text-[10.5px] font-bold text-[#0c2340] mt-1">
                — Dr Pratap Madhukar
              </div>
            </div>

          </div>
        </div>

        {/* Right Column (7 of 12 cols): How GlobalHealthAI Helps You */}
        <div className="lg:col-span-8 flex flex-col">
          <h3 className="text-sm sm:text-[15px] font-bold text-[#0c2340] mb-1.5 tracking-tight">
            How GlobalHealthAI Helps You
          </h3>

          <div className="flex-1 bg-[#ebf4fd] border border-blue-200/90 rounded-2xl p-2.5 flex items-center shadow-2xs overflow-x-auto">
            <div className="flex items-center justify-between w-full min-w-[620px] gap-1">
              {steps.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <React.Fragment key={idx}>
                    {/* Step Card */}
                    <div className="flex-1 flex flex-col items-center justify-center p-1.5 bg-white rounded-xl border border-blue-100 shadow-2xs h-24 text-center">
                      <div className="h-8 flex items-center justify-center mb-1">
                        {item.customIcon ? (
                          item.customIcon
                        ) : (
                          <Icon className={`w-5 h-5 ${item.iconColor} stroke-[2]`} />
                        )}
                      </div>
                      <div className="text-[8.5px] sm:text-[9px] font-bold text-[#0c2340] leading-tight">
                        {item.title}
                      </div>
                    </div>

                    {/* Red Connecting Arrow */}
                    {idx < steps.length - 1 && (
                      <span className="text-red-500 font-bold text-xs shrink-0 select-none px-0.5">
                        →
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
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
              className="px-4 py-1.5 bg-[#ea580c] text-white text-xs font-bold rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
