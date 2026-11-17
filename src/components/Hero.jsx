import React from 'react';
import {
  ShieldAlert,
  BookOpen,
  Target,
  Users,
  Globe
} from 'lucide-react';

export default function Hero() {
  const highlights = [
    {
      title: 'Safety First',
      desc: 'Check for Red-Flag Symptoms',
      icon: ShieldAlert
    },
    {
      title: '1,000',
      desc: 'Symptom Cards Clinically Reviewed',
      icon: BookOpen
    },
    {
      title: 'Specific &',
      desc: 'Relevant Answers (≈ 100 words)',
      icon: Target
    },
    {
      title: 'For You, Your',
      desc: 'Family and Caregivers',
      icon: Users
    },
    {
      title: 'English +',
      desc: 'Regional Languages (Marathi, Hindi)',
      icon: Globe
    }
  ];

  return (
    <section id="home" className="relative w-full overflow-hidden bg-gradient-to-r from-[#e6f2fd] via-[#deeffc] to-[#cbe3f7] border-b border-blue-100/60">
      
      {/* Container matching standard max-width */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 min-h-[310px] sm:min-h-[340px] flex items-center justify-between">
        
        {/* Left Content Area (Pure crisp React text, NO ghost background) */}
        <div className="max-w-[700px] z-10 py-5 flex flex-col justify-center">
          
          {/* Main Title: GlobalHealthAI™ */}
          <div className="flex items-center leading-none mb-1">
            <span className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0c2340] tracking-tight">
              GlobalHealth
            </span>
            <span className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#ea580c] tracking-tight">
              AI
            </span>
            <span className="text-base sm:text-lg font-bold text-[#ea580c] ml-1 align-super">™</span>
          </div>

          {/* Sub-headings */}
          <h2 className="text-lg sm:text-[22px] lg:text-[23px] font-bold text-[#0c2340] tracking-tight leading-snug">
            Know Your Symptoms. Understand the Possibilities.
          </h2>
          <h3 className="text-lg sm:text-[22px] lg:text-[23px] font-bold tracking-tight leading-snug mb-2.5">
            <span className="text-[#ea580c]">Recognise Danger.</span>{' '}
            <span className="text-[#0c2340]">Take the Next Safe Step.</span>
          </h3>

          {/* Supporting paragraph */}
          <p className="text-xs sm:text-[13px] text-[#1e293b] leading-relaxed max-w-[620px] mb-4 font-normal">
            A physician-curated, AI-powered symptom education platform with 1,000 clinically reviewed cards from 38 years of experience. Clear, practical and reliable guidance for you and your family.
          </p>

          {/* 5 Feature Highlight Boxes in a single horizontal row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 max-w-[680px]">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 p-1.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow"
                >
                  {/* Orange Outline Circle Icon */}
                  <div className="w-7 h-7 rounded-full border border-[#ea580c] flex items-center justify-center text-[#ea580c] shrink-0 bg-orange-50/50">
                    <Icon className="w-3.5 h-3.5 stroke-[2]" />
                  </div>

                  <div className="leading-tight">
                    <div className="text-[10px] font-bold text-[#0c2340] leading-tight">
                      {item.title}
                    </div>
                    <div className="text-[8.5px] text-slate-600 font-medium leading-tight">
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Area: Doctor Banner (Dr Pratap Madhukar + Mountains & Profile Card) */}
        <div className="relative hidden md:flex items-center justify-end h-full shrink-0">
          <div className="relative h-[290px] sm:h-[320px] overflow-hidden rounded-l-3xl">
            <img
              src="/assets/doctor-banner-final.jpg"
              alt="Dr Pratap Madhukar"
              className="h-full object-cover object-left"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
