import React from 'react';
import { Globe, Plus, ShieldCheck, Heart, AlertCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Disclaimer Banner */}
        <div className="mb-10 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs text-slate-300">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white uppercase tracking-wider block sm:inline mr-2">Medical Disclaimer:</span>
            GlobalHealthAI is an educational and symptom guidance platform curated by licensed physicians. It is not a substitute for professional medical diagnosis, clinical consultation, or emergency care. If you are experiencing a life-threatening emergency, call 108 / 911 immediately or visit the nearest hospital.
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 text-white shadow-md">
                <Globe className="w-5 h-5 text-white" />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                  <div className="bg-red-500 text-white rounded-full p-0.5">
                    <Plus className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                </div>
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">GlobalHealth</span>
                <span className="text-xl font-black text-blue-400 tracking-tight">AI</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              SYMPTOM EDUCATION • CLINICAL GUIDANCE • SAFE NEXT STEPS.
              Empowering individuals and families with 1,000 clinically reviewed symptom cards from 38 years of physician experience.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Evidence-based clinical review protocols</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#search-section" className="hover:text-white transition-colors">Symptom Checker</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">All 23 Categories</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">1,000 Health Cards</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Dr Pratap Madhukar</a></li>
            </ul>
          </div>

          {/* Clinical Portals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">For Clinicians</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="hover:text-white cursor-pointer transition-colors">Doctor Summary Export</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Pharmacist Question Sheets</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Red-Flag Escalation Rules</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Clinical Advisory Board</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">CME & Case Studies</span></li>
            </ul>
          </div>

          {/* Regional Languages */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Languages</h4>
            <p className="text-xs text-slate-400 mb-2">Available in regional Indian languages for wider care access:</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded bg-slate-800 text-blue-300 text-xs font-semibold border border-slate-700">English (EN)</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">हिंदी (Hindi)</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">मराठी (Marathi)</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} GlobalHealthAI. All rights reserved. Dr Pratap Madhukar, Clinical Editor.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Clinical Governance</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
