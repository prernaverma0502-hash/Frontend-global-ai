import React from 'react';
import {
  ShieldAlert,
  BookOpen,
  Target,
  Users,
  Globe,
  Stethoscope
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
      title: 'Specific & Relevant Answers',
      desc: '(≈ 100 words)',
      icon: Target
    },
    {
      title: 'For You, Your Family',
      desc: 'and Caregivers',
      icon: Users
    },
    {
      title: 'English + Regional Languages',
      desc: '(Marathi, Hindi)',
      icon: Globe
    }
  ];

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-slate-100 border-b border-blue-100/60 min-h-[440px] sm:min-h-[460px] lg:min-h-[490px] xl:min-h-[510px] flex items-center"
      style={{
        backgroundImage: `url('/assets/hero-banner-clean-4k.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: '79% center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* High-priority background image for fast crisp rendering */}
      <img
        src="/assets/hero-banner-clean-4k.jpg"
        alt="GlobalHealthAI - Dr Pratap Madhukar Panoramic Hero"
        className="absolute inset-0 w-full h-full object-cover [object-position:79%_center] sm:[object-position:84%_center] lg:object-right pointer-events-none select-none"
        loading="eager"
        fetchPriority="high"
      />

      {/* Subtle left-to-right white gradient overlay for high contrast text readability on desktop */}
      <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-white/95 via-white/80 to-transparent max-w-[880px] pointer-events-none"></div>
      
      {/* Dark mode overlay */}
      <div className="absolute inset-0 hidden dark:sm:block bg-gradient-to-r from-[#080D1A]/95 via-[#080D1A]/85 to-transparent max-w-[880px] pointer-events-none"></div>

      {/* Mobile readability veil: crisp text on left, doctor clearly visible on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent dark:from-[#080D1A]/95 dark:via-[#080D1A]/60 dark:to-transparent sm:hidden pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9 lg:py-11 z-10 flex flex-col justify-between h-full">
        
        {/* Left Side: Typography & Branding (Restricted to left ~58% on mobile so text NEVER overlaps doctor's face) */}
        <div className="max-w-[56%] xs:max-w-[58%] sm:max-w-[720px]">
          
          {/* Logo: GlobalHealthAI™ */}
          <div className="flex items-center leading-none mb-2.5 sm:mb-3">
            <span className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#08165B] tracking-tight">
              GlobalHealth
            </span>
            <span className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#F04B0A] tracking-tight">
              AI
            </span>
            <span className="text-base sm:text-lg font-bold text-[#F04B0A] ml-1 align-super">™</span>
          </div>

          {/* Headline */}
          <h1 className="text-xl sm:text-2xl lg:text-[27px] xl:text-[29px] font-black text-[#08165B] tracking-tight leading-snug">
            Know Your Symptoms. Understand the Possibilities.
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-[27px] xl:text-[29px] font-black tracking-tight leading-snug mb-2.5 sm:mb-3">
            <span className="text-[#F04B0A]">Recognise Danger.</span>{' '}
            <span className="text-[#08165B]">Take the Next Safe Step.</span>
          </h2>

          {/* Subtext */}
          <p className="text-xs sm:text-[13.5px] lg:text-[14px] text-slate-700 font-medium leading-relaxed max-w-[620px] mb-4 sm:mb-6">
            A physician-curated, AI-powered symptom education platform with 1,000 clinically reviewed cards from 38 years of experience. Clear, practical and reliable guidance for you and your family.
          </p>
        </div>

        {/* Badges & Doctor Card Area */}
        <div className="max-w-[720px]">

          {/* 5 Feature Badges (Bottom-Left Row) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 max-w-[740px] xl:max-w-[780px]">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/95 backdrop-blur-md border border-[#D6E6FA] shadow-xs hover:shadow-md transition-all duration-200"
                >
                  {/* Orange Outline Circle Icon */}
                  <div className="w-7 h-7 rounded-full border border-[#F04B0A] flex items-center justify-center text-[#F04B0A] shrink-0 bg-orange-50/70">
                    <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>

                  <div className="min-w-0 leading-tight">
                    <div className="text-[10px] font-black text-[#08165B] leading-tight line-clamp-1">
                      {item.title}
                    </div>
                    <div className="text-[8.5px] text-slate-600 font-medium leading-tight line-clamp-2">
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Doctor Info Card: In-flow on mobile (so it NEVER overlaps text or search bar), absolute overlay on desktop */}
          <div className="mt-3.5 sm:mt-0 sm:absolute sm:right-8 lg:right-12 sm:bottom-4 lg:bottom-5 z-20 w-full sm:w-auto">
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D6E6FA] shadow-md sm:shadow-xl hover:shadow-2xl transition-all max-w-[340px] sm:max-w-none">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#08165B] to-[#1677E8] text-white flex items-center justify-center shadow-xs shrink-0">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-[13px] font-black text-[#08165B]">
                  Dr Pratap Madhukar
                </div>
                <div className="text-[10.5px] font-semibold text-[#1677E8] mt-0.5">
                  Physician • Clinical Editor
                </div>
                <div className="text-[9.5px] font-bold text-slate-600 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>38 Years of Experience</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
