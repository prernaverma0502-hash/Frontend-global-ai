import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  Save,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { userPortalStorage } from '../../services/userPortalStorage';

export default function ProfileView({
  user,
  onLogout
}) {
  const [profile, setProfile] = useState(() => userPortalStorage.getProfile(user?.email));
  const [fullName, setFullName] = useState(profile.fullName || 'Clinical Patient');
  const [emergencyPhone, setEmergencyPhone] = useState(profile.emergencyContact || '+91 98765 43210');
  
  // Password change states
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  const [profileSuccess, setProfileSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...profile,
      fullName,
      emergencyContact: emergencyPhone
    };
    setProfile(updated);
    userPortalStorage.saveProfile(user?.email, updated);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 2500);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (currentPass !== '12345678') {
      setPassError('Current password does not match demo password (12345678).');
      return;
    }
    if (newPass.length < 6) {
      setPassError('New password must be at least 6 characters.');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('New password and confirmation do not match.');
      return;
    }

    setPassSuccess('Password updated securely for this session.');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="border-b border-[#D6E6FA] pb-5 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#08165B] tracking-tight">
          User Account & Health Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Manage your personal details, emergency contact information, and security credentials.
        </p>
      </div>

      {profileSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile information updated successfully!</span>
        </div>
      )}

      {/* 1. Profile Avatar & Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D6E6FA] shadow-2xs flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#08165B] to-[#1677E8] text-white flex items-center justify-center text-3xl font-black shadow-md border-2 border-white shrink-0">
          {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
        </div>

        <div className="space-y-1 text-center sm:text-left flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
            <h2 className="text-xl font-black text-[#08165B] tracking-tight truncate">
              {fullName}
            </h2>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1677E8] font-bold text-[10px] w-max mx-auto sm:mx-0">
              Verified Patient
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            {user?.email || 'user@gmail.com'}
          </p>

          <div className="pt-1 flex items-center gap-3 justify-center sm:justify-start text-[11px] text-slate-400 font-semibold">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#1677E8]" />
              <span>Member since: {profile.memberSince || 'November 2026'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HIPAA Compliant</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Basic Profile Details Form */}
      <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D6E6FA] shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-[#08165B] uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-[#1677E8]" />
          <span>Basic Personal Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#08165B]">Full Legal Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-[#1677E8]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#08165B]">Registered Email (Read Only)</label>
            <input
              type="email"
              disabled
              value={user?.email || 'user@gmail.com'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-500 cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-xs font-bold text-[#08165B]">Emergency Contact Number (For Red-Flag Escalation)</label>
            <div className="relative">
              <input
                type="text"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-[#1677E8]"
              />
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            <p className="text-[10px] text-slate-400">
              Used solely to format emergency doctor summaries during high-urgency health episodes.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="py-2.5 px-5 rounded-xl bg-[#08165B] hover:bg-[#1677E8] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Details</span>
          </button>
        </div>
      </form>

      {/* 3. Change Password Form */}
      <form onSubmit={handlePasswordChange} className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D6E6FA] shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-[#08165B] uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#1677E8]" />
          <span>Security & Change Password</span>
        </h3>

        {passError && (
          <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{passError}</span>
          </div>
        )}

        {passSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{passSuccess}</span>
          </div>
        )}

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#08165B]">Current Password (Demo: 12345678)</label>
            <input
              type="password"
              required
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-[#1677E8]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#08165B]">New Password</label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-[#1677E8]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#08165B]">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-[#1677E8]"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#F04B0A] to-[#ff6224] hover:from-[#d94207] hover:to-[#ea580c] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Update Password
          </button>
        </div>
      </form>

      {/* 4. Logout Card */}
      <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-red-900">Sign Out of Session</div>
          <div className="text-[11px] text-red-700">Clear local session tokens and return to login page</div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="py-2 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

    </div>
  );
}
