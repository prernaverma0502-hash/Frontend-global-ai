import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('globalhealth_auth');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const getRegisteredUsers = () => {
    try {
      const saved = localStorage.getItem('globalhealth_registered_users');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const register = async (name, email, password, role = 'user') => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();
    const cleanName = name.trim();

    if (!cleanName || !cleanEmail || !cleanPass) {
      return { success: false, error: 'All fields are required.' };
    }

    if (cleanPass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const existingUsers = getRegisteredUsers();
    if (
      cleanEmail === 'admin@gmail.com' ||
      cleanEmail === 'user@gmail.com' ||
      existingUsers.some(u => u.email === cleanEmail)
    ) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = {
      name: cleanName,
      email: cleanEmail,
      password: cleanPass,
      role: role || 'user',
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('globalhealth_registered_users', JSON.stringify(updatedUsers));

    const authUser = {
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    };

    setUser(authUser);
    localStorage.setItem('globalhealth_auth', JSON.stringify(authUser));

    return {
      success: true,
      redirect: authUser.role === 'admin' ? '/admin/dashboard' : '/user/dashboard',
      user: authUser
    };
  };

  const login = async (email, password, role) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // 1. Check Default Demo Credentials
    if (role === 'admin') {
      if (cleanEmail === 'admin@gmail.com' && cleanPass === '12345678') {
        const authUser = { email: 'admin@gmail.com', name: 'Clinical Administrator', role: 'admin' };
        setUser(authUser);
        localStorage.setItem('globalhealth_auth', JSON.stringify(authUser));
        return { success: true, redirect: '/admin/dashboard' };
      }
    } else {
      if (cleanEmail === 'user@gmail.com' && cleanPass === '12345678') {
        const authUser = { email: 'user@gmail.com', name: 'Patient / Family User', role: 'user' };
        setUser(authUser);
        localStorage.setItem('globalhealth_auth', JSON.stringify(authUser));
        return { success: true, redirect: '/user/dashboard' };
      }
    }

    // 2. Check Custom Registered Users
    const registeredUsers = getRegisteredUsers();
    const match = registeredUsers.find(
      u => u.email === cleanEmail && u.password === cleanPass
    );

    if (match) {
      const authUser = { email: match.email, name: match.name, role: match.role };
      setUser(authUser);
      localStorage.setItem('globalhealth_auth', JSON.stringify(authUser));
      return {
        success: true,
        redirect: authUser.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'
      };
    }

    // 3. Invalid
    if (role === 'admin') {
      return { success: false, error: 'Invalid admin credentials. Use admin@gmail.com and 12345678.' };
    }
    return { success: false, error: 'Invalid credentials. Please check your email and password or register a new account.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('globalhealth_auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
