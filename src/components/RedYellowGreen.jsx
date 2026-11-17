import React from 'react';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  PhoneCall,
  Calendar,
  HeartHandshake,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function RedYellowGreen() {
  const guides = [
    {
      level: 'Red',
      badge: 'EMERGENCY NOW',
      title: 'Red – Emergency Now',
      desc: 'Possible serious condition. Seek urgent medical care immediately.',
      action: 'Call emergency medical services (108 / 911) or proceed immediately to the nearest emergency department.',
      icon: AlertTriangle,
      iconBg: 'bg-red-600 text-white',
      cardBg: 'bg-gradient-to-b from-red-50/90 via-rose-50/40 to-white',
      border: 'border-red-200 hover:border-red-400',
      tagBg: 'bg-red-100 text-red-800 border-red-200',
      accent: 'text-red-700',
      footerIcon: PhoneCall,
      footerText: 'Immediate Emergency Care'
    },
    {
      level: 'Yellow',
      badge: 'PROMPT ASSESSMENT',
      title: 'Yellow – See a Doctor Soon',
      desc: 'Medical assessment is needed, usually today or within 24–48 hours (as per the symptom card).',
      action: 'Schedule a timely clinical consultation with your primary physician or visit an urgent care center.',
      icon: Clock,
      iconBg: 'bg-amber-500 text-white',
      cardBg: 'bg-gradient-to-b from-amber-50/90 via-yellow-50/40 to-white',
      border: 'border-amber-200 hover:border-amber-400',
      tagBg: 'bg-amber-100 text-amber-800 border-amber-200',
      accent: 'text-amber-800',
      footerIcon: Calendar,
      footerText: 'Consult within 24–48 Hours'
    },
    {
      level: 'Green',
      badge: 'SAFE TO MONITOR',
      title: 'Green – Not Urgent',
      desc: 'Self-care may be reasonable. Follow the suggested steps and watch for warning signs.',
      action: 'Practice clinically recommended home relief steps, stay hydrated, and monitor for changes or red-flag escalations.',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-600 text-white',
      cardBg: 'bg-gradient-to-b from-emerald-50/90 via-teal-50/40 to-white',
      border: 'border-emerald-200 hover:border-emerald-400',
      tagBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      accent: 'text-emerald-800',
      footerIcon: HeartHandshake,
      footerText: 'Self-Care & Vigilance'
    }
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
            Clinical Triage System
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Red – Yellow – Green Guide
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Every symptom card categorizes urgency into three distinct clinical action levels for peace of mind.
          </p>
        </div>

        {/* 3 Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((item, idx) => {
            const Icon = item.icon;
            const FooterIcon = item.footerIcon;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-6 sm:p-7 ${item.cardBg} border ${item.border} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1`}
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className={`text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border ${item.tagBg}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl sm:text-2xl font-bold tracking-tight mb-2.5 ${item.accent}`}>
                    {item.title}
                  </h3>

                  {/* Main Description */}
                  <p className="text-sm text-slate-700 font-medium leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Clinical Action Note */}
                  <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200/80 text-xs text-slate-600 leading-relaxed space-y-1">
                    <span className="font-bold text-slate-900 block">Recommended Action:</span>
                    <span>{item.action}</span>
                  </div>
                </div>

                {/* Bottom Footer Line */}
                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <FooterIcon className="w-4 h-4 text-slate-500" />
                    <span>{item.footerText}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
