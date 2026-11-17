import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Globe,
  Sparkles,
  Search,
  CheckCircle2,
  ChevronRight,
  FolderOpen
} from 'lucide-react';
import { PUBLISHED_BOOKS, OFFICIAL_CATEGORIES, OFFICIAL_LANGUAGES } from '../../data/healthSakhiData';

export default function CategoryBooksView({
  categoryId,
  onBack,
  onSelectBook,
  selectedLanguage
}) {
  const [searchFilter, setSearchFilter] = useState('');

  const currentCategory = OFFICIAL_CATEGORIES.find(c => c.id === categoryId) || OFFICIAL_CATEGORIES[0];
  
  const booksInCategory = PUBLISHED_BOOKS.filter(b => b.categoryId === categoryId);

  const filteredBooks = booksInCategory.filter(b =>
    b.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.synopsis.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6E6FA] pb-5">
        
        <div className="space-y-1">
          {/* Breadcrumb back */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1677E8] hover:text-[#08165B] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Categories</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-xs font-semibold text-slate-500">
              {currentCategory.name}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#08165B] tracking-tight">
            {currentCategory.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-normal">
            {currentCategory.description}
          </p>
        </div>

        {/* Search within this category */}
        {booksInCategory.length > 0 && (
          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search in this category..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#D6E6FA] text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1677E8] shadow-2xs"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          </div>
        )}

      </div>

      {/* 2. Books Grid or Empty State */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#D6E6FA] shadow-2xs space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1677E8] flex items-center justify-center mx-auto border border-blue-200">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#08165B]">
            No books available in this category yet.
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Our clinical editorial board is currently reviewing upcoming e-books for this category. Please check back soon or explore other categories.
          </p>
          <div className="pt-2">
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl bg-[#08165B] hover:bg-[#1677E8] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Browse All Categories
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-3xl border border-[#D6E6FA] hover:border-[#1677E8]/60 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between overflow-hidden group"
            >
              <div className="space-y-4">
                
                {/* Book Cover Presentation */}
                <div
                  onClick={() => onSelectBook(book.id)}
                  className={`w-full h-52 rounded-2xl bg-gradient-to-br ${book.coverColor} p-5 text-white flex flex-col justify-between relative shadow-md group-hover:shadow-lg transition-shadow cursor-pointer overflow-hidden`}
                >
                  {/* Subtle book spine aesthetic */}
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20 border-r border-white/20" />

                  {/* Top Badge */}
                  <div className="flex items-center justify-between pl-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/30">
                      {book.coverBadge}
                    </span>
                    <span className="text-[10px] font-semibold text-blue-100 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{book.totalReadingPages} Pages</span>
                    </span>
                  </div>

                  {/* Cover Title */}
                  <div className="pl-2 space-y-1">
                    <h3 className="text-lg font-black tracking-tight leading-snug drop-shadow-sm">
                      {book.title}
                    </h3>
                    <p className="text-[11px] text-blue-100/90 font-medium line-clamp-1">
                      {book.author}
                    </p>
                  </div>

                  {/* Bottom Edition Note */}
                  <div className="pl-2 text-[10px] text-blue-100/80 font-mono tracking-wide">
                    HEALTHSAKHI CLINICAL EDITION
                  </div>
                </div>

                {/* Synopsis */}
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-[#08165B] group-hover:text-[#1677E8] transition-colors">
                    {book.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                    {book.synopsis}
                  </p>
                </div>

                {/* Available Languages badges */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#1677E8]" />
                    <span>Published Language Editions:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {book.languages.map(langId => {
                      const lObj = OFFICIAL_LANGUAGES.find(l => l.id === langId);
                      return (
                        <span
                          key={langId}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                            selectedLanguage === langId
                              ? 'bg-blue-100 text-[#08165B] border-blue-300 font-bold'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          {lObj ? lObj.native : langId.toUpperCase()}
                        </span>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectBook(book.id)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F04B0A] to-[#ff6224] hover:from-[#d94207] hover:to-[#ea580c] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Book</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
