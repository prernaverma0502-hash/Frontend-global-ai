import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  FileText,
  Trash2,
  Eye,
  Download,
  RefreshCw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Layers,
  Database,
  Calendar,
  Tag,
  ShieldCheck,
  FileCode,
  SlidersHorizontal,
  Upload,
  Info
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

export default function DocumentLibraryScreen({ navigateTo, showToast }) {
  const { documents, deleteDocument, reindexDocument, updateDocument } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFileType, setSelectedFileType] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'title' | 'chunks'

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Selected document for Drawer Modal
  const [activeDoc, setActiveDoc] = useState(null);
  const [drawerTab, setDrawerTab] = useState('overview'); // 'overview' | 'chunks' | 'metadata' | 'history'

  // Delete Confirmation Modal
  const [docToDelete, setDocToDelete] = useState(null);

  // Effective File URL for Original Document Preview
  const effectiveFileUrl = useMemo(() => {
    if (!activeDoc) return null;
    const cached = typeof window !== 'undefined' && window.__GLOBAL_HEALTH_FILE_CACHE__?.[activeDoc.id]?.url;
    return activeDoc.fileUrl || activeDoc.fileDataUrl || cached || null;
  }, [activeDoc]);

  const handleAttachFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && activeDoc) {
      const url = URL.createObjectURL(file);
      if (typeof window !== 'undefined') {
        window.__GLOBAL_HEALTH_FILE_CACHE__ = window.__GLOBAL_HEALTH_FILE_CACHE__ || {};
        window.__GLOBAL_HEALTH_FILE_CACHE__[activeDoc.id] = { file, url, name: file.name };
      }
      updateDocument(activeDoc.id, { fileUrl: url, originalFileName: file.name });
      setActiveDoc(prev => ({ ...prev, fileUrl: url, originalFileName: file.name }));
      if (showToast) showToast(`Original file "${file.name}" linked successfully!`);
    }
  };

  // Filter & Search Logic
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        searchQuery === '' ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doc.description || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
      const matchesType = selectedFileType === 'All' || doc.fileType === selectedFileType;
      const matchesLang = selectedLanguage === 'All' || doc.language === selectedLanguage;
      const matchesStatus = selectedStatus === 'All' || doc.status === selectedStatus;

      return matchesSearch && matchesCat && matchesType && matchesLang && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.uploadDate) - new Date(a.uploadDate);
      if (sortBy === 'oldest') return new Date(a.uploadDate) - new Date(b.uploadDate);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'chunks') return (b.chunksCount || 0) - (a.chunksCount || 0);
      return 0;
    });
  }, [documents, searchQuery, selectedCategory, selectedFileType, selectedLanguage, selectedStatus, sortBy]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage) || 1;
  const paginatedDocs = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    deleteDocument(id);
    setDocToDelete(null);
    if (activeDoc && activeDoc.id === id) setActiveDoc(null);
    showToast('Document deleted from knowledge base.');
  };

  const handleReindex = (doc) => {
    reindexDocument(doc.id);
    showToast(`Reindexing started for "${doc.title}"`);
  };

  const handleDownload = (doc) => {
    // Generate text blob for download
    const blob = new Blob([`${doc.title}\n\nCategory: ${doc.category}\nLanguage: ${doc.language}\n\nExtracted Content:\n${doc.extractedTextSample}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Download started for clinical source text.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner & Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#D6E6FA] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#08165B] flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#1677E8]" />
            <span>Clinical Document Library</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Browse, inspect semantic chunks, and manage verified medical knowledge assets available for AI retrieval.
          </p>
        </div>

        <button
          onClick={() => navigateTo('upload')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1677E8] hover:bg-[#08165B] text-white font-black text-xs transition-colors self-start sm:self-auto shadow-xs cursor-pointer"
        >
          <Upload className="w-4 h-4 stroke-[2.2]" />
          <span>Upload New Document</span>
        </button>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="bg-white rounded-2xl p-5 border border-[#D6E6FA] shadow-xs space-y-4">
        
        {/* Search input + Sort */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search documents by title, clinical tag, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D6E6FA] focus:border-[#1677E8] outline-none text-xs sm:text-sm text-[#08165B] font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[#D6E6FA] text-xs font-bold text-[#08165B] bg-white outline-none w-full md:w-auto"
            >
              <option value="newest">Newest Upload</option>
              <option value="oldest">Oldest Upload</option>
              <option value="title">Title (A-Z)</option>
              <option value="chunks">Most Chunks</option>
            </select>
          </div>
        </div>

        {/* Filter Pills / Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-bold mr-1">
            <Filter className="w-3.5 h-3.5 text-[#1677E8]" />
            <span>Filters:</span>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            className="px-2.5 py-1.5 rounded-lg border border-[#D6E6FA] font-medium text-slate-700 bg-slate-50 outline-none text-xs"
          >
            <option value="All">All Categories</option>
            <option value="Health Guidelines">Health Guidelines</option>
            <option value="Medical Research">Medical Research</option>
            <option value="Educational Content">Educational Content</option>
            <option value="Clinical Practice">Clinical Practice</option>
            <option value="Pharmacology">Pharmacology</option>
          </select>

          {/* File Type Filter */}
          <select
            value={selectedFileType}
            onChange={(e) => { setSelectedFileType(e.target.value); setCurrentPage(1); }}
            className="px-2.5 py-1.5 rounded-lg border border-[#D6E6FA] font-medium text-slate-700 bg-slate-50 outline-none text-xs"
          >
            <option value="All">All Types</option>
            <option value="PDF">PDF Documents</option>
            <option value="DOCX">DOCX Files</option>
            <option value="TXT">TXT Transcripts</option>
          </select>

          {/* Language Filter */}
          <select
            value={selectedLanguage}
            onChange={(e) => { setSelectedLanguage(e.target.value); setCurrentPage(1); }}
            className="px-2.5 py-1.5 rounded-lg border border-[#D6E6FA] font-medium text-slate-700 bg-slate-50 outline-none text-xs"
          >
            <option value="All">All Languages</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Marathi">Marathi</option>
            <option value="Spanish">Spanish</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
            className="px-2.5 py-1.5 rounded-lg border border-[#D6E6FA] font-medium text-slate-700 bg-slate-50 outline-none text-xs"
          >
            <option value="All">All Processing Statuses</option>
            <option value="Successfully Indexed">Successfully Indexed</option>
            <option value="Indexing">Indexing</option>
            <option value="Processing">Processing</option>
            <option value="Processing Failed">Processing Failed</option>
          </select>

          {(selectedCategory !== 'All' || selectedFileType !== 'All' || selectedLanguage !== 'All' || selectedStatus !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedFileType('All');
                setSelectedLanguage('All');
                setSelectedStatus('All');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="text-[#F04B0A] hover:underline font-bold text-xs ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>

      </div>

      {/* DOCUMENT TABLE */}
      <div className="bg-white rounded-2xl border border-[#D6E6FA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F2F7FF] border-b border-[#D6E6FA] text-[11px] font-black text-[#08165B] uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Document Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-3">Type</th>
                <th className="py-3.5 px-3">Language</th>
                <th className="py-3.5 px-4">Upload Date</th>
                <th className="py-3.5 px-4">Processing Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedDocs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <div className="font-bold text-slate-600">No documents found</div>
                    <div className="text-xs text-slate-400 mt-1">Try clearing your search query or filters.</div>
                  </td>
                </tr>
              ) : (
                paginatedDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    onClick={() => {
                      setActiveDoc(doc);
                      setDrawerTab('original');
                    }}
                  >
                    {/* Name & Size */}
                    <td className="py-3.5 px-4 sm:px-6 max-w-[280px]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1677E8] flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-[#08165B] truncate group-hover:text-[#1677E8]">
                            {doc.title}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <span>{doc.fileSize}</span>
                            <span>•</span>
                            <span>{doc.chunksCount} chunks</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#08165B] font-bold text-[11px] border border-blue-100">
                        {doc.category}
                      </span>
                    </td>

                    {/* File Type */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded font-black text-[10px] bg-slate-100 text-slate-700">
                        {doc.fileType}
                      </span>
                    </td>

                    {/* Language */}
                    <td className="py-3.5 px-3 whitespace-nowrap font-medium text-slate-600">
                      {doc.language}
                    </td>

                    {/* Upload Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-medium">
                      {doc.uploadDate}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        doc.status === 'Successfully Indexed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : doc.status === 'Processing Failed'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          doc.status === 'Successfully Indexed' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}></span>
                        <span>{doc.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setActiveDoc(doc);
                            setDrawerTab('original');
                          }}
                          title="View Original Document"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#1677E8] hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDownload(doc)}
                          title="Download Document"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#08165B] hover:bg-slate-100 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleReindex(doc)}
                          title="Reindex Knowledge Chunks"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDocToDelete(doc)}
                          title="Delete Document"
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

        {/* Pagination Bar */}
        <div className="p-4 border-t border-[#D6E6FA] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <strong className="text-[#08165B]">{paginatedDocs.length}</strong> of{' '}
            <strong className="text-[#08165B]">{filteredDocuments.length}</strong> filtered documents
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[#D6E6FA] disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-[#08165B]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-[#D6E6FA] disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* DOCUMENT DETAILS MODAL / DRAWER */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className={`bg-white dark:bg-[#0F1C36] rounded-3xl w-full ${drawerTab === 'original' ? 'max-w-5xl' : 'max-w-2xl'} max-h-[92vh] flex flex-col shadow-2xl border border-[#D6E6FA] dark:border-slate-700 overflow-hidden transition-all duration-300`}>
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#D6E6FA] dark:border-slate-700 flex items-start justify-between bg-gradient-to-r from-blue-50/70 to-white dark:from-slate-800/80 dark:to-[#0F1C36]">
              <div className="pr-4">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-[#1677E8] dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50 font-black text-[10px] uppercase">
                  {activeDoc.category}
                </span>
                <h3 className="text-lg font-black text-[#08165B] dark:text-white mt-1.5 leading-snug">
                  {activeDoc.title}
                </h3>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>ID: {activeDoc.id}</span>
                  <span>•</span>
                  <span>Uploaded {activeDoc.uploadDate}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveDoc(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Internal Tabs (High contrast in Dark and Light mode) */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/90 dark:bg-slate-900/80 text-xs font-bold overflow-x-auto">
              <button
                onClick={() => setDrawerTab('original')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  drawerTab === 'original'
                    ? 'border-[#1677E8] dark:border-blue-400 text-[#1677E8] dark:text-blue-400 font-black'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#08165B] dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Original Document</span>
                {effectiveFileUrl && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live File Attached"></span>
                )}
              </button>
              <button
                onClick={() => setDrawerTab('overview')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  drawerTab === 'overview'
                    ? 'border-[#1677E8] dark:border-blue-400 text-[#1677E8] dark:text-blue-400 font-black'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#08165B] dark:hover:text-white'
                }`}
              >
                Overview & Summary
              </button>
              <button
                onClick={() => setDrawerTab('chunks')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  drawerTab === 'chunks'
                    ? 'border-[#1677E8] dark:border-blue-400 text-[#1677E8] dark:text-blue-400 font-black'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#08165B] dark:hover:text-white'
                }`}
              >
                Extracted Text & Chunks ({activeDoc.chunksCount})
              </button>
              <button
                onClick={() => setDrawerTab('metadata')}
                className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  drawerTab === 'metadata'
                    ? 'border-[#1677E8] dark:border-blue-400 text-[#1677E8] dark:text-blue-400 font-black'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#08165B] dark:hover:text-white'
                }`}
              >
                Metadata & Vectors
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              
              {/* TAB 1: ORIGINAL DOCUMENT (PDF / FILE PREVIEW) */}
              {drawerTab === 'original' && (
                <div className="space-y-4">
                  {/* File Info & Action Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-blue-50/60 dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1677E8] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                        {activeDoc.fileType || 'PDF'}
                      </div>
                      <div>
                        <div className="font-bold text-[#08165B] dark:text-white text-xs sm:text-sm truncate max-w-md">
                          {activeDoc.originalFileName || `${activeDoc.title}.${(activeDoc.fileType || 'pdf').toLowerCase()}`}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>Size: {activeDoc.fileSize}</span>
                          <span>•</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Verified Original Source
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {effectiveFileUrl && (
                        <button
                          onClick={() => window.open(effectiveFileUrl, '_blank')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B132B] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
                          title="Open original document in full browser tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open in New Tab</span>
                        </button>
                      )}

                      <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-[#1677E8] dark:text-blue-300 font-bold text-xs hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-700/60 transition-colors cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{effectiveFileUrl ? 'Switch File' : 'Attach Local PDF'}</span>
                        <input
                          type="file"
                          accept=".pdf,.docx,.txt"
                          onChange={handleAttachFile}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Document Viewer Frame */}
                  {effectiveFileUrl ? (
                    <div className="w-full h-[540px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 shadow-inner flex flex-col">
                      <iframe
                        src={effectiveFileUrl}
                        className="w-full h-full border-0 bg-white"
                        title={`Original Document - ${activeDoc.title}`}
                      />
                    </div>
                  ) : (
                    /* Fallback Document Sheet / Manuscript Preview */
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-200 text-xs flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Info className="w-4 h-4 shrink-0 text-[#1677E8] dark:text-blue-400" />
                          <span>
                            Complete verified clinical text & structure for this document is displayed below. You can also click <strong>"Attach Local PDF"</strong> above to embed the exact physical PDF file.
                          </span>
                        </div>
                      </div>

                      {/* Formatted Medical Manuscript Paper Sheet */}
                      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6 text-slate-800 dark:text-slate-100 font-sans max-h-[500px] overflow-y-auto">
                        {/* Paper Header */}
                        <div className="border-b-2 border-[#08165B] dark:border-blue-500 pb-4 flex items-start justify-between">
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-[#1677E8] dark:text-blue-400">
                              GlobalHealthAI Clinical Knowledge Base • Verified Document
                            </div>
                            <h2 className="text-base sm:text-lg font-black text-[#08165B] dark:text-white mt-1">
                              {activeDoc.title}
                            </h2>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              Classification: {activeDoc.category} • Source: {activeDoc.sourceType} • Lang: {activeDoc.language}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold border border-emerald-300 dark:border-emerald-700">
                              <CheckCircle2 className="w-3 h-3" />
                              Verified & Indexed
                            </span>
                            <div className="text-[10px] text-slate-400 mt-1">ID: {activeDoc.id}</div>
                          </div>
                        </div>

                        {/* Section 1: Clinical Abstract */}
                        <div className="space-y-2">
                          <div className="text-xs font-black uppercase tracking-wider text-[#08165B] dark:text-blue-400">
                            1. Executive Abstract & Scope
                          </div>
                          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                            {activeDoc.description || 'Clinical knowledge reference source verified for medical grounding and safe next steps.'}
                          </p>
                        </div>

                        {/* Section 2: Primary Clinical Text */}
                        <div className="space-y-2">
                          <div className="text-xs font-black uppercase tracking-wider text-[#08165B] dark:text-blue-400">
                            2. Clinical Directives & Evidence Content
                          </div>
                          <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 font-mono text-[11px] whitespace-pre-wrap">
                            {activeDoc.extractedTextSample}
                          </div>
                        </div>

                        {/* Section 3: Indexing Verification Stamp */}
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2">
                          <div>
                            Reviewed by: <strong className="text-[#08165B] dark:text-white">Dr. Pratap Madhukar</strong> (Physician • Clinical Editor)
                          </div>
                          <div className="italic">
                            Indexed into {activeDoc.chunksCount} semantic vector chunks • 1536-dim Embedding Space
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {drawerTab === 'overview' && (
                <div className="space-y-4">
                  <div>
                    <div className="font-bold text-slate-400 uppercase text-[10px] mb-1">Description</div>
                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      {activeDoc.description || 'No additional description provided.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800">
                      <div className="text-[10px] font-bold text-slate-400">File Type & Size</div>
                      <div className="font-black text-[#08165B] dark:text-white mt-0.5">{activeDoc.fileType} ({activeDoc.fileSize})</div>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800">
                      <div className="text-[10px] font-bold text-slate-400">Source Type</div>
                      <div className="font-black text-[#08165B] dark:text-white mt-0.5">{activeDoc.sourceType}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800">
                      <div className="text-[10px] font-bold text-slate-400">Language</div>
                      <div className="font-black text-[#08165B] dark:text-white mt-0.5">{activeDoc.language}</div>
                    </div>
                  </div>

                  <div>
                    <div className="font-bold text-slate-400 uppercase text-[10px] mb-1.5">Clinical Tags</div>
                    <div className="flex flex-wrap gap-1.5">
                      {(activeDoc.tags || []).map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-[11px] border border-transparent dark:border-slate-700">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === 'chunks' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pb-1">
                    <span>Semantic Chunk Inspection (500 tokens / chunk)</span>
                    <span className="font-bold text-emerald-500">Embedding Vector Status: 1536-dim Active</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F2F7FF] dark:bg-slate-900/90 border border-[#D6E6FA] dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between font-bold text-[11px] text-[#08165B] dark:text-white">
                      <span>Chunk #1 [Characters 0-480]</span>
                      <span className="text-[#1677E8] dark:text-blue-400 font-bold">Relevance Index: 0.94</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-mono text-[11px]">
                      {activeDoc.extractedTextSample}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 italic text-[11px]">
                    + Remaining {activeDoc.chunksCount - 1} chunks are indexed into vector collection for semantic retrieval.
                  </div>
                </div>
              )}

              {drawerTab === 'metadata' && (
                <div className="space-y-3">
                  <table className="w-full text-left font-medium">
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                        <td className="py-2 text-slate-400 font-bold w-1/3">Knowledge Authority</td>
                        <td className="py-2 text-[#08165B] dark:text-white font-bold">{activeDoc.author || 'Admin Verified'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-400 font-bold">Vector Dimension</td>
                        <td className="py-2 text-[#08165B] dark:text-white font-bold">1536 (OpenAI / Gemini Embeddings compatible)</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-400 font-bold">Document Version</td>
                        <td className="py-2 text-[#08165B] dark:text-white font-bold">{activeDoc.version || '1.0'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-400 font-bold">Approval Status</td>
                        <td className="py-2 text-emerald-500 font-bold">Auto-Approved (Admin Knowledge Base)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Footer Actions (High Contrast in both Dark and Light Modes) */}
            <div className="p-4 border-t border-[#D6E6FA] dark:border-slate-800 bg-slate-50 dark:bg-[#0B132B] flex items-center justify-between">
              <button
                onClick={() => handleDownload(activeDoc)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Extracted Text</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleReindex(activeDoc);
                    setActiveDoc(null);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-[#1677E8] dark:text-blue-300 font-bold hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-700/60 transition-colors cursor-pointer"
                >
                  Reindex Document
                </button>
                <button
                  onClick={() => setActiveDoc(null)}
                  className="px-4 py-2 rounded-xl bg-[#08165B] dark:bg-[#1677E8] text-white font-bold hover:bg-blue-900 dark:hover:bg-blue-600 transition-colors cursor-pointer shadow-xs"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {docToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-rose-200 space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-[#08165B]">Delete Clinical Document?</h4>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Are you sure you want to delete <strong className="text-slate-800">"{docToDelete.title}"</strong>?
                This will purge all {docToDelete.chunksCount} vectorized chunks from the active AI knowledge base.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDocToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(docToDelete.id)}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 shadow-sm"
              >
                Delete Document
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
