import React from 'react';
import {
  Siren,
  Clock,
  CheckCircle2,
  ClipboardCheck,
  HeartPulse,
  Apple,
  Calculator,
  CalendarCheck,
  BarChart3,
  GraduationCap
} from 'lucide-react';

export default function BottomRow() {
  const tools = [
    {
      title: 'My Symptoms Checker',
      icon: ClipboardCheck,
      color: 'text-[#1d6fd8]'
    },
    {
      title: 'Risk Checkers',
      icon: HeartPulse,
      color: 'text-[#dc2626]'
    },
    {
      title: 'Daily Health Tips',
      icon: Apple,
      color: 'text-[#16a34a]'
    },
    {
      title: 'BMI & Health Tools',
      icon: Calculator,
      color: 'text-[#9333ea]'
    },
    {
      title: 'Care Reminders',
      icon: CalendarCheck,
      color: 'text-[#ea580c]'
    },
    {
      title: 'Health Trackers',
      icon: BarChart3,
      color: 'text-[#0284c7]'
    },
    {
      title: 'Caregiver Resources',
      icon: GraduationCap,
      color: 'text-[#2563eb]'
    }
  ];

  return (
    <section id="resources" className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 py-2.5 pb-8 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        
        {/* Left Column (6 of 12 cols): The Red – Yellow – Green Guide */}
        <div id="for-pharmacists" className="lg:col-span-6 flex flex-col scroll-mt-20">
          <h3 className="text-sm sm:text-[15px] font-bold text-[#0c2340] dark:text-white mb-1.5 tracking-tight">
            The Red – Yellow – Green Guide
          </h3>

          <div className="flex-1 bg-[#ebf4fd] dark:bg-[#0F1C36] border border-blue-200/90 dark:border-slate-800 rounded-2xl p-2 sm:p-2.5 flex items-stretch shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
              {/* Red Card */}
              <div className="bg-white dark:bg-[#0B132B] rounded-xl p-2.5 sm:p-2 border border-red-100 dark:border-red-900/40 flex items-start sm:flex-col sm:justify-between gap-2.5 sm:gap-0 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 mb-0 sm:mb-1.5 shadow-2xs">
                  <Siren className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-[11.5px] font-bold text-[#dc2626] dark:text-red-400 leading-tight mb-0.5 sm:mb-1">
                    Red – Emergency Now
                  </h4>
                  <p className="text-[10px] sm:text-[9.5px] text-slate-600 dark:text-slate-300 leading-tight">
                    Possible serious condition. Seek urgent medical care immediately.
                  </p>
                </div>
              </div>

              {/* Yellow Card */}
              <div className="bg-white dark:bg-[#0B132B] rounded-xl p-2.5 sm:p-2 border border-amber-100 dark:border-amber-900/40 flex items-start sm:flex-col sm:justify-between gap-2.5 sm:gap-0 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mb-0 sm:mb-1.5 shadow-2xs">
                  <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-[11.5px] font-bold text-[#b45309] dark:text-amber-400 leading-tight mb-0.5 sm:mb-1">
                    Yellow – See a Doctor Soon
                  </h4>
                  <p className="text-[10px] sm:text-[9.5px] text-slate-600 dark:text-slate-300 leading-tight">
                    Medical assessment is needed, usually today or within 24-48 hours (as per the symptom card).
                  </p>
                </div>
              </div>

              {/* Green Card */}
              <div className="bg-white dark:bg-[#0B132B] rounded-xl p-2.5 sm:p-2 border border-emerald-100 dark:border-emerald-900/40 flex items-start sm:flex-col sm:justify-between gap-2.5 sm:gap-0 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mb-0 sm:mb-1.5 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-[11.5px] font-bold text-[#15803d] dark:text-emerald-400 leading-tight mb-0.5 sm:mb-1">
                    Green – Not Urgent
                  </h4>
                  <p className="text-[10px] sm:text-[9.5px] text-slate-600 dark:text-slate-300 leading-tight">
                    Self-care may be reasonable. Follow the suggested steps and watch for warning signs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (6 of 12 cols): Popular Health Tools */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-sm sm:text-[15px] font-bold text-[#0c2340] dark:text-white tracking-tight">
              Popular Health Tools
            </h3>
            <span className="text-[10px] font-semibold text-[#1677E8] dark:text-blue-400 lg:hidden flex items-center gap-1">
              <span>Scroll tools</span> →
            </span>
          </div>

          <div className="flex-1 bg-[#ebf4fd] dark:bg-[#0F1C36] border border-blue-200/90 dark:border-slate-800 rounded-2xl p-2 sm:p-2.5 flex items-center shadow-2xs overflow-hidden">
            {/* 7 tools: swipeable on mobile/tablet, seamless 7-col grid on desktop */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-7 lg:gap-1.5 w-full">
              {tools.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="w-[88px] sm:w-[94px] lg:w-auto shrink-0 lg:shrink flex flex-col items-center justify-center p-1.5 bg-white dark:bg-[#0B132B] rounded-xl border border-blue-100 dark:border-slate-800 shadow-2xs h-[92px] text-center hover:border-blue-300 dark:hover:border-blue-500 transition-colors cursor-pointer group"
                  >
                    <div className="h-6 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <Icon className={`w-5 h-5 ${item.color} stroke-[2]`} />
                    </div>
                    <div className="text-[9px] sm:text-[8.5px] font-bold text-[#0c2340] dark:text-white leading-tight line-clamp-2 px-0.5">
                      {item.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
