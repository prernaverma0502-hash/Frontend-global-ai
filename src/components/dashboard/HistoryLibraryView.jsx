import React, { useState } from 'react';
import {
  Clock,
  FileText,
  Search,
  Filter,
  Trash2,
  Edit2,
  ArrowRight,
  Download,
  Share2,
  Eye,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  X,
  Stethoscope,
  ChevronDown
} from 'lucide-react';
import { HEALTH_CATEGORIES } from '../../data/healthKnowledgeBase';

export default function HistoryLibraryView({
  conversations = [],
  reports = [],
  onOpenConversation,
  onDeleteConversation,
  onRenameConversation,
  onDeleteReport
}) {
  const [activeTab, setActiveTab] = useState('conversations'); // 'conversations' | 'reports'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  // Rename modal state
  const [renameId, setRenameId] = useState(null);
  const [renameText, setRenameText] = useState('');

  // Report Preview Modal state
  const [previewReport, setPreviewReport] = useState(null);

  // Filter conversations
  const filteredConversations = conversations
    .filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (c.preview && c.preview.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategoryFilter === 'all' || c.category === selectedCategoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.date).getTime();
      const dateB = new Date(b.updatedAt || b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  // Filter reports
  const filteredReports = reports.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.summaryText && r.summaryText.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleStartRename = (conv) => {
    setRenameId(conv.id);
    setRenameText(conv.title);
  };

  const handleSaveRename = (e) => {
    e.preventDefault();
    if (renameText.trim() && onRenameConversation) {
      onRenameConversation(renameId, renameText.trim());
      setRenameId(null);
    }
  };

  const handlePrint = (report) => {
    window.print();
  };

  const handleShareWhatsApp = (report) => {
    const text = `*GlobalHealthAI - Doctor Summary Report*\n${report.title}\nDate: ${new Date(report.date).toLocaleDateString()}\nStatus: ${report.urgency}\n\n${report.summaryText}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="border-b border-[#D6E6FA] pb-5 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#08165B] tracking-tight">
          History & Health Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Review your prior AI health assessments, revisit conversations, or download physician consultation summaries.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#D6E6FA] gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('conversations')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'conversations'
              ? 'border-[#F04B0A] text-[#08165B]'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Conversation History ({conversations.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reports')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'border-[#F04B0A] text-[#08165B]'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Saved Doctor Summaries ({reports.length})</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#D6E6FA] shadow-2xs">
        
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'conversations' ? 'Search previous chats...' : 'Search doctor summaries...'}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:outline-none focus:border-[#1677E8]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Filters for Conversations tab */}
        {activeTab === 'conversations' && (
          <div className="flex items-center gap-2">
            {/* Category Filter */}
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#08165B] focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {HEALTH_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>

            {/* Sort Order */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#08165B] focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        )}

      </div>

      {/* TAB 1: CONVERSATION HISTORY */}
      {activeTab === 'conversations' && (
        <div className="space-y-3">
          {filteredConversations.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#D6E6FA] shadow-2xs space-y-2">
              <Clock className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-[#08165B]">No conversations found</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No past consultations matched your filters. Start a new assessment from the dashboard or New Chat.
              </p>
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const urgencyBadge = {
                RED: 'bg-red-50 text-red-700 border-red-200',
                YELLOW: 'bg-amber-50 text-amber-700 border-amber-200',
                GREEN: 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }[conv.urgency || 'GREEN'];

              return (
                <div
                  key={conv.id}
                  className="bg-white rounded-2xl border border-[#D6E6FA] hover:border-[#1677E8]/60 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1677E8]">
                        {conv.categoryName || 'My Symptoms'}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(conv.updatedAt || conv.date).toLocaleDateString()} at {new Date(conv.updatedAt || conv.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#08165B] group-hover:text-[#1677E8] transition-colors truncate">
                      {conv.title}
                    </h3>

                    <p className="text-xs text-slate-500 font-normal line-clamp-1">
                      {conv.preview}
                    </p>
                  </div>

                  {/* Actions & Urgency */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${urgencyBadge}`}>
                      {conv.urgency || 'GREEN'}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleStartRename(conv)}
                      className="p-2 rounded-xl text-slate-400 hover:text-[#08165B] hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Rename conversation"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteConversation && onDeleteConversation(conv.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenConversation(conv.id)}
                      className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#08165B] to-[#1677E8] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer ml-1"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: SAVED DOCTOR REPORTS */}
      {activeTab === 'reports' && (
        <div className="space-y-3">
          {filteredReports.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#D6E6FA] shadow-2xs space-y-2">
              <FileText className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-[#08165B]">No saved reports yet</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                When you run an assessment in New Chat, click "Save Doctor Summary" to keep a permanent clinical copy here.
              </p>
            </div>
          ) : (
            filteredReports.map((rep) => (
              <div
                key={rep.id}
                className="bg-white rounded-2xl border border-[#D6E6FA] hover:border-[#1677E8]/60 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Physician Summary
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(rep.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#08165B] group-hover:text-[#1677E8] transition-colors truncate">
                    {rep.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-normal line-clamp-2">
                    {rep.summaryText}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setPreviewReport(rep)}
                    className="p-2 rounded-xl text-slate-600 hover:text-[#08165B] hover:bg-blue-50 border border-slate-200 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#1677E8]" />
                    <span>View</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePrint(rep)}
                    className="p-2 rounded-xl text-slate-600 hover:text-[#08165B] hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                    title="Print / Save PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShareWhatsApp(rep)}
                    className="p-2 rounded-xl text-emerald-700 hover:bg-emerald-50 border border-emerald-200 transition-colors cursor-pointer"
                    title="Share via WhatsApp"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteReport && onDeleteReport(rep.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete report"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Rename Modal */}
      {renameId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <form onSubmit={handleSaveRename} className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-blue-100 space-y-4">
            <h3 className="text-base font-bold text-[#08165B]">Rename Conversation</h3>
            <input
              type="text"
              value={renameText}
              onChange={(e) => setRenameText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#1677E8]"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRenameId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#08165B] text-white text-xs font-bold hover:bg-[#1677E8] cursor-pointer"
              >
                Save Name
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Full Report Preview Modal */}
      {previewReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-blue-100 p-6 sm:p-8 space-y-5 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1677E8]">
                  GlobalHealthAI Clinical Summary
                </span>
                <h3 className="text-lg font-black text-[#08165B]">{previewReport.title}</h3>
              </div>
              <button
                onClick={() => setPreviewReport(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-700">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Patient Assessment Status</div>
                  <div className="font-bold text-[#08165B]">{previewReport.urgency} Evaluation</div>
                </div>
                <div className="text-right text-[11px] text-slate-500 font-medium">
                  {new Date(previewReport.date).toLocaleString()}
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-[#08165B] text-xs uppercase">Clinical Summary for Attending Doctor:</div>
                <p className="bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap font-normal">
                  {previewReport.summaryText}
                </p>
              </div>

              {previewReport.sourcesCited && (
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-slate-500">Cited Protocol Sources:</div>
                  <div className="text-slate-600 italic">{previewReport.sourcesCited}</div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => handlePrint(previewReport)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewReport(null)}
                className="px-4 py-2 rounded-xl bg-[#08165B] text-white font-bold text-xs hover:bg-[#1677E8] cursor-pointer"
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
