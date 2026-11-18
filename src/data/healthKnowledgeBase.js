// GlobalHealthAI - Medical Research Knowledge Base & Clinical Triage Engine
// Powered by Admin-uploaded medical research, ICMR/WHO protocols, and Dr. Pratap Madhukar's 38-year clinical practice

export const HEALTH_CATEGORIES = [
  {
    id: 'symptoms',
    title: 'My Symptoms',
    shortDesc: 'Check your symptoms, assess urgency, understand possible causes and safe next steps.',
    icon: 'Stethoscope',
    color: 'from-blue-600 to-indigo-700',
    badgeColor: 'bg-blue-50 text-[#1677E8] border-blue-200',
    aiPersona: 'Clinical Symptom Triage Specialist',
    starterPrompt: 'Describe what you are experiencing, when it began, and any accompanying discomfort.',
    suggestedQuestions: [
      'I have a persistent dry cough and mild fever for 3 days',
      'Sudden sharp chest pain when taking a deep breath',
      'Throbbing headache on one side with nausea and light sensitivity',
      'Dull lower abdominal cramping that started yesterday'
    ]
  },
  {
    id: 'reports-medicines',
    title: 'My Reports & Medicines',
    shortDesc: 'Understand lab test values, blood work abbreviations, and drug safety facts.',
    icon: 'FileSpreadsheet',
    color: 'from-teal-600 to-emerald-700',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    aiPersona: 'Laboratory & Pharmacology Guide',
    starterPrompt: 'Paste your lab values or ask about medicine uses, common side effects, and precautions.',
    suggestedQuestions: [
      'My Fasting Blood Sugar is 138 mg/dL and HbA1c is 6.8%. What does this mean?',
      'Can I take Paracetamol with blood pressure medication?',
      'Understanding Lipid Profile: What is high LDL and low HDL?',
      'Platelet count report shows 110,000. Is this dangerously low?'
    ]
  },
  {
    id: 'health',
    title: 'My Health',
    shortDesc: 'Comprehensive personal health education, preventive wellness, and vital monitoring.',
    icon: 'HeartPulse',
    color: 'from-rose-500 to-pink-600',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    aiPersona: 'Preventive Health Physician',
    starterPrompt: 'Ask about overall wellness, blood pressure goals, routine screenings, or immunity.',
    suggestedQuestions: [
      'What are normal blood pressure ranges for adults over 40?',
      'Annual health screening checklist for men and women',
      'How to recognize early signs of metabolic pre-diabetes',
      'Safe heart rate ranges during brisk walking'
    ]
  },
  {
    id: 'family',
    title: 'My Family',
    shortDesc: 'Health guidance for children, teens, aging parents, and generational care.',
    icon: 'Users',
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    aiPersona: 'Family Medicine & Pediatrics Consultant',
    starterPrompt: 'Ask about child fevers, elderly parent mobility, immunization timelines, or family wellness.',
    suggestedQuestions: [
      'My 5-year-old has fever and refuses fluids. When should we go to ER?',
      'Senior parent experiencing frequent dizzy spells upon standing',
      'Teenager complaining of persistent fatigue and low iron levels',
      'Home safety precautions to prevent elderly falls'
    ]
  },
  {
    id: 'mind-sleep',
    title: 'My Mind & Sleep',
    shortDesc: 'Stress resilience, sleep architecture, burnout relief, and emotional wellness.',
    icon: 'Brain',
    color: 'from-indigo-600 to-violet-700',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    aiPersona: 'Neuro-Psychological & Sleep Hygiene Specialist',
    starterPrompt: 'Share sleep difficulties, tension headaches, panic sensations, or chronic anxiety.',
    suggestedQuestions: [
      'Waking up at 3 AM with a racing heartbeat and anxious thoughts',
      'Non-pharmacological techniques for falling asleep within 20 minutes',
      'Difference between daily work burnout and clinical depression',
      'How chronic anxiety manifests as digestive upset'
    ]
  },
  {
    id: 'food-lifestyle',
    title: 'My Food & Lifestyle',
    shortDesc: 'Nutrition balance, anti-inflammatory meals, gentle movement, and gut health.',
    icon: 'Utensils',
    color: 'from-emerald-600 to-green-700',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    aiPersona: 'Nutritional Medicine & Lifestyle Clinician',
    starterPrompt: 'Explore anti-inflammatory Indian foods, metabolic meal sequencing, or gut balance.',
    suggestedQuestions: [
      'Best meal sequence to prevent post-lunch glucose spikes',
      'Dietary swaps for high uric acid and joint discomfort',
      'Simple indigenous foods that improve gut microbiome diversity',
      'Hydration and electrolyte balance during hot weather'
    ]
  },
  {
    id: 'caregiver',
    title: 'My Caregiver Guide',
    shortDesc: 'Bedside patient care, bed sore prevention, hydration tracking, and alert signs.',
    icon: 'ShieldCheck',
    color: 'from-cyan-600 to-blue-700',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    aiPersona: 'Clinical Home-Care & Palliative Advisor',
    starterPrompt: 'Get guidance on caring for a bedridden or post-surgical family member at home.',
    suggestedQuestions: [
      'How to position a bedbound patient every 2 hours to avoid pressure ulcers',
      'Warning signs of aspiration pneumonia in elderly post-stroke patients',
      'Safe caregiver lifting techniques to avoid lower back strain',
      'Monitoring oxygen saturation and pulse rate accurately at home'
    ]
  },
  {
    id: 'doctor-visit',
    title: 'My Doctor Visit',
    shortDesc: 'Prepare high-impact questions for your physician, summarize symptoms, and organize history.',
    icon: 'ClipboardList',
    color: 'from-[#08165B] to-[#1677E8]',
    badgeColor: 'bg-blue-50 text-[#08165B] border-blue-200',
    aiPersona: 'Clinical Consultation Preparer',
    starterPrompt: 'Tell me your upcoming doctor appointment type to generate a structured 1-page summary.',
    suggestedQuestions: [
      'Prepare a 5-point question sheet for my upcoming cardiologist visit',
      'How to summarize 3 months of fluctuating blood pressure for my doctor',
      'Key questions to ask when a doctor prescribes a new chronic medicine',
      'What records should I carry for a first-time endocrinologist consultation?'
    ]
  }
];

