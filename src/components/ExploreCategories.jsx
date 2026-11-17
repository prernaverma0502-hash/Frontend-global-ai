import React from 'react';
import {
  LayoutGrid,
  ArrowRight,
  ClipboardList,
  Sprout,
  Users,
  Apple,
  Brain,
  Milestone,
  Activity,
  HeartPulse,
  Pill,
  Accessibility
} from 'lucide-react';

export default function ExploreCategories() {
  const categories = [
    {
      id: 1,
      title: 'My Symptoms',
      desc: 'Check your symptoms, understand the causes and next safe steps.',
      textColor: 'text-[#b91c1c]',
      iconBg: 'bg-[#ef4444]',
      arrowBorder: 'border-[#ef4444] text-[#ef4444]',
      cardBg: 'bg-gradient-to-b from-rose-50/80 via-white to-white',
      cardBorder: 'border-rose-100 hover:border-rose-300',
      image: '/assets/cat-1.jpg',
      icon: ClipboardList
    },
    {
      id: 2,
      title: 'My Personal Health',
      desc: 'My daily health, prevention, fitness, sleep, stress and lifestyle.',
      textColor: 'text-[#15803d]',
      iconBg: 'bg-[#22c55e]',
      arrowBorder: 'border-[#22c55e] text-[#22c55e]',
      cardBg: 'bg-gradient-to-b from-emerald-50/80 via-white to-white',
      cardBorder: 'border-emerald-100 hover:border-emerald-300',
      image: '/assets/cat-2.jpg',
      icon: Sprout
    },
    {
      id: 3,
      title: "My Men's Health",
      desc: "Men's common health concerns, prevention and lifelong wellness.",
      textColor: 'text-[#1d4ed8]',
      iconBg: 'bg-[#3b82f6]',
      arrowBorder: 'border-[#3b82f6] text-[#3b82f6]',
      cardBg: 'bg-gradient-to-b from-blue-50/80 via-white to-white',
      cardBorder: 'border-blue-100 hover:border-blue-300',
      image: '/assets/cat-3.jpg',
      icon: () => <span className="font-black text-white text-base leading-none">♂</span>
    },
    {
      id: 4,
      title: "My Women's Health",
      desc: 'Periods, hormones, fertility, PCOD, menopause and overall well-being.',
      textColor: 'text-[#be185d]',
      iconBg: 'bg-[#ec4899]',
      arrowBorder: 'border-[#ec4899] text-[#ec4899]',
      cardBg: 'bg-gradient-to-b from-pink-50/80 via-white to-white',
      cardBorder: 'border-pink-100 hover:border-pink-300',
      image: '/assets/cat-4.jpg',
      icon: () => <span className="font-black text-white text-base leading-none">♀</span>
    },
    {
      id: 5,
      title: 'My Parenting',
      desc: 'Child health, growth, behaviour, learning and family guidance.',
      textColor: 'text-[#c2410c]',
      iconBg: 'bg-[#f97316]',
      arrowBorder: 'border-[#f97316] text-[#f97316]',
      cardBg: 'bg-gradient-to-b from-amber-50/80 via-white to-white',
      cardBorder: 'border-amber-100 hover:border-amber-300',
      image: '/assets/cat-5.jpg',
      icon: Users
    },
    {
      id: 6,
      title: 'My Food & Nutrition',
      desc: 'Healthy eating, special diets, and food as medicine.',
      textColor: 'text-[#15803d]',
      iconBg: 'bg-[#22c55e]',
      arrowBorder: 'border-[#22c55e] text-[#22c55e]',
      cardBg: 'bg-gradient-to-b from-emerald-50/80 via-white to-white',
      cardBorder: 'border-emerald-100 hover:border-emerald-300',
      image: '/assets/cat-6.jpg',
      icon: Apple
    },
    {
      id: 7,
      title: 'My Mind & Emotions',
      desc: 'Stress, anxiety, low mood, focus, ADHD and brain health.',
      textColor: 'text-[#6b21a8]',
      iconBg: 'bg-[#a855f7]',
      arrowBorder: 'border-[#a855f7] text-[#a855f7]',
      cardBg: 'bg-gradient-to-b from-purple-50/80 via-white to-white',
      cardBorder: 'border-purple-100 hover:border-purple-300',
      image: '/assets/cat-7.jpg',
      icon: Brain
    },
    {
      id: 8,
      title: 'My Life Stages',
      desc: 'Childhood, teen years, working life, midlife and healthy ageing.',
      textColor: 'text-[#c2410c]',
      iconBg: 'bg-[#f97316]',
      arrowBorder: 'border-[#f97316] text-[#f97316]',
      cardBg: 'bg-gradient-to-b from-amber-50/80 via-white to-white',
      cardBorder: 'border-amber-100 hover:border-amber-300',
      image: '/assets/cat-8.jpg',
      icon: Milestone
    },
    {
      id: 9,
      title: 'My Lifestyle & Fitness',
      desc: 'Activity, weight, sleep, habits and daily routines for better health.',
      textColor: 'text-[#0f766e]',
      iconBg: 'bg-[#14b8a6]',
      arrowBorder: 'border-[#14b8a6] text-[#14b8a6]',
      cardBg: 'bg-gradient-to-b from-teal-50/80 via-white to-white',
      cardBorder: 'border-teal-100 hover:border-teal-300',
      image: '/assets/cat-9.jpg',
      icon: Activity
    },
    {
      id: 10,
      title: 'My Chronic Conditions',
      desc: 'Diabetes, blood pressure, heart, kidney, lung, liver and long-term care.',
      textColor: 'text-[#991b1b]',
      iconBg: 'bg-[#ef4444]',
      arrowBorder: 'border-[#ef4444] text-[#ef4444]',
      cardBg: 'bg-gradient-to-b from-rose-50/80 via-white to-white',
      cardBorder: 'border-rose-100 hover:border-rose-300',
      image: '/assets/cat-10.jpg',
      icon: HeartPulse
    },
    {
      id: 11,
      title: 'My Medicines & Tests',
      desc: 'Medicine use, side effects, interactions and key investigations.',
      textColor: 'text-[#0369a1]',
      iconBg: 'bg-[#0ea5e9]',
      arrowBorder: 'border-[#0ea5e9] text-[#0ea5e9]',
      cardBg: 'bg-gradient-to-b from-sky-50/80 via-white to-white',
      cardBorder: 'border-sky-100 hover:border-sky-300',
      image: '/assets/cat-11.jpg',
      icon: Pill
    },
    {
      id: 12,
      title: 'My Special Care',
      desc: 'Care for older adults, people with disability, long-term illness and home care.',
      textColor: 'text-[#6b21a8]',
      iconBg: 'bg-[#a855f7]',
      arrowBorder: 'border-[#a855f7] text-[#a855f7]',
      cardBg: 'bg-gradient-to-b from-purple-50/80 via-white to-white',
      cardBorder: 'border-purple-100 hover:border-purple-300',
      image: '/assets/cat-12.jpg',
      icon: Accessibility
    }
  ];

  return (
    <section id="categories" className="max-w-[1360px] mx-auto px-4 sm:px-6 pt-7 pb-4">

      {/* Category Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2 flex-wrap">
          <LayoutGrid className="w-5 h-5 text-[#1d6fd8]" />
          <h2 className="text-lg sm:text-[21px] font-black text-[#0c2340] tracking-tight">
            Explore by Category
          </h2>
          <span className="text-slate-300 hidden sm:inline text-lg font-light">|</span>
          <span className="text-xs sm:text-[13px] text-slate-600 font-medium">
            Find trusted guidance for your symptoms, health, family and daily life.
          </span>
        </div>

        {/* View All Categories (23) Button */}
        <button
          type="button"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-blue-300 hover:border-blue-500 hover:bg-blue-50/50 text-[#0f2d59] font-bold text-xs transition-colors self-start sm:self-auto shrink-0 shadow-2xs"
        >
          <span>View All Categories (23)</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* 12 Cards in 4-column desktop grid (3 rows of 4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {categories.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`rounded-2xl p-3 sm:p-3.5 ${card.cardBg} border ${card.cardBorder} shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group`}
            >
              <div>
                {/* Top: Icon + Image Preview */}
                <div className="flex items-center justify-between mb-2.5">
                  {/* Left Circle Icon */}
                  <div className={`w-8 h-8 rounded-full ${card.iconBg} flex items-center justify-center text-white shrink-0 shadow-xs`}>
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>

                  {/* Right Image Thumbnail */}
                  <div className="w-20 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-100 shadow-2xs">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className={`font-bold text-[13.5px] sm:text-[14px] leading-tight ${card.textColor} mb-1`}>
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] sm:text-[11.5px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Right: Circular Arrow */}
              <div className="mt-3 flex justify-end">
                <div className={`w-6 h-6 rounded-full border ${card.arrowBorder} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
