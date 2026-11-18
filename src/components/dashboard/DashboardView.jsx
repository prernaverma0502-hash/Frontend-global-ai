import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Mic,
  ArrowRight,
  Stethoscope,
  FileSpreadsheet,
  HeartPulse,
  Users,
  Brain,
  Utensils,
  ShieldCheck,
  ClipboardList,
  Clock,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { HEALTH_CATEGORIES } from '../../data/healthKnowledgeBase';

const ICON_MAP = {
  Stethoscope,
  FileSpreadsheet,
  HeartPulse,
  Users,
  Brain,
  Utensils,
  ShieldCheck,
  ClipboardList
};

export default function DashboardView({
  user,
  onStartNewChat,
  onOpenConversation,
  onNavigateHistory,
  recentConversations = []
}) {
  const [symptomInput, setSymptomInput] = useState('');
  const [selectedQuickCategory, setSelectedQuickCategory] = useState('symptoms');
  const [isListening, setIsListening] = useState(false);

  // Time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = user?.name ? user.name.split(' ')[0] : 'there';

  const handleStartSubmit = (e) => {
    e.preventDefault();
    onStartNewChat(selectedQuickCategory, symptomInput);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice dictation is supported in Chrome/Edge browsers.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSymptomInput(prev => prev ? `${prev} ${transcript}` : transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Welcome Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F04B0A]">
            {getGreeting()}, {userName}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-slate-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#08165B] tracking-tight">
          Welcome to GlobalHealthAI
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-normal">
          Your personal AI health guidance assistant, backed by 38 years of frontline clinical review and medical research.
        </p>
      </div>

      {/* 2. Main AI Assistant Card (Most Prominent Section) */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#08165B] via-[#0d287d] to-[#1677E8] text-white p-6 sm:p-8 lg:p-9 shadow-[0_15px_40px_rgba(8,22,91,0.18)] overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-60 h-60 rounded-full bg-[#F04B0A]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-blue-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#F04B0A]" />
            <span>AI Health Assessment & Clinical Triage</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            How are you feeling today?
          </h2>

          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
            Tell us about your health concerns and let our AI assistant help you understand your symptoms and possible next steps.
          </p>

          {/* Category Selection Shortcut Pills */}
          <div className="pt-1">
            <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block mb-2">
              Select Assessment Focus:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {HEALTH_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedQuickCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedQuickCategory === cat.id
                      ? 'bg-[#F04B0A] text-white shadow-md'
                      : 'bg-white/15 hover:bg-white/25 text-blue-100 border border-white/15'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Large Symptom Input Area */}
          <form onSubmit={handleStartSubmit} className="pt-2 space-y-3">
            <div className="relative">
              <textarea
                rows={3}
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                placeholder="Describe your symptoms in plain words... (e.g., I've had a persistent dry cough and mild fever for 3 days, headache, or ask about lab tests)"
                className="w-full p-4 pr-12 rounded-2xl bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm font-medium shadow-xl border border-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300/40 transition-all resize-none"
              />

              {/* Voice input button inside textarea */}
              <button
                type="button"
                onClick={handleVoiceInput}
                title="Dictate with voice"
                className={`absolute right-3.5 top-3.5 p-2 rounded-xl transition-colors cursor-pointer ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-slate-100 text-slate-500 hover:text-[#1677E8]'
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-blue-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by 256-Bit SSL • Evidence-Grounded Guidance</span>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#F04B0A] to-[#ff6224] hover:from-[#d94207] hover:to-[#ea580c] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Start AI Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* 3. Quick Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => onStartNewChat('symptoms')}
          className="p-4 rounded-2xl bg-white hover:bg-blue-50/50 border border-[#D6E6FA] shadow-2xs hover:shadow-xs transition-all flex items-center gap-3 text-left cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1677E8] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#08165B]">Start New Assessment</div>
            <div className="text-[11px] text-slate-500">Instant AI symptom triage</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigateHistory('conversations')}
          className="p-4 rounded-2xl bg-white hover:bg-blue-50/50 border border-[#D6E6FA] shadow-2xs hover:shadow-xs transition-all flex items-center gap-3 text-left cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F04B0A] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#08165B]">View Previous Chats</div>
            <div className="text-[11px] text-slate-500">Review past conversations</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigateHistory('reports')}
          className="p-4 rounded-2xl bg-white hover:bg-blue-50/50 border border-[#D6E6FA] shadow-2xs hover:shadow-xs transition-all flex items-center gap-3 text-left cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#08165B]">View Saved Reports</div>
            <div className="text-[11px] text-slate-500">Export doctor summaries</div>
          </div>
        </button>
      </div>

      {/* 4. Health Categories (8 Official Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#D6E6FA] pb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#08165B] tracking-tight">
              Explore Health Categories
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Select any category to launch a tailored AI consultation.
            </p>
          </div>
          <span className="text-xs font-bold text-[#1677E8] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            8 Specialized Modules
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HEALTH_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Stethoscope;

            return (
              <div
                key={cat.id}
                onClick={() => onStartNewChat(cat.id)}
                className="group bg-white hover:bg-blue-50/20 border border-[#D6E6FA] hover:border-[#1677E8]/60 rounded-3xl p-5 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Top colored accent line */}
                <div className={`absolute top-0 left-6 right-6 h-1 rounded-full bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#08165B] group-hover:text-[#1677E8] transition-colors leading-snug">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1 font-normal line-clamp-2">
                      {cat.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#F04B0A] group-hover:translate-x-1 transition-transform">
                  <span>Start Chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Recent Activity Section */}
      <div className="bg-white rounded-3xl border border-[#D6E6FA] p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-[#08165B]">Recent Health Assessments</h3>
            <p className="text-xs text-slate-500">Pick up where you left off or review previous triage guidance.</p>
          </div>
          <button
            onClick={() => onNavigateHistory('conversations')}
            className="text-xs font-bold text-[#1677E8] hover:underline cursor-pointer"
          >
            View All ({recentConversations.length})
          </button>
        </div>

        {recentConversations.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No previous conversations recorded yet. Start your first assessment above!
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentConversations.slice(0, 3).map((conv) => {
              const urgencyBadge = {
                RED: 'bg-red-50 text-red-700 border-red-200',
                YELLOW: 'bg-amber-50 text-amber-700 border-amber-200',
                GREEN: 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }[conv.urgency || 'GREEN'];

              return (
                <div
                  key={conv.id}
                  onClick={() => onOpenConversation(conv.id)}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 rounded-xl px-2 transition-colors cursor-pointer group"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {conv.categoryName || 'General'}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        • {new Date(conv.updatedAt || conv.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-[#08165B] group-hover:text-[#1677E8] transition-colors truncate">
                      {conv.title}
                    </div>

                    <p className="text-xs text-slate-500 truncate font-normal">
                      {conv.preview}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${urgencyBadge}`}>
                      {conv.urgency === 'RED' ? 'Urgent Warning' : conv.urgency === 'YELLOW' ? 'Caution: See Doctor' : 'Lower Concern'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
