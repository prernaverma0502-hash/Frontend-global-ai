import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  Paperclip,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw,
  Share2,
  Download,
  Stethoscope,
  ChevronRight,
  Info,
  Clock,
  BookOpen
} from 'lucide-react';
import {
  HEALTH_CATEGORIES,
  generateHealthAssessment,
  retrieveMedicalEvidence,
  detectEmergencyRedFlags
} from '../../data/healthKnowledgeBase';

export default function NewChatView({
  initialCategory = 'symptoms',
  initialQuery = '',
  conversationToLoad = null,
  onSaveConversation,
  onSaveReport
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('en'); // 'en' | 'hi' | 'hinglish'
  const [attachedFile, setAttachedFile] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const currentCatObj = HEALTH_CATEGORIES.find(c => c.id === selectedCategory) || HEALTH_CATEGORIES[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Load existing conversation or set up initial welcome
  useEffect(() => {
    if (conversationToLoad) {
      setSelectedCategory(conversationToLoad.category || 'symptoms');
      setMessages(conversationToLoad.messages || []);
    } else {
      setSelectedCategory(initialCategory);
      setMessages([
        {
          id: 'welcome-msg',
          sender: 'ai',
          isWelcome: true,
          text: `Hello, I am your GlobalHealthAI clinical assistant for **${currentCatObj.title}**. ${currentCatObj.starterPrompt}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      if (initialQuery && initialQuery.trim()) {
        setTimeout(() => {
          handleSendMessage(initialQuery);
        }, 300);
      }
    }
  }, [conversationToLoad]);

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(t);
    }
  }, [toastMessage]);

  const handleCategorySwitch = (catId) => {
    setSelectedCategory(catId);
    const cat = HEALTH_CATEGORIES.find(c => c.id === catId);
    setMessages([
      {
        id: `switch-${Date.now()}`,
        sender: 'ai',
        isWelcome: true,
        text: `Switched focus to **${cat.title}**. ${cat.starterPrompt}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query && !attachedFile) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: attachedFile ? `${query} [Attached File: ${attachedFile.name}]` : query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newThread = [...messages, userMsg];
    setMessages(newThread);
    setInputText('');
    setAttachedFile(null);
    setIsTyping(true);

    // Simulate AI clinical reasoning & RAG retrieval
    setTimeout(() => {
      const assessment = generateHealthAssessment(query, selectedCategory, newThread);
      
      const aiResponseMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        isAssessment: true,
        urgency: assessment.urgency,
        urgencyLabel: assessment.urgencyLabel,
        urgencyColor: assessment.urgencyColor,
        badgeBg: assessment.badgeBg,
        understanding: assessment.understanding,
        possibleExplanations: assessment.possibleExplanations,
        nextSteps: assessment.nextSteps,
        whenToSeekHelp: assessment.whenToSeekHelp,
        sources: assessment.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        followUpQuestions: [
          'How many days have you noticed this?',
          'Is the discomfort localized or spreading?',
          'Are you currently on any daily medications?'
        ]
      };

      const finalMessages = [...newThread, aiResponseMsg];
      setMessages(finalMessages);
      setIsTyping(false);

      // Persist conversation
      if (onSaveConversation) {
        onSaveConversation({
          id: conversationToLoad?.id || `conv-${Date.now()}`,
          title: query.length > 40 ? `${query.substring(0, 40)}...` : query,
          category: selectedCategory,
          categoryName: currentCatObj.title,
          date: conversationToLoad?.date || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          urgency: assessment.urgency,
          preview: assessment.understanding.substring(0, 90) + '...',
          messages: finalMessages
        });
      }
    }, 1100);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice dictation is supported in modern Chrome/Edge browsers.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = activeLanguage === 'hi' ? 'hi-IN' : 'en-US';
    recognition.interimResults = false;

    setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(prev => prev ? `${prev} ${transcript}` : transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file);
      setToastMessage(`Attached: ${file.name}`);
    }
  };

  const handleSaveToReports = (msg) => {
    if (!onSaveReport) return;
    const reportItem = {
      id: `rep-${Date.now()}`,
      title: `Assessment: ${currentCatObj.title} (${msg.urgency})`,
      categoryName: currentCatObj.title,
      date: new Date().toISOString(),
      urgency: msg.urgency,
      patientName: 'Clinical Patient',
      summaryText: `${msg.understanding} Possible causes: ${msg.possibleExplanations.join(', ')}. Recommended steps: ${msg.nextSteps.join('; ')}`,
      sourcesCited: msg.sources?.map(s => s.title).join(', ') || 'Clinical Evidence Protocols'
    };
    onSaveReport(reportItem);
    setToastMessage('Saved to your Doctor Reports library!');
  };

  const handleShareWhatsApp = (msg) => {
    const text = `*GlobalHealthAI Health Assessment*\nCategory: ${currentCatObj.title}\nStatus: ${msg.urgencyLabel}\nSummary: ${msg.understanding}\nWhen to see doctor: ${msg.whenToSeekHelp}\n\n_Reviewed against Clinical Knowledge Protocols._`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handlePrintSummary = (msg) => {
    window.print();
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-new-${Date.now()}`,
        sender: 'ai',
        isWelcome: true,
        text: `Starting a fresh assessment in **${currentCatObj.title}**. What health questions or symptoms can I help review?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] min-h-[550px] bg-white rounded-3xl border border-[#D6E6FA] shadow-2xs overflow-hidden animate-in fade-in duration-200">
      
      {/* 1. Category Bar (All 8 Categories Accessible) */}
      <div className="p-3 bg-slate-50 border-b border-[#D6E6FA] flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1 mr-1">
            Category Focus:
          </span>
          {HEALTH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySwitch(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#08165B] text-white shadow-xs'
                  : 'bg-white hover:bg-blue-50 text-slate-600 border border-slate-200'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* New Assessment Reset Button */}
        <button
          type="button"
          onClick={handleResetChat}
          className="p-1.5 rounded-xl text-slate-500 hover:text-[#08165B] hover:bg-white border border-slate-200 shrink-0 cursor-pointer text-xs font-semibold flex items-center gap-1"
          title="Start fresh conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Chat</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-600 text-white text-xs font-bold py-1.5 px-4 text-center animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* 2. Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#F2F7FF]/30">
        
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-xl bg-gradient-to-r from-[#08165B] to-[#1677E8] text-white p-4 rounded-3xl rounded-tr-xs shadow-md space-y-1">
                  <p className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                  <div className="text-[10px] text-blue-200 text-right font-medium">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          }

          // AI Welcome or Non-Assessment Message
          if (msg.isWelcome || !msg.isAssessment) {
            return (
              <div key={msg.id} className="flex items-start gap-3 max-w-2xl">
                <div className="w-8 h-8 rounded-xl bg-[#1677E8] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div className="bg-white rounded-3xl rounded-tl-xs p-4 sm:p-5 border border-[#D6E6FA] shadow-xs space-y-2 text-slate-800">
                  <div className="text-xs sm:text-sm font-medium leading-relaxed">
                    {msg.text}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {msg.timestamp} • GlobalHealthAI Clinical Intelligence
                  </div>
                </div>
              </div>
            );
          }

          // Structured AI Clinical Assessment Output (The core specification!)
          return (
            <div key={msg.id} className="flex items-start gap-3 max-w-3xl">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#08165B] to-[#1677E8] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                <Stethoscope className="w-5 h-5 stroke-[2.2]" />
              </div>

              <div className="w-full bg-white rounded-3xl rounded-tl-xs border border-[#D6E6FA] shadow-md p-5 sm:p-7 space-y-5 text-slate-800">
                
                {/* 1. Risk / Urgency Level Banner (Red / Yellow / Green) */}
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${msg.urgencyColor}`}>
                  <div className="flex items-center gap-2.5">
                    {msg.urgency === 'RED' && <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse shrink-0" />}
                    {msg.urgency === 'YELLOW' && <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />}
                    {msg.urgency === 'GREEN' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    <div>
                      <div className="text-xs sm:text-sm font-black tracking-tight">
                        {msg.urgencyLabel}
                      </div>
                      <div className="text-[11px] opacity-80 font-medium">
                        Based on emergency red-flag screening & clinical practice protocols
                      </div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase shrink-0 ${msg.badgeBg}`}>
                    {msg.urgency}
                  </span>
                </div>

                {/* 2. Understanding Your Symptoms */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#08165B] flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#1677E8]" />
                    <span>1. Understanding Your Symptoms</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {msg.understanding}
                  </p>
                </div>

                {/* 3. Possible Health Explanations (with clinical uncertainty) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#08165B]">
                    2. Possible Health Explanations (Not Confirmed Diagnosis)
                  </h4>
                  <div className="space-y-1.5">
                    {msg.possibleExplanations?.map((exp, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <span className="text-[#F04B0A] font-bold mt-0.5">•</span>
                        <span>{exp}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] text-slate-400 italic">
                    *Clinical note: These represent probabilistic differential considerations. An in-person clinical exam is necessary for diagnosis.
                  </div>
                </div>

                {/* 4. Recommended Next Steps */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#08165B]">
                    3. Recommended Next Safe Steps
                  </h4>
                  <div className="space-y-1.5 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
                    {msg.nextSteps?.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                        <span className="w-4 h-4 rounded-full bg-[#1677E8] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. When to Seek Medical Help */}
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                    <span>When to Seek Immediate Medical Evaluation:</span>
                  </div>
                  <p className="font-medium text-xs leading-relaxed">
                    {msg.whenToSeekHelp}
                  </p>
                </div>

                {/* 6. Supporting Medical Sources (from Admin Medical Knowledge Base) */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#1677E8]" />
                      <span>Admin Medical Research Sources Cited:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.sources.map((src, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] space-y-1">
                          <div className="font-bold text-[#08165B] line-clamp-1">{src.title}</div>
                          <div className="text-slate-500 text-[10px]">{src.institution}</div>
                          <div className="text-slate-600 italic line-clamp-2 text-[10px]">{src.evidenceChunk}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Action Toolbar: Save to Reports, Share WhatsApp, Print */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSaveToReports(msg)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#08165B] text-xs font-bold transition-colors cursor-pointer border border-blue-200"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#1677E8]" />
                      <span>Save Doctor Summary</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShareWhatsApp(msg)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors cursor-pointer border border-emerald-200"
                    >
                      <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Share (WhatsApp)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePrintSummary(msg)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Print Summary</span>
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-400">
                    {msg.timestamp}
                  </span>
                </div>

                {/* Follow-up Question Chips */}
                {msg.followUpQuestions && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-400">
                      Answer follow-up details to refine assessment:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.followUpQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(q)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#08165B] text-xs font-medium border border-slate-200 transition-colors cursor-pointer"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1677E8] text-white flex items-center justify-center animate-pulse">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#D6E6FA] text-xs font-semibold text-slate-500 flex items-center gap-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#1677E8] animate-ping" />
              <span>Analyzing against Admin Medical Research Base & Triage Rules...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Questions for current category */}
      {messages.length <= 1 && (
        <div className="p-3 bg-white border-t border-slate-100 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 px-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#F04B0A]" />
            <span>Suggested queries for {currentCatObj.title}:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 px-2">
            {currentCatObj.suggestedQuestions.map((sq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(sq)}
                className="px-3 py-1.5 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 text-[#08165B] text-xs font-semibold border border-blue-200 transition-colors cursor-pointer text-left"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Input Toolbar & Textarea */}
      <div className="p-3 sm:p-4 bg-white border-t border-[#D6E6FA] space-y-2">
        
        {attachedFile && (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-[#08165B]">
            <span className="truncate">📎 Attached: {attachedFile.name}</span>
            <button
              onClick={() => setAttachedFile(null)}
              className="text-slate-400 hover:text-red-600 font-bold ml-2 cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-end gap-2"
        >
          {/* File input hidden */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.txt"
          />

          {/* Attachment button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Attach Lab Report or Image"
            className="p-3 rounded-2xl bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-[#1677E8] transition-colors cursor-pointer shrink-0"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={`Ask about ${currentCatObj.title.toLowerCase()} or describe your symptoms...`}
              className="w-full py-3 px-4 rounded-2xl bg-slate-50 focus:bg-white border border-[#D6E6FA] focus:border-[#1677E8] text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none max-h-32"
            />
          </div>

          {/* Voice Input */}
          <button
            type="button"
            onClick={handleVoiceInput}
            title="Voice input"
            className={`p-3 rounded-2xl transition-colors cursor-pointer shrink-0 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-[#1677E8]'
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() && !attachedFile}
            className="p-3 rounded-2xl bg-gradient-to-r from-[#F04B0A] to-[#ff6224] hover:from-[#d94207] hover:to-[#ea580c] text-white shadow-md transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            title="Send Message"
          >
            <Send className="w-4 h-4 stroke-[2.3]" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span>GlobalHealthAI provides clinical guidance, not a diagnosis. In emergencies, call 102 / 108 / 112.</span>
          <span>Shift+Enter for newline</span>
        </div>
      </div>

    </div>
  );
}
