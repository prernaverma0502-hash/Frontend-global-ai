import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './dashboard/Sidebar';
import TopHeader from './dashboard/TopHeader';
import DisclaimerModal from './dashboard/DisclaimerModal';
import AllCategoriesView from './dashboard/AllCategoriesView';
import CategoryBooksView from './dashboard/CategoryBooksView';
import BookDetailsView from './dashboard/BookDetailsView';
import BookReaderView from './dashboard/BookReaderView';
import FindABookView from './dashboard/FindABookView';
import LanguageView from './dashboard/LanguageView';
import SettingsView from './dashboard/SettingsView';
import { PUBLISHED_BOOKS, OFFICIAL_CATEGORIES, OFFICIAL_LANGUAGES } from '../data/healthSakhiData';
import { Lock, BookOpen } from 'lucide-react';

export default function UserDashboard({ onNavigate }) {
  const { user, logout } = useAuth();

  // Authentication check (Allows user or admin role)
  const isAuth = user && (user.role === 'user' || user.role === 'admin');

  // Disclaimer Acceptance Gate (Mandatory per client V1 specification)
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(() => {
    try {
      return !!localStorage.getItem('healthsakhi_disclaimer_accepted');
    } catch {
      return false;
    }
  });

  // Navigation & View States
  // 'categories' | 'category-books' | 'book-details' | 'reader' | 'search' | 'languages' | 'settings'
  const [activeView, setActiveView] = useState('categories');
  const [selectedCategoryId, setSelectedCategoryId] = useState('cat-1');
  const [selectedBookId, setSelectedBookId] = useState('book-1');
  const [selectedPageNumber, setSelectedPageNumber] = useState(1);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');

  // Sidebar Layout States
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Preferred Language (Default 'en', supports all 9 languages)
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    try {
      return localStorage.getItem('healthsakhi_pref_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  // Basic Accessibility Preferences
  const [accessibility, setAccessibility] = useState(() => {
    try {
      const saved = localStorage.getItem('healthsakhi_access_pref');
      return saved ? JSON.parse(saved) : { highContrast: false, reducedMotion: false };
    } catch {
      return { highContrast: false, reducedMotion: false };
    }
  });

  // Persist language changes
  useEffect(() => {
    try {
      localStorage.setItem('healthsakhi_pref_lang', selectedLanguage);
    } catch (e) {
      console.warn(e);
    }
  }, [selectedLanguage]);

  // Persist accessibility
  useEffect(() => {
    try {
      localStorage.setItem('healthsakhi_access_pref', JSON.stringify(accessibility));
    } catch (e) {
      console.warn(e);
    }
  }, [accessibility]);

  const handleLogout = () => {
    logout();
    if (onNavigate) {
      onNavigate('/login');
    } else {
      window.location.pathname = '/login';
    }
  };

  const handleNavigateHome = () => {
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.location.pathname = '/';
    }
  };

  // View Handlers
  const handleSelectCategory = (catId) => {
    setSelectedCategoryId(catId);
    setActiveView('category-books');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBook = (bookId, page = 1) => {
    setSelectedBookId(bookId);
    setSelectedPageNumber(page);
    setActiveView('book-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadBook = (bookId, page = 1) => {
    setSelectedBookId(bookId);
    setSelectedPageNumber(page);
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSearch = (query = '') => {
    setSearchInitialQuery(query);
    setActiveView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine current breadcrumb text for Top Header
  const getBreadcrumb = () => {
    if (activeView === 'categories') return 'All 14 Categories';
    if (activeView === 'category-books') {
      const c = OFFICIAL_CATEGORIES.find(cat => cat.id === selectedCategoryId);
      return c ? c.name : 'Category Books';
    }
    if (activeView === 'book-details') {
      const b = PUBLISHED_BOOKS.find(bk => bk.id === selectedBookId);
      return b ? b.title : 'Book Details';
    }
    if (activeView === 'reader') {
      const b = PUBLISHED_BOOKS.find(bk => bk.id === selectedBookId);
      return b ? `Reading: ${b.title}` : 'E-Book Reader';
    }
    if (activeView === 'search') return 'Find a Book (Library Index)';
    if (activeView === 'languages') return 'Language Editions';
    if (activeView === 'settings') return 'Application Settings';
    return 'All Categories';
  };

  // Route Protection
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#F2F7FF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-blue-100 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-[#1677E8] flex items-center justify-center mx-auto border border-blue-200">
            <Lock className="w-6 h-6 stroke-[2.3]" />
          </div>
          <h2 className="text-2xl font-black text-[#08165B]">Sign In Required</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Please sign in to access the GlobalHealthAI / HealthSakhi educational e-book library.
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

  return (
    <div className={`min-h-screen bg-[#F2F7FF] font-sans text-slate-800 flex flex-col antialiased ${accessibility.highContrast ? 'contrast-125' : ''}`}>
      
      {/* 1. Mandatory Educational Disclaimer Screen if not accepted */}
      {!disclaimerAccepted && (
        <DisclaimerModal
          onAccept={() => setDisclaimerAccepted(true)}
        />
      )}

      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. Left Collapsible Modern Sidebar */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          onLogout={handleLogout}
          onNavigateHome={handleNavigateHome}
        />

        {/* 3. Main Dashboard Wrapper */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          
          {/* Top Header Navigation */}
          <TopHeader
            activeView={activeView}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            breadcrumb={getBreadcrumb()}
            user={user}
            onLogout={handleLogout}
            onOpenMobileSidebar={() => setMobileOpen(true)}
            onNavigateHome={handleNavigateHome}
          />

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
            
            {/* View 1: All Categories (Default Dashboard Home) */}
            {activeView === 'categories' && (
              <AllCategoriesView
                onSelectCategory={handleSelectCategory}
                onNavigateToSearch={handleNavigateToSearch}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
              />
            )}

            {/* View 2: Category Books Listing */}
            {activeView === 'category-books' && (
              <CategoryBooksView
                categoryId={selectedCategoryId}
                onBack={() => setActiveView('categories')}
                onSelectBook={handleSelectBook}
                selectedLanguage={selectedLanguage}
              />
            )}

            {/* View 3: Book Details Page */}
            {activeView === 'book-details' && (
              <BookDetailsView
                bookId={selectedBookId}
                onBack={() => setActiveView('category-books')}
                onReadBook={handleReadBook}
                onViewIndex={(bookId) => handleReadBook(bookId, 1)}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
              />
            )}

            {/* View 4: E-Book Reader (The Core Feature) */}
            {activeView === 'reader' && (
              <BookReaderView
                bookId={selectedBookId}
                pageNumber={selectedPageNumber}
                onNavigatePage={(pageNum) => setSelectedPageNumber(pageNum)}
                onBackToDetails={() => setActiveView('book-details')}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                accessibility={accessibility}
              />
            )}

            {/* View 5: Find a Book (Search Interface) */}
            {activeView === 'search' && (
              <FindABookView
                initialQuery={searchInitialQuery}
                onSelectBook={handleReadBook}
                onNavigatePage={handleReadBook}
              />
            )}

            {/* View 6: Language Selection Page */}
            {activeView === 'languages' && (
              <LanguageView
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                onContinue={() => setActiveView('categories')}
              />
            )}

            {/* View 7: Settings Page */}
            {activeView === 'settings' && (
              <SettingsView
                user={user}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                accessibility={accessibility}
                setAccessibility={setAccessibility}
                onLogout={handleLogout}
              />
            )}

          </main>

        </div>

      </div>

    </div>
  );
}
