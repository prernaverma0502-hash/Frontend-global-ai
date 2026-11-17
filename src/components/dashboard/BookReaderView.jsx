import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  List,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Globe,
  Type,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  FastForward
} from 'lucide-react';
import { PUBLISHED_BOOKS, OFFICIAL_LANGUAGES } from '../../data/healthSakhiData';
import BookIndexModal from './BookIndexModal';

export default function BookReaderView({
  bookId,
  pageNumber = 1,
  onNavigatePage,
  onBackToDetails,
  selectedLanguage,
  setSelectedLanguage,
  accessibility = {}
}) {
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [indexOpen, setIndexOpen] = useState(false);
  
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 0.75x, 1x, 1.25x, 1.5x
  const [speechSupported, setSpeechSupported] = useState(true);
  const [audioProgress, setAudioProgress] = useState(0);

  // Typography state
  const [fontSize, setFontSize] = useState('medium'); // 'small' | 'medium' | 'large' | 'xlarge'

  const book = PUBLISHED_BOOKS.find(b => b.id === bookId) || PUBLISHED_BOOKS[0];
  const pageData = book.pages.find(p => p.pageNumber === currentPage) || book.pages[0];

  const currentLangObj = OFFICIAL_LANGUAGES.find(l => l.id === selectedLanguage) || OFFICIAL_LANGUAGES[0];
  const isRTL = currentLangObj.dir === 'rtl';

  // Sync prop changes
  useEffect(() => {
    setCurrentPage(pageNumber);
  }, [pageNumber]);

  // Audio Speech Synthesis handler for approved page text
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
      return;
    }

    // Stop speaking when page changes
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setAudioProgress(0);

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentPage, selectedLanguage]);

  const handlePlayAudio = () => {
    if (!speechSupported) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      return;
    }

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      return;
    }

    // Prepare speech from current page content
    const textToRead = `${pageData.title}. ${pageData.summary}. ${pageData.content.replace(/###|####|\*|-/g, '')}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = playbackSpeed;
    
    // Choose appropriate voice language tag if available
    const langMap = {
      en: 'en-US',
      hi: 'hi-IN',
      mr: 'mr-IN',
      bn: 'bn-IN',
      gu: 'gu-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      ur: 'ur-PK',
      ar: 'ar-SA'
    };
    utterance.lang = langMap[selectedLanguage] || 'en-US';

    utterance.onend = () => {
      setIsPlaying(false);
      setAudioProgress(100);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handleRestartAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setAudioProgress(0);
      setTimeout(handlePlayAudio, 100);
    }
  };

  const handleRewind10 = () => {
    // Rewind by canceling and restarting narration from start of current chapter
    handleRestartAudio();
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (isPlaying && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setTimeout(handlePlayAudio, 100);
    }
  };

  const goToNextPage = () => {
    if (currentPage < book.totalReadingPages) {
      const next = currentPage + 1;
      setCurrentPage(next);
      if (onNavigatePage) onNavigatePage(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      const prev = currentPage - 1;
      setCurrentPage(prev);
      if (onNavigatePage) onNavigatePage(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Font size classes
  const fontSizes = {
    small: 'text-sm leading-relaxed',
    medium: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl leading-loose',
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-200"
    >
      
      {/* 1. Reader Navigation Top Bar */}
      <div className="bg-white rounded-2xl border border-[#D6E6FA] shadow-2xs p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Back & Book Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBackToDetails}
            className="p-2 rounded-xl text-slate-500 hover:text-[#08165B] hover:bg-slate-100 transition-colors cursor-pointer"
            title="Exit Reader to Book Details"
          >
            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          <div className="min-w-0">
            <span className="text-[10px] font-bold text-[#F04B0A] uppercase tracking-wider block">
              {book.categoryName}
            </span>
            <h2 className="text-xs sm:text-sm font-black text-[#08165B] truncate max-w-xs sm:max-w-md">
              {book.title}
            </h2>
          </div>
        </div>

        {/* Right: Controls (Index, Font Size, Language) */}
        <div className="flex items-center gap-2">
          
          {/* Table of Contents Button */}
          <button
            type="button"
            onClick={() => setIndexOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 text-[#08165B] text-xs font-bold transition-colors cursor-pointer border border-blue-200"
          >
            <List className="w-3.5 h-3.5 text-[#1677E8]" />
            <span>Index</span>
          </button>

          {/* Font Size Toggle */}
          <div className="flex items-center bg-slate-100 rounded-xl p-1 text-xs font-bold text-slate-600">
            <button
              onClick={() => setFontSize('small')}
              className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${fontSize === 'small' ? 'bg-white text-[#08165B] shadow-2xs' : 'hover:text-[#08165B]'}`}
              title="Small text"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('medium')}
              className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${fontSize === 'medium' ? 'bg-white text-[#08165B] shadow-2xs' : 'hover:text-[#08165B]'}`}
              title="Default text"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${fontSize === 'large' ? 'bg-white text-[#08165B] shadow-2xs' : 'hover:text-[#08165B]'}`}
              title="Large text"
            >
              A+
            </button>
          </div>

          {/* Language Selector in Reader */}
          <div className="hidden sm:block">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="py-1 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#08165B] focus:outline-none cursor-pointer"
            >
              {OFFICIAL_LANGUAGES.map(l => (
                <option key={l.id} value={l.id}>
                  {l.native} ({l.id.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* 2. Reading Session Progress Bar (Session only - privacy safe) */}
      <div className="bg-white rounded-2xl border border-[#D6E6FA] p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1.5 font-bold text-[#08165B]">
            <BookOpen className="w-3.5 h-3.5 text-[#1677E8]" />
            <span>Reading Page {currentPage} of {book.totalReadingPages}</span>
          </span>
          <span className="text-[#F04B0A] font-bold">
            {Math.round((currentPage / book.totalReadingPages) * 100)}% Complete
          </span>
        </div>

        {/* Progress track */}
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1677E8] to-[#F04B0A] rounded-full transition-all duration-300"
            style={{ width: `${(currentPage / book.totalReadingPages) * 100}%` }}
          />
        </div>
      </div>

      {/* 3. Official Audio Player for the Approved Page */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#08165B] text-white rounded-2xl p-4 sm:p-5 shadow-md space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>Page Narration Audio (V1 Approved)</span>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
              <div className="text-[11px] text-blue-200 truncate max-w-xs sm:max-w-md">
                {pageData.title}
              </div>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center gap-2">
            
            {/* Rewind 10s / Restart */}
            <button
              type="button"
              onClick={handleRewind10}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-blue-100 transition-colors cursor-pointer"
              title="Restart / Rewind Narration"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Play / Pause Button */}
            <button
              type="button"
              onClick={handlePlayAudio}
              className="py-2 px-4 rounded-xl bg-[#F04B0A] hover:bg-[#d94207] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Listen</span>
                </>
              )}
            </button>

            {/* Playback Speeds: 0.75x, 1x, 1.25x, 1.5x */}
            <div className="flex items-center bg-white/10 rounded-xl p-0.5 text-[11px] font-bold">
              {[0.75, 1, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                    playbackSpeed === speed
                      ? 'bg-white text-[#08165B]'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

          </div>

        </div>

        {!speechSupported && (
          <div className="text-[11px] text-amber-200 bg-amber-500/20 p-2 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Audio synthesis is not supported on this browser version. Text reading remains fully available.</span>
          </div>
        )}
      </div>

      {/* 4. Main Educational Page Content */}
      <article className="bg-white rounded-3xl border border-[#D6E6FA] shadow-md p-6 sm:p-10 lg:p-12 space-y-6">
        
        {/* Chapter Header */}
        <div className="border-b border-slate-100 pb-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="uppercase tracking-wider">
              {pageData.type === 'introduction' ? 'Opening Introduction' : pageData.type === 'summary' ? 'Summary & Daily Life' : `Educational Chapter ${currentPage - 1}`}
            </span>
            <span>Est. Read: {pageData.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#08165B] tracking-tight leading-snug">
            {pageData.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-medium italic bg-slate-50 p-3 rounded-xl border border-slate-100">
            {pageData.summary}
          </p>
        </div>

        {/* Formatted Text Content */}
        <div className={`text-slate-800 ${fontSizes[fontSize]} space-y-4 font-normal`}>
          {pageData.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl sm:text-2xl font-black text-[#08165B] pt-4 tracking-tight">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('#### ')) {
              return (
                <h4 key={idx} className="text-base sm:text-lg font-bold text-[#1677E8] pt-2">
                  {paragraph.replace('#### ', '')}
                </h4>
              );
            }
            if (paragraph.includes('- [ ]') || paragraph.includes('- ')) {
              return (
                <div key={idx} className="bg-blue-50/40 p-4 rounded-2xl border border-blue-100/80 space-y-2 text-sm text-slate-700">
                  {paragraph.split('\n').map((line, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-2">
                      <span className="text-[#F04B0A] font-bold mt-0.5">•</span>
                      <span>{line.replace(/- \[[ x]\]|- /g, '')}</span>
                    </div>
                  ))}
                </div>
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Educational Disclaimer Reminder at Chapter Foot */}
        <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-400 italic flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>HealthSakhi Educational Library • Reviewed for family educational literacy. Not clinical advice.</span>
        </div>

      </article>

      {/* 5. Bottom Navigation Controls (Previous, Index, Next) */}
      <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#D6E6FA] shadow-xs">
        
        {/* Previous Page */}
        <button
          type="button"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-[#08165B] hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          <span>Previous Page</span>
        </button>

        {/* Index Jump */}
        <button
          type="button"
          onClick={() => setIndexOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
        >
          <List className="w-3.5 h-3.5" />
          <span>Contents ({currentPage}/{book.totalReadingPages})</span>
        </button>

        {/* Next Page */}
        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentPage === book.totalReadingPages}
          className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#F04B0A] to-[#ff6224] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Next Page</span>
          {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

      </div>

      {/* Table of Contents Modal */}
      {indexOpen && (
        <BookIndexModal
          book={book}
          currentPageNumber={currentPage}
          onSelectPage={(num) => {
            setCurrentPage(num);
            if (onNavigatePage) onNavigatePage(num);
          }}
          onClose={() => setIndexOpen(false)}
        />
      )}

    </div>
  );
}
