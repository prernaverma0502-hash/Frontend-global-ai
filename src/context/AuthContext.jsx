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

  const login = async (email, password, role) => {
    // Mock Authentication Logic
    // Validate credentials per user requirements
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (role === 'admin') {
      if (cleanEmail === 'admin@gmail.com' && cleanPass === '12345678') {
        const authUser = { email: 'admin@gmail.com', name: 'Clinical Administrator', role: 'admin' };
        setUser(authUser);
        localStorage.setItem('globalhealth_auth', JSON.stringify(authUser));
        return { success: true, redirect: '/admin/dashboard' };
      } else {
        return { success: false, error: 'Invalid admin credentials. Use admin@gmail.com and 12345678.' };
      }
    } else {
      if (cleanEmail === 'user@gmail.com' && cleanPass === '12345678') {
        const authUser = { email: 'user@gmail.com', name: 'Patient / Family User', role: 'user' };
        setUser(authUser);
        localStorage.setItem('globalhealth_auth', JSON.stringify(authUser));
        return { success: true, redirect: '/user/dashboard' };
      } else {
        return { success: false, error: 'Invalid user credentials. Use user@gmail.com and 12345678.' };
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('globalhealth_auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
