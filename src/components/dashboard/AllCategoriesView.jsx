import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  ArrowRight,
  HeartPulse,
  Flame,
  Sparkles,
  Baby,
  Users,
  Zap,
  HeartHandshake,
  ShieldCheck,
  Brain,
  Moon,
  Smile,
  Utensils,
  Compass,
  MessageCircleHeart,
  Globe
} from 'lucide-react';
import { OFFICIAL_CATEGORIES, OFFICIAL_LANGUAGES } from '../../data/healthSakhiData';

const ICON_MAP = {
  HeartPulse,
  Flame,
  Sparkles,
  Baby,
  Users,
  Zap,
  HeartHandshake,
  ShieldCheck,
  Brain,
  Moon,
  Smile,
  Utensils,
  Compass,
  MessageCircleHeart,
};

export default function AllCategoriesView({
  onSelectCategory,
  onNavigateToSearch,
  selectedLanguage,
  setSelectedLanguage
}) {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCategories = OFFICIAL_CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Hero / Welcome Banner (Glassmorphism & Medical Brand) */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#08165B] via-[#0d287d] to-[#1677E8] text-white p-6 sm:p-8 lg:p-10 shadow-[0_12px_36px_rgba(8,22,91,0.14)] overflow-hidden">
        
        {/* Ambient Orb inside banner */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-60 h-60 rounded-full bg-[#F04B0A]/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-blue-100 border border-white/20">
            <BookOpen className="w-3.5 h-3.5 text-[#F04B0A]" />
            <span>HealthSakhi V1 Educational E-Book Library</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Welcome to GlobalHealthAI
          </h1>
          
          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
            Explore trusted health education books for you and your family. Scientifically grounded knowledge across 14 life stages and wellness dimensions.
          </p>

          {/* Search Bar & Quick Filters */}
          <div className="pt-3 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search categories (e.g. Women's Health, Sleep, Weight, Parenting)..."
                className="w-full pl-11 pr-28 py-3.5 rounded-2xl bg-white text-slate-800 placeholder-slate-400 font-medium text-xs sm:text-sm shadow-lg border border-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300/30 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              
              <button
                type="button"
                onClick={() => onNavigateToSearch(filterQuery)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-[#F04B0A] hover:bg-[#d94207] text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <span>Find Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Language Quick Switcher Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-[#D6E6FA] shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#08165B]">
          <Globe className="w-4 h-4 text-[#1677E8]" />
          <span>Available Library Editions:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {OFFICIAL_LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedLanguage === lang.id
                  ? 'bg-gradient-to-r from-[#F04B0A] to-[#ff6224] text-white shadow-xs'
                  : 'bg-slate-100/80 text-slate-700 hover:bg-blue-50 hover:text-[#08165B]'
              }`}
            >
              <span>{lang.native}</span>
              <span className="text-[10px] opacity-75 ml-1">({lang.id.toUpperCase()})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Categories Section Header */}
      <div className="flex items-center justify-between border-b border-[#D6E6FA] pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#08165B] tracking-tight">
            All 14 Official Categories
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Select any category to browse published educational e-books.
          </p>
        </div>
        <span className="text-xs font-bold text-[#1677E8] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          {filteredCategories.length} Categories
        </span>
      </div>

      {/* 4. Responsive Category Grid (3-4 cols desktop, 2 cols tablet, 1 col mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredCategories.map((cat, idx) => {
          const IconComponent = ICON_MAP[cat.icon] || HeartPulse;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group bg-white hover:bg-blue-50/20 border border-[#D6E6FA] hover:border-[#1677E8]/50 rounded-3xl p-5 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              {/* Top Accent Gradient Line */}
              <div className={`absolute top-0 left-6 right-6 h-1 rounded-full bg-gradient-to-r ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className="space-y-4">
                
                {/* Category Number & Icon Header */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    <IconComponent className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    #{idx + 1}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-[#08165B] group-hover:text-[#1677E8] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-1.5 font-normal">
                    {cat.description}
                  </p>
                </div>

              </div>

              {/* Bottom Footer: Book count + Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#1677E8]" />
                  <span>{cat.publishedCount} Published Books</span>
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-[#F04B0A] group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
