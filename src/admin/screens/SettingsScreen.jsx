import React, { useState } from 'react';
import {
  Settings,
  User,
  Shield,
  Bell,
  Sliders,
  CheckCircle2,
  Lock,
  Globe,
  Save,
  RotateCcw,
  AlertTriangle,
  Upload,
  Clock,
  Database
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

export default function SettingsScreen({ navigateTo, showToast }) {
  const { settings, updateSettings, resetToDefaultDemo } = useAdminStore();

  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'profile' | 'security' | 'notifications' | 'system'

  // Forms
  const [generalForm, setGeneralForm] = useState({ ...settings.general });
  const [profileForm, setProfileForm] = useState({ ...settings.profile });
  const [securityForm, setSecurityForm] = useState({ ...settings.security });
  const [notifForm, setNotifForm] = useState({ ...settings.notifications });
  const [systemForm, setSystemForm] = useState({ ...settings.systemLimits });

  // Password Change
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    updateSettings('general', generalForm);
    showToast('General platform settings updated.');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateSettings('profile', profileForm);
    showToast('Admin Profile updated successfully.');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwordForm.current || !passwordForm.newPass) {
      alert('Please fill out all password fields.');
      return;
    }
    if (passwordForm.newPass !== passwordForm.confirm) {
      alert('New password and confirm password do not match.');
      return;
    }
    setPasswordForm({ current: '', newPass: '', confirm: '' });
    showToast('Admin password changed successfully. Secure session refreshed.');
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    updateSettings('security', securityForm);
    showToast('Security policies & session limits updated.');
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    updateSettings('notifications', notifForm);
    showToast('Notification preferences saved.');
  };

  const handleSaveSystem = (e) => {
    e.preventDefault();
    updateSettings('systemLimits', systemForm);
    showToast('System configuration & indexing limits saved.');
  };

  const handleResetDemo = () => {
    const confirm = window.confirm('Reset all demo documents, settings and users to factory baseline?');
    if (confirm) {
      resetToDefaultDemo();
      showToast('Knowledge Base reset to initial clinical baseline.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#D6E6FA] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#08165B] flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#1677E8]" />
            <span>Platform Settings & Administration</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Configure enterprise healthcare parameters, administrator profile, session security, and indexing thresholds.
          </p>
        </div>

        <button
          onClick={handleResetDemo}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-[#08165B] hover:bg-slate-50 font-bold text-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* INTERNAL TABS: EXACTLY 5 TABS */}
      <div className="bg-white rounded-2xl border border-[#D6E6FA] shadow-xs overflow-hidden">
        
        {/* Tab Buttons */}
        <div className="flex border-b border-[#D6E6FA] overflow-x-auto bg-[#F2F7FF]/50 text-xs sm:text-sm font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'general' ? 'border-[#1677E8] text-[#1677E8] bg-white' : 'border-transparent hover:text-[#08165B]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>General Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'profile' ? 'border-[#1677E8] text-[#1677E8] bg-white' : 'border-transparent hover:text-[#08165B]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Admin Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'security' ? 'border-[#1677E8] text-[#1677E8] bg-white' : 'border-transparent hover:text-[#08165B]'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security & Session</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'notifications' ? 'border-[#1677E8] text-[#1677E8] bg-white' : 'border-transparent hover:text-[#08165B]'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'system' ? 'border-[#1677E8] text-[#1677E8] bg-white' : 'border-transparent hover:text-[#08165B]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>System Limits</span>
          </button>
        </div>

        {/* TAB 1: GENERAL SETTINGS */}
        {activeTab === 'general' && (
          <form onSubmit={handleSaveGeneral} className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-[#08165B]">Branding & Internationalization</h3>
              <p className="text-xs text-slate-500 font-medium">Application identity and clinical default localization.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-bold text-[#08165B] mb-2">Application Name</label>
                <input
                  type="text"
                  value={generalForm.appName}
                  onChange={(e) => setGeneralForm({ ...generalForm, appName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] outline-none font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#08165B] mb-2">Clinical Tagline</label>
                <input
                  type="text"
                  value={generalForm.tagline}
                  onChange={(e) => setGeneralForm({ ...generalForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] outline-none font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#08165B] mb-2">Default Clinical Language</label>
                <select
                  value={generalForm.defaultLanguage}
                  onChange={(e) => setGeneralForm({ ...generalForm, defaultLanguage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] outline-none font-medium bg-white"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Marathi">Marathi (मराठी)</option>
                  <option value="Spanish">Spanish (Español)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#08165B] mb-2">Platform Timezone</label>
                <input
                  type="text"
                  value={generalForm.timezone}
                  onChange={(e) => setGeneralForm({ ...generalForm, timezone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] outline-none font-medium"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#1677E8] text-white font-bold text-xs hover:bg-[#08165B] transition-colors"
              >
                Save General Settings
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: ADMIN PROFILE */}
        {activeTab === 'profile' && (
          <div className="p-6 sm:p-8 space-y-8 text-xs sm:text-sm">
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-[#08165B]">Administrator Credentials</h3>
                <p className="text-xs text-slate-500 font-medium">Personal profile and verified clinical contact.</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#08165B] text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                  {profileForm.avatar}
                </div>
                <div>
                  <div className="font-bold text-[#08165B] text-sm">{profileForm.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{profileForm.role}</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-0.5">● Verified Administrator</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-bold text-[#08165B] mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#08165B] mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] outline-none font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1677E8] text-white font-bold text-xs hover:bg-[#08165B]"
                >
                  Update Profile
                </button>
              </div>
            </form>

            {/* Change Password Sub-form */}
            <form onSubmit={handleChangePassword} className="space-y-4 pt-6 border-t border-slate-100">
              <div className="font-black text-[#08165B] text-sm">Change Admin Password</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-[#08165B] mb-1.5">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#08165B] mb-1.5">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.newPass}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#08165B] mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-black"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: SECURITY & SESSION */}
        {activeTab === 'security' && (
          <form onSubmit={handleSaveSecurity} className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-[#08165B]">Security, 2FA & Session Policies</h3>
              <p className="text-xs text-slate-500 font-medium">Protect administrative access and patient confidentiality.</p>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={securityForm.twoFactorAuth}
                  onChange={(e) => setSecurityForm({ ...securityForm, twoFactorAuth: e.target.checked })}
                  className="w-4 h-4 accent-[#1677E8] mt-0.5"
                />
                <div>
                  <div className="font-bold text-[#08165B]">Two-Factor Authentication (2FA) for Admins</div>
                  <div className="text-[11px] text-slate-500">Requires authenticator app code on every admin login.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={securityForm.enforceStrongPassword}
                  onChange={(e) => setSecurityForm({ ...securityForm, enforceStrongPassword: e.target.checked })}
                  className="w-4 h-4 accent-[#1677E8] mt-0.5"
                />
                <div>
                  <div className="font-bold text-[#08165B]">Enforce Complex Password Standard</div>
                  <div className="text-[11px] text-slate-500">Requires 12+ characters, symbols, numbers, and mixed case.</div>
                </div>
              </label>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#08165B] mb-1.5">Session Idle Timeout (Minutes)</label>
                  <input
                    type="number"
                    value={securityForm.sessionTimeoutMins}
                    onChange={(e) => setSecurityForm({ ...securityForm, sessionTimeoutMins: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#08165B] mb-1.5">Password Expiration (Days)</label>
                  <input
                    type="number"
                    value={securityForm.passwordExpirationDays}
                    onChange={(e) => setSecurityForm({ ...securityForm, passwordExpirationDays: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#1677E8] text-white font-bold text-xs hover:bg-[#08165B]"
              >
                Save Security Policies
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <form onSubmit={handleSaveNotifications} className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-[#08165B]">Alerts & System Notifications</h3>
              <p className="text-xs text-slate-500 font-medium">Control notifications for vector indexing, error alerts, and signups.</p>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <div className="font-bold text-[#08165B]">Document Processing & Indexing Alerts</div>
                  <div className="text-[11px] text-slate-500">Notifies when document chunking and vector indexing complete.</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifForm.documentProcessingAlerts}
                  onChange={(e) => setNotifForm({ ...notifForm, documentProcessingAlerts: e.target.checked })}
                  className="w-4 h-4 accent-[#1677E8]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <div className="font-bold text-[#08165B]">System Health & Latency Warnings</div>
                  <div className="text-[11px] text-slate-500">Alerts when LLM latency exceeds 500 ms or connection degrades.</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifForm.aiLatencySpikes}
                  onChange={(e) => setNotifForm({ ...notifForm, aiLatencySpikes: e.target.checked })}
                  className="w-4 h-4 accent-[#1677E8]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <div className="font-bold text-[#08165B]">User Registration Alerts</div>
                  <div className="text-[11px] text-slate-500">Notifies when new consumer or practitioner accounts register.</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifForm.newUserRegistrations}
                  onChange={(e) => setNotifForm({ ...notifForm, newUserRegistrations: e.target.checked })}
                  className="w-4 h-4 accent-[#1677E8]"
                />
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#1677E8] text-white font-bold text-xs hover:bg-[#08165B]"
              >
                Save Notifications
              </button>
            </div>
          </form>
        )}

        {/* TAB 5: SYSTEM LIMITS */}
        {activeTab === 'system' && (
          <form onSubmit={handleSaveSystem} className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-[#08165B]">System Limits & Processing Preferences</h3>
              <p className="text-xs text-slate-500 font-medium">Fine-tune chunk boundaries and upload file constraints.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-bold text-[#08165B] mb-2">Max Document File Size (MB)</label>
                <input
                  type="number"
                  value={systemForm.maxFileSizeMB}
                  onChange={(e) => setSystemForm({ ...systemForm, maxFileSizeMB: parseInt(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#08165B] mb-2">Chunk Size (Tokens)</label>
                <input
                  type="number"
                  value={systemForm.chunkSizeTokens}
                  onChange={(e) => setSystemForm({ ...systemForm, chunkSizeTokens: parseInt(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#08165B] mb-2">Chunk Overlap (Tokens)</label>
                <input
                  type="number"
                  value={systemForm.chunkOverlapTokens}
                  onChange={(e) => setSystemForm({ ...systemForm, chunkOverlapTokens: parseInt(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#08165B] mb-2">Maintenance Mode</label>
                <select
                  value={systemForm.maintenanceMode ? 'true' : 'false'}
                  onChange={(e) => setSystemForm({ ...systemForm, maintenanceMode: e.target.value === 'true' })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] outline-none bg-white"
                >
                  <option value="false">Disabled (Normal Operations)</option>
                  <option value="true">Enabled (Read-Only Mode)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#1677E8] text-white font-bold text-xs hover:bg-[#08165B]"
              >
                Save System Limits
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
}