// Admin-managed Medical Knowledge Base Documents (Simulating RAG indexed store)
export const MEDICAL_RESEARCH_DOCS = [
  {
    id: 'DOC-CR-001',
    title: 'Emergency Triage & Cardiovascular Red-Flag Protocols (2025 Edition)',
    author: 'Dr. Pratap Madhukar & Clinical Review Board',
    institution: 'GlobalHealthAI Clinical Department / Association of Physicians of India',
    tags: ['chest pain', 'shortness of breath', 'cardiovascular', 'emergency', 'angina'],
    evidenceChunk: 'Acute chest tightness radiating to the left jaw, shoulder, or back accompanied by diaphoresis (cold sweats) or dyspnea warrants immediate emergency department transfer within 60 minutes (golden hour rule). Sublingual nitrates must only be administered under verified prescription.'
  },
  {
    id: 'DOC-RES-004',
    title: 'ICMR Consensus Guidelines on Adult Upper & Lower Respiratory Infections',
    author: 'Indian Council of Medical Research (ICMR)',
    institution: 'Ministry of Health & Family Welfare',
    tags: ['cough', 'fever', 'respiratory', 'pharyngitis', 'bronchitis'],
    evidenceChunk: 'Over 85% of acute cough episodes are viral in etiology and do not warrant empirical antibiotic therapy. Red-flag triggers include persistent hemoptysis (blood in sputum), respiratory rate > 24 breaths/min, oxygen saturation < 94%, or high fever exceeding 102°F beyond 72 hours.'
  },
  {
    id: 'DOC-MET-012',
    title: 'Metabolic Syndrome & Glycemic Triage in South Asian Populations',
    author: 'Research Society for the Study of Diabetes in India (RSSDI)',
    institution: 'Endocrine Society Collaborative Study',
    tags: ['diabetes', 'sugar', 'glucose', 'insulin', 'metabolic', 'hba1c'],
    evidenceChunk: 'Fasting Plasma Glucose between 100-125 mg/dL indicates impaired fasting glucose (pre-diabetes), whereas HbA1c between 5.7%-6.4% confirms pre-diabetic risk. Postprandial glucose surges can be tempered by 40% through protein/fiber sequencing prior to complex carbohydrates.'
  },
  {
    id: 'DOC-NEU-007',
    title: 'Headache Classification & Secondary Headache Red Flags (SNOOP Protocol)',
    author: 'International Headache Society & Indian Academy of Neurology',
    institution: 'Neurology Department Consensus Group',
    tags: ['headache', 'migraine', 'head', 'nausea', 'vision'],
    evidenceChunk: 'Primary headaches (tension, migraine) are managed conservatively. Secondary headache warning signs follow SNOOP: Systemic signs (fever, weight loss), Neurological deficits, Onset sudden ("thunderclap" peak < 1 minute), Older age onset (> 50 yrs), Previous headache history change.'
  },
  {
    id: 'DOC-GAS-015',
    title: 'Acute & Chronic Abdominal Pain Triage in Family Practice',
    author: 'Dr. Pratap Madhukar',
    institution: '38-Year Frontline Clinical Review Archives',
    tags: ['stomach', 'abdomen', 'acidity', 'vomiting', 'pain', 'cramping'],
    evidenceChunk: 'Right lower quadrant pain with rebound tenderness (McBurney point) strongly suggests appendiceal pathology requiring immediate surgical assessment. Epigastric burning alleviated by food suggests peptic ulceration, while radiating severe back pain warrants pancreatic enzyme evaluation.'
  }
];

