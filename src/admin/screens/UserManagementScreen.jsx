import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  UserPlus,
  ShieldCheck,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Key,
  X,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Mail,
  Calendar,
  Clock,
  Filter
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

export default function UserManagementScreen({ navigateTo, showToast }) {
  const { users, addUser, updateUser, deleteUser, toggleUserStatus, resetUserPassword } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [passwordResetUser, setPasswordResetUser] = useState(null);

  // Form State for Add User
  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    role: 'User', // STRICTLY: 'Admin' or 'User' only!
    password: ''
  });

  // User Statistics calculation
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const inactiveUsers = users.filter(u => u.status === 'Inactive').length;
  const recentlyRegistered = users.filter(u => {
    // Registered in last 30 days
    const reg = new Date(u.registeredDate);
    const diffDays = (new Date() - reg) / (1000 * 60 * 60 * 24);
    return diffDays <= 45;
  }).length;

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch =
        searchQuery === '' ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === 'All' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'All' || u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!addForm.name.trim() || !addForm.email.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    addUser({
      name: addForm.name,
      email: addForm.email,
      role: addForm.role
    });
    setShowAddModal(false);
    setAddForm({ name: '', email: '', role: 'User', password: '' });
    showToast('New user successfully added.');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingUser) return;
    updateUser(editingUser.id, {
      name: editingUser.name,
      email: editingUser.email,
      role: editingUser.role
    });
    setEditingUser(null);
    showToast('User profile updated successfully.');
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    deleteUser(userToDelete.id);
    setUserToDelete(null);
    showToast('User account removed.');
  };

  const handleConfirmPasswordReset = () => {
    if (!passwordResetUser) return;
    resetUserPassword(passwordResetUser.id);
    setPasswordResetUser(null);
    showToast(`Password reset link dispatched to ${passwordResetUser.email}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#D6E6FA] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#08165B] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#1677E8]" />
            <span>User Management & Access Control</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manage authenticated users. System strictly enforces two roles: <strong>Admin</strong> and <strong>User</strong>.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1677E8] hover:bg-[#08165B] text-white font-black text-xs transition-colors self-start sm:self-auto shadow-xs cursor-pointer"
        >
          <UserPlus className="w-4 h-4 stroke-[2.2]" />
          <span>Add New User</span>
        </button>
      </div>

      {/* USER STATISTICS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#D6E6FA] shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Users</div>
          <div className="text-2xl sm:text-3xl font-black text-[#08165B]">{totalUsers}</div>
          <div className="text-[11px] text-slate-400 mt-1">Registered accounts</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#D6E6FA] shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Users</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">{activeUsers}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Eligible to sign in</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#D6E6FA] shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Inactive Users</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-400">{inactiveUsers}</div>
          <div className="text-[11px] text-slate-400 mt-1">Access suspended</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#D6E6FA] shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Recently Registered</div>
          <div className="text-2xl sm:text-3xl font-black text-[#F04B0A]">{recentlyRegistered}</div>
          <div className="text-[11px] text-[#F04B0A] font-semibold mt-1">Last 45 days</div>
        </div>
      </div>

      {/* SEARCH & ROLE FILTER BAR */}
      <div className="bg-white rounded-2xl p-5 border border-[#D6E6FA] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by full name or email address..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D6E6FA] focus:border-[#1677E8] outline-none text-xs sm:text-sm font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0 text-xs">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-[#D6E6FA] font-bold text-[#08165B] bg-white outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin Only</option>
            <option value="User">User Only</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-[#D6E6FA] font-bold text-[#08165B] bg-white outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* USER TABLE */}
      <div className="bg-white rounded-2xl border border-[#D6E6FA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F2F7FF] border-b border-[#D6E6FA] text-[11px] font-black text-[#08165B] uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">User Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-3">Role</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4">Registered Date</th>
                <th className="py-3.5 px-4">Last Login</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    No users match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-blue-50/40 transition-colors">
                    
                    {/* User Name + Avatar */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                          user.role === 'Admin' ? 'bg-[#08165B] text-white' : 'bg-blue-100 text-[#1677E8]'
                        }`}>
                          {user.avatar}
                        </div>
                        <div className="font-bold text-[#08165B] truncate">{user.name}</div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 text-slate-600">
                      {user.email}
                    </td>

                    {/* Role: Strictly Admin or User */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                        user.role === 'Admin'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          user.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle account status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                        <span>{user.status}</span>
                      </button>
                    </td>

                    {/* Registered Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {user.registeredDate}
                    </td>

                    {/* Last Login */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {user.lastLogin}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingUser(user)}
                          title="Edit User"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#1677E8] hover:bg-blue-50 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setPasswordResetUser(user)}
                          title="Reset Password"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        >
                          <Key className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setUserToDelete(user)}
                          title="Delete User"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: ADD USER */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#0F1C36] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-[#D6E6FA] dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-[#08165B] dark:text-white">Add New GlobalHealthAI User</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  placeholder="e.g. Dr. Emily Watson"
                  className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  placeholder="e.g. emily.watson@hospital.org"
                  className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1">Role * (Strictly Admin or User)</label>
                <select
                  value={addForm.role}
                  onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] dark:border-slate-700 font-bold text-[#08165B] dark:text-white bg-white dark:bg-[#0B132B] outline-none text-xs"
                >
                  <option value="User" className="dark:bg-[#0B132B] dark:text-white">User (Standard Patient / Consumer Access)</option>
                  <option value="Admin" className="dark:bg-[#0B132B] dark:text-white">Admin (Full Administrative & Knowledge Console Access)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1677E8] text-white font-bold hover:bg-[#08165B] dark:hover:bg-blue-600"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT USER */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#0F1C36] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-[#D6E6FA] dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-[#08165B] dark:text-white">Edit User Account</h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1">Email Address</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] dark:border-slate-700 bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1">Role (Strictly Admin or User)</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D6E6FA] dark:border-slate-700 font-bold text-[#08165B] dark:text-white bg-white dark:bg-[#0B132B] outline-none text-xs"
                >
                  <option value="User" className="dark:bg-[#0B132B] dark:text-white">User</option>
                  <option value="Admin" className="dark:bg-[#0B132B] dark:text-white">Admin</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1677E8] text-white font-bold hover:bg-[#08165B] dark:hover:bg-blue-600"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DELETE USER CONFIRMATION */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#0F1C36] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-rose-200 dark:border-rose-900/60 space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-[#08165B] dark:text-white">Delete User Account?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-1 leading-relaxed">
                Are you sure you want to delete <strong className="text-slate-800 dark:text-white">{userToDelete.name}</strong> ({userToDelete.email})?
                This action revokes all login credentials immediately.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 shadow-md shadow-rose-600/30"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: PASSWORD RESET CONFIRMATION */}
      {passwordResetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#0F1C36] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-blue-200 dark:border-blue-900/60 space-y-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#1677E8] dark:text-blue-400 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-[#08165B] dark:text-white">Dispatch Password Reset Token?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-1 leading-relaxed">
                Send an encrypted password reset link to <strong className="text-slate-800 dark:text-white">{passwordResetUser.email}</strong>?
                The link will expire in 24 hours.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPasswordResetUser(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPasswordReset}
                className="px-4 py-2 rounded-xl bg-[#1677E8] text-white font-bold text-xs hover:bg-[#08165B] dark:hover:bg-blue-600 shadow-md shadow-blue-500/20"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
