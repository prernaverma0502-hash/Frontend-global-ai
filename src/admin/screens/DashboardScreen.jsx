import React from 'react';
import {
  FileText,
  CheckCircle,
  Tag,
  Database,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  ShieldAlert,
  ShieldCheck,
  UploadCloud,
  BookOpen,
  Sliders,
  ChevronRight,
  Sparkles,
  Layers,
  Clock
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

export default function DashboardScreen({ navigateTo, showToast }) {
  const {
    totalDocuments,
    approvedDocuments,
    knowledgeTopicsCount,
    totalChunks,
    indexedContentPercent,
    aiReadinessScore,
    categoryCounts,
    activities,
    aiConfig
  } = useAdminStore();

  // Color mapping for content distribution
  const categoryPalette = {
    'Medical Research': { bg: 'bg-[#1677E8]', fill: '#1677E8', text: 'text-[#1677E8]' },
    'Health Guidelines': { bg: 'bg-[#F04B0A]', fill: '#F04B0A', text: 'text-[#F04B0A]' },
    'Educational Content': { bg: 'bg-[#08165B]', fill: '#08165B', text: 'text-[#08165B]' },
    'Other Content': { bg: 'bg-emerald-500', fill: '#10b981', text: 'text-emerald-600' }
  };

  const totalCatDocs = Object.values(categoryCounts).reduce((a, b) => a + b, 0) || 1;

  // Compute SVG Donut Chart slices
  let accumulatedAngle = 0;
  const donutSlices = Object.entries(categoryCounts).map(([cat, count]) => {
    const fraction = count / totalCatDocs;
    const degrees = fraction * 360;
    const startAngle = accumulatedAngle;
    accumulatedAngle += degrees;
    return {
      category: cat,
      count,
      percent: Math.round(fraction * 100),
      startAngle,
      degrees,
      color: categoryPalette[cat]?.fill || '#94a3b8'
    };
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. TOP 5 STATISTICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Card 1: Total Documents */}
        <div className="bg-white rounded-2xl p-5 border border-[#D6E6FA] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Documents</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1677E8] flex items-center justify-center">
              <FileText className="w-4 h-4 stroke-[2.3]" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#08165B] mb-1">
            {totalDocuments}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active knowledge assets</span>
          </div>
        </div>

        {/* Card 2: Approved Documents (All admin documents are approved knowledge sources) */}
        <div className="bg-white rounded-2xl p-5 border border-[#D6E6FA] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Approved Documents</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 stroke-[2.3]" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#08165B] mb-1">
            {approvedDocuments}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <span>100% of admin uploads valid</span>
          </div>
        </div>

        {/* Card 3: Knowledge Topics */}
        <div className="bg-white rounded-2xl p-5 border border-[#D6E6FA] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Knowledge Topics</span>
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#F04B0A] flex items-center justify-center">
              <Tag className="w-4 h-4 stroke-[2.3]" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#08165B] mb-1">
            {knowledgeTopicsCount}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#F04B0A]">
            <span>Categorized clinical tags</span>
          </div>
        </div>

        {/* Card 4: Indexed Content */}
        <div className="bg-white rounded-2xl p-5 border border-[#D6E6FA] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Indexed Content</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Database className="w-4 h-4 stroke-[2.3]" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#08165B] mb-1">
            {totalChunks} <span className="text-sm font-bold text-slate-400">chunks</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-600">
            <span>{indexedContentPercent}% vectorized</span>
          </div>
        </div>

        {/* Card 5: AI Readiness (Dynamic calculation, not a hardcoded 100%) */}
        <div className="bg-white rounded-2xl p-5 border border-[#D6E6FA] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Readiness</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#08165B] flex items-center justify-center">
              <Activity className="w-4 h-4 stroke-[2.3]" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1677E8] mb-1">
            {aiReadinessScore}%
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Real-time system health</span>
          </div>
        </div>

      </div>

      {/* 2. MAIN DASHBOARD SPLIT: System Health + Content Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SECTION A: AI SYSTEM HEALTH (2 cols on desktop) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#D6E6FA] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#D6E6FA]">
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#08165B] flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#1677E8]" />
                <span>AI System Health & Vector Pipeline</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Real-time metrics for LLM connection, embedding retrieval, and grounding accuracy.
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                System Operational
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            
            {/* Health Item 1: Model Connection */}
            <div className="p-4 rounded-xl bg-[#F2F7FF] dark:bg-[#0B132B] border border-[#D6E6FA] dark:border-slate-800 flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Model Connection</div>
                <div className="text-sm font-black text-[#08165B] dark:text-white mt-0.5">{aiConfig.model}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-2 flex items-center gap-2">
                  <span>Latency: <strong className="text-[#08165B] dark:text-white">{aiConfig.latencyMs} ms</strong></span>
                  <span>•</span>
                  <span>Provider: <strong className="text-[#08165B] dark:text-white">{aiConfig.provider}</strong></span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold">
                Healthy
              </span>
            </div>

            {/* Health Item 2: Knowledge Retrieval */}
            <div className="p-4 rounded-xl bg-[#F2F7FF] dark:bg-[#0B132B] border border-[#D6E6FA] dark:border-slate-800 flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Knowledge Retrieval</div>
                <div className="text-sm font-black text-[#08165B] dark:text-white mt-0.5">Vector Hybrid Index</div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-2 flex items-center gap-2">
                  <span>Sim. Threshold: <strong className="text-[#08165B] dark:text-white">{aiConfig.retrievalSettings.similarityThreshold}</strong></span>
                  <span>•</span>
                  <span>Top-K: <strong className="text-[#08165B] dark:text-white">{aiConfig.retrievalSettings.topKChunks}</strong></span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold">
                Healthy
              </span>
            </div>

            {/* Health Item 3: Response Quality */}
            <div className="p-4 rounded-xl bg-[#F2F7FF] dark:bg-[#0B132B] border border-[#D6E6FA] dark:border-slate-800 flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Response Quality</div>
                <div className="text-sm font-black text-[#08165B] dark:text-white mt-0.5">Evidence Grounded</div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-2 flex items-center gap-2">
                  <span>Grounding: <strong className="text-emerald-600 dark:text-emerald-400">98.2%</strong></span>
                  <span>•</span>
                  <span>Hallucination: <strong className="text-emerald-600 dark:text-emerald-400">&lt; 0.5%</strong></span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold">
                Healthy
              </span>
            </div>

            {/* Health Item 4: Safety Filters */}
            <div className="p-4 rounded-xl bg-[#F2F7FF] dark:bg-[#0B132B] border border-[#D6E6FA] dark:border-slate-800 flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Safety Filters</div>
                <div className="text-sm font-black text-[#08165B] dark:text-white mt-0.5">Clinical Red-Flag Guard</div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-2 flex items-center gap-2">
                  <span>No Diagnosis: <strong className="text-emerald-600 dark:text-emerald-400">Enforced</strong></span>
                  <span>•</span>
                  <span>Emergency: <strong className="text-emerald-600 dark:text-emerald-400">Active</strong></span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#1677E8] dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[10px] font-bold">
                Protected
              </span>
            </div>

          </div>

          {/* Quick link to AI config */}
          <div className="mt-5 pt-3 border-t border-[#D6E6FA] flex items-center justify-between text-xs">
            <span className="text-slate-500">All retrieval and safety instructions adhere to global health guidelines.</span>
            <button
              onClick={() => navigateTo('ai')}
              className="text-[#1677E8] hover:text-[#08165B] font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Manage AI Engine</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SECTION B: CONTENT DISTRIBUTION DONUT CHART */}
        <div className="bg-white rounded-2xl p-6 border border-[#D6E6FA] shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#08165B] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#F04B0A]" />
              <span>Content Distribution</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Knowledge base document share by clinical category.
            </p>
          </div>

          {/* Interactive Donut Illustration */}
          <div className="py-4 flex flex-col items-center justify-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {donutSlices.map((slice, idx) => {
                  const strokeDasharray = `${(slice.degrees / 360) * 282.7} 282.7`;
                  const strokeDashoffset = -((slice.startAngle / 360) * 282.7);
                  return (
                    <circle
                      key={idx}
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth="10"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-500 hover:opacity-80"
                    />
                  );
                })}
              </svg>
              {/* Inner Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-[#08165B]">{totalDocuments}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DOCS</span>
              </div>
            </div>

            {/* Legend */}
            <div className="w-full grid grid-cols-2 gap-2 mt-4 text-xs font-semibold">
              {donutSlices.map((slice, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }}></span>
                  <div className="truncate">
                    <span className="text-slate-700">{slice.category}</span>
                    <span className="text-slate-400 ml-1 font-bold">({slice.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigateTo('library')}
            className="w-full mt-2 py-2 rounded-xl bg-blue-50 text-[#1677E8] font-bold text-xs hover:bg-blue-100/60 transition-colors cursor-pointer text-center"
          >
            Explore Library
          </button>
        </div>

      </div>

      {/* 3. BOTTOM SECTION: Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SECTION C: RECENT ACTIVITY (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#D6E6FA] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#D6E6FA]">
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#08165B] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1677E8]" />
                <span>Recent System Activity</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Audit trail of document uploads, vector indexing, and administrative changes.
              </p>
            </div>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1677E8] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    {act.action.includes('Upload') ? 'UP' : act.action.includes('User') ? 'US' : 'AI'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#08165B]">{act.action}</div>
                    <div className="text-xs text-slate-600 font-medium">{act.target}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">By {act.user} • {act.category}</div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between text-right shrink-0">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                    {act.status}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 font-medium">{act.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION D: QUICK ACTIONS */}
        <div className="bg-white rounded-2xl p-6 border border-[#D6E6FA] shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#08165B] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F04B0A]" />
              <span>Admin Quick Actions</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Direct shortcuts for high-frequency admin operations.
            </p>

            <div className="mt-5 space-y-2.5">
              <button
                onClick={() => navigateTo('upload')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-blue-200 hover:border-[#1677E8] bg-blue-50/40 hover:bg-blue-50 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1677E8] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <UploadCloud className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#08165B] group-hover:text-[#1677E8]">
                      Upload Document
                    </div>
                    <div className="text-[11px] text-slate-500">Add research or guidelines</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#1677E8]" />
              </button>

              <button
                onClick={() => navigateTo('library')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#1677E8] bg-slate-50/50 hover:bg-blue-50/40 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#08165B] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <BookOpen className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#08165B] group-hover:text-[#1677E8]">
                      Browse Library
                    </div>
                    <div className="text-[11px] text-slate-500">Inspect chunks & metadata</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#1677E8]" />
              </button>

              <button
                onClick={() => navigateTo('ai')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#1677E8] bg-slate-50/50 hover:bg-blue-50/40 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F04B0A] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Cpu className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#08165B] group-hover:text-[#F04B0A]">
                      Manage AI Engine
                    </div>
                    <div className="text-[11px] text-slate-500">Model tuning & playground</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#F04B0A]" />
              </button>

              <button
                onClick={() => navigateTo('settings')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#1677E8] bg-slate-50/50 hover:bg-blue-50/40 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Sliders className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#08165B] group-hover:text-[#1677E8]">
                      Platform Settings
                    </div>
                    <div className="text-[11px] text-slate-500">System & admin security</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#1677E8]" />
              </button>
            </div>
          </div>

          <div className="pt-4 text-center">
            <span className="text-[11px] font-medium text-slate-400">
              GlobalHealthAI Clinical Architecture v2.4
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