// Clinical Emergency Red-Flag Trigger Detector
export const detectEmergencyRedFlags = (input) => {
  if (!input) return false;
  const q = input.toLowerCase();

  const emergencyTriggers = [
    'crushing chest pain', 'chest pain radiating', 'pain in left arm and chest',
    'difficulty breathing', 'severe breathlessness', 'lips turning blue',
    'sudden weakness on one side', 'slurred speech', 'facial drooping',
    'coughing up blood', 'uncontrolled bleeding', 'unconscious', 'fainting with chest pain',
    'worst headache of my life', 'thunderclap headache', 'stiff neck with high fever',
    'vomiting blood', 'black tarry stools', 'sudden loss of vision'
  ];

  return emergencyTriggers.some(t => q.includes(t));
};

// RAG Retrieval Engine: Matches query against medical research documents
export const retrieveMedicalEvidence = (query, categoryId) => {
  if (!query) return [];
  const q = query.toLowerCase();

  const scoredDocs = MEDICAL_RESEARCH_DOCS.map(doc => {
    let score = 0;
    doc.tags.forEach(tag => {
      if (q.includes(tag)) score += 3;
    });
    if (doc.title.toLowerCase().split(' ').some(w => w.length > 3 && q.includes(w))) score += 2;
    if (doc.evidenceChunk.toLowerCase().split(' ').some(w => w.length > 4 && q.includes(w))) score += 1;
    return { ...doc, score };
  });

  return scoredDocs
    .filter(d => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
};

// Clinical Assessment Generator
export const generateHealthAssessment = (userMessage, categoryId, conversationHistory = []) => {
  const isEmergency = detectEmergencyRedFlags(userMessage);
  const evidenceSources = retrieveMedicalEvidence(userMessage, categoryId);

  // Category specific context
  const cat = HEALTH_CATEGORIES.find(c => c.id === categoryId) || HEALTH_CATEGORIES[0];

  // 1. Emergency Escalation (RED)
  if (isEmergency) {
    return {
      urgency: 'RED',
      urgencyLabel: 'RED – URGENT: Potential Emergency Warning Signs',
      urgencyColor: 'bg-red-50 text-red-700 border-red-300',
      badgeBg: 'bg-red-600 text-white',
      understanding: `You have described acute, high-risk symptoms that require immediate clinical attention without delay. Clinical protocols indicate these warning signs can be associated with serious cardiovascular, neurological, or severe respiratory events.`,
      possibleExplanations: [
        'Acute Coronary / Cardiovascular Event (e.g. Myocardial Ischemia or Angina)',
        'Acute Respiratory Compromise or Pulmonary Thromboembolism',
        'Acute Neurological Deficit / Cerebrovascular Event'
      ],
      nextSteps: [
        'Call your local emergency ambulance immediately (e.g. 102 / 108 in India or 911 / 112).',
        'Sit or lie down in a safe, comfortable upright position; loosen tight collar or waistbands.',
        'Do not attempt to drive yourself to the hospital.',
        'Have a family member stay by your side with any prior ECGs or cardiac records.'
      ],
      whenToSeekHelp: 'Seek hospital emergency evaluation right now. Do not wait to see if the symptoms pass.',
      sources: evidenceSources.length > 0 ? evidenceSources : [MEDICAL_RESEARCH_DOCS[0]],
      doctorSummaryReady: true
    };
  }

  // 2. Yellow Escalation (Caution - Needs evaluation in 24-48h)
  const yellowTriggers = ['fever', 'cough', 'days', 'week', 'headache', 'dull pain', 'vomiting', 'sugar', 'blood pressure', 'burning', 'dizzy'];
  const hasYellowTrigger = yellowTriggers.some(t => userMessage.toLowerCase().includes(t));

  if (hasYellowTrigger || categoryId === 'symptoms' || categoryId === 'reports-medicines') {
    return {
      urgency: 'YELLOW',
      urgencyLabel: 'YELLOW – CAUTION: Medical Evaluation Recommended (Within 24–48 Hours)',
      urgencyColor: 'bg-amber-50 text-amber-800 border-amber-300',
      badgeBg: 'bg-amber-500 text-white',
      understanding: `Based on your description, your symptoms appear consistent with a subacute or moderate inflammatory/metabolic disturbance. While immediate life-threatening markers were not triggered in this description, clinical confirmation by an in-person physician is needed to prevent progression.`,
      possibleExplanations: [
        'Viral or Upper Respiratory Mucosal Infection with secondary inflammation',
        'Metabolic Glucose Dysregulation or Subclinical Dehydration',
        'Localized Musculoskeletal Strain or Tension-Type Cephalea'
      ],
      nextSteps: [
        'Schedule an appointment with an internal medicine physician or family doctor within 24 to 48 hours.',
        'Keep a written temperature, fluid intake, and symptom log morning and evening.',
        'Maintain oral rehydration with electrolyte-balanced warm broths or water.',
        'Avoid self-initiating antibiotics or altering prescribed chronic medication doses.'
      ],
      whenToSeekHelp: 'Escalate to emergency care immediately if fever surpasses 102.5°F, severe breathlessness develops, or pain becomes excruciating.',
      sources: evidenceSources.length > 0 ? evidenceSources : [MEDICAL_RESEARCH_DOCS[1], MEDICAL_RESEARCH_DOCS[2]],
      doctorSummaryReady: true
    };
  }

  // 3. Green Evaluation (Educational / Preventive / Lower Immediate Concern)
  return {
    urgency: 'GREEN',
    urgencyLabel: 'GREEN – LOWER IMMEDIATE CONCERN: Educational Self-Care & Monitoring',
    urgencyColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    badgeBg: 'bg-emerald-600 text-white',
    understanding: `Your query reflects general educational health management, preventive lifestyle optimization, or mild self-limiting symptoms without acute red-flag indicators.`,
    possibleExplanations: [
      'Normal Physiological Adaptive Response to Lifestyle or Dietary Shift',
      'Mild Postural Fatigue or Transient Circadian Rhythm Disruption',
      'Benign Gastrointestinal Sensitization or Minor Dietary Acidity'
    ],
    nextSteps: [
      'Implement structured hydration (2–2.5 liters of room-temperature fluids daily).',
      'Prioritize 7.5 to 8 hours of uninterrupted restorative sleep in a cool, dark room.',
      'Incorporate wholesome, fiber-rich, minimally processed meals.',
      'Monitor for 3–5 days. If symptoms persist or worsen, visit your family physician.'
    ],
    whenToSeekHelp: 'Consult a physician if symptoms do not resolve within one week or if new localized pains emerge.',
    sources: evidenceSources.length > 0 ? evidenceSources : [MEDICAL_RESEARCH_DOCS[2], MEDICAL_RESEARCH_DOCS[4]],
    doctorSummaryReady: true
  };
};
