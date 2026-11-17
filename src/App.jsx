import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SymptomSearch from './components/SymptomSearch';
import ExploreCategories from './components/ExploreCategories';
import MiddleRow from './components/MiddleRow';
import BottomRow from './components/BottomRow';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f3f8fd] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-6">
      
      {/* 1. Header / Navigation Bar */}
      <Header />

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
