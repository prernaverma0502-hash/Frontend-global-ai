import React from 'react';
import {
  User,
  LogOut,
  ArrowLeft,
  Activity,
  Heart,
  BookmarkCheck,
  FileSpreadsheet,
  Clock,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Search,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserDashboard({ onNavigate }) {
  const { user, logout } = useAuth();

  const isUser = user && (user.role === 'user' || user.role === 'admin');

  const handleLogout = () => {
    logout();
    if (onNavigate) {
      onNavigate('/login');
    } else {
      window.location.pathname = '/login';
    }
  };

  if (!isUser) {
    return (
      <div className="min-h-screen bg-[#F2F7FF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-blue-100 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-[#1677E8] flex items-center justify-center mx-auto border border-blue-200">
            <Lock className="w-6 h-6 stroke-[2.3]" />
          </div>
          <h2 className="text-2xl font-black text-[#08165B]">Sign In Required</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Please sign in to view your personalized patient & family health dashboard.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate ? onNavigate('/login') : (window.location.pathname = '/login')}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F04B0A] to-[#ff6224] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  const savedCards = [
    {
      title: 'Persistent Dry Cough & Throat Irritation',
      category: 'My Symptoms',
      status: 'Yellow - See a Doctor Soon',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
      date: 'Saved 2 days ago'
    },
    {
      title: 'Post-Meal Acidity & Upper Abdominal Pain',
      category: 'My Food & Nutrition',
      status: 'Green - Not Urgent',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      date: 'Saved 5 days ago'
    },
    {
      title: 'Sudden High Fever with Body Chills',
      category: 'My Chronic Conditions',
      status: 'Red - Emergency Attention',
      statusColor: 'bg-red-50 text-red-800 border-red-200',
      date: 'Saved 1 week ago'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F2F7FF] font-sans antialiased text-slate-800">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-2xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand Logo & Portal Tag */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate && onNavigate('/')}>
              <div className="w-9 h-9 rounded-full bg-[#1677E8] flex items-center justify-center text-white font-black text-sm shadow-xs">
                GH
              </div>
              <div className="flex items-center leading-none">
                <span className="text-xl font-black text-[#08165B]">GlobalHealth</span>
                <span className="text-xl font-black text-[#F04B0A]">AI</span>
              </div>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-blue-100/80 text-[#08165B] font-bold text-[11px] border border-blue-200">
              Patient & Family Portal
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('/') : (window.location.pathname = '/')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 text-xs font-bold text-[#08165B] hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Homepage</span>
            </button>

            <div className="text-right hidden md:block">
              <div className="text-xs font-bold text-[#08165B]">{user?.name}</div>
              <div className="text-[10px] text-slate-500 font-medium">{user?.email}</div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 font-bold text-xs border border-slate-200 hover:border-red-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#08165B] via-[#0d2780] to-[#1677E8] text-white p-6 sm:p-8 relative overflow-hidden shadow-[0_10px_30px_rgba(8,22,91,0.15)]">
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/20 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F04B0A]" />
              <span>Welcome Back, {user?.name || 'Valued Member'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Your Personal Health Knowledge Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
              Review your saved symptom cards, consult clinically reviewed summaries, or run a new symptom check validated by 38 years of clinical expertise.
            </p>
            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate ? onNavigate('/') : (window.location.pathname = '/')}
                className="px-4 py-2 rounded-xl bg-[#F04B0A] hover:bg-[#e04305] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Check New Symptoms</span>
              </button>
            </div>
          </div>

          {/* Decorative glowing orb in banner */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-[#D6E6FA] shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Saved Cards</span>
              <BookmarkCheck className="w-4 h-4 text-[#1677E8]" />
            </div>
            <div className="text-2xl font-black text-[#08165B]">3 Cards</div>
            <div className="text-[11px] text-slate-500 mt-1">Available offline anytime</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#D6E6FA] shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Clinical Guidance</span>
              <Stethoscope className="w-4 h-4 text-[#F04B0A]" />
            </div>
            <div className="text-2xl font-black text-[#08165B]">Active</div>
            <div className="text-[11px] text-slate-500 mt-1">Dr. Pratap Madhukar AI Assistant</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#D6E6FA] shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Doctor Summaries</span>
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-[#08165B]">2 Ready</div>
            <div className="text-[11px] text-slate-500 mt-1">Exportable for your next visit</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#D6E6FA] shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Emergency Protocol</span>
              <ShieldCheck className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl font-black text-[#08165B]">24/7 Verified</div>
            <div className="text-[11px] text-slate-500 mt-1">Red-Flag alert system live</div>
          </div>
        </div>

        {/* Saved Cards & Care Management */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Saved Symptom Cards */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#D6E6FA] shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#08165B]">Your Saved Symptom Cards</h3>
                <p className="text-xs text-slate-500">Quickly review symptoms you have checked for yourself or your family.</p>
              </div>
              <span className="text-xs font-bold text-[#1677E8] cursor-pointer hover:underline">View All</span>
            </div>

            <div className="space-y-3">
              {savedCards.map((card, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-200/80 hover:border-[#1677E8]/50 hover:bg-blue-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                        {card.category}
                      </span>
                      <span className="text-[11px] text-slate-400">• {card.date}</span>
                    </div>
                    <div className="font-bold text-sm text-[#08165B]">{card.title}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${card.statusColor}`}>
                      {card.status}
                    </span>
                    <button className="text-slate-400 hover:text-[#08165B] transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Authority Note */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-[#D6E6FA] shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1677E8] bg-slate-100 shrink-0">
                  <img src="/assets/founder-video.jpg" alt="Dr. Pratap Madhukar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#08165B]">Dr. Pratap Madhukar</div>
                  <div className="text-[10px] text-slate-500 font-medium">Physician • Clinical Editor</div>
                  <div className="text-[10px] font-bold text-[#F04B0A]">38 Years Experience</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                "Our mission is to empower you with calm clarity, clinical objectivity, and actionable next safe steps. Always escalate red-flag symptoms promptly."
              </p>
              <button
                onClick={() => onNavigate ? onNavigate('/') : (window.location.pathname = '/')}
                className="w-full py-2.5 rounded-xl border border-[#1677E8] text-[#1677E8] hover:bg-blue-50 font-bold text-xs transition-colors cursor-pointer"
              >
                Explore All 1,000 Cards
              </button>
            </div>

            {/* Emergency Hotline Box */}
            <div className="bg-red-50/80 rounded-3xl p-5 border border-red-200 text-red-900 space-y-2">
              <div className="flex items-center gap-2 font-black text-xs text-red-800 uppercase tracking-wide">
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>Emergency Red-Flag Hotline</span>
              </div>
              <p className="text-xs text-red-800 leading-relaxed">
                If experiencing severe chest pain, sudden breathlessness, or loss of consciousness, seek immediate hospital emergency care.
              </p>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
