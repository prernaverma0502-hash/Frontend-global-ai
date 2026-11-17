import React from 'react';
import {
  ArrowLeft,
  BookOpen,
  List,
  Volume2,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { PUBLISHED_BOOKS, OFFICIAL_LANGUAGES } from '../../data/healthSakhiData';

export default function BookDetailsView({
  bookId,
  onBack,
  onReadBook,
  onViewIndex,
  selectedLanguage,
  setSelectedLanguage
}) {
  const book = PUBLISHED_BOOKS.find(b => b.id === bookId) || PUBLISHED_BOOKS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 font-bold text-[#1677E8] hover:text-[#08165B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Category Books</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-[#08165B] font-bold">{book.categoryName}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="truncate max-w-xs">{book.title}</span>
      </div>

      {/* Main Book Detail Card (Premium Presentation) */}
      <div className="bg-white rounded-3xl border border-[#D6E6FA] shadow-sm p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Premium Digital Book Cover (4 cols) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className={`w-full max-w-[280px] h-[390px] rounded-3xl bg-gradient-to-br ${book.coverColor} text-white p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden group`}>
              
              {/* Left spine shadow */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/25 border-r border-white/20" />
              
              {/* Top Cover details */}
              <div className="pl-3 space-y-2">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider border border-white/30">
                  {book.coverBadge}
                </span>
                <div className="text-[10px] font-mono tracking-widest text-blue-200 uppercase">
                  HEALTHSAKHI V1 • OFFICIAL
                </div>
              </div>

              {/* Cover Title */}
              <div className="pl-3 space-y-2 my-auto">
                <h2 className="text-2xl font-black tracking-tight leading-snug drop-shadow-md">
                  {book.title}
                </h2>
                <p className="text-xs text-blue-100 font-medium">
                  {book.author}
                </p>
              </div>

              {/* Cover Bottom */}
              <div className="pl-3 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-blue-100 font-semibold">
                <span>14 Reading Pages</span>
                {book.audioAvailable && (
                  <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md">
                    <Volume2 className="w-3 h-3" />
                    <span>Audio</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Metadata, Synopsis, & Actions (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Category tag */}
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1677E8] font-bold text-xs border border-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-[#F04B0A]" />
                <span>{book.categoryName}</span>
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#08165B] tracking-tight leading-tight">
                {book.title}
              </h1>

              <div className="text-xs sm:text-sm font-semibold text-slate-500">
                Curated by <span className="text-[#08165B] font-bold">{book.author}</span>
              </div>
            </div>

            {/* Synopsis */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                About This Educational E-Book
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {book.synopsis}
              </p>
            </div>

            {/* Book Structure Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F2F7FF] border border-[#D6E6FA] text-xs font-semibold text-slate-700">
              <div className="space-y-0.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Structure</span>
                <span className="text-[#08165B] font-bold">14 Reading Pages</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Audio Edition</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified Narration
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Status</span>
                <span className="text-[#1677E8] font-bold">Approved V1 Edition</span>
              </div>
            </div>

            {/* Available Language Editions */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#1677E8]" />
                <span>Available Language Editions (Switch to Read):</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {book.languages.map((langId) => {
                  const langObj = OFFICIAL_LANGUAGES.find(l => l.id === langId);
                  const isSelected = selectedLanguage === langId;
                  return (
                    <button
                      key={langId}
                      onClick={() => setSelectedLanguage(langId)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#08165B] text-white border-[#08165B] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <span>{langObj ? langObj.native : langId.toUpperCase()}</span>
                      <span className="text-[10px] opacity-75 ml-1">({langObj?.name})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onReadBook(book.id, 1)}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#F04B0A] via-[#f75e23] to-[#F04B0A] hover:from-[#d94207] hover:to-[#ea580c] text-white font-bold text-sm shadow-[0_8px_20px_rgba(240,75,10,0.3)] hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Book Now</span>
              </button>

              <button
                type="button"
                onClick={() => onViewIndex(book.id)}
                className="py-3 px-6 rounded-2xl bg-white hover:bg-slate-50 text-[#08165B] border border-[#D6E6FA] font-bold text-sm shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <List className="w-4 h-4 text-[#1677E8]" />
                <span>View Clickable Index (14 Chapters)</span>
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
