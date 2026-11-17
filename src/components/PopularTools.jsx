import React from 'react';
import {
  Stethoscope,
  ShieldAlert,
  Sun,
  Scale,
  BellRing,
  Activity,
  HeartHandshake,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function PopularTools() {
  const tools = [
    {
      title: 'My Symptoms Checker',
      desc: 'Interactive guided symptom triage',
      icon: Stethoscope,
      iconColor: 'bg-blue-600 text-white',
      accent: 'hover:border-blue-300'
    },
    {
      title: 'Risk Checkers',
      desc: 'Diabetes, heart & lifestyle risk tools',
      icon: ShieldAlert,
      iconColor: 'bg-amber-500 text-white',
      accent: 'hover:border-amber-300'
    },
    {
      title: 'Daily Health Tips',
      desc: 'Clinician advice for everyday wellness',
      icon: Sun,
      iconColor: 'bg-emerald-500 text-white',
      accent: 'hover:border-emerald-300'
    },
    {
      title: 'BMI & Health Tools',
      desc: 'Calculators, ideal weight & metabolic health',
      icon: Scale,
      iconColor: 'bg-purple-600 text-white',
      accent: 'hover:border-purple-300'
    },
    {
      title: 'Care Reminders',
      desc: 'Medication alerts & check-up schedule',
      icon: BellRing,
      iconColor: 'bg-rose-500 text-white',
      accent: 'hover:border-rose-300'
    },
    {
      title: 'Health Trackers',
      desc: 'BP, blood sugar & vitals logs',
      icon: Activity,
      iconColor: 'bg-cyan-600 text-white',
      accent: 'hover:border-cyan-300'
    },
    {
      title: 'Caregiver Resources',
      desc: 'Practical guides for supporting loved ones',
      icon: HeartHandshake,
      iconColor: 'bg-indigo-600 text-white',
      accent: 'hover:border-indigo-300'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Clinical Utilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Health Tools
            </h2>
          </div>
          <span className="text-xs sm:text-sm text-slate-500">
            Physician-calibrated screening & daily care companions
          </span>
        </div>

        {/* 7 Tools Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                className={`group rounded-2xl p-4 bg-slate-50/70 hover:bg-white border border-slate-200/90 ${tool.accent} shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1 text-center items-center`}
              >
                <div className="flex flex-col items-center">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl ${tool.iconColor} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {tool.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-tight hidden sm:block">
                    {tool.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div className="mt-3 w-6 h-6 rounded-full bg-white group-hover:bg-blue-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
