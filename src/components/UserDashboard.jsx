import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import MinimalSidebar from './dashboard/MinimalSidebar';
import WorkspaceTopBar from './dashboard/WorkspaceTopBar';
import MinimalAIAssessmentCard from './dashboard/MinimalAIAssessmentCard';
import MinimalLibraryView from './dashboard/MinimalLibraryView';
import HelpModal from './dashboard/HelpModal';
import ProfileSettingsModal from './dashboard/ProfileSettingsModal';
import FloatingHealthChatbot from './dashboard/FloatingHealthChatbot';
import { PORTAL_CATEGORIES } from '../data/portalCategories';
import { userPortalStorage } from '../services/userPortalStorage';
import {
  Mic,
  ArrowUp,
  ArrowRight,
  Sparkles,
  Lock,
  Search,
  Check,
  Shield,
  BookOpen,
  Target,
  UserCheck
} from 'lucide-react';

export default function UserDashboard({ onNavigate }) {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  // Auth gate
  const isAuth = user && (user.role === 'user' || user.role === 'admin');

  // Category state (Default: null for General Triage; set only when user clicks a category)
  const [activeCategory, setActiveCategory] = useState(null);

  // View state: 'workspace' | 'library'
  const [activeView, setActiveView] = useState('workspace');

  // User input prompt state
  const [promptText, setPromptText] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Active severity toggle for AI triage demo: 'GREEN' | 'YELLOW' | 'RED'
  const [activeSeverity, setActiveSeverity] = useState('GREEN');

  // Modal states
  const [helpOpen, setHelpOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Saved reports & conversations from storage
  const [reports, setReports] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (user?.email) {
      setReports(userPortalStorage.getReports(user.email));
      setConversations(userPortalStorage.getConversations(user.email));
    }
  }, [user?.email]);

  const handleLogout = () => {
    logout();
    if (onNavigate) {
      onNavigate('/login');
    } else {
      window.location.pathname = '/login';
    }
  };

  const handleNavigateHome = () => {
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.location.pathname = '/';
    }
  };

  // Select a category from the 12 categories list
  const handleSelectCategory = (cat) => {
    setActiveCategory(cat);
    setActiveView('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // "+ New Chat" CTA handler - resets category so it doesn't stay stuck on any single category
  const handleNewChat = () => {
    setActiveCategory(null);
    setActiveView('workspace');
    setPromptText('');
    setActiveSeverity('GREEN');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Analyze Symptoms Submit
  const handleAnalyzeSymptoms = (e) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;

    const lower = promptText.toLowerCase();
    // Intelligent triage detection
    if (lower.includes('chest pain') || lower.includes('breathing') || lower.includes('blood') || lower.includes('severe') || lower.includes('unconscious')) {
      setActiveSeverity('RED');
    } else if (lower.includes('fever') || lower.includes('cough') || lower.includes('days') || lower.includes('headache') || lower.includes('sugar') || lower.includes('pain')) {
      setActiveSeverity('YELLOW');
    } else {
      setActiveSeverity('GREEN');
    }

    // Record past consultation
    const newConv = {
      id: `conv-${Date.now()}`,
      title: promptText.length > 40 ? `${promptText.substring(0, 40)}...` : promptText,
      categoryName: activeCategory ? activeCategory.name : 'General Triage',
      date: new Date().toISOString(),
      preview: activeCategory
        ? `Assessed in ${activeCategory.name} mode. Clinical severity categorized under ${activeSeverity}.`
        : `General symptom assessment. Clinical severity categorized under ${activeSeverity}.`,
      messages: []
    };
    const updated = userPortalStorage.saveConversation(user?.email, newConv);
    setConversations(updated);
  };

  // Example Prompt Chips click
  const handleSelectPromptChip = (chipText) => {
    setPromptText(chipText);
    const lower = chipText.toLowerCase();
    if (lower.includes('chest pain') || lower.includes('breathing')) {
      setActiveSeverity('RED');
    } else if (lower.includes('fever') || lower.includes('cough') || lower.includes('sugar') || lower.includes('triglycerides')) {
      setActiveSeverity('YELLOW');
    } else {
      setActiveSeverity('GREEN');
    }
  };

  // Voice dictation
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice dictation is supported in modern Chrome and Edge browsers.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPromptText(prev => prev ? `${prev} ${transcript}` : transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // Save report to library
  const handleSaveReport = (report) => {
    const updated = userPortalStorage.saveReport(user?.email, report);
    setReports(updated);
  };

  const handleDeleteReport = (reportId) => {
    const updated = userPortalStorage.deleteReport(user?.email, reportId);
    setReports(updated);
  };

  const handleDeleteConversation = (convId) => {
    const updated = userPortalStorage.deleteConversation(user?.email, convId);
    setConversations(updated);
  };

  // Open past conversation
  const handleOpenConversation = (convId) => {
    const found = conversations.find(c => c.id === convId);
    if (found) {
      setPromptText(found.title);
      setActiveView('workspace');
    }
  };

  // Example prompt chips to show below input
  const exampleChips = [
    activeCategory?.examplePrompt || "Mild fever and dry cough for 3 days",
    "Feeling anxious and trouble sleeping",
    "What do high triglycerides mean in blood test?",
    "Dull lower back pain after prolonged sitting"
  ];

  // Route protection
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center mx-auto border border-teal-100">
            <Lock className="w-5 h-5 stroke-[2.2]" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Sign In Required</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Please sign in to access your personal GlobalHealthAI workspace.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate ? onNavigate('/login') : (window.location.pathname = '/login')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full max-w-full overflow-x-hidden font-sans flex antialiased transition-colors duration-300 ${
        isDark ? 'bg-[#080D1A] text-slate-100' : 'bg-[#F2F7FF] text-slate-900'
      }`}
    >
      
      {/* 1. Left Sidebar (260px fixed, clean & structured) */}
      <MinimalSidebar
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onNewChat={handleNewChat}
        onOpenLibrary={() => setActiveView('library')}
        activeView={activeView}
        onOpenHelp={() => setHelpOpen(true)}
        onOpenProfile={() => setProfileOpen(true)}
        user={user}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        onNavigateHome={handleNavigateHome}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 flex flex-col min-w-0 w-full max-w-full overflow-x-hidden lg:pl-[260px]">
        
        {/* Minimalist Top Bar with Ink-Bleed Theme Toggle */}
        <WorkspaceTopBar
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          activeView={activeView}
        />

        {/* Dynamic Main View */}
        <main className="flex-1 w-full max-w-full p-2.5 xs:p-3 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
          
          {activeView === 'library' ? (
            /* LIBRARY VIEW */
            <MinimalLibraryView
              reports={reports}
              conversations={conversations}
              onOpenConversation={handleOpenConversation}
              onDeleteReport={handleDeleteReport}
              onDeleteConversation={handleDeleteConversation}
            />
          ) : (
            /* MAIN CENTERED HEALTH WORKSPACE - GlobalHealthAI Theme */
            <div className="max-w-4xl w-full mx-auto space-y-4 sm:space-y-6 py-1 xs:py-2 sm:py-4 overflow-hidden">
              
              {/* Landing Page Clinical Trust Ribbon */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 xs:gap-2.5 p-1.5 xs:p-2 rounded-2xl bg-white/70 dark:bg-[#0B132B]/80 backdrop-blur-xs border border-blue-100 dark:border-slate-800 shadow-2xs w-full max-w-full overflow-hidden">
                <div className="flex items-center gap-1.5 xs:gap-2 px-2 xs:px-3 py-1.5 rounded-xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100/60 dark:border-slate-700/60 text-left min-w-0 overflow-hidden">
                  <div className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-[#F04B0A] flex items-center justify-center shrink-0">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div className="leading-tight min-w-0 flex-1 overflow-hidden">
                    <span className="block text-[10.5px] xs:text-[11px] font-bold text-[#08165B] dark:text-white truncate">Safety First</span>
                    <span className="text-[9.5px] xs:text-[10px] text-slate-500 dark:text-slate-400 truncate block">Red-Flag Triage</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 xs:gap-2 px-2 xs:px-3 py-1.5 rounded-xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100/60 dark:border-slate-700/60 text-left min-w-0 overflow-hidden">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-[#1677E8] flex items-center justify-center shrink-0">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div className="leading-tight min-w-0 flex-1 overflow-hidden">
                    <span className="block text-[10.5px] xs:text-[11px] font-bold text-[#08165B] dark:text-white truncate">1,000 Cards</span>
                    <span className="text-[9.5px] xs:text-[10px] text-slate-500 dark:text-slate-400 truncate block">Clinically Reviewed</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 xs:gap-2 px-2 xs:px-3 py-1.5 rounded-xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100/60 dark:border-slate-700/60 text-left min-w-0 overflow-hidden">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Target className="w-3.5 h-3.5" />
                  </div>
                  <div className="leading-tight min-w-0 flex-1 overflow-hidden">
                    <span className="block text-[10.5px] xs:text-[11px] font-bold text-[#08165B] dark:text-white truncate">Specific Answers</span>
                    <span className="text-[9.5px] xs:text-[10px] text-slate-500 dark:text-slate-400 truncate block">≈ 100 Words Guidance</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 xs:gap-2 px-2 xs:px-3 py-1.5 rounded-xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100/60 dark:border-slate-700/60 text-left min-w-0 overflow-hidden">
                  <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="leading-tight min-w-0 flex-1 overflow-hidden">
                    <span className="block text-[10.5px] xs:text-[11px] font-bold text-[#08165B] dark:text-white truncate">Dr P. Madhukar</span>
                    <span className="text-[9.5px] xs:text-[10px] text-slate-500 dark:text-slate-400 truncate block">38 Yrs Clinical Practice</span>
                  </div>
                </div>
              </div>

              {/* Clean Branding Greeting */}
              <div className="text-center space-y-2 pt-1 px-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 border border-blue-200/70 dark:border-slate-700 text-[#1677E8] dark:text-blue-300 text-xs font-semibold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#F04B0A]" />
                  <span>Physician-Curated Symptom Education</span>
                </div>

                <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#08165B] dark:text-white tracking-tight leading-snug break-words">
                  Know Your Symptoms. <span className="text-[#F04B0A]">Understand the Possibilities.</span>
                </h1>
                
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                  {activeCategory ? (
                    <>
                      Focused assessment active for <strong className="text-[#08165B] dark:text-blue-300 font-bold">{activeCategory.name}</strong>. Describe symptoms, lab tests, or questions below.
                    </>
                  ) : (
                    'Describe your symptoms, ask about lab reports, or check clinical red flags for safe and reliable guidance.'
                  )}
                </p>
              </div>

              {/* Large Elevated Input Box (Matching Landing Page Search Aesthetics) */}
              <div className="space-y-3">
                <form
                  onSubmit={handleAnalyzeSymptoms}
                  className="bg-white dark:bg-[#0F1C36] rounded-2xl border border-blue-200/90 dark:border-slate-700 shadow-[0_8px_30px_rgba(8,22,91,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-blue-400 dark:hover:border-slate-600 focus-within:border-[#1677E8] dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15 transition-all p-3 sm:p-4"
                >
                  <textarea
                    rows={3}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAnalyzeSymptoms();
                      }
                    }}
                    placeholder={
                      activeCategory
                        ? `Describe what you are experiencing in ${activeCategory.name.toLowerCase()}... (e.g., mild fever and cough for 3 days, headache, or blood sugar questions)`
                        : 'What symptom are you worried about? e.g. cough, headache, stomach pain, chest heaviness, fever...'
                    }
                    className="w-full text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base font-normal resize-none focus:outline-none bg-transparent"
                  />

                  {/* Input Actions Footer */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                      <span className="hidden sm:inline">Press Enter to check • Shift+Enter for newline</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Voice Dictation Button */}
                      <button
                        type="button"
                        onClick={handleVoiceInput}
                        title="Voice dictation"
                        className={`p-2 rounded-xl transition-colors cursor-pointer ${
                          isListening
                            ? 'bg-red-500 text-white animate-pulse'
                            : 'text-[#1677E8] dark:text-blue-400 hover:text-[#08165B] dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-slate-800 border border-blue-100 dark:border-slate-700'
                        }`}
                      >
                        <Mic className="w-4 h-4" />
                      </button>

                      {/* Signature Orange Check a Symptom Button */}
                      <button
                        type="submit"
                        disabled={!promptText.trim()}
                        className="py-2.5 px-5 sm:px-6 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <span>Check a Symptom</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Example Prompt Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">Try asking:</span>
                  {exampleChips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPromptChip(chip)}
                      className="px-3 py-1 rounded-full bg-white dark:bg-slate-800/90 hover:bg-blue-50/70 dark:hover:bg-slate-700/80 border border-blue-200/80 dark:border-slate-700 text-[#08165B] dark:text-slate-200 hover:text-[#1677E8] dark:hover:text-blue-300 text-xs font-medium transition-all shadow-2xs hover:shadow-xs cursor-pointer truncate max-w-xs"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive "Quick Focus Topics" Shelf (Eliminates empty feeling) */}
              <div className="pt-1">
                <div className="flex items-center justify-between px-1 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#08165B] dark:text-white uppercase tracking-wider">
                      Explore by Health Focus
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {activeCategory ? `(Active: ${activeCategory.name})` : '(Select to focus assessment)'}
                    </span>
                  </div>
                  {activeCategory && (
                    <button
                      type="button"
                      onClick={() => setActiveCategory(null)}
                      className="text-xs text-[#1677E8] dark:text-blue-400 hover:text-[#08165B] dark:hover:text-white font-bold transition-colors cursor-pointer hover:underline"
                    >
                      ✕ Clear Focus (General)
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  {PORTAL_CATEGORIES.slice(0, 6).map((cat) => {
                    const isCurrent = activeCategory?.id === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`p-2.5 xs:p-3 rounded-xl border text-left transition-all cursor-pointer group flex flex-col justify-between min-w-0 overflow-hidden ${
                          isCurrent
                            ? 'bg-white dark:bg-[#0F1C36] border-[#1677E8] ring-2 ring-blue-500/20 shadow-sm'
                            : 'bg-white dark:bg-[#0B132B]/80 hover:bg-blue-50/40 dark:hover:bg-[#0F1C36] border-blue-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 shadow-2xs hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${cat.dotColor} shrink-0`} />
                          {isCurrent && <Check className="w-3.5 h-3.5 text-[#1677E8] stroke-[2.5]" />}
                        </div>
                        <span className="text-xs font-bold text-[#08165B] dark:text-white leading-tight group-hover:text-[#1677E8] dark:group-hover:text-blue-400 transition-colors truncate">
                          {cat.name.replace('My ', '')}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {cat.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Demo AI Triage Output Card */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-[#08165B] dark:text-white uppercase tracking-wider">
                    Clinical Guidance & Triage Assessment
                  </span>
                  <span className="text-[11px] font-semibold text-[#1677E8] dark:text-blue-300 bg-blue-50 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-blue-200/60 dark:border-slate-700">
                    Live Demo Mode
                  </span>
                </div>

                <MinimalAIAssessmentCard
                  activeSeverity={activeSeverity}
                  onSelectSeverity={(sev) => setActiveSeverity(sev)}
                  customQuery={promptText}
                  onSaveReport={handleSaveReport}
                />
              </div>

            </div>
          )}

        </main>

      </div>

      {/* Modals */}
      {helpOpen && <HelpModal onClose={() => setHelpOpen(false)} />}
      
      {profileOpen && (
        <ProfileSettingsModal
          user={user}
          onClose={() => setProfileOpen(false)}
          onLogout={handleLogout}
        />
      )}

      {/* Floating Interactive Health AI Chatbot */}
      <FloatingHealthChatbot user={user} activeCategory={activeCategory} />

    </div>
  );
}
