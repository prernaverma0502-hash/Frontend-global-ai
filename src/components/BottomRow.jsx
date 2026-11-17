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
    <section className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 py-2.5 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        
        {/* Left Column (6 of 12 cols): The Red – Yellow – Green Guide */}
        <div className="lg:col-span-6 flex flex-col">
          <h3 className="text-sm sm:text-[15px] font-bold text-[#0c2340] mb-1.5 tracking-tight">
            The Red – Yellow – Green Guide
          </h3>

          <div className="flex-1 bg-[#ebf4fd] border border-blue-200/90 rounded-2xl p-2.5 flex items-stretch gap-2 shadow-2xs">
            
            {/* Red Card */}
            <div className="flex-1 bg-white rounded-xl p-2.5 border border-red-100 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mb-1.5 shadow-2xs">
                  <Siren className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <h4 className="text-[11.5px] font-bold text-[#dc2626] leading-tight mb-1">
                  Red – Emergency Now
                </h4>
                <p className="text-[9.5px] text-slate-600 leading-tight">
                  Possible serious condition. Seek urgent medical care immediately.
                </p>
              </div>
            </div>

            {/* Yellow Card */}
            <div className="flex-1 bg-white rounded-xl p-2.5 border border-amber-100 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center mb-1.5 shadow-2xs">
                  <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <h4 className="text-[11.5px] font-bold text-[#b45309] leading-tight mb-1">
                  Yellow – See a Doctor Soon
                </h4>
                <p className="text-[9.5px] text-slate-600 leading-tight">
                  Medical assessment is needed, usually today or within 24-48 hours (as per the symptom card).
                </p>
              </div>
            </div>

            {/* Green Card */}
            <div className="flex-1 bg-white rounded-xl p-2.5 border border-emerald-100 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-1.5 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <h4 className="text-[11.5px] font-bold text-[#15803d] leading-tight mb-1">
                  Green – Not Urgent
                </h4>
                <p className="text-[9.5px] text-slate-600 leading-tight">
                  Self-care may be reasonable. Follow the suggested steps and watch for warning signs.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column (6 of 12 cols): Popular Health Tools */}
        <div className="lg:col-span-6 flex flex-col">
          <h3 className="text-sm sm:text-[15px] font-bold text-[#0c2340] mb-1.5 tracking-tight">
            Popular Health Tools
          </h3>

          <div className="flex-1 bg-[#ebf4fd] border border-blue-200/90 rounded-2xl p-2.5 flex items-center shadow-2xs">
            {/* 7 tools fitting seamlessly across the row with NO scrollbar */}
            <div className="grid grid-cols-7 gap-1.5 w-full">
              {tools.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-1.5 bg-white rounded-xl border border-blue-100 shadow-2xs h-[92px] text-center hover:border-blue-300 transition-colors cursor-pointer group"
                  >
                    <div className="h-6 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <Icon className={`w-5 h-5 ${item.color} stroke-[2]`} />
                    </div>
                    <div className="text-[8.5px] font-bold text-[#0c2340] leading-tight line-clamp-2">
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
