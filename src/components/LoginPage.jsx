import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Stethoscope,
  BookOpen,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ onNavigate }) {
  const { login } = useAuth();

  // Role: 'admin' | 'user'
  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-populate credentials when switching roles
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'admin') {
      setEmail('admin@gmail.com');
      setPassword('12345678');
    } else {
      setEmail('user@gmail.com');
      setPassword('12345678');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    // Simulate authenticating
    setTimeout(async () => {
      const result = await login(email, password, selectedRole);
      setIsLoading(false);
      if (result.success) {
        if (onNavigate) {
          onNavigate(result.redirect);
        } else {
          window.history.pushState({}, '', result.redirect);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      } else {
        setErrorMessage(result.error);
      }
    }, 700);
  };

  // 18 Floating particles matching the medical light theme
  const particles = [
    { top: '10%', left: '10%', size: 'w-1.5 h-1.5', delay: '0s', dur: '9s' },
    { top: '22%', left: '25%', size: 'w-2 h-2', delay: '2s', dur: '11s' },
    { top: '16%', left: '44%', size: 'w-1 h-1', delay: '1s', dur: '8s' },
    { top: '36%', left: '14%', size: 'w-2.5 h-2.5', delay: '3s', dur: '12s' },
    { top: '48%', left: '30%', size: 'w-1.5 h-1.5', delay: '1.5s', dur: '10s' },
    { top: '64%', left: '12%', size: 'w-2 h-2', delay: '2.5s', dur: '13s' },
    { top: '78%', left: '22%', size: 'w-1 h-1', delay: '0.5s', dur: '9s' },
    { top: '88%', left: '38%', size: 'w-2 h-2', delay: '4s', dur: '11s' },
    { top: '14%', left: '62%', size: 'w-1.5 h-1.5', delay: '2.2s', dur: '10s' },
    { top: '26%', left: '84%', size: 'w-2 h-2', delay: '3.5s', dur: '12s' },
    { top: '40%', left: '74%', size: 'w-1 h-1', delay: '1.8s', dur: '8.5s' },
    { top: '56%', left: '90%', size: 'w-2.5 h-2.5', delay: '4.2s', dur: '13s' },
    { top: '68%', left: '60%', size: 'w-1.5 h-1.5', delay: '0.8s', dur: '9.5s' },
    { top: '82%', left: '80%', size: 'w-2 h-2', delay: '2.8s', dur: '11.5s' },
    { top: '92%', left: '66%', size: 'w-1 h-1', delay: '1.2s', dur: '8s' },
    { top: '6%', left: '75%', size: 'w-1.5 h-1.5', delay: '3.1s', dur: '10s' },
    { top: '50%', left: '46%', size: 'w-2 h-2', delay: '2s', dur: '12s' },
    { top: '74%', left: '6%', size: 'w-1.5 h-1.5', delay: '1.6s', dur: '9s' },
  ];

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-hidden font-sans antialiased bg-gradient-to-br from-[#EEF5FF] via-[#F6FAFF] to-[#E5F0FF] animate-bg-shift selection:bg-blue-100 selection:text-blue-900">
      
      {/* =========================================================================
          1. LIGHT THEME ANIMATED BACKGROUND (NO IMAGES, NO DOCTORS, NO VIDEOS)
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Soft Radial Ambient Base Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-sky-100/30" />

        {/* --- FLOATING BLURRED GRADIENT ORBS (Light Theme) --- */}
        {/* Orb 1: Medical Blue (#1677E8) Top-Left */}
        <div className="absolute -top-28 -left-24 w-[560px] h-[560px] rounded-full bg-[#1677E8]/16 blur-[120px] animate-orb-1" />

        {/* Orb 2: Radiant Cyan / Sky Blue Center-Right */}
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-[#38bdf8]/20 blur-[125px] animate-orb-2" />

        {/* Orb 3: Subtle Warm Orange Ambient Warmth Bottom-Center */}
        <div className="absolute -bottom-32 left-1/4 w-[450px] h-[450px] rounded-full bg-[#F04B0A]/12 blur-[120px] animate-orb-3" />

        {/* Orb 4: Soft Indigo Floating Bottom-Right */}
        <div className="absolute -bottom-20 -right-20 w-[580px] h-[580px] rounded-full bg-[#6366f1]/12 blur-[130px] animate-orb-4" />

        {/* --- ABSTRACT FLOWING CURVED LINES & SOFT LIGHT WAVES (SVG) --- */}
        <div className="absolute inset-0 flex items-center justify-center opacity-45">
          {/* Wave Layer 1 */}
          <svg
            className="absolute w-[160%] h-[120%] -left-[30%] top-0 animate-wave-1"
            viewBox="0 0 1440 900"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M-100,320 C240,480 480,180 820,380 C1160,580 1380,260 1600,420 L1600,900 L-100,900 Z"
              fill="url(#lightWaveGrad1)"
              opacity="0.65"
            />
            <defs>
              <linearGradient id="lightWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1677E8" stopOpacity="0.18" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#c7ddff" stopOpacity="0.0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Wave Layer 2 */}
          <svg
            className="absolute w-[150%] h-[130%] -left-[20%] -top-[10%] animate-wave-2"
            viewBox="0 0 1440 900"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M-50,580 C260,390 620,680 960,490 C1300,300 1460,520 1620,440"
              stroke="url(#flowingCurveGradLight)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              opacity="0.4"
            />
            <path
              d="M-50,540 C280,360 640,650 980,460 C1320,270 1480,490 1640,410"
              stroke="url(#flowingCurveGradLight)"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <defs>
              <linearGradient id="flowingCurveGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1677E8" stopOpacity="0.0" />
                <stop offset="30%" stopColor="#1677E8" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#0284c7" stopOpacity="0.4" />
                <stop offset="90%" stopColor="#F04B0A" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#1677E8" stopOpacity="0.0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* --- SUBTLE ANIMATED GLOWING CONCENTRIC CIRCLES & GEOMETRIC SHAPES --- */}
        {/* Large Decorative Geometric Ring Behind Left Branding */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full border border-[#1677E8]/18 animate-geo-spin pointer-events-none hidden md:block">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1677E8] shadow-[0_0_10px_#1677E8]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F04B0A] shadow-[0_0_10px_#F04B0A]" />
        </div>

        {/* Inner Counter-Rotating Dashed Circle */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-dashed border-[#1677E8]/20 animate-geo-spin-reverse pointer-events-none hidden md:block" />

        {/* Breathing Center Core Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full bg-blue-400/10 blur-2xl animate-pulse-glow pointer-events-none" />

        {/* --- SLOWLY MOVING GLOWING PARTICLES --- */}
        {particles.map((p, idx) => (
          <div
            key={idx}
            className={`absolute ${p.size} rounded-full bg-[#1677E8]/40 shadow-[0_0_6px_rgba(22,119,232,0.5)]`}
            style={{
              top: p.top,
              left: p.left,
              animation: `particleDriftUp ${p.dur} ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}

        {/* Subtle Healthcare Micro-Dot Matrix */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #08165B 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        />

      </div>

      {/* =========================================================================
          2. SPLIT-SCREEN CONTENT CONTAINER
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ================= LEFT SIDE: BRANDING & CLINICAL AUTHORITY ================= */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pr-4">
          
          {/* Back to Home Button */}
          <div>
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('/') : (window.location.pathname = '/')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 hover:bg-white text-[#08165B] border border-[#D6E6FA] text-xs font-semibold backdrop-blur-md shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#1677E8] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Homepage</span>
            </button>
          </div>

          {/* Brand Logo & Medical Emblem (Exact Landing Page Brand Identity) */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => onNavigate && onNavigate('/')}>
            {/* Globe + Medical Cross SVG Emblem */}
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0 drop-shadow-sm">
              <svg viewBox="0 0 40 40" className="w-12 h-12" fill="none">
                <circle cx="20" cy="20" r="18" fill="#1677E8" />
                <path d="M20 2C10.06 2 2 10.06 2 20s8.06 18 18 18 18-8.06 18-18S29.94 2 20 2z" stroke="#08165B" strokeWidth="1.5" />
                <ellipse cx="20" cy="20" rx="9" ry="18" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
                <line x1="2" y1="20" x2="38" y2="20" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
                <line x1="5" y1="11" x2="35" y2="11" stroke="#ffffff" strokeWidth="1" opacity="0.65" />
                <line x1="5" y1="29" x2="35" y2="29" stroke="#ffffff" strokeWidth="1" opacity="0.65" />
                {/* Gold/Orange Cross */}
                <rect x="16" y="8" width="8" height="24" rx="2" fill="#F04B0A" stroke="#ffffff" strokeWidth="1" />
                <rect x="8" y="16" width="24" height="8" rx="2" fill="#F04B0A" stroke="#ffffff" strokeWidth="1" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center leading-none">
                <span className="text-[28px] sm:text-[32px] font-black text-[#08165B] tracking-tight">GlobalHealth</span>
                <span className="text-[28px] sm:text-[32px] font-black text-[#F04B0A] tracking-tight ml-0.5">AI</span>
                <span className="text-[12px] font-bold text-[#F04B0A] ml-0.5 align-super">™</span>
              </div>
              <div className="text-[8.5px] sm:text-[9.5px] font-bold text-[#08165B] tracking-wider uppercase mt-0.5">
                SYMPTOM EDUCATION <span className="text-[#F04B0A]">•</span> CLINICAL GUIDANCE <span className="text-[#F04B0A]">•</span> SAFE NEXT STEPS
              </div>
            </div>
          </div>

          {/* Hero Headlines (Landing Page Typography) */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#08165B] tracking-tight leading-[1.15]">
              Your Health, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#08165B] via-[#1677E8] to-[#08165B]">
                Your Knowledge.
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-bold text-[#F04B0A] tracking-tight">
              Smarter Health Decisions Start Here.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-[530px] font-normal pt-1">
              A physician-curated, AI-powered symptom education and decision intelligence platform. Access 1,000 clinically reviewed cards with insights curated from 38 years of frontline medical practice.
            </p>
          </div>

          {/* Healthcare Authority Abstract Glass Card (Translucent Glassmorphism) */}
          <div className="bg-white/65 backdrop-blur-xl border border-white/85 rounded-2xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(8,22,91,0.06),_inset_0_1px_2px_rgba(255,255,255,0.8)] max-w-[520px] space-y-3.5">
            <div className="flex items-center gap-3.5">
              {/* Glowing Abstract Stethoscope Medical Badge */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1677E8] to-[#0ea5e9] text-white flex items-center justify-center shadow-md shrink-0 border border-white/40">
                <Stethoscope className="w-6 h-6 stroke-[2.3]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-[#08165B] tracking-tight">Clinical Knowledge Base</span>
                  <span className="text-[10px] font-bold text-[#F04B0A] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                    38 Yrs Practice
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Physician-curated medical intelligence for patients & families</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-slate-200/70 text-[11px] font-semibold text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>1,000 Symptom Cards</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1677E8] shrink-0" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#F04B0A] shrink-0" />
                <span>38 Years Clinical Data</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>HIPAA & Privacy Safe</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDE: ULTRA-PREMIUM TRANSLUCENT GLASS LOGIN CARD ================= */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="w-full max-w-[480px] bg-white/60 sm:bg-white/65 backdrop-blur-[24px] border border-white/85 rounded-[28px] shadow-[0_20px_50px_rgba(8,22,91,0.08),_inset_0_1px_2px_rgba(255,255,255,0.9)] p-7 sm:p-9 transition-all duration-300 relative">
            
            {/* Top Cyan/Blue Glow Accent Line */}
            <div className="absolute top-0 left-8 right-8 h-[2.5px] bg-gradient-to-r from-transparent via-[#1677E8]/40 to-transparent rounded-full" />

            {/* Card Header */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-[28px] font-black text-[#08165B] tracking-tight">
                Welcome Back!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Sign in to continue to GlobalHealthAI.
              </p>
            </div>

            {/* Role Selection Tabs (Translucent Glass Style) */}
            <div className="mb-6">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Select Portal Access:
              </div>
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-white/45 border border-[#D6E6FA]/90 rounded-2xl backdrop-blur-md">
                {/* Admin Tab */}
                <button
                  type="button"
                  onClick={() => handleRoleChange('admin')}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-[13px] tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedRole === 'admin'
                      ? 'bg-gradient-to-r from-[#F04B0A] to-[#ff6224] text-white shadow-[0_4px_14px_rgba(240,75,10,0.35)]'
                      : 'bg-transparent text-[#08165B] hover:bg-white/50'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.3]" />
                  <span>ADMIN LOGIN</span>
                </button>

                {/* User Tab */}
                <button
                  type="button"
                  onClick={() => handleRoleChange('user')}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-[13px] tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedRole === 'user'
                      ? 'bg-gradient-to-r from-[#F04B0A] to-[#ff6224] text-white shadow-[0_4px_14px_rgba(240,75,10,0.35)]'
                      : 'bg-transparent text-[#08165B] hover:bg-white/50'
                  }`}
                >
                  <span>USER LOGIN</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Credentials Auto-Fill Pill */}
            <div className="mb-5 flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-white/55 border border-blue-200/70 backdrop-blur-md text-[11px] text-[#08165B] shadow-2xs">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F04B0A]" />
                <span className="font-semibold">
                  Demo Credentials Pre-filled:
                </span>
              </div>
              <span className="font-bold text-[#1677E8] bg-white/80 px-2 py-0.5 rounded-lg border border-blue-100 shadow-2xs">
                {selectedRole === 'admin' ? 'admin@gmail.com' : 'user@gmail.com'}
              </span>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50/95 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#08165B]">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/60 hover:bg-white/80 focus:bg-white/95 border border-[#D6E6FA] focus:border-[#1677E8] focus:ring-4 focus:ring-[#1677E8]/10 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 backdrop-blur-md transition-all outline-none shadow-2xs"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#08165B]">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/60 hover:bg-white/80 focus:bg-white/95 border border-[#D6E6FA] focus:border-[#1677E8] focus:ring-4 focus:ring-[#1677E8]/10 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 backdrop-blur-md transition-all outline-none shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#F04B0A] focus:ring-[#F04B0A]/30 cursor-pointer accent-[#F04B0A]"
                  />
                  <span className="font-semibold text-slate-600">Remember Me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('For this demo, please use password: 12345678')}
                  className="font-semibold text-[#1677E8] hover:text-[#08165B] transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 sm:py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#F04B0A] via-[#f75e23] to-[#F04B0A] hover:from-[#c2410c] hover:to-[#9a3412] text-white font-bold text-sm sm:text-base shadow-[0_8px_20px_rgba(240,75,10,0.35)] hover:shadow-[0_12px_28px_rgba(240,75,10,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Your Dashboard</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Footer Trust Badge */}
            <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Protected by 256-Bit SSL Encryption • HIPAA Compliant</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}