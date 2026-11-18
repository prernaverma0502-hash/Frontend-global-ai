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
  Award,
  User,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './common/ThemeToggle';

export default function LoginPage({ onNavigate }) {
  const { login, register } = useAuth();
  const { isDark } = useTheme();

  // Role: 'admin' | 'user'
  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Register Modal State
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regRole, setRegRole] = useState('user');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

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
    }, 600);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError('Please complete all required fields.');
      return;
    }

    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }

    setRegLoading(true);

    setTimeout(async () => {
      const result = await register(regName, regEmail, regPassword, regRole);
      setRegLoading(false);

      if (result.success) {
        setRegSuccess(true);
        setTimeout(() => {
          setShowRegisterModal(false);
          if (onNavigate) {
            onNavigate(result.redirect);
          } else {
            window.history.pushState({}, '', result.redirect);
            window.dispatchEvent(new PopStateEvent('popstate'));
          }
        }, 800);
      } else {
        setRegError(result.error);
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
    { top: '74%', left: '6%', size: 'w-1.5 h-1.5', delay: '1.6s', dur: '9s' }
  ];

  return (
    <div
      className={`min-h-screen w-full relative flex items-center justify-center p-3 sm:p-5 lg:p-6 overflow-y-auto font-sans antialiased transition-colors duration-300 selection:bg-blue-100 selection:text-blue-900 ${
        isDark
          ? 'bg-gradient-to-br from-[#080D1A] via-[#0B132B] to-[#040814] text-slate-100'
          : 'bg-gradient-to-br from-[#EEF5FF] via-[#F6FAFF] to-[#E5F0FF] text-[#08165B]'
      }`}
    >
      {/* Top Floating Controls: Back button & Dark/Light Mode Toggle */}
      <div className="absolute top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 z-30 flex items-center justify-between pointer-events-auto">
        <button
          type="button"
          onClick={() => onNavigate ? onNavigate('/') : (window.location.pathname = '/')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer ${
            isDark
              ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
              : 'bg-white/90 hover:bg-white border-blue-200 text-[#08165B]'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Homepage</span>
        </button>

        {/* Global Dark/Light Mode Toggle */}
        <ThemeToggle variant="topbar" />
      </div>

      {/* 1. ANIMATED BACKGROUND PARTICLES & GRADIENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl ${
          isDark ? 'bg-blue-900/20' : 'bg-blue-300/20'
        }`} />
        <div className={`absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl ${
          isDark ? 'bg-cyan-900/20' : 'bg-cyan-300/20'
        }`} />
        <div className={`absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] rounded-full border pointer-events-none ${
          isDark ? 'border-blue-900/30 opacity-30' : 'border-blue-200/40 opacity-40'
        }`} />
        <div className={`absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] h-[350px] rounded-full border pointer-events-none ${
          isDark ? 'border-blue-900/40 opacity-40' : 'border-blue-200/50 opacity-50'
        }`} />

        {particles.map((p, i) => (
          <span
            key={i}
            className={`absolute rounded-full ${p.size} ${isDark ? 'bg-blue-400/20' : 'bg-blue-500/30'}`}
            style={{
              top: p.top,
              left: p.left,
              animation: `particleDriftUp ${p.dur} ease-in-out infinite`,
              animationDelay: p.delay
            }}
          />
        ))}
      </div>

      {/* 2. MAIN 2-COLUMN VIEWPORT-FITTING CONTAINER */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center my-auto pt-10 sm:pt-6 lg:pt-0">
        
        {/* ================= LEFT SIDE: BRANDING & CLINICAL INTEL ================= */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4">
          
          {/* Brand Logo & Medical Emblem */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onNavigate && onNavigate('/')}>
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0 drop-shadow-xs">
              <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
                <circle cx="20" cy="20" r="18" fill="#1677E8" />
                <path d="M20 2C10.06 2 2 10.06 2 20s8.06 18 18 18 18-8.06 18-18S29.94 2 20 2z" stroke="#08165B" strokeWidth="1.5" />
                <ellipse cx="20" cy="20" rx="9" ry="18" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
                <line x1="2" y1="20" x2="38" y2="20" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
                <rect x="16" y="8" width="8" height="24" rx="2" fill="#F04B0A" stroke="#ffffff" strokeWidth="1" />
                <rect x="8" y="16" width="24" height="8" rx="2" fill="#F04B0A" stroke="#ffffff" strokeWidth="1" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center leading-none">
                <span className={`text-[24px] sm:text-[27px] font-black tracking-tight ${
                  isDark ? 'text-white' : 'text-[#08165B]'
                }`}>
                  GlobalHealth
                </span>
                <span className="text-[24px] sm:text-[27px] font-black text-[#F04B0A] tracking-tight ml-0.5">AI</span>
                <span className="text-[11px] font-bold text-[#F04B0A] ml-0.5 align-super">™</span>
              </div>
              <div className={`text-[7.5px] sm:text-[8.5px] font-bold tracking-wider uppercase mt-0.5 ${
                isDark ? 'text-slate-300' : 'text-[#08165B]'
              }`}>
                SYMPTOM EDUCATION <span className="text-[#F04B0A]">•</span> CLINICAL GUIDANCE <span className="text-[#F04B0A]">•</span> SAFE NEXT STEPS
              </div>
            </div>
          </div>

          {/* Hero Headlines */}
          <div className="space-y-1 sm:space-y-1.5">
            <h1 className={`text-2xl sm:text-3xl lg:text-[38px] font-black tracking-tight leading-[1.15] ${
              isDark ? 'text-white' : 'text-[#08165B]'
            }`}>
              Your Health, <br className="hidden sm:inline" />
              <span className={
                isDark
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-300'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-[#08165B] via-[#1677E8] to-[#08165B]'
              }>
                Your Knowledge.
              </span>
            </h1>
            <p className="text-base sm:text-lg font-bold text-[#F04B0A] tracking-tight">
              Smarter Health Decisions Start Here.
            </p>
            <p className={`text-xs sm:text-[13px] leading-relaxed max-w-[500px] font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              A physician-curated, AI-powered symptom education and decision intelligence platform with 1,000 clinically reviewed cards from 38 years of frontline medical practice.
            </p>
          </div>

          {/* Authority Glass Card */}
          <div className={`backdrop-blur-xl border rounded-2xl p-3.5 sm:p-4 max-w-[500px] space-y-2.5 transition-colors duration-200 ${
            isDark
              ? 'bg-[#0F1C36]/80 border-slate-700/80 text-slate-100 shadow-xl'
              : 'bg-white/70 border-white/90 text-slate-800 shadow-sm'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1677E8] to-[#0ea5e9] text-white flex items-center justify-center shadow-xs shrink-0">
                <Stethoscope className="w-5 h-5 stroke-[2.3]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs sm:text-[13px] font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-[#08165B]'
                  }`}>
                    Clinical Knowledge Base
                  </span>
                  <span className={`text-[9.5px] font-bold px-2 py-0.2 rounded-full border ${
                    isDark
                      ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                      : 'bg-orange-50 text-[#F04B0A] border-orange-200'
                  }`}>
                    38 Yrs Practice
                  </span>
                </div>
                <div className={`text-[10.5px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Physician-curated medical intelligence for patients & families
                </div>
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-2 pt-2 border-t text-[10.5px] font-semibold ${
              isDark ? 'border-slate-700/80 text-slate-300' : 'border-slate-200/70 text-slate-700'
            }`}>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>1,000 Symptom Cards</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#F04B0A] shrink-0" />
                <span>38 Years Clinical Data</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>HIPAA & Privacy Safe</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDE: COMPACT TRANSLUCENT GLASS LOGIN CARD ================= */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className={`w-full max-w-[450px] backdrop-blur-[24px] border rounded-[24px] p-5 sm:p-6 lg:p-7 transition-all duration-300 relative ${
            isDark
              ? 'bg-[#0F1C36]/90 border-slate-700/90 text-slate-100 shadow-2xl'
              : 'bg-white/80 border-white/95 text-slate-800 shadow-[0_16px_45px_rgba(8,22,91,0.08)]'
          }`}>
            
            {/* Top Cyan/Blue Glow Accent Line */}
            <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#1677E8]/50 to-transparent rounded-full" />

            {/* Card Header */}
            <div className="mb-4">
              <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-[#08165B]'
              }`}>
                Welcome Back!
              </h2>
              <p className={`text-xs font-medium mt-0.5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Sign in to continue to GlobalHealthAI.
              </p>
            </div>

            {/* Role Selection Tabs */}
            <div className="mb-3.5">
              <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Select Portal Access:
              </div>
              <div className={`grid grid-cols-2 gap-1.5 p-1 border rounded-xl backdrop-blur-md ${
                isDark ? 'bg-slate-900/60 border-slate-700/80' : 'bg-white/50 border-[#D6E6FA]'
              }`}>
                <button
                  type="button"
                  onClick={() => handleRoleChange('admin')}
                  className={`py-2 px-2.5 rounded-lg font-bold text-xs tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedRole === 'admin'
                      ? 'bg-gradient-to-r from-[#F04B0A] to-[#ff6224] text-white shadow-xs'
                      : isDark
                        ? 'bg-transparent text-slate-300 hover:bg-slate-800'
                        : 'bg-transparent text-[#08165B] hover:bg-white/60'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ADMIN LOGIN</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange('user')}
                  className={`py-2 px-2.5 rounded-lg font-bold text-xs tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedRole === 'user'
                      ? 'bg-gradient-to-r from-[#F04B0A] to-[#ff6224] text-white shadow-xs'
                      : isDark
                        ? 'bg-transparent text-slate-300 hover:bg-slate-800'
                        : 'bg-transparent text-[#08165B] hover:bg-white/60'
                  }`}
                >
                  <span>USER LOGIN</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Credentials Pill */}
            <div className={`mb-3.5 flex items-center justify-between px-3 py-1.5 rounded-xl border text-[11px] ${
              isDark ? 'bg-slate-900/60 border-slate-700/80 text-slate-200' : 'bg-white/60 border-blue-200/70 text-[#08165B]'
            }`}>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F04B0A]" />
                <span className="font-semibold">Demo Credentials:</span>
              </div>
              <span className={`font-bold px-2 py-0.5 rounded-md border ${
                isDark ? 'bg-slate-800 border-slate-700 text-blue-300' : 'bg-white/80 border-blue-100 text-[#1677E8]'
              }`}>
                {selectedRole === 'admin' ? 'admin@gmail.com' : 'user@gmail.com'}
              </span>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="mb-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              
              {/* Email Input */}
              <div className="space-y-1">
                <label className={`block text-xs font-bold ${
                  isDark ? 'text-slate-200' : 'text-[#08165B]'
                }`}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium outline-none transition-all shadow-2xs ${
                      isDark
                        ? 'bg-[#0B132B] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20'
                        : 'bg-white/90 border-[#D6E6FA] text-slate-800 placeholder-slate-400 focus:border-[#1677E8] focus:ring-2 focus:ring-[#1677E8]/10'
                    }`}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className={`block text-xs font-bold ${
                  isDark ? 'text-slate-200' : 'text-[#08165B]'
                }`}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full pl-9 pr-9 py-2 rounded-xl border text-xs font-medium outline-none transition-all shadow-2xs ${
                      isDark
                        ? 'bg-[#0B132B] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20'
                        : 'bg-white/90 border-[#D6E6FA] text-slate-800 placeholder-slate-400 focus:border-[#1677E8] focus:ring-2 focus:ring-[#1677E8]/10'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-[11px] pt-0.5">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-[#F04B0A] focus:ring-[#F04B0A]/30 accent-[#F04B0A]"
                  />
                  <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Remember Me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('For this demo, please use password: 12345678')}
                  className="font-semibold text-[#1677E8] hover:underline transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-1.5">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-gradient-to-r from-[#F04B0A] via-[#f75e23] to-[#F04B0A] hover:from-[#c2410c] hover:to-[#9a3412] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
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

            {/* Register New User Link */}
            <div className="mt-3.5 text-center text-xs">
              <span className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Don't have an account? </span>
              <button
                type="button"
                onClick={() => {
                  setShowRegisterModal(true);
                  setRegError('');
                  setRegSuccess(false);
                }}
                className="font-bold text-[#F04B0A] hover:text-[#c2410c] hover:underline cursor-pointer"
              >
                Register New User
              </button>
            </div>

            {/* Footer Trust Badge */}
            <div className={`mt-4 pt-3 border-t flex items-center justify-center gap-1.5 text-[10.5px] font-medium ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200/60 text-slate-500'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Protected by 256-Bit SSL Encryption • HIPAA Compliant</span>
            </div>

          </div>
        </div>

      </div>

      {/* ================= SIGN UP / REGISTER MODAL POPUP ================= */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`w-full max-w-[460px] max-h-[92vh] overflow-y-auto backdrop-blur-2xl rounded-3xl p-6 sm:p-7 border shadow-2xl relative animate-in zoom-in-95 duration-200 ${
            isDark
              ? 'bg-[#0F1C36] border-slate-700 text-slate-100'
              : 'bg-white/95 border-blue-200 text-slate-800'
          }`}>
            
            {/* Top Controls in Modal: Theme Toggle & Close Button */}
            <div className="absolute top-5 right-5 flex items-center gap-1.5">
              <ThemeToggle variant="topbar" />
              <button
                type="button"
                onClick={() => setShowRegisterModal(false)}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Header */}
            <div className="mb-4 pr-16">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10.5px] font-bold mb-2 border border-blue-500/20">
                <Sparkles className="w-3 h-3 text-[#F04B0A]" />
                <span>Instant Patient & Caregiver Access</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-[#08165B]'
              }`}>
                Create Your Account
              </h3>
              <p className={`text-xs font-medium mt-0.5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Join GlobalHealthAI for verified clinical guidance & triage.
              </p>
            </div>

            {/* Error or Success notification */}
            {regError && (
              <div className="mb-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{regError}</span>
              </div>
            )}

            {regSuccess && (
              <div className="mb-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Account created successfully! Logging you in...</span>
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className={`block text-xs font-bold ${
                  isDark ? 'text-slate-200' : 'text-[#08165B]'
                }`}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Enter your name"
                    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs focus:outline-none transition-all ${
                      isDark
                        ? 'bg-[#080D1A] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400'
                        : 'bg-slate-50 border-[#D6E6FA] text-slate-800 placeholder-slate-400 focus:border-[#1677E8]'
                    }`}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className={`block text-xs font-bold ${
                  isDark ? 'text-slate-200' : 'text-[#08165B]'
                }`}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs focus:outline-none transition-all ${
                      isDark
                        ? 'bg-[#080D1A] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400'
                        : 'bg-slate-50 border-[#D6E6FA] text-slate-800 placeholder-slate-400 focus:border-[#1677E8]'
                    }`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className={`block text-xs font-bold ${
                    isDark ? 'text-slate-200' : 'text-[#08165B]'
                  }`}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none transition-all ${
                        isDark
                          ? 'bg-[#080D1A] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400'
                          : 'bg-slate-50 border-[#D6E6FA] text-slate-800 placeholder-slate-400 focus:border-[#1677E8]'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={`block text-xs font-bold ${
                    isDark ? 'text-slate-200' : 'text-[#08165B]'
                  }`}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none transition-all ${
                        isDark
                          ? 'bg-[#080D1A] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400'
                          : 'bg-slate-50 border-[#D6E6FA] text-slate-800 placeholder-slate-400 focus:border-[#1677E8]'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Role Option */}
              <div className="space-y-1 pt-1">
                <label className={`block text-xs font-bold ${
                  isDark ? 'text-slate-200' : 'text-[#08165B]'
                }`}>
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole('user')}
                    className={`py-1.5 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      regRole === 'user'
                        ? 'bg-blue-500/10 border-blue-500 text-blue-500 font-black'
                        : isDark
                          ? 'bg-slate-800/60 border-slate-700 text-slate-300'
                          : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Patient / Family User
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegRole('admin')}
                    className={`py-1.5 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      regRole === 'admin'
                        ? 'bg-orange-500/10 border-[#F04B0A] text-[#F04B0A] font-black'
                        : isDark
                          ? 'bg-slate-800/60 border-slate-700 text-slate-300'
                          : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Clinical Admin
                  </button>
                </div>
              </div>

              {/* Submit Register Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={regLoading || regSuccess}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F04B0A] to-[#ff6224] hover:from-[#c2410c] hover:to-[#9a3412] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {regLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account & Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Already have an account link */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className={`text-xs font-semibold ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#08165B]'}`}
                >
                  Already have an account? <span className="text-[#1677E8] font-bold hover:underline">Sign In</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
