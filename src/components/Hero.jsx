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
      className="relative w-full overflow-hidden bg-[#eef7ff] dark:bg-[#080D1A] border-b border-blue-100/60 dark:border-slate-800 flex items-center justify-center min-h-[460px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[580px] xl:min-h-[620px] 2xl:min-h-[660px]"
    >
      {/* Centered bounded background layer so doctor is never cropped on ultra-wide screens */}
      <div className="absolute inset-0 w-full h-full max-w-[2000px] mx-auto overflow-hidden pointer-events-none select-none">
        <img
          src="/assets/hero-banner-clean-4k.jpg"
          alt="GlobalHealthAI - Dr Pratap Madhukar Panoramic Hero"
          className="w-full h-full object-cover [object-position:82%_top] sm:[object-position:86%_top] md:[object-position:88%_top] lg:[object-position:right_top]"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Subtle left-to-right white gradient overlay for high contrast text readability on desktop */}
      <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-white/95 via-white/80 to-transparent dark:from-[#080D1A]/95 dark:via-[#080D1A]/85 max-w-[900px] pointer-events-none"></div>

      {/* Mobile readability veil: crisp text on left, doctor clearly visible on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent/30 dark:from-[#080D1A]/95 dark:via-[#080D1A]/85 sm:hidden pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative max-w-[1440px] 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-10 lg:py-12 z-10 flex flex-col justify-between h-full">
        
        {/* Left Side: Typography & Branding */}
        <div className="max-w-[68%] xs:max-w-[64%] sm:max-w-[620px] lg:max-w-[700px] xl:max-w-[740px]">
          
          {/* Logo: GlobalHealthAI™ */}
          <div className="flex items-center leading-none mb-2 sm:mb-3">
            <span className="text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] font-black text-[#08165B] dark:text-white tracking-tight">
              GlobalHealth
            </span>
            <span className="text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] font-black text-[#F04B0A] tracking-tight">
              AI
            </span>
            <span className="text-sm sm:text-lg font-bold text-[#F04B0A] ml-1 align-super">™</span>
          </div>

          {/* Headline */}
          <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-[27px] xl:text-[29px] font-black text-[#08165B] dark:text-white tracking-tight leading-snug">
            Know Your Symptoms. Understand the Possibilities.
          </h1>
          <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-[27px] xl:text-[29px] font-black tracking-tight leading-snug mb-2 sm:mb-3">
            <span className="text-[#F04B0A]">Recognise Danger.</span>{' '}
            <span className="text-[#08165B] dark:text-white">Take the Next Safe Step.</span>
          </h2>

          {/* Subtext */}
          <p className="text-xs sm:text-[13.5px] lg:text-[14px] text-slate-700 dark:text-slate-200 font-medium leading-relaxed max-w-[620px] mb-4 sm:mb-6">
            A physician-curated, AI-powered symptom education platform with 1,000 clinically reviewed cards from 38 years of experience. Clear, practical and reliable guidance for you and your family.
          </p>
        </div>

        {/* Badges & Doctor Card Area */}
        <div className="max-w-[740px] xl:max-w-[820px]">

          {/* 5 Feature Badges (Bottom-Left Row): Smooth horizontal swipe on mobile, clean responsive grid on tablet/desktop */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:overflow-x-visible scrollbar-none">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/95 dark:bg-[#0F1C36]/95 backdrop-blur-md border border-[#D6E6FA] dark:border-slate-700 shadow-xs hover:shadow-md transition-all duration-200 min-w-[145px] sm:min-w-0 shrink-0 sm:shrink"
                >
                  {/* Orange Outline Circle Icon */}
                  <div className="w-7 h-7 rounded-full border border-[#F04B0A] flex items-center justify-center text-[#F04B0A] shrink-0 bg-orange-50/70 dark:bg-orange-950/50">
                    <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>

                  <div className="min-w-0 leading-tight">
                    <div className="text-[10px] font-black text-[#08165B] dark:text-white leading-tight line-clamp-1">
                      {item.title}
                    </div>
                    <div className="text-[8.5px] text-slate-600 dark:text-slate-300 font-medium leading-tight line-clamp-2">
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Doctor Info Card */}
          <div className="mt-3.5 sm:mt-0 sm:absolute sm:right-6 md:right-8 lg:right-12 sm:bottom-4 md:bottom-6 lg:bottom-8 z-20 w-full sm:w-auto">
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-[#0F1C36]/95 backdrop-blur-md border border-[#D6E6FA] dark:border-slate-700 shadow-md sm:shadow-xl hover:shadow-2xl transition-all max-w-[320px] sm:max-w-none">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#08165B] to-[#1677E8] text-white flex items-center justify-center shadow-xs shrink-0">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-[13px] font-black text-[#08165B] dark:text-white">
                  Dr Pratap Madhukar
                </div>
                <div className="text-[10.5px] font-semibold text-[#1677E8] dark:text-blue-400 mt-0.5">
                  Physician • Clinical Editor
                </div>
                <div className="text-[9.5px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-0.5">
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
