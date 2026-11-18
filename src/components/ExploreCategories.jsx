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
      textColor: 'text-[#991b1b] dark:text-rose-400',
      iconBg: 'bg-[#ef4444]',
      arrowBorder: 'border-[#ef4444] text-[#ef4444] dark:border-rose-400 dark:text-rose-400',
      cardBorder: 'border-rose-200 hover:border-rose-400 dark:border-rose-900/50 dark:hover:border-rose-700',
      cardGradient: 'bg-gradient-to-b from-[#ffd6de] via-[#ffeef1] to-white dark:from-[#2a0e17] dark:via-[#161224] dark:to-[#0F1C36]',
      image: '/assets/my-symptoms.jpeg?v=4',
      objectPosition: 'right top',
      icon: ClipboardList
    },
    {
      id: 2,
      title: 'My Personal Health',
      desc: 'My daily health, prevention, fitness, sleep, stress and lifestyle.',
      textColor: 'text-[#14532d] dark:text-emerald-400',
      iconBg: 'bg-[#22c55e]',
      arrowBorder: 'border-[#22c55e] text-[#22c55e] dark:border-emerald-400 dark:text-emerald-400',
      cardBorder: 'border-emerald-200 hover:border-emerald-400 dark:border-emerald-900/50 dark:hover:border-emerald-700',
      cardGradient: 'bg-gradient-to-b from-[#d2f8db] via-[#ebfcf0] to-white dark:from-[#0d2818] dark:via-[#102026] dark:to-[#0F1C36]',
      image: '/assets/my-persnal-health.jpeg?v=4',
      objectPosition: 'center top',
      icon: Sprout
    },
    {
      id: 3,
      title: "My Men's Health",
      desc: "Men's common health concerns, prevention and lifelong wellness.",
      textColor: 'text-[#1e3a8a] dark:text-blue-400',
      iconBg: 'bg-[#3b82f6]',
      arrowBorder: 'border-[#3b82f6] text-[#3b82f6] dark:border-blue-400 dark:text-blue-400',
      cardBorder: 'border-blue-200 hover:border-blue-400 dark:border-blue-900/50 dark:hover:border-blue-700',
      cardGradient: 'bg-gradient-to-b from-[#cfe6fe] via-[#ebf4fe] to-white dark:from-[#0e1e3e] dark:via-[#101b33] dark:to-[#0F1C36]',
      image: '/assets/my-mans-health.jpeg?v=4',
      objectPosition: 'center top',
      icon: () => <span className="font-black text-white text-base leading-none">♂</span>
    },
    {
      id: 4,
      title: "My Women's Health",
      desc: 'Periods, hormones, fertility, PCOD, menopause and overall well-being.',
      textColor: 'text-[#9d174d] dark:text-pink-400',
      iconBg: 'bg-[#ec4899]',
      arrowBorder: 'border-[#ec4899] text-[#ec4899] dark:border-pink-400 dark:text-pink-400',
      cardBorder: 'border-pink-200 hover:border-pink-400 dark:border-pink-900/50 dark:hover:border-pink-700',
      cardGradient: 'bg-gradient-to-b from-[#ffd6eb] via-[#feeff6] to-white dark:from-[#2e0e22] dark:via-[#1c1228] dark:to-[#0F1C36]',
      image: '/assets/my-womans-health.jpeg?v=4',
      objectPosition: 'center top',
      icon: () => <span className="font-black text-white text-base leading-none">♀</span>
    },
    {
      id: 5,
      title: 'My Parenting',
      desc: 'Child health, growth, behaviour, learning and family guidance.',
      textColor: 'text-[#9a3412] dark:text-amber-400',
      iconBg: 'bg-[#f97316]',
      arrowBorder: 'border-[#f97316] text-[#f97316] dark:border-amber-400 dark:text-amber-400',
      cardBorder: 'border-amber-200 hover:border-amber-400 dark:border-amber-900/50 dark:hover:border-amber-700',
      cardGradient: 'bg-gradient-to-b from-[#ffe8c7] via-[#fff5e6] to-white dark:from-[#2e1908] dark:via-[#1e1724] dark:to-[#0F1C36]',
      image: '/assets/my-parenting.jpeg?v=4',
      objectPosition: 'center top',
      icon: Users
    },
    {
      id: 6,
      title: 'My Food & Nutrition',
      desc: 'Healthy eating, special diets, and food as medicine.',
      textColor: 'text-[#14532d] dark:text-emerald-400',
      iconBg: 'bg-[#22c55e]',
      arrowBorder: 'border-[#22c55e] text-[#22c55e] dark:border-emerald-400 dark:text-emerald-400',
      cardBorder: 'border-emerald-200 hover:border-emerald-400 dark:border-emerald-900/50 dark:hover:border-emerald-700',
      cardGradient: 'bg-gradient-to-b from-[#d2f8db] via-[#ebfcf0] to-white dark:from-[#0d2818] dark:via-[#102026] dark:to-[#0F1C36]',
      image: '/assets/my-food-nutrition.jpeg?v=5',
      objectPosition: 'center top',
      icon: Apple
    },
    {
      id: 7,
      title: 'My Mind & Emotions',
      desc: 'Stress, anxiety, low mood, focus, ADHD and brain health.',
      textColor: 'text-[#581c87] dark:text-purple-400',
      iconBg: 'bg-[#a855f7]',
      arrowBorder: 'border-[#a855f7] text-[#a855f7] dark:border-purple-400 dark:text-purple-400',
      cardBorder: 'border-purple-200 hover:border-purple-400 dark:border-purple-900/50 dark:hover:border-purple-700',
      cardGradient: 'bg-gradient-to-b from-[#edd6fe] via-[#f7ebff] to-white dark:from-[#240e38] dark:via-[#18132d] dark:to-[#0F1C36]',
      image: '/assets/my-mind-emotions.jpeg?v=5',
      objectPosition: 'right top',
      icon: Brain
    },
    {
      id: 8,
      title: 'My Life Stages',
      desc: 'Childhood, teen years, working life, midlife and healthy ageing.',
      textColor: 'text-[#9a3412] dark:text-orange-400',
      iconBg: 'bg-[#f97316]',
      arrowBorder: 'border-[#f97316] text-[#f97316] dark:border-orange-400 dark:text-orange-400',
      cardBorder: 'border-orange-200 hover:border-orange-400 dark:border-orange-900/50 dark:hover:border-orange-700',
      cardGradient: 'bg-gradient-to-b from-[#ffdfbe] via-[#fff2e3] to-white dark:from-[#2e1708] dark:via-[#1d1627] dark:to-[#0F1C36]',
      image: '/assets/my-life-stage.jpeg?v=4',
      objectPosition: 'center top',
      icon: Milestone
    },
    {
      id: 9,
      title: 'My Lifestyle & Fitness',
      desc: 'Activity, weight, sleep, habits and daily routines for better health.',
      textColor: 'text-[#115e59] dark:text-teal-400',
      iconBg: 'bg-[#14b8a6]',
      arrowBorder: 'border-[#14b8a6] text-[#14b8a6] dark:border-teal-400 dark:text-teal-400',
      cardBorder: 'border-teal-200 hover:border-teal-400 dark:border-teal-900/50 dark:hover:border-teal-700',
      cardGradient: 'bg-gradient-to-b from-[#c0f5ec] via-[#e5faf6] to-white dark:from-[#082622] dark:via-[#0e1d27] dark:to-[#0F1C36]',
      image: '/assets/my-life-style-fitness.jpeg?v=4',
      objectPosition: 'center top',
      icon: Activity
    },
    {
      id: 10,
      title: 'My Chronic Conditions',
      desc: 'Diabetes, blood pressure, heart, kidney, lung, liver and long-term care.',
      textColor: 'text-[#881337] dark:text-rose-400',
      iconBg: 'bg-[#ef4444]',
      arrowBorder: 'border-[#ef4444] text-[#ef4444] dark:border-rose-400 dark:text-rose-400',
      cardBorder: 'border-rose-200 hover:border-rose-400 dark:border-rose-900/50 dark:hover:border-rose-700',
      cardGradient: 'bg-gradient-to-b from-[#ffd6de] via-[#ffeef1] to-white dark:from-[#2e0d18] dark:via-[#191325] dark:to-[#0F1C36]',
      image: '/assets/my-cronic-contidion.jpeg?v=4',
      objectPosition: 'right top',
      icon: HeartPulse
    },
    {
      id: 11,
      title: 'My Medicines & Tests',
      desc: 'Medicine use, side effects, interactions and key investigations.',
      textColor: 'text-[#075985] dark:text-sky-400',
      iconBg: 'bg-[#0ea5e9]',
      arrowBorder: 'border-[#0ea5e9] text-[#0ea5e9] dark:border-sky-400 dark:text-sky-400',
      cardBorder: 'border-sky-200 hover:border-sky-400 dark:border-sky-900/50 dark:hover:border-sky-700',
      cardGradient: 'bg-gradient-to-b from-[#cfe6fe] via-[#ebf4fe] to-white dark:from-[#0a1e38] dark:via-[#0e192f] dark:to-[#0F1C36]',
      image: '/assets/my-medicine-test.jpeg?v=4',
      objectPosition: 'right top',
      icon: Pill
    },
    {
      id: 12,
      title: 'My Special Care',
      desc: 'Care for older adults, people with disability, long-term illness and home care.',
      textColor: 'text-[#581c87] dark:text-purple-400',
      iconBg: 'bg-[#a855f7]',
      arrowBorder: 'border-[#a855f7] text-[#a855f7] dark:border-purple-400 dark:text-purple-400',
      cardBorder: 'border-purple-200 hover:border-purple-400 dark:border-purple-900/50 dark:hover:border-purple-700',
      cardGradient: 'bg-gradient-to-b from-[#edd6fe] via-[#f7ebff] to-white dark:from-[#240e38] dark:via-[#18132d] dark:to-[#0F1C36]',
      image: '/assets/my-special-care.jpeg?v=4',
      objectPosition: 'center top',
      icon: Accessibility
    }
  ];

  return (
    <section id="categories" className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 pt-3 sm:pt-4 pb-5 scroll-mt-20">

      {/* Category Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <LayoutGrid className="w-5 h-5 text-[#1d6fd8] dark:text-blue-400" />
          <h2 className="text-lg sm:text-[21px] font-black text-[#0c2340] dark:text-white tracking-tight">
            Explore by Category
          </h2>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline text-lg font-light">|</span>
          <span className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium">
            Find trusted guidance for your symptoms, health, family and daily life.
          </span>
        </div>

        {/* View All Categories (23) Button */}
        <button
          type="button"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-blue-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800 text-[#0f2d59] dark:text-slate-200 font-bold text-xs transition-colors self-start sm:self-auto shrink-0 shadow-2xs cursor-pointer"
        >
          <span> All Categories</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* 12 Cards in 4-column desktop grid with full width top images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {categories.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`rounded-2xl overflow-hidden ${card.cardGradient} border ${card.cardBorder} shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group`}
            >
              <div>
                {/* Full-width top image section: width 100%, height 110px, object-fit cover */}
                <div className="relative w-full h-[110px] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-[110px] object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{
                      width: '100%',
                      height: '110px',
                      objectFit: 'cover',
                      objectPosition: card.objectPosition || 'center',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
                      maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
                    }}
                  />

                  {/* Icon visible on the left side of the image area */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <div className={`w-8 h-8 rounded-full ${card.iconBg} flex items-center justify-center text-white shadow-md border border-white/80`}>
                      <Icon className="w-4 h-4 stroke-[2.2]" />
                    </div>
                  </div>
                </div>

                {/* Card Body with Title and Description */}
                <div className="p-3.5 pt-1.5">
                  <h3 className={`font-bold text-sm sm:text-[15px] leading-tight ${card.textColor} mb-1.5`}>
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-[12px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed line-clamp-2">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Right: Circular Arrow */}
              <div className="px-3.5 pb-3.5 flex justify-end">
                <div className={`w-6 h-6 rounded-full bg-white dark:bg-slate-800 border ${card.arrowBorder} flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs`}>
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
