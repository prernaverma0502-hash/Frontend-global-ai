import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SymptomSearch from './components/SymptomSearch';
import ExploreCategories from './components/ExploreCategories';
import MiddleRow from './components/MiddleRow';
import BottomRow from './components/BottomRow';
<<<<<<< HEAD
import AdminLayout from './admin/components/AdminLayout';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'admin'
  const [adminScreen, setAdminScreen] = useState('dashboard');

  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash;
      if (hash.startsWith('#admin')) {
        setCurrentView('admin');
        const parts = hash.split('/');
        if (parts[1]) {
          setAdminScreen(parts[1]);
        }
      } else {
        setCurrentView('landing');
      }
    }
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  if (currentView === 'admin') {
    return (
      <AdminLayout
        activeScreen={adminScreen}
        setActiveScreen={(screen) => {
          setAdminScreen(screen);
          window.location.hash = `#admin/${screen}`;
        }}
        onExitToLanding={() => {
          window.location.hash = '';
          setCurrentView('landing');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f8fd] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-6">
      
      {/* 1. Header / Navigation Bar with Admin Portal access */}
      <Header />
=======
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { AuthProvider } from './context/AuthContext';

function MainRouter() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  // Route: Login Page
  if (currentPath === '/login') {
    return <LoginPage onNavigate={navigate} />;
  }

  // Route: Admin Dashboard
  if (currentPath === '/admin/dashboard') {
    return <AdminDashboard onNavigate={navigate} />;
  }

  // Route: User Dashboard
  if (currentPath === '/user/dashboard') {
    return <UserDashboard onNavigate={navigate} />;
  }

  // Default Route: Existing Landing Page (Preserved 100% exactly)
  return (
    <div className="min-h-screen bg-[#f3f8fd] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-6">
      {/* 1. Header / Navigation Bar */}
      <Header onNavigate={navigate} />
>>>>>>> bd8394a20bdfba4b40e95636807943219f959697

      {/* Main Page Layout matching reference */}
      <main className="space-y-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Symptom Search Bar Row */}
        <SymptomSearch />

        {/* 4. Explore by Category (12 Cards) */}
        <ExploreCategories />

        {/* 5. Middle Row: A Message from Founder + How GlobalHealthAI Helps You */}
        <MiddleRow />

        {/* 6. Bottom Row: Red-Yellow-Green Guide + Popular Health Tools */}
        <BottomRow />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
}