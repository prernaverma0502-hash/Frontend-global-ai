// GlobalHealthAI - User Portal Persistent Storage Service
// Handles client-side persistence for conversations, saved reports, profile details, and user settings

const STORAGE_KEYS = {
  CONVERSATIONS: 'globalhealth_conversations_',
  REPORTS: 'globalhealth_reports_',
  PROFILE: 'globalhealth_profile_',
  SETTINGS: 'globalhealth_settings_'
};

const getStorageKey = (prefix, email = 'user@gmail.com') => {
  const clean = (email || 'user@gmail.com').toLowerCase().trim();
  return `${prefix}${clean}`;
};

// Initial mock conversations for immediate rich experience
const getInitialConversations = () => [
  {
    id: 'conv-101',
    title: 'Persistent Dry Cough & Night Fever Assessment',
    category: 'symptoms',
    categoryName: 'My Symptoms',
    date: '2026-11-15T14:30:00.000Z',
    updatedAt: '2026-11-15T14:45:00.000Z',
    urgency: 'YELLOW',
    preview: 'Patient experiencing mild fever (100.4°F) and dry cough for 3 days without shortness of breath...',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'I have had a dry cough and mild fever around 100 degrees for 3 days. My throat also feels scratchy.',
        timestamp: '14:30'
      },
      {
        id: 'msg-2',
        sender: 'ai',
        isAssessment: true,
        urgency: 'YELLOW',
        urgencyLabel: 'YELLOW – CAUTION: Medical Evaluation Recommended (Within 24–48 Hours)',
        understanding: 'You have described a 3-day history of low-grade fever and persistent dry cough with pharyngeal irritation. No acute respiratory compromise was noted.',
        possibleExplanations: [
          'Acute Viral Tracheobronchitis or Upper Respiratory Infection',
          'Post-nasal drip secondary to allergic or seasonal mucosal irritation'
        ],
        nextSteps: [
          'Visit a general physician or clinic within 24 to 48 hours for throat inspection and chest auscultation.',
          'Warm saline gargles twice daily and stay hydrated with lukewarm fluids.',
          'Record oral temperature every 8 hours.'
        ],
        whenToSeekHelp: 'Seek immediate care if breathing becomes labored, lips turn bluish, or cough produces significant blood.',
        sources: [
          {
            title: 'ICMR Guidelines on Acute Upper Respiratory Infections',
            institution: 'Ministry of Health & Family Welfare',
            evidenceChunk: 'Over 85% of acute cough episodes are viral in etiology and do not warrant empirical antibiotic therapy.'
          }
        ],
        timestamp: '14:31'
      }
    ]
  },
  {
    id: 'conv-102',
    title: 'Cardiologist Consultation Questions Sheet',
    category: 'doctor-visit',
    categoryName: 'My Doctor Visit',
    date: '2026-11-14T10:15:00.000Z',
    updatedAt: '2026-11-14T10:25:00.000Z',
    urgency: 'GREEN',
    preview: 'Structured 5-point question sheet prepared for upcoming annual cardiovascular follow-up...',
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        text: 'I have my routine cardiology appointment next Tuesday. Can you help me prepare what to ask the doctor regarding my mild BP fluctuations?',
        timestamp: '10:15'
      },
      {
        id: 'msg-4',
        sender: 'ai',
        isAssessment: false,
        text: `Here is your structured 5-point question sheet for your cardiologist consultation:\n\n1. "Given my recent BP log (averaging 134/86 mmHg in the mornings), should we adjust my current lifestyle goals or dosage timing?"\n2. "Are there specific target numbers for my systolic and diastolic levels based on my age and family history?"\n3. "Would a 24-hour Ambulatory Blood Pressure Monitor (ABPM) help distinguish white-coat elevation from true baseline hypertension?"\n4. "Do you recommend reviewing my lipid profile and kidney function (serum creatinine) this visit?"\n5. "Are there any dietary supplements or OTC pain relievers (like NSAIDs) that I should strictly avoid with my cardiovascular profile?"`,
        timestamp: '10:16'
      }
    ]
  }
];

