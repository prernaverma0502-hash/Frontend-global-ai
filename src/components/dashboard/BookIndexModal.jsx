import React from 'react';
import { X, BookOpen, Clock, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

export default function BookIndexModal({
  book,
  currentPageNumber,
  onSelectPage,
  onClose
}) {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-[#F04B0A] uppercase tracking-wider">
              Clickable Table of Contents
            </span>
            <h3 className="text-lg font-black text-[#08165B] truncate max-w-md">
              {book.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Index List (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-2.5">
          <div className="text-xs text-slate-500 font-medium pb-2 border-b border-slate-100">
            Official 14-Page Educational Structure: 1 Introduction + 12 Core Knowledge Chapters + 1 Summary & Daily Life Checklist.
          </div>

          {book.pages.map((page) => {
            const isCurrent = currentPageNumber === page.pageNumber;

            return (
              <button
                key={page.pageNumber}
                type="button"
                onClick={() => {
                  onSelectPage(page.pageNumber);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-3 group cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-50/80 border-[#1677E8] shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Page number badge */}
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                      isCurrent
                        ? 'bg-[#1677E8] text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-[#08165B] group-hover:text-white transition-colors'
                    }`}
                  >
                    {page.pageNumber}
                  </span>

                  <div className="min-w-0">
                    <h4
                      className={`text-xs sm:text-sm font-bold truncate ${
                        isCurrent ? 'text-[#1677E8]' : 'text-[#08165B] group-hover:text-[#1677E8]'
                      }`}
                    >
                      {page.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate font-normal">
                      {page.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 text-slate-400 group-hover:text-[#F04B0A]">
                  <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {page.readTime}
                  </span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Click any chapter to jump directly to that page.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white border border-slate-200 font-bold text-[#08165B] hover:bg-slate-100 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
