import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  Search,
  BookMarked,
  FileText,
  Clock,
  Download,
  Share2,
  Trash2,
  ArrowRight,
  Eye,
  ShieldCheck,
  X
} from 'lucide-react';

export default function MinimalLibraryView({
  reports = [],
  conversations = [],
  onOpenConversation,
  onDeleteReport,
  onDeleteConversation
}) {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('reports'); // 'reports' | 'conversations'
  const [search, setSearch] = useState('');
  const [previewReport, setPreviewReport] = useState(null);

  const filteredReports = reports.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    (r.summaryText && r.summaryText.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredConversations = conversations.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    (c.preview && c.preview.toLowerCase().includes(search.toLowerCase()))
  );

  const handlePrint = (report) => {
    window.print();
  };

  const handleShare = (report) => {
    const text = `*GlobalHealthAI Summary*\n${report.title}\n${report.summaryText}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 max-w-4xl w-full mx-auto py-4 animate-in fade-in duration-200 overflow-hidden">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Personal Health Library
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            View saved AI health assessments, physician consultation summaries, and past chats.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'reports' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Saved Reports ({reports.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('conversations')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'conversations' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Past Chats ({conversations.length})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by topic, symptom, or summary..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0F1C36] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#1677E8] shadow-2xs"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
      </div>

      {/* Reports List */}
      {activeTab === 'reports' && (
        <div className="space-y-3">
          {filteredReports.length === 0 ? (
            <div className="bg-white dark:bg-[#0F1C36] rounded-2xl border border-slate-200 dark:border-slate-800 p-10 text-center space-y-2">
              <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">No saved reports found</div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                After generating an AI triage assessment, click "Save to Library" to keep it here.
              </p>
            </div>
          ) : (
            filteredReports.map((rep) => {
              const severityBadge = {
                GREEN: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
                YELLOW: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
                RED: 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
              }[rep.urgency || 'GREEN'];

              return (
                <div
                  key={rep.id}
                  className="bg-white dark:bg-[#0F1C36] rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${severityBadge}`}>
                        {rep.urgency === 'RED' ? 'Urgent' : rep.urgency === 'YELLOW' ? 'Caution' : 'Normal'}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        {new Date(rep.date).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#1677E8] transition-colors truncate">
                      {rep.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {rep.summaryText}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setPreviewReport(rep)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer text-xs flex items-center gap-1 font-medium"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePrint(rep)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShare(rep)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                      title="Share"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteReport && onDeleteReport(rep.id)}
                      className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Past Conversations List */}
      {activeTab === 'conversations' && (
        <div className="space-y-3">
          {filteredConversations.length === 0 ? (
            <div className="bg-white dark:bg-[#0F1C36] rounded-2xl border border-slate-200 dark:border-slate-800 p-10 text-center space-y-2">
              <Clock className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">No past conversations</div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Your past consultations will appear here automatically.
              </p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => onOpenConversation(conv.id)}
                className="bg-white dark:bg-[#0F1C36] rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 p-4 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {conv.categoryName || 'My Symptoms'}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      {new Date(conv.updatedAt || conv.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#1677E8] transition-colors truncate">
                    {conv.title}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {conv.preview}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 text-xs font-semibold text-[#1677E8] group-hover:translate-x-1 transition-transform">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal for Report Preview */}
      {previewReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488]">
                  Verified Assessment Report
                </span>
                <h3 className="text-base font-bold text-slate-900">{previewReport.title}</h3>
              </div>
              <button
                onClick={() => setPreviewReport(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Clinical Triage Level</span>
                  <span className="font-bold text-slate-900">{previewReport.urgency}</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  {new Date(previewReport.date).toLocaleDateString()}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Clinical Summary:</span>
                <p className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 font-normal">
                  {previewReport.summaryText}
                </p>
              </div>

              {previewReport.sourcesCited && (
                <div className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Sources: </span>
                  {previewReport.sourcesCited}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => handlePrint(previewReport)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewReport(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
