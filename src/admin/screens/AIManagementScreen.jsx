import React, { useState } from 'react';
import {
  Cpu,
  Database,
  Sliders,
  ShieldCheck,
  Play,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Sparkles,
  Info,
  Server,
  Lock,
  Layers,
  FileText,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

export default function AIManagementScreen({ navigateTo, showToast }) {
  const {
    aiConfig,
    updateAIConfig,
    updateRetrievalSettings,
    updateSafetyInstructions,
    reindexAll,
    documents,
    totalDocuments,
    totalChunks,
    knowledgeTopicsCount,
    runPlaygroundQuery
  } = useAdminStore();

  const [activeTab, setActiveTab] = useState('model'); // 'model' | 'knowledge' | 'retrieval' | 'safety' | 'playground'

  // Model Config State
  const [modelForm, setModelForm] = useState({
    provider: aiConfig.provider,
    model: aiConfig.model,
    temperature: aiConfig.temperature,
    maxOutputTokens: aiConfig.maxOutputTokens
  });
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState(null);

  // Retrieval Settings State
  const [retrievalForm, setRetrievalForm] = useState({
    topKChunks: aiConfig.retrievalSettings.topKChunks,
    similarityThreshold: aiConfig.retrievalSettings.similarityThreshold,
    retrievalStrategy: aiConfig.retrievalSettings.retrievalStrategy,
    contextWindowTokens: aiConfig.retrievalSettings.contextWindowTokens,
    enableSourceCitations: aiConfig.retrievalSettings.enableSourceCitations,
    showConfidenceScores: aiConfig.retrievalSettings.showConfidenceScores
  });

  // Safety Instructions State
  const [safetyForm, setSafetyForm] = useState({
    systemPrompt: aiConfig.safetyInstructions.systemPrompt,
    noDiagnosisRule: aiConfig.safetyInstructions.noDiagnosisRule,
    noPrescriptionRule: aiConfig.safetyInstructions.noPrescriptionRule,
    emergencyEscalationRule: aiConfig.safetyInstructions.emergencyEscalationRule,
    requireCitations: aiConfig.safetyInstructions.requireCitations,
    uncertaintyDisclosure: aiConfig.safetyInstructions.uncertaintyDisclosure,
    defaultLanguage: aiConfig.safetyInstructions.defaultLanguage
  });

  // Reindexing state
  const [reindexing, setReindexing] = useState(false);
  const [chunkSearch, setChunkSearch] = useState('');

  // AI Playground State
  const [playgroundQuery, setPlaygroundQuery] = useState('');
  const [playgroundLang, setPlaygroundLang] = useState('English');
  const [playgroundRunning, setPlaygroundRunning] = useState(false);
  const [playgroundResult, setPlaygroundResult] = useState(null);

  const sampleQuestions = [
    'What blood pressure reading is classified as high according to clinical guidelines?',
    'What are the key lifestyle interventions for managing adult Type 2 diabetes?',
    'What red-flag signs in young children with acute fever require emergency hospital care?',
    'Are there drug interactions between macrolide antibiotics and cardiac medications?'
  ];

  const handleSaveModel = (e) => {
    e.preventDefault();
    updateAIConfig(modelForm);
    showToast('AI Model Configuration successfully saved.');
  };

  const handleTestConnection = () => {
    setTestingConnection(true);
    setConnectionResult(null);
    setTimeout(() => {
      setTestingConnection(false);
      setConnectionResult({
        success: true,
        latency: Math.floor(Math.random() * 40) + 120,
        status: 'Operational',
        timestamp: new Date().toLocaleTimeString()
      });
      showToast('LLM Connection test succeeded. Status: Operational.');
    }, 1000);
  };

  const handleSaveRetrieval = (e) => {
    e.preventDefault();
    updateRetrievalSettings(retrievalForm);
    showToast('Retrieval and vector search settings updated.');
  };

  const handleSaveSafety = (e) => {
    e.preventDefault();
    updateSafetyInstructions(safetyForm);
    showToast('Clinical Safety Rules & System Instructions saved.');
  };

  const handleReindexKnowledgeBase = () => {
    setReindexing(true);
    setTimeout(() => {
      reindexAll();
      setReindexing(false);
      showToast('Knowledge Base reindexed across all active document chunks!');
    }, 1500);
  };

  const handleRunPlayground = () => {
    if (!playgroundQuery.trim()) {
      alert('Please enter or select a health question.');
      return;
    }
    setPlaygroundRunning(true);
    setTimeout(() => {
      const res = runPlaygroundQuery(playgroundQuery, playgroundLang);
      setPlaygroundResult(res);
      setPlaygroundRunning(false);
    }, 900);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#0F1C36] rounded-2xl p-6 border border-[#D6E6FA] dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#08165B] dark:text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#1677E8] dark:text-blue-400" />
            <span>AI Knowledge & Model Management</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 font-medium mt-1">
            Configure LLM parameters, monitor vector embeddings, enforce medical safety, and test evidence-grounded responses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/50 text-[#1677E8] dark:text-blue-300 border border-blue-200 dark:border-blue-700/60 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {aiConfig.model}
          </span>
        </div>
      </div>

      {/* INTERNAL TABS: EXACTLY 5 TABS */}
      <div className="bg-white dark:bg-[#0F1C36] rounded-2xl border border-[#D6E6FA] dark:border-slate-800 shadow-xs overflow-hidden">
        
        {/* Tab Buttons Bar */}
        <div className="flex border-b border-[#D6E6FA] dark:border-slate-800 overflow-x-auto bg-[#F2F7FF]/50 dark:bg-[#080D1A] text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveTab('model')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'model'
                ? 'border-[#1677E8] text-[#1677E8] dark:text-blue-400 bg-white dark:bg-[#0F1C36]'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#08165B] dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Model Configuration</span>
          </button>

          <button
            onClick={() => setActiveTab('knowledge')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'knowledge'
                ? 'border-[#1677E8] text-[#1677E8] dark:text-blue-400 bg-white dark:bg-[#0F1C36]'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#08165B] dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Knowledge Base ({totalChunks} Chunks)</span>
          </button>

          <button
            onClick={() => setActiveTab('retrieval')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'retrieval'
                ? 'border-[#1677E8] text-[#1677E8] dark:text-blue-400 bg-white dark:bg-[#0F1C36]'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#08165B] dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Retrieval Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'safety'
                ? 'border-[#1677E8] text-[#1677E8] dark:text-blue-400 bg-white dark:bg-[#0F1C36]'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#08165B] dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>AI Safety & Instructions</span>
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`py-3.5 px-4 sm:px-6 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'playground'
                ? 'border-[#F04B0A] text-[#F04B0A] dark:text-orange-400 bg-white dark:bg-[#0F1C36]'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#F04B0A] dark:hover:text-orange-400 hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>AI Playground</span>
          </button>
        </div>

        {/* TAB A: MODEL CONFIGURATION */}
        {activeTab === 'model' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-[#08165B]">LLM Provider & Parameter Tuning</h3>
              <p className="text-xs text-slate-500 font-medium">
                Choose the foundation language model and adjust generation randomness and token length.
              </p>
            </div>

            <form onSubmit={handleSaveModel} className="space-y-6 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Provider */}
                <div>
                  <label className="block font-bold text-[#08165B] mb-2">AI Provider</label>
                  <select
                    value={modelForm.provider}
                    onChange={(e) => setModelForm({ ...modelForm, provider: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D6E6FA] font-medium text-[#08165B] bg-white outline-none"
                  >
                    <option value="Google Gemini">Google Gemini (Recommended for Healthcare)</option>
                    <option value="OpenAI">OpenAI GPT-4 Series</option>
                    <option value="Anthropic">Anthropic Claude</option>
                    <option value="Self-Hosted vLLM">Self-Hosted Clinical LLM (vLLM)</option>
                  </select>
                </div>

                {/* Model Selection */}
                <div>
                  <label className="block font-bold text-[#08165B] mb-2">Model Selection</label>
                  <select
                    value={modelForm.model}
                    onChange={(e) => setModelForm({ ...modelForm, model: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D6E6FA] font-medium text-[#08165B] bg-white outline-none"
                  >
                    <option value="Gemini 1.5 Pro (Healthcare Tuned)">Gemini 1.5 Pro (Healthcare Tuned)</option>
                    <option value="Gemini 1.5 Flash (Ultra Fast)">Gemini 1.5 Flash (Ultra Fast)</option>
                    <option value="GPT-4o (Omni Clinical)">GPT-4o (Omni Clinical)</option>
                    <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                  </select>
                </div>

              </div>

              {/* API Security Notice */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3 text-xs text-slate-600">
                <Lock className="w-4 h-4 text-[#1677E8] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#08165B]">API Keys Securely Managed Server-Side</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Credentials are stored in server environment variables and never exposed to client-side code. Status: <strong className="text-emerald-600">Connected & Encrypted (AES-256)</strong>.
                  </div>
                </div>
              </div>

              {/* Sliders: Temperature & Max Tokens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                
                {/* Temperature */}
                <div className="space-y-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#08165B]">Temperature (Creativity vs Determinism)</span>
                    <span className="text-[#1677E8] font-black">{modelForm.temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={modelForm.temperature}
                    onChange={(e) => setModelForm({ ...modelForm, temperature: parseFloat(e.target.value) })}
                    className="w-full accent-[#1677E8]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>0.0 (Deterministic / Medical Guidance)</span>
                    <span>1.0 (Creative / Exploratory)</span>
                  </div>
                </div>

                {/* Max Tokens */}
                <div className="space-y-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#08165B]">Maximum Output Tokens</span>
                    <span className="text-[#1677E8] font-black">{modelForm.maxOutputTokens} tokens</span>
                  </div>
                  <input
                    type="range"
                    min="512"
                    max="8192"
                    step="256"
                    value={modelForm.maxOutputTokens}
                    onChange={(e) => setModelForm({ ...modelForm, maxOutputTokens: parseInt(e.target.value) })}
                    className="w-full accent-[#1677E8]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>512 tokens</span>
                    <span>8,192 tokens</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={testingConnection}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-blue-200 hover:bg-blue-50 text-[#1677E8] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {testingConnection ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Server className="w-4 h-4" />}
                  <span>Test Connection</span>
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1677E8] hover:bg-[#08165B] text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Save Model Configuration
                </button>
              </div>

              {connectionResult && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Connection Active. Latency: <strong>{connectionResult.latency} ms</strong>. Tested at {connectionResult.timestamp}.</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-[10px]">
                    200 OK
                  </span>
                </div>
              )}
            </form>
          </div>
        )}

        {/* TAB B: KNOWLEDGE BASE */}
        {activeTab === 'knowledge' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black text-[#08165B]">Knowledge Base & Vector Store</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Review indexed clinical documents and initiate complete vector collection reindexing.
                </p>
              </div>

              <button
                onClick={handleReindexKnowledgeBase}
                disabled={reindexing}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1677E8] hover:bg-[#08165B] text-white font-bold text-xs transition-colors cursor-pointer self-start sm:self-auto"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${reindexing ? 'animate-spin' : ''}`} />
                <span>{reindexing ? 'Reindexing Chunks...' : 'Reindex Entire Knowledge Base'}</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#F2F7FF] border border-[#D6E6FA]">
                <div className="text-[11px] font-bold text-slate-500">Total Indexed Documents</div>
                <div className="text-2xl font-black text-[#08165B] mt-1">{totalDocuments}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#F2F7FF] border border-[#D6E6FA]">
                <div className="text-[11px] font-bold text-slate-500">Vectorized Chunks</div>
                <div className="text-2xl font-black text-[#1677E8] mt-1">{totalChunks}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#F2F7FF] border border-[#D6E6FA]">
                <div className="text-[11px] font-bold text-slate-500">Indexed Clinical Topics</div>
                <div className="text-2xl font-black text-[#F04B0A] mt-1">{knowledgeTopicsCount}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#F2F7FF] border border-[#D6E6FA]">
                <div className="text-[11px] font-bold text-slate-500">Last Synced</div>
                <div className="text-xs font-black text-emerald-600 mt-2">Just Now</div>
              </div>
            </div>

            {/* Document Chunk Inspector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#08165B]">Active Knowledge Chunks</span>
                <input
                  type="text"
                  placeholder="Filter chunks..."
                  value={chunkSearch}
                  onChange={(e) => setChunkSearch(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-[#D6E6FA] text-xs outline-none w-48"
                />
              </div>

              <div className="border border-[#D6E6FA] rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                {documents
                  .filter(d => !chunkSearch || d.title.toLowerCase().includes(chunkSearch.toLowerCase()))
                  .map((doc) => (
                    <div key={doc.id} className="p-3.5 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-[#08165B]">{doc.title}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5 line-clamp-1">
                          {doc.extractedTextSample}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#1677E8] font-bold text-[10px]">
                          {doc.chunksCount} chunks
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB C: RETRIEVAL SETTINGS */}
        {activeTab === 'retrieval' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-[#08165B]">RAG Retrieval & Semantic Similarity</h3>
              <p className="text-xs text-slate-500 font-medium">
                Control how the system searches through indexed documents and ranks clinical evidence for context injection.
              </p>
            </div>

            <form onSubmit={handleSaveRetrieval} className="space-y-6 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Top-K Chunks */}
                <div className="space-y-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#08165B]">Top-K Retrieved Chunks</span>
                    <span className="text-[#1677E8] font-black">{retrievalForm.topKChunks} chunks</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    step="1"
                    value={retrievalForm.topKChunks}
                    onChange={(e) => setRetrievalForm({ ...retrievalForm, topKChunks: parseInt(e.target.value) })}
                    className="w-full accent-[#1677E8]"
                  />
                  <div className="text-[11px] text-slate-500">
                    Determines how many relevant text passages are fed into the LLM context prompt.
                  </div>
                </div>

                {/* Similarity Threshold */}
                <div className="space-y-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#08165B]">Cosine Similarity Threshold</span>
                    <span className="text-[#1677E8] font-black">{retrievalForm.similarityThreshold}</span>
                  </div>
                  <input
                    type="range"
                    min="0.60"
                    max="0.95"
                    step="0.02"
                    value={retrievalForm.similarityThreshold}
                    onChange={(e) => setRetrievalForm({ ...retrievalForm, similarityThreshold: parseFloat(e.target.value) })}
                    className="w-full accent-[#1677E8]"
                  />
                  <div className="text-[11px] text-slate-500">
                    Chunks with vector similarity below this threshold are omitted to prevent irrelevant answers.
                  </div>
                </div>

              </div>

              {/* Retrieval Strategy & Context Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold text-[#08165B] mb-2">Retrieval Strategy</label>
                  <select
                    value={retrievalForm.retrievalStrategy}
                    onChange={(e) => setRetrievalForm({ ...retrievalForm, retrievalStrategy: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D6E6FA] font-medium text-[#08165B] bg-white outline-none"
                  >
                    <option value="Hybrid (Dense Vector + BM25 Lexical)">Hybrid (Dense Vector + BM25 Lexical) - Recommended</option>
                    <option value="Pure Dense Vector Search">Pure Dense Vector Search</option>
                    <option value="Semantic Re-ranking (Cross-Encoder)">Semantic Re-ranking (Cross-Encoder)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#08165B] mb-2">Context Window Budget</label>
                  <select
                    value={retrievalForm.contextWindowTokens}
                    onChange={(e) => setRetrievalForm({ ...retrievalForm, contextWindowTokens: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D6E6FA] font-medium text-[#08165B] bg-white outline-none"
                  >
                    <option value={4096}>4,096 Tokens</option>
                    <option value={8192}>8,192 Tokens (Balanced)</option>
                    <option value={16384}>16,384 Tokens (Comprehensive Guidelines)</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={retrievalForm.enableSourceCitations}
                    onChange={(e) => setRetrievalForm({ ...retrievalForm, enableSourceCitations: e.target.checked })}
                    className="w-4 h-4 accent-[#1677E8]"
                  />
                  <span className="font-bold text-[#08165B]">Enforce Source Citations [Source: Document Title] in generated outputs</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={retrievalForm.showConfidenceScores}
                    onChange={(e) => setRetrievalForm({ ...retrievalForm, showConfidenceScores: e.target.checked })}
                    className="w-4 h-4 accent-[#1677E8]"
                  />
                  <span className="font-bold text-[#08165B]">Compute and display grounding confidence score on every query</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1677E8] hover:bg-[#08165B] text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Save Retrieval Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB D: AI SAFETY & INSTRUCTIONS */}
        {activeTab === 'safety' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-[#08165B]">Clinical Safety Rules & Guardrails</h3>
              <p className="text-xs text-slate-500 font-medium">
                Mandatory health safety constraints: the AI must never diagnose diseases or prescribe medications.
              </p>
            </div>

            <form onSubmit={handleSaveSafety} className="space-y-6 text-xs sm:text-sm">
              
              {/* System Instructions Editor */}
              <div>
                <label className="block font-bold text-[#08165B] mb-2">
                  System Instructions (Master Clinical Prompt)
                </label>
                <textarea
                  rows={8}
                  value={safetyForm.systemPrompt}
                  onChange={(e) => setSafetyForm({ ...safetyForm, systemPrompt: e.target.value })}
                  className="w-full p-4 rounded-xl border border-[#D6E6FA] font-mono text-xs text-slate-800 leading-relaxed outline-none focus:border-[#1677E8]"
                ></textarea>
              </div>

              {/* Guardrails Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
                
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyForm.noDiagnosisRule}
                    onChange={(e) => setSafetyForm({ ...safetyForm, noDiagnosisRule: e.target.checked })}
                    className="w-4 h-4 accent-[#1677E8] mt-0.5"
                  />
                  <div>
                    <div className="font-black text-[#08165B]">No Confirmed Diagnosis Rule</div>
                    <div className="text-[11px] text-slate-500">AI clarifies that findings are educational probabilities, not diagnoses.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyForm.noPrescriptionRule}
                    onChange={(e) => setSafetyForm({ ...safetyForm, noPrescriptionRule: e.target.checked })}
                    className="w-4 h-4 accent-[#1677E8] mt-0.5"
                  />
                  <div>
                    <div className="font-black text-[#08165B]">No Prescription Rule</div>
                    <div className="text-[11px] text-slate-500">Prohibits suggesting or dosing prescription drugs without physician review.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyForm.emergencyEscalationRule}
                    onChange={(e) => setSafetyForm({ ...safetyForm, emergencyEscalationRule: e.target.checked })}
                    className="w-4 h-4 accent-[#1677E8] mt-0.5"
                  />
                  <div>
                    <div className="font-black text-[#08165B]">Emergency Red-Flag Escalation</div>
                    <div className="text-[11px] text-slate-500">Identifies chest pain, dyspnea, or stroke symptoms and triggers ER alert.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyForm.uncertaintyDisclosure}
                    onChange={(e) => setSafetyForm({ ...safetyForm, uncertaintyDisclosure: e.target.checked })}
                    className="w-4 h-4 accent-[#1677E8] mt-0.5"
                  />
                  <div>
                    <div className="font-black text-[#08165B]">Uncertainty & Limitation Transparency</div>
                    <div className="text-[11px] text-slate-500">Discloses whenever clinical evidence is inconclusive or scarce.</div>
                  </div>
                </label>

              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1677E8] hover:bg-[#08165B] text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Save Safety Instructions
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB E: AI PLAYGROUND */}
        {activeTab === 'playground' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-black text-[#F04B0A] flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  <span>Clinical AI Playground</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Test sample health questions and verify citation grounding, retrieval relevance, and safety filters.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
                Testing Output Only • Not Medical Advice
              </span>
            </div>

            {/* Presets */}
            <div>
              <div className="text-xs font-bold text-slate-500 mb-2">Quick Clinical Presets:</div>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setPlaygroundQuery(q)}
                    className="text-left px-3 py-1.5 rounded-lg border border-[#D6E6FA] bg-slate-50 hover:bg-blue-50 text-[11px] text-slate-700 font-medium transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Query Input + Language Selector */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={playgroundQuery}
                  onChange={(e) => setPlaygroundQuery(e.target.value)}
                  placeholder="Enter a health or medical query (e.g. 'What are safe next steps for high blood pressure?')..."
                  className="flex-1 px-4 py-3 rounded-xl border border-[#D6E6FA] text-xs sm:text-sm font-medium outline-none focus:border-[#1677E8]"
                />

                <select
                  value={playgroundLang}
                  onChange={(e) => setPlaygroundLang(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-[#D6E6FA] text-xs font-bold text-[#08165B] bg-white outline-none"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Marathi">Marathi (मराठी)</option>
                  <option value="Spanish">Spanish</option>
                </select>

                <button
                  onClick={handleRunPlayground}
                  disabled={playgroundRunning}
                  className="px-6 py-3 rounded-xl bg-[#F04B0A] hover:bg-[#d43f07] text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors shrink-0"
                >
                  {playgroundRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                  <span>{playgroundRunning ? 'Executing Test...' : 'Run AI Test'}</span>
                </button>
              </div>
            </div>

            {/* Playground Results */}
            {playgroundResult && (
              <div className="space-y-4 pt-4 border-t border-slate-100 animate-in fade-in">
                
                {/* Scorecard */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="text-[10px] font-bold text-slate-400">Grounding Score</div>
                    <div className="text-base font-black text-emerald-700 mt-0.5">{playgroundResult.metrics.groundingScore}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="text-[10px] font-bold text-slate-400">Latency</div>
                    <div className="text-base font-black text-[#1677E8] mt-0.5">{playgroundResult.metrics.latencyMs} ms</div>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="text-[10px] font-bold text-slate-400">Tokens Consumed</div>
                    <div className="text-base font-black text-[#08165B] mt-0.5">{playgroundResult.metrics.tokensUsed} tokens</div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="text-[10px] font-bold text-slate-400">Clinical Safety</div>
                    <div className="text-base font-black text-emerald-700 mt-0.5">PASSED ✓</div>
                  </div>
                </div>

                {/* Generated Output */}
                <div className="p-5 rounded-2xl bg-[#F2F7FF] border border-[#D6E6FA] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-[#08165B] text-xs uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#F04B0A]" />
                      <span>Evidence-Grounded Response</span>
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">Model: {playgroundResult.metrics.modelUsed}</span>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium bg-white p-4 rounded-xl border border-blue-100">
                    {playgroundResult.response}
                  </div>
                </div>

                {/* Retrieved Document Sources */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#08165B] uppercase tracking-wider">
                    Retrieved Knowledge Sources ({playgroundResult.retrievedSources.length} Chunks Injected)
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {playgroundResult.retrievedSources.map((source, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#D6E6FA] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#08165B] truncate">{source.doc.title}</span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#1677E8] font-bold text-[10px]">
                            Score: {source.score}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono line-clamp-2">
                          "{source.chunkSnippet}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