// Initial mock saved reports
const getInitialReports = () => [
  {
    id: 'rep-201',
    title: 'Clinical Triage Summary — Upper Respiratory Symptoms',
    categoryName: 'My Symptoms',
    date: '2026-11-15T14:45:00.000Z',
    urgency: 'YELLOW',
    patientName: 'Clinical Patient',
    summaryText: 'Summary for Physician: 3-day history of low-grade fever (100.4°F) and non-productive dry cough. No dyspnea, no chest pain. Recommendation: Clinical assessment within 24-48 hours. Rule out bacterial superinfection or acute bronchitis.',
    sourcesCited: 'ICMR Guidelines on Respiratory Tract Infections (2025)'
  },
  {
    id: 'rep-202',
    title: 'Physician Consultation Preparation Sheet',
    categoryName: 'My Doctor Visit',
    date: '2026-11-14T10:25:00.000Z',
    urgency: 'GREEN',
    patientName: 'Clinical Patient',
    summaryText: 'Prepared question list for upcoming cardiology review covering morning blood pressure spikes, dietary sodium limits, and kidney safety checks.',
    sourcesCited: 'Dr. Pratap Madhukar 38-Year Frontline Practice Archives'
  }
];

export const userPortalStorage = {
  // --- Conversations ---
  getConversations(email) {
    try {
      const data = localStorage.getItem(getStorageKey(STORAGE_KEYS.CONVERSATIONS, email));
      if (!data) {
        const initial = getInitialConversations();
        localStorage.setItem(getStorageKey(STORAGE_KEYS.CONVERSATIONS, email), JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return getInitialConversations();
    }
  },

  saveConversation(email, conversation) {
    try {
      const list = this.getConversations(email);
      const existingIdx = list.findIndex(c => c.id === conversation.id);
      let updated;
      if (existingIdx >= 0) {
        updated = [...list];
        updated[existingIdx] = conversation;
      } else {
        updated = [conversation, ...list];
      }
      localStorage.setItem(getStorageKey(STORAGE_KEYS.CONVERSATIONS, email), JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.warn('Storage save error:', e);
      return [];
    }
  },

  deleteConversation(email, conversationId) {
    try {
      const list = this.getConversations(email);
      const updated = list.filter(c => c.id !== conversationId);
      localStorage.setItem(getStorageKey(STORAGE_KEYS.CONVERSATIONS, email), JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  renameConversation(email, conversationId, newTitle) {
    try {
      const list = this.getConversations(email);
      const updated = list.map(c => c.id === conversationId ? { ...c, title: newTitle } : c);
      localStorage.setItem(getStorageKey(STORAGE_KEYS.CONVERSATIONS, email), JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // --- Saved Reports ---
  getReports(email) {
    try {
      const data = localStorage.getItem(getStorageKey(STORAGE_KEYS.REPORTS, email));
      if (!data) {
        const initial = getInitialReports();
        localStorage.setItem(getStorageKey(STORAGE_KEYS.REPORTS, email), JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return getInitialReports();
    }
  },

  saveReport(email, report) {
    try {
      const list = this.getReports(email);
      const updated = [report, ...list];
      localStorage.setItem(getStorageKey(STORAGE_KEYS.REPORTS, email), JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.warn(e);
      return [];
    }
  },

  deleteReport(email, reportId) {
    try {
      const list = this.getReports(email);
      const updated = list.filter(r => r.id !== reportId);
      localStorage.setItem(getStorageKey(STORAGE_KEYS.REPORTS, email), JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // --- Profile ---
  getProfile(email) {
    try {
      const data = localStorage.getItem(getStorageKey(STORAGE_KEYS.PROFILE, email));
      if (data) return JSON.parse(data);
    } catch {}
    return {
      fullName: 'Patient User',
      email: email || 'user@gmail.com',
      preferredLanguage: 'English',
      emergencyContact: '+91 98765 43210',
      memberSince: 'November 2026',
      consentAccepted: true
    };
  },

  saveProfile(email, profileData) {
    try {
      localStorage.setItem(getStorageKey(STORAGE_KEYS.PROFILE, email), JSON.stringify(profileData));
    } catch (e) {
      console.warn(e);
    }
  },

  // --- Settings ---
  getSettings(email) {
    try {
      const data = localStorage.getItem(getStorageKey(STORAGE_KEYS.SETTINGS, email));
      if (data) return JSON.parse(data);
    } catch {}
    return {
      language: 'English',
      responseStyle: 'Detailed Clinical',
      notificationsEnabled: true,
      voiceSpeed: '1.0x',
      highContrast: false,
      privacyShareConsent: true
    };
  },

  saveSettings(email, settingsData) {
    try {
      localStorage.setItem(getStorageKey(STORAGE_KEYS.SETTINGS, email), JSON.stringify(settingsData));
    } catch (e) {
      console.warn(e);
    }
  }
};
