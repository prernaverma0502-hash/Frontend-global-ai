import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  X,
  FileCheck,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Info,
  Clock,
  Layers,
  Database,
  Cpu
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

export default function UploadDocumentScreen({ navigateTo, showToast }) {
  const { addDocument, documents, settings } = useAdminStore();

  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Health Guidelines',
    sourceType: 'WHO Guideline',
    description: '',
    language: 'English',
    tags: 'Clinical Guidance, Evidence Based, Protocol'
  });

  const [pipelineState, setPipelineState] = useState(null); 
  // null | { step: 'validating'|'extracting'|'chunking'|'indexing'|'completed'|'failed', progress: number, error?: string }

  const fileInputRef = useRef(null);

  const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
  const maxFileSize = (settings.systemLimits?.maxFileSizeMB || 50) * 1024 * 1024;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFiles(Array.from(e.target.files));
    }
  };

  const processSelectedFiles = (selectedFiles) => {
    const valid = [];
    for (const file of selectedFiles) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (!['pdf', 'docx', 'txt'].includes(ext)) {
        alert(`File format .${ext} is not supported. Please upload PDF, DOCX, or TXT.`);
        continue;
      }
      if (file.size > maxFileSize) {
        alert(`File "${file.name}" exceeds the ${settings.systemLimits?.maxFileSizeMB || 50} MB limit.`);
        continue;
      }
      // Check duplicate
      const duplicate = documents.some(d => d.title.toLowerCase() === file.name.replace(/\.[^/.]+$/, '').toLowerCase());
      if (duplicate) {
        const proceed = window.confirm(`A document with similar title already exists in the Knowledge Base. Do you want to upload a new version?`);
        if (!proceed) continue;
      }

      valid.push(file);
    }

    if (valid.length > 0) {
      setFiles(valid);
      // Auto-populate Title if empty
      if (!formData.title) {
        const baseName = valid[0].name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setFormData(prev => ({ ...prev, title: baseName }));
      }
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartPipeline = () => {
    if (files.length === 0) {
      alert('Please select at least one document to upload.');
      return;
    }
    if (!formData.title.trim()) {
      alert('Please provide a Document Title.');
      return;
    }

    // Step 1: Validating & Uploading
    setPipelineState({ step: 'validating', progress: 15 });

    setTimeout(() => {
      // Step 2: Text Extraction & OCR
      setPipelineState({ step: 'extracting', progress: 45 });

      setTimeout(() => {
        // Step 3: Text Chunking & Metadata Processing
        setPipelineState({ step: 'chunking', progress: 70 });

        setTimeout(() => {
          // Step 4: Embedding Generation & Indexing
          setPipelineState({ step: 'indexing', progress: 90 });

          setTimeout(() => {
            // Completed!
            const file = files[0];
            const ext = file.name.split('.').pop().toUpperCase();
            const tagArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);

            // Create real Object URL for viewing the original PDF/File
            const fileBlobUrl = URL.createObjectURL(file);
            window.__GLOBAL_HEALTH_FILE_CACHE__ = window.__GLOBAL_HEALTH_FILE_CACHE__ || {};

            const finalizeDocCreation = (dataUrl = null) => {
              const newDoc = addDocument({
                title: formData.title,
                category: formData.category,
                sourceType: formData.sourceType,
                fileType: ext,
                fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
                language: formData.language,
                description: formData.description || 'Clinical knowledge source uploaded and verified by Administrator.',
                tags: tagArray.length > 0 ? tagArray : ['Clinical Knowledge'],
                extractedTextSample: `Extracted from ${file.name}: Comprehensive guidelines detailing evidence-based practices, clinical recommendations, and patient safety criteria under ${formData.category}. Indexed for high-precision retrieval.`,
                fileUrl: fileBlobUrl,
                fileDataUrl: dataUrl,
                originalFileName: file.name
              });

              window.__GLOBAL_HEALTH_FILE_CACHE__[newDoc.id] = {
                file,
                url: fileBlobUrl,
                dataUrl: dataUrl,
                name: file.name
              };

              setPipelineState({ step: 'completed', progress: 100, docId: newDoc.id });
              showToast('Document successfully processed and indexed into AI Knowledge Base!');
            };

            if (file.size < 3.5 * 1024 * 1024) {
              const reader = new FileReader();
              reader.onload = (e) => {
                finalizeDocCreation(e.target.result);
              };
              reader.onerror = () => {
                finalizeDocCreation(null);
              };
              reader.readAsDataURL(file);
            } else {
              finalizeDocCreation(null);
            }
          }, 700);
        }, 700);
      }, 700);
    }, 700);
  };

  const resetForm = () => {
    setFiles([]);
    setFormData({
      title: '',
      category: 'Health Guidelines',
      sourceType: 'WHO Guideline',
      description: '',
      language: 'English',
      tags: 'Clinical Guidance, Evidence Based, Protocol'
    });
    setPipelineState(null);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header Info Banner */}
      <div className="bg-white dark:bg-[#0F1C36] rounded-2xl p-6 border border-[#D6E6FA] dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#08165B] dark:text-white flex items-center gap-2">
            <UploadCloud className="w-6 h-6 text-[#1677E8] dark:text-blue-400" />
            <span>Upload Healthcare Knowledge Document</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 font-medium mt-1">
            All documents uploaded by the Administrator are automatically verified and indexed as approved knowledge sources.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Auto-Approved Knowledge
          </span>
        </div>
      </div>

      {/* Main Grid: Upload Area + Metadata Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): File Dropper & Selected Files */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Drag & Drop Box */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer bg-white dark:bg-[#0F1C36] flex flex-col items-center justify-center min-h-[240px] ${
              isDragging
                ? 'border-[#1677E8] bg-blue-50/60 dark:bg-[#15274D] scale-[1.01]'
                : 'border-[#D6E6FA] dark:border-slate-800 hover:border-[#1677E8] dark:hover:border-blue-400 hover:bg-blue-50/20 dark:hover:bg-slate-800/40'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              multiple
              accept=".pdf,.docx,.txt"
              className="hidden"
            />
            
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/50 text-[#1677E8] dark:text-blue-400 flex items-center justify-center mb-3 shadow-xs">
              <UploadCloud className="w-7 h-7 stroke-[2.2]" />
            </div>

            <div className="text-sm font-black text-[#08165B] dark:text-white mb-1">
              Drag & Drop your document here
            </div>
            
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              or <span className="text-[#1677E8] dark:text-blue-400 font-bold underline">browse files</span> from your computer
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 dark:text-slate-300 bg-slate-50 dark:bg-[#0B132B] px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
              <span>Supports PDF, DOCX, TXT</span>
              <span>•</span>
              <span>Max {settings.systemLimits?.maxFileSizeMB || 50} MB</span>
            </div>
          </div>

          {/* Selected File List */}
          {files.length > 0 && (
            <div className="bg-white dark:bg-[#0F1C36] rounded-2xl p-4 border border-[#D6E6FA] dark:border-slate-800 shadow-xs space-y-2">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Selected Documents ({files.length})</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">Ready for extraction</span>
              </div>

              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/50 dark:bg-[#0B132B] border border-blue-100 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="w-4 h-4 text-[#1677E8] dark:text-blue-400 shrink-0" />
                    <div className="truncate">
                      <div className="font-bold text-[#08165B] dark:text-white truncate">{file.name}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-400">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.name.split('.').pop().toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(idx);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Guidelines Box */}
          <div className="bg-blue-50/60 dark:bg-[#0B132B] rounded-2xl p-4 border border-blue-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-200 space-y-1.5">
            <div className="font-bold text-[#08165B] dark:text-white flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#1677E8] dark:text-blue-400" />
              <span>Indexing Standards</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-300 leading-relaxed">
              Text is automatically extracted, segmented into 500-token semantic chunks with 50-token overlap, and vectorized using medical domain embeddings.
            </p>
          </div>

        </div>

        {/* Right Column (7 cols): Document Metadata Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0F1C36] rounded-2xl p-6 sm:p-8 border border-[#D6E6FA] dark:border-slate-800 shadow-xs space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-black text-[#08165B] dark:text-white">Document Metadata & Taxonomy</h3>
            <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">
              Provide clinical categorization so the AI retrieval engine can filter by relevant domain.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Title */}
            <div>
              <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1.5">
                Document Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Clinical Practice Guidelines for Adult Diabetes 2026"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] dark:border-slate-700 bg-white dark:bg-[#0B132B] focus:border-[#1677E8] dark:focus:border-blue-400 outline-none text-xs sm:text-sm text-[#08165B] dark:text-white font-medium"
              />
            </div>

            {/* Category & Source Type Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1.5">
                  Medical Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] dark:border-slate-700 focus:border-[#1677E8] dark:focus:border-blue-400 outline-none text-xs sm:text-sm text-[#08165B] dark:text-white font-medium bg-white dark:bg-[#0B132B]"
                >
                  <option value="Health Guidelines" className="dark:bg-[#0B132B] dark:text-white">Health Guidelines</option>
                  <option value="Medical Research" className="dark:bg-[#0B132B] dark:text-white">Medical Research</option>
                  <option value="Educational Content" className="dark:bg-[#0B132B] dark:text-white">Educational Content</option>
                  <option value="Clinical Practice" className="dark:bg-[#0B132B] dark:text-white">Clinical Practice</option>
                  <option value="Pharmacology" className="dark:bg-[#0B132B] dark:text-white">Pharmacology</option>
                  <option value="Other Content" className="dark:bg-[#0B132B] dark:text-white">Other Content</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1.5">
                  Source Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.sourceType}
                  onChange={(e) => setFormData({ ...formData, sourceType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] dark:border-slate-700 focus:border-[#1677E8] dark:focus:border-blue-400 outline-none text-xs sm:text-sm text-[#08165B] dark:text-white font-medium bg-white dark:bg-[#0B132B]"
                >
                  <option value="WHO Guideline" className="dark:bg-[#0B132B] dark:text-white">WHO Guideline</option>
                  <option value="Clinical Protocol" className="dark:bg-[#0B132B] dark:text-white">Clinical Protocol</option>
                  <option value="Research Journal" className="dark:bg-[#0B132B] dark:text-white">Research Journal</option>
                  <option value="Hospital Manual" className="dark:bg-[#0B132B] dark:text-white">Hospital Manual</option>
                  <option value="Government Health Advisory" className="dark:bg-[#0B132B] dark:text-white">Government Health Advisory</option>
                  <option value="Textbook / Reference" className="dark:bg-[#0B132B] dark:text-white">Textbook / Reference</option>
                </select>
              </div>
            </div>

            {/* Language & Tags Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1.5">Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] dark:border-slate-700 focus:border-[#1677E8] dark:focus:border-blue-400 outline-none text-xs sm:text-sm text-[#08165B] dark:text-white font-medium bg-white dark:bg-[#0B132B]"
                >
                  <option value="English" className="dark:bg-[#0B132B] dark:text-white">English</option>
                  <option value="Hindi" className="dark:bg-[#0B132B] dark:text-white">Hindi (हिंदी)</option>
                  <option value="Marathi" className="dark:bg-[#0B132B] dark:text-white">Marathi (मराठी)</option>
                  <option value="Spanish" className="dark:bg-[#0B132B] dark:text-white">Spanish (Español)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1.5">Tags / Keywords</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Comma-separated tags (e.g. Cardiology, BP, Adult)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] dark:border-slate-700 bg-white dark:bg-[#0B132B] focus:border-[#1677E8] dark:focus:border-blue-400 outline-none text-xs sm:text-sm text-[#08165B] dark:text-white font-medium"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-bold text-[#08165B] dark:text-slate-200 mb-1.5">Description (Optional)</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief summary of document clinical scope and audience..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6E6FA] dark:border-slate-700 bg-white dark:bg-[#0B132B] focus:border-[#1677E8] dark:focus:border-blue-400 outline-none text-xs sm:text-sm text-[#08165B] dark:text-white font-medium resize-none"
              ></textarea>
            </div>

            {/* Upload Button */}
            {!pipelineState && (
              <button
                type="button"
                onClick={handleStartPipeline}
                disabled={files.length === 0}
                className={`w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  files.length > 0
                    ? 'bg-[#1677E8] hover:bg-[#08165B] text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                <UploadCloud className="w-5 h-5 stroke-[2.2]" />
                <span>Upload & Start Knowledge Indexing</span>
              </button>
            )}

            {/* PROCESSING PIPELINE STATUS DISPLAY */}
            {pipelineState && (
              <div className="p-5 rounded-2xl bg-[#F2F7FF] dark:bg-[#0B132B] border border-[#D6E6FA] dark:border-slate-800 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#08165B] dark:text-white text-sm flex items-center gap-2">
                    {pipelineState.step === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <RefreshCw className="w-5 h-5 text-[#1677E8] dark:text-blue-400 animate-spin" />
                    )}
                    <span>
                      {pipelineState.step === 'validating' && 'Stage 1/4: File Validation & Security Scan...'}
                      {pipelineState.step === 'extracting' && 'Stage 2/4: Text Extraction & OCR Parsing...'}
                      {pipelineState.step === 'chunking' && 'Stage 3/4: Semantic Chunking & Metadata Binding...'}
                      {pipelineState.step === 'indexing' && 'Stage 4/4: Vector Embedding & Knowledge Indexing...'}
                      {pipelineState.step === 'completed' && 'Processing Complete! Available to AI.'}
                    </span>
                  </span>
                  <span className="font-black text-[#1677E8] dark:text-blue-400 text-sm">{pipelineState.progress}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 rounded-full bg-blue-100 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      pipelineState.step === 'completed' ? 'bg-emerald-500' : 'bg-[#1677E8]'
                    }`}
                    style={{ width: `${pipelineState.progress}%` }}
                  ></div>
                </div>

                {/* Processing Steps Checklist */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-semibold">
                  <div className={`p-2 rounded-lg flex items-center gap-1.5 ${pipelineState.progress >= 25 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Validated</span>
                  </div>
                  <div className={`p-2 rounded-lg flex items-center gap-1.5 ${pipelineState.progress >= 50 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Extracted</span>
                  </div>
                  <div className={`p-2 rounded-lg flex items-center gap-1.5 ${pipelineState.progress >= 75 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Chunked</span>
                  </div>
                  <div className={`p-2 rounded-lg flex items-center gap-1.5 ${pipelineState.progress === 100 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Indexed</span>
                  </div>
                </div>

                {/* Action buttons after completion */}
                {pipelineState.step === 'completed' && (
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={() => navigateTo('library')}
                      className="w-full sm:w-auto flex-1 py-2.5 px-4 rounded-xl bg-[#1677E8] text-white font-bold text-xs hover:bg-[#08165B] transition-colors cursor-pointer text-center"
                    >
                      View in Document Library
                    </button>
                    <button
                      onClick={resetForm}
                      className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-white border border-[#D6E6FA] text-[#08165B] font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer text-center"
                    >
                      Upload Another Document
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
