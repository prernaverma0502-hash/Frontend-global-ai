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
      className="relative w-full bg-[#f3f8fd] dark:bg-[#080D1A] pt-3 sm:pt-4 pb-0 transition-colors duration-200"
    >
      {/* Centered Main Container: Aligned 1:1 with Header, Search Bar & Category Cards */}
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
        
        {/* Contained Hero Card: No bottom border or bottom shadow to eliminate visible divider line */}
        <div className="relative w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl rounded-b-none border-t border-x border-b-0 border-blue-100/70 dark:border-slate-800/70 bg-[#eef7ff] dark:bg-[#080D1A]">
          
          {/* ========================================================
              1. DEDICATED MOBILE HERO LAYOUT (VIEWPORTS < 640px)
              Guarantees ZERO text overlap on Dr. Pratap Madhukar's face
              ======================================================== */}
          <div className="block sm:hidden px-3.5 py-4 space-y-3.5">
            {/* Mobile Branding & Headlines */}
            <div>
              <div className="flex items-center leading-none mb-1.5">
                <span className="text-2xl font-black text-[#08165B] dark:text-white tracking-tight">
                  GlobalHealth
                </span>
                <span className="text-2xl font-black text-[#F04B0A] tracking-tight">
                  AI
                </span>
                <span className="text-xs font-bold text-[#F04B0A] ml-1 align-super">™</span>
              </div>

              <h1 className="text-base font-black text-[#08165B] dark:text-white tracking-tight leading-snug">
                Know Your Symptoms. Understand the Possibilities.
              </h1>
              <h2 className="text-base font-black tracking-tight leading-snug mb-2">
                <span className="text-[#F04B0A]">Recognise Danger.</span>{' '}
                <span className="text-[#08165B] dark:text-white">Take the Next Safe Step.</span>
              </h2>

              <p className="text-[12px] text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                A physician-curated, AI-powered symptom education platform with 1,000 clinically reviewed cards from 38 years of experience. Clear, practical and reliable guidance for you and your family.
              </p>
            </div>

            {/* Dedicated Doctor Showcase Frame: Sharp 4K visual with Dr. Pratap Madhukar completely unobstructed */}
            <div className="relative w-full h-[180px] xs:h-[200px] rounded-2xl overflow-hidden border border-blue-200/80 dark:border-slate-700/80 shadow-xs bg-[#dbeafe] dark:bg-slate-900">
              <img
                src="/assets/hero-banner-clean-4k.jpg"
                alt="Dr Pratap Madhukar - GlobalHealthAI Panoramic Hero"
                className="w-full h-full object-cover [object-position:84%_center]"
                style={{ imageRendering: 'auto' }}
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Doctor Badge cleanly anchored inside frame with ZERO text overlapping his face */}
              <div className="absolute left-2.5 bottom-2.5 right-2.5 z-10">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/95 dark:bg-[#0F1C36]/95 backdrop-blur-md border border-[#D6E6FA] dark:border-slate-700 shadow-md">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#08165B] to-[#1677E8] text-white flex items-center justify-center shadow-xs shrink-0">
                    <Stethoscope className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="text-left leading-tight min-w-0">
                    <div className="text-[11.5px] font-black text-[#08165B] dark:text-white truncate">
                      Dr Pratap Madhukar
                    </div>
                    <div className="text-[9.5px] font-semibold text-[#1677E8] dark:text-blue-400 truncate">
                      Physician • Clinical Editor
                    </div>
                    <div className="text-[8.5px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>38 Years of Experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Feature Badges: Horizontal swipeable strip on mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 p-2 rounded-xl bg-white/95 dark:bg-[#0F1C36]/95 backdrop-blur-md border border-[#D6E6FA] dark:border-slate-700 shadow-2xs min-w-[145px] shrink-0"
                  >
                    <div className="w-6 h-6 rounded-full border border-[#F04B0A] flex items-center justify-center text-[#F04B0A] shrink-0 bg-orange-50/70 dark:bg-orange-950/50">
                      <Icon className="w-3 h-3 stroke-[2.2]" />
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
          </div>

          {/* ========================================================
              2. DESKTOP & TABLET HERO LAYOUT (VIEWPORTS >= 640px)
              Panoramic side-by-side with continuous gradient veil
              ======================================================== */}
          <div className="hidden sm:flex relative w-full min-h-[365px] md:min-h-[375px] lg:min-h-[385px] xl:min-h-[395px] items-center">
            
            {/* Background Image: Sharp, crisp rendering locked to natural scale without stretching or blur */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
              <img
                src="/assets/hero-banner-clean-4k.jpg"
                alt="GlobalHealthAI - Dr Pratap Madhukar Panoramic Hero"
                className="w-full h-full object-cover [object-position:85%_center] md:[object-position:88%_center] lg:[object-position:right_center]"
                style={{ imageRendering: 'auto' }}
                loading="eager"
                fetchPriority="high"
              />
            </div>

            {/* Seamless horizontal gradient veil: Fades continuously from high contrast on left to 100% transparent on right with ZERO vertical lines or hard edges */}
            <div className="absolute inset-0 w-full h-full pointer-events-none [background-image:linear-gradient(to_right,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.85)_32%,rgba(255,255,255,0.35)_52%,transparent_72%)] dark:[background-image:linear-gradient(to_right,rgba(8,13,26,0.97)_0%,rgba(8,13,26,0.85)_32%,rgba(8,13,26,0.35)_52%,transparent_72%)]"></div>

            {/* Seamless bottom fade: smoothly transitions the hero image into the search bar background without any hard line or divider */}
            <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-[#f3f8fd] dark:from-[#080D1A] via-[#f3f8fd]/70 dark:via-[#080D1A]/70 to-transparent pointer-events-none z-10"></div>

            {/* Hero Content Layer */}
            <div className="relative w-full px-5 sm:px-7 lg:px-9 xl:px-11 pt-6 lg:pt-7 pb-12 lg:pb-14 z-10 flex flex-col justify-between h-full">
              
              {/* Left Side: Typography & Branding */}
              <div className="max-w-[560px] lg:max-w-[620px] xl:max-w-[680px]">
                
                {/* Logo: GlobalHealthAI™ */}
                <div className="flex items-center leading-none mb-2.5">
                  <span className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#08165B] dark:text-white tracking-tight">
                    GlobalHealth
                  </span>
                  <span className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#F04B0A] tracking-tight">
                    AI
                  </span>
                  <span className="text-xs sm:text-base font-bold text-[#F04B0A] ml-1 align-super">™</span>
                </div>

                {/* Headline */}
                <h1 className="text-lg sm:text-xl lg:text-[23px] xl:text-[25px] font-black text-[#08165B] dark:text-white tracking-tight leading-snug">
                  Know Your Symptoms. Understand the Possibilities.
                </h1>
                <h2 className="text-lg sm:text-xl lg:text-[23px] xl:text-[25px] font-black tracking-tight leading-snug mb-2 sm:mb-2.5">
                  <span className="text-[#F04B0A]">Recognise Danger.</span>{' '}
                  <span className="text-[#08165B] dark:text-white">Take the Next Safe Step.</span>
                </h2>

                {/* Subtext */}
                <p className="text-xs sm:text-[13px] lg:text-[13.5px] text-slate-700 dark:text-slate-200 font-medium leading-relaxed max-w-[560px] mb-3.5 sm:mb-4.5">
                  A physician-curated, AI-powered symptom education platform with 1,000 clinically reviewed cards from 38 years of experience. Clear, practical and reliable guidance for you and your family.
                </p>
              </div>

              {/* Badges & Doctor Card Area */}
              <div className="max-w-[700px] xl:max-w-[760px]">

                {/* 5 Feature Badges (Bottom-Left Row): Clean responsive grid on tablet/desktop */}
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                  {highlights.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl bg-white/95 dark:bg-[#0F1C36]/95 backdrop-blur-md border border-[#D6E6FA] dark:border-slate-700 shadow-2xs hover:shadow-xs transition-all duration-200"
                      >
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#F04B0A] flex items-center justify-center text-[#F04B0A] shrink-0 bg-orange-50/70 dark:bg-orange-950/50">
                          <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.2]" />
                        </div>

                        <div className="min-w-0 leading-tight">
                          <div className="text-[9.5px] sm:text-[10px] font-black text-[#08165B] dark:text-white leading-tight line-clamp-1">
                            {item.title}
                          </div>
                          <div className="text-[8px] sm:text-[8.5px] text-slate-600 dark:text-slate-300 font-medium leading-tight line-clamp-2">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Doctor Info Card: Anchored directly over the doctor's lower torso inside the hero card */}
                <div className="absolute right-5 md:right-7 lg:right-9 bottom-5 md:bottom-6 z-20">
                  <div className="flex items-center gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-[#0F1C36]/95 backdrop-blur-md border border-[#D6E6FA] dark:border-slate-700 shadow-md sm:shadow-lg hover:shadow-xl transition-all">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#08165B] to-[#1677E8] text-white flex items-center justify-center shadow-xs shrink-0">
                      <Stethoscope className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left leading-tight">
                      <div className="text-xs sm:text-[13px] font-black text-[#08165B] dark:text-white">
                        Dr Pratap Madhukar
                      </div>
                      <div className="text-[10px] sm:text-[10.5px] font-semibold text-[#1677E8] dark:text-blue-400 mt-0.5">
                        Physician • Clinical Editor
                      </div>
                      <div className="text-[8.5px] sm:text-[9px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>38 Years of Experience</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
