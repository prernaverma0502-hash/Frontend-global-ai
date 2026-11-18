import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Mic,
  Maximize2,
  Minimize2,
  ChevronDown,
  Stethoscope
} from 'lucide-react';
import {
  generateHealthAssessment,
  detectEmergencyRedFlags,
  HEALTH_CATEGORIES
} from '../../data/healthKnowledgeBase';

export default function FloatingHealthChatbot({ user, activeCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      timestamp: 'Just now',
      text: `Hello ${user?.name ? user.name.split(' ')[0] : 'there'}! 👋 I am your GlobalHealth AI Assistant. Describe any symptom or ask a health question, and I'll give you instant, clinically grounded guidance and safe next steps.`,
      urgency: null
    }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  // Quick prompt suggestions
  const quickPrompts = [
    'Mild dry cough and low-grade fever for 2 days',
    'What are red-flag emergency symptoms?',
    'What is a normal blood pressure reading?',
    'Dull lower back pain after prolonged sitting'
  ];

  const handleSend = (textToSend = inputMessage) => {
    const text = textToSend.trim();
    if (!text || isTyping) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate smart clinical evaluation response
    setTimeout(() => {
      const assessment = generateHealthAssessment(text, activeCategory?.id || 'symptoms');

      let replyText = assessment.understanding;
      if (assessment.possibleExplanations && assessment.possibleExplanations.length > 0) {
        replyText += `\n\nClinical Considerations:\n• ` + assessment.possibleExplanations.slice(0, 3).join('\n• ');
      }
      if (assessment.nextSteps && assessment.nextSteps.length > 0) {
        replyText += `\n\nSafe Next Steps:\n• ` + assessment.nextSteps.slice(0, 3).join('\n• ');
      }
      if (assessment.whenToSeekHelp) {
        replyText += `\n\nGuidance: ${assessment.whenToSeekHelp}`;
      }

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        urgency: assessment.urgency,
        urgencyLabel: assessment.urgencyLabel,
        sources: assessment.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        timestamp: 'Just now',
        text: 'Chat cleared! Feel free to ask any health question or describe new symptoms.',
        urgency: null
      }
    ]);
  };

  return (
    <>
      {/* 1. FLOATING CHATBOT TRIGGER BUTTON */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#1677E8] via-[#08165B] to-[#08165B] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-blue-400/40"
          aria-label="Open Health AI Chatbot"
          title="Open GlobalHealth AI Assistant"
        >
          {/* Animated online ring */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
          </span>

          {/* Bot Icon */}
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            {isOpen ? (
              <X className="w-4 h-4 text-white" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            )}
          </div>

          <span className="text-xs sm:text-sm font-black tracking-tight whitespace-nowrap">
            {isOpen ? 'Close Chat' : 'Health AI Chat'}
          </span>
        </button>
      </div>

      {/* 2. CHATBOT POPUP WINDOW */}
      {isOpen && (
        <div
          className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 w-[360px] sm:w-[410px] max-w-[calc(100vw-1.5rem)] h-[540px] max-h-[82vh] rounded-3xl shadow-2xl border border-blue-200/90 dark:border-slate-700/80 bg-white dark:bg-[#0B132B] flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          style={{
            boxShadow: '0 20px 50px -10px rgba(8, 22, 91, 0.28), 0 0 0 1px rgba(22, 119, 232, 0.15)'
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#08165B] to-[#1677E8] text-white flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-white/15 backdrop-blur-xs border border-white/30 flex items-center justify-center shrink-0">
                <Stethoscope className="w-4 h-4 text-emerald-300" />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-white"></span>
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-black">GlobalHealth AI</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/40">
                    Live
                  </span>
                </div>
                <div className="text-[10px] text-blue-200/90 font-medium">
                  Clinically Grounded • Instant Guidance
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                title="Clear conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Context Banner */}
          {activeCategory && (
            <div className="px-3.5 py-1.5 bg-blue-50/80 dark:bg-slate-800/80 border-b border-blue-100 dark:border-slate-800 text-[11px] font-semibold text-[#1677E8] dark:text-blue-300 flex items-center justify-between">
              <span className="truncate">Active Topic: {activeCategory.name}</span>
              <span className="text-[9.5px] text-slate-400">Contextual Mode</span>
            </div>
          )}

          {/* Message Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs bg-slate-50/60 dark:bg-[#080D1A]/60">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[88%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      isAi
                        ? 'bg-white dark:bg-[#0F1C36] text-slate-800 dark:text-slate-100 border border-blue-100 dark:border-slate-700/80 shadow-xs'
                        : 'bg-gradient-to-r from-[#1677E8] to-[#08165B] text-white shadow-xs'
                    }`}
                  >
                    {/* Urgency Badge if flagged */}
                    {isAi && msg.urgency && (
                      <div className="mb-2">
                        {msg.urgency === 'RED' && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black">
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            <span>RED ALERT • Urgent Medical Attention</span>
                          </div>
                        )}
                        {msg.urgency === 'YELLOW' && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-black">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            <span>YELLOW CAUTION • Doctor in 24–48h</span>
                          </div>
                        )}
                        {msg.urgency === 'GREEN' && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>GREEN NORMAL • Home Care & Monitoring</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="text-[12px] sm:text-[12.5px]">{msg.text}</div>

                    {/* Grounded Citation */}
                    {isAi && msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700 text-[9.5px] text-slate-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>Grounded in verified clinical research PDFs</span>
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white dark:bg-[#0F1C36] border border-blue-100 dark:border-slate-700 shadow-xs max-w-[120px]">
                <span className="w-2 h-2 rounded-full bg-[#1677E8] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#1677E8] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#1677E8] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Clickable Suggestions */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-white dark:bg-[#0B132B] border-t border-slate-100 dark:border-slate-800 shrink-0">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Suggested questions:
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {quickPrompts.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="text-left text-[10.5px] px-2.5 py-1 rounded-full bg-blue-50/70 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#08165B] dark:text-slate-200 border border-blue-200/50 dark:border-slate-700 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input Bar */}
          <div className="p-3 bg-white dark:bg-[#0B132B] border-t border-blue-100 dark:border-slate-800 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#0F1C36] rounded-2xl border border-blue-200/70 dark:border-slate-700 p-1.5 focus-within:border-[#1677E8] focus-within:shadow-xs transition-all"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about symptoms, lab tests, or care..."
                className="flex-1 bg-transparent px-2.5 py-1 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="w-8 h-8 rounded-xl bg-[#1677E8] hover:bg-[#08165B] disabled:opacity-40 disabled:hover:bg-[#1677E8] text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs"
                title="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="text-center text-[9px] text-slate-400 mt-1.5">
              Evidence-based triage • In emergencies, call <span className="font-bold text-rose-500">102 / 112</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
