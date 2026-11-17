import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  AlertCircle,
  FileText,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { searchLibrary, MEDICAL_QUERY_BOUNDARY_MESSAGE } from '../../data/healthSakhiData';

export default function FindABookView({
  initialQuery = '',
  onSelectBook,
  onNavigatePage
}) {
  const [query, setQuery] = useState(initialQuery);
  const [searchOutput, setSearchOutput] = useState({ isMedicalQuery: false, results: [] });

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setSearchOutput(searchLibrary(initialQuery));
    }
  }, [initialQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchOutput(searchLibrary(query));
  };

  const handleInputChange = (val) => {
    setQuery(val);
    if (!val.trim()) {
      setSearchOutput({ isMedicalQuery: false, results: [] });
    } else {
      setSearchOutput(searchLibrary(val));
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="border-b border-[#D6E6FA] pb-5 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1677E8] text-xs font-bold border border-blue-200">
          <Search className="w-3.5 h-3.5 text-[#F04B0A]" />
          <span>Library Discovery Index</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#08165B] tracking-tight">
          Find an Educational E-Book
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Search across 14 health categories, published book titles, chapter headings, and daily wellness summaries.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Search by topic (e.g. Hormones, Sleep, Insulin, Ayurveda, Pregnancy, Heart)..."
          className="w-full pl-12 pr-28 py-4 rounded-2xl bg-white text-slate-800 placeholder-slate-400 font-medium text-sm sm:text-base border border-[#D6E6FA] shadow-xs focus:outline-none focus:border-[#1677E8] focus:ring-4 focus:ring-blue-100 transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        
        <button
          type="submit"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 py-2 px-5 rounded-xl bg-gradient-to-r from-[#08165B] to-[#1677E8] hover:from-[#050e3b] hover:to-[#115fc2] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* Suggested Search Quick Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
        <span className="font-bold text-slate-400">Popular Topics:</span>
        {['Hormones', 'Insulin Resistance', 'Deep Sleep', 'Ayurveda Cooking', 'Heart Health', 'Anxiety & Overthinking', 'Motherhood'].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleInputChange(tag)}
            className="px-3 py-1 rounded-full bg-slate-100/90 hover:bg-blue-50 text-slate-600 hover:text-[#08165B] font-semibold transition-colors cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* STRICT BOUNDARY BANNER FOR PERSONAL MEDICAL INQUIRIES */}
      {searchOutput.isMedicalQuery && (
        <div className="rounded-3xl p-6 sm:p-7 bg-amber-50/90 border-2 border-amber-300 text-amber-950 space-y-4 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-amber-900">
                Notice: Educational Library Only
              </h3>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                {MEDICAL_QUERY_BOUNDARY_MESSAGE}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-200 text-xs font-semibold text-amber-800 flex items-center justify-between">
            <span>You may search for general educational book topics instead.</span>
            <button
              onClick={() => handleInputChange('Hormones')}
              className="text-[#1677E8] hover:underline font-bold"
            >
              Search Educational Books
            </button>
          </div>
        </div>
      )}

      {/* Search Results (Max 5 results) */}
      {!searchOutput.isMedicalQuery && searchOutput.results.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-1">
            <span>Top {searchOutput.results.length} Relevant Educational Results</span>
            <span className="text-[#1677E8]">Official V1 Content</span>
          </div>

          <div className="space-y-3">
            {searchOutput.results.map((res, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#D6E6FA] hover:border-[#1677E8]/70 shadow-2xs hover:shadow-md transition-all p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4 min-w-0">
                  {/* Book Spine Icon Badge */}
                  <div className={`w-12 h-14 rounded-xl bg-gradient-to-br ${res.coverColor || 'from-[#08165B] to-[#1677E8]'} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                    <BookOpen className="w-6 h-6" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1677E8] uppercase tracking-wide">
                        {res.categoryName}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        • Page {res.pageNumber}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#08165B] group-hover:text-[#1677E8] transition-colors truncate">
                      {res.bookTitle}
                    </h3>

                    <h4 className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{res.pageTitle}</span>
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                      {res.snippet}
                    </p>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectBook(res.bookId, res.pageNumber)}
                    className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#F04B0A] to-[#ff6224] hover:from-[#d94207] hover:to-[#ea580c] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Read Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results Fallback */}
      {!searchOutput.isMedicalQuery && query.trim() && searchOutput.results.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center border border-[#D6E6FA] space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#08165B]">
            No educational books matched your query
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for general wellness keywords such as "Sleep", "Hormones", "Ayurveda", or "Heart".
          </p>
        </div>
      )}

    </div>
  );
}
