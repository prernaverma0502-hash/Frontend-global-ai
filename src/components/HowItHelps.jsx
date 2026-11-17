import React from 'react';
import {
  MessageSquarePlus,
  HelpCircle,
  TrafficCone,
  FileText,
  Lightbulb,
  Stethoscope,
  ClipboardList,
  Share2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function HowItHelps() {
  const steps = [
    {
      step: '1',
      title: 'Ask Your Symptom',
      desc: 'Type or speak your health concern in simple words.',
      icon: MessageSquarePlus,
      color: 'bg-blue-600 text-white',
      border: 'border-blue-200'
    },
    {
      step: '2',
      title: 'Answer a Few Questions',
      desc: '2–3 quick, clinically targeted questions to narrow down.',
      icon: HelpCircle,
      color: 'bg-indigo-600 text-white',
      border: 'border-indigo-200'
    },
    {
      step: '3',
      title: 'See Your Result (Red/Yellow/Green)',
      desc: 'Instant triage level to know urgency at a glance.',
      icon: TrafficCone,
      color: 'bg-amber-500 text-white',
      border: 'border-amber-200'
    },
    {
      step: '4',
      title: 'Get a Clear Explanation (≈ 100 words)',
      desc: 'Jargon-free, concise breakdown of probable causes.',
      icon: FileText,
      color: 'bg-emerald-600 text-white',
      border: 'border-emerald-200'
    },
    {
      step: '5',
      title: 'Know More (Tips & Details)',
      desc: 'Practical self-care, home remedies and warning signs.',
      icon: Lightbulb,
      color: 'bg-orange-500 text-white',
      border: 'border-orange-200'
    },
    {
      step: '6',
      title: 'Doctor Summary (English)',
      desc: 'Clinically organized bullet points ready for your MD.',
      icon: Stethoscope,
      color: 'bg-sky-600 text-white',
      border: 'border-sky-200'
    },
    {
      step: '7',
      title: 'Pharmacist Question Sheet',
      desc: 'Exact questions to ask your chemist regarding OTC drugs.',
      icon: ClipboardList,
      color: 'bg-teal-600 text-white',
      border: 'border-teal-200'
    },
    {
      step: '8',
      title: 'Share (WhatsApp / Family)',
      desc: 'Send clear summaries directly to family and caregivers.',
      icon: Share2,
      color: 'bg-purple-600 text-white',
      border: 'border-purple-200'
    }
  ];

  return (
    <section className="py-14 bg-white border-y border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Simple 8-Step Clinical Flow
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            How GlobalHealthAI Helps You
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From first worry to safe medical next steps in under 2 minutes.
          </p>
        </div>

        {/* Horizontal Step Cards with connecting arrows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative flex flex-col group">
                {/* Card */}
                <div className="h-full rounded-2xl p-3.5 bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center">
                  
                  {/* Step Badge */}
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                      {item.step}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-blue-200 group-hover:bg-blue-500 transition-colors"></div>
                  </div>

                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-xs sm:text-[13px] text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] text-slate-500 font-normal leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>

                {/* Connecting arrow (hidden on last step & on small screens) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-slate-300">
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
