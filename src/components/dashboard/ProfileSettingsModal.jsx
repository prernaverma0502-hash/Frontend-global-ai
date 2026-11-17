import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';
import { userPortalStorage } from '../../services/userPortalStorage';

export default function ProfileSettingsModal({ user, onClose, onLogout }) {
  const [profile, setProfile] = useState(() => userPortalStorage.getProfile(user?.email));
  const [name, setName] = useState(profile.fullName || 'Clinical Patient');
  const [phone, setPhone] = useState(profile.emergencyContact || '+91 98765 43210');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Password fields
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    const updated = { ...profile, fullName: name, emergencyContact: phone };
    setProfile(updated);
    userPortalStorage.saveProfile(user?.email, updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (currentPass !== '12345678') {
      setPassMsg('Current password must match demo credentials (12345678).');
      return;
    }
    if (newPass.length < 6) {
      setPassMsg('New password must be at least 6 characters.');
      return;
    }
    setPassMsg('Password updated successfully.');
    setCurrentPass('');
    setNewPass('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-bold">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Profile & Settings</h3>
              <p className="text-[11px] text-slate-400">{user?.email || 'user@gmail.com'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {savedSuccess && (
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile saved successfully.</span>
          </div>
        )}

        {/* Basic Details Form */}
        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#0D9488]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Emergency Contact Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#0D9488]"
            />
          </div>

          <div className="pt-1 flex justify-end">
            <button
              type="submit"
              className="py-1.5 px-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Save Profile
            </button>
          </div>
        </form>

        {/* Change Password */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Security</span>
          </div>

          {passMsg && (
            <div className={`p-2 rounded-lg text-xs font-medium ${passMsg.includes('success') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
              {passMsg}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-2 text-xs">
            <input
              type="password"
              placeholder="Current Password (Demo: 12345678)"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200"
            />
            <button
              type="submit"
              className="w-full py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Sign Out Action */}
        <div className="pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onLogout}
            className="w-full py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of GlobalHealthAI</span>
          </button>
        </div>

      </div>
    </div>
  );
}
