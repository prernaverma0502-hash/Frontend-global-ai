// 12 Official Landing Page Categories with Apple Health / Perplexity minimal styling
export const PORTAL_CATEGORIES = [
  {
    id: 'personal-health',
    name: 'My Personal Health',
    dotColor: 'bg-emerald-500',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    description: 'Daily health routines, preventive wellness, and vital tracking.',
    examplePrompt: 'Annual preventive health screening checklist for adults'
  },
  {
    id: 'mens-health',
    name: "My Men's Health",
    dotColor: 'bg-blue-500',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    description: 'Cardiovascular vigilance, prostate awareness, and energy balance.',
    examplePrompt: 'Cardiovascular risk factors for men over 40'
  },
  {
    id: 'womens-health',
    name: "My Women's Health",
    dotColor: 'bg-pink-500',
    borderColor: 'border-pink-200',
    textColor: 'text-pink-700',
    description: 'Hormonal cycles, thyroid care, and life stage transitions.',
    examplePrompt: 'Understanding hormonal fluctuations and iron deficiency'
  },
  {
    id: 'parenting',
    name: 'My Parenting',
    dotColor: 'bg-amber-500',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    description: 'Child nutrition, pediatric fever safety, and developmental milestones.',
    examplePrompt: 'Home care guidelines for toddler fever under 101F'
  },
  {
    id: 'food-nutrition',
    name: 'My Food & Nutrition',
    dotColor: 'bg-lime-600',
    borderColor: 'border-lime-200',
    textColor: 'text-lime-700',
    description: 'Anti-inflammatory diet, gut microbiome, and meal sequencing.',
    examplePrompt: 'Meal sequence habits to prevent afternoon blood sugar spikes'
  },
  {
    id: 'mind-emotions',
    name: 'My Mind & Emotions',
    dotColor: 'bg-purple-500',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    description: 'Stress regulation, somatic calming, and emotional resilience.',
    examplePrompt: 'Feeling anxious and trouble sleeping past 3 AM'
  },
  {
    id: 'life-stages',
    name: 'My Life Stages',
    dotColor: 'bg-orange-500',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    description: 'Adolescent growth, midlife wellness, and healthy aging protocols.',
    examplePrompt: 'Bone mineral density and joint comfort for aging adults'
  },
  {
    id: 'lifestyle-fitness',
    name: 'My Lifestyle & Fitness',
    dotColor: 'bg-cyan-500',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-700',
    description: 'Circadian entrainment, posture ergonomics, and daily mobility.',
    examplePrompt: 'Gentle stretching to relieve lower back stiffness from sitting'
  },
  {
    id: 'chronic-conditions',
    name: 'My Chronic Conditions',
    dotColor: 'bg-rose-500',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    description: 'Hypertension monitoring, glycemic index, and asthma protocols.',
    examplePrompt: 'Fasting glucose was 128 mg/dL. What are safe next steps?'
  },
  {
    id: 'medicines-tests',
    name: 'My Medicines & Tests',
    dotColor: 'bg-indigo-500',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-700',
    description: 'Lab blood report terminology, lipid panels, and drug safety.',
    examplePrompt: 'What do high triglycerides mean in a routine blood panel?'
  },
  {
    id: 'special-care',
    name: 'My Special Care',
    dotColor: 'bg-violet-500',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-700',
    description: 'Bedside caregiver assistance, mobility support, and alert signs.',
    examplePrompt: 'Home care precautions to prevent bed sores in elderly patients'
  },
  {
    id: 'symptoms',
    name: 'My Symptoms',
    dotColor: 'bg-teal-600',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-700',
    description: 'Symptom triage, red-flag detection, and urgency assessment.',
    examplePrompt: 'Mild fever and dry cough for 3 days'
  }
];

export const DEMO_TRIAGE_SCENARIOS = {
  GREEN: {
    severity: 'GREEN',
    label: 'Normal / Lower Immediate Concern',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotClass: 'bg-emerald-500',
    title: 'Mild Upper Respiratory Irritation & Postural Fatigue',
    summary:
      'Your reported symptoms are consistent with mild, self-limiting seasonal airway irritation or postural fatigue. Vital markers appear stable with no signs of respiratory distress, acute fever spikes, or red-flag systemic involvement.',
    steps: [
      'Maintain steady hydration with 2 to 2.5 liters of warm water and electrolyte broths.',
      'Practice gentle warm saline gargles twice daily if experiencing pharyngeal scratchiness.',
      'Allow 7.5 to 8 hours of restorative sleep in a cool, quiet room without screen stimulation.',
      'Monitor your temperature daily. If fever exceeds 100.4°F or persists past 5 days, seek clinical assessment.'
    ],
    sources: 'ICMR Guidelines on Acute Mild Respiratory Illness (2025) • Frontline Clinical Archives',
    doctorAdvice: 'Self-care is appropriate. Visit your local clinic if symptoms do not improve within one week.'
  },
  YELLOW: {
    severity: 'YELLOW',
    label: 'Mild Caution / See Doctor Soon',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    dotClass: 'bg-amber-500',
    title: 'Subacute Viral Pharyngitis or Early Bronchial Irritation',
    summary:
      'A low-grade fever persisting for 3 days combined with a non-productive dry cough warrants an in-person medical evaluation to rule out secondary bacterial infection, bronchitis, or localized inflammation. While not an acute emergency, clinical examination is recommended.',
    steps: [
      'Schedule a routine evaluation with a general physician or clinic within 24 to 48 hours.',
      'Keep a written morning and evening log of your body temperature, fluid intake, and cough severity.',
      'Avoid unprescribed antibiotics or self-medicating with heavy suppressants before doctor examination.',
      'Rest indoors and avoid strenuous physical exertion until cleared by your healthcare provider.'
    ],
    sources: 'Association of Physicians of India Clinical Protocol • ICMR Adult Respiratory Review (2025)',
    doctorAdvice: 'Consult a general physician within 24–48 hours for throat examination and lung auscultation.'
  },
  RED: {
    severity: 'RED',
    label: 'Urgent / Immediate Emergency Attention',
    badgeClass: 'bg-red-50 text-red-700 border-red-200',
    dotClass: 'bg-red-500 animate-pulse',
    title: 'Potential Acute Cardiopulmonary or Emergency Red-Flag Event',
    summary:
      'The described symptoms (acute chest tightness, radiating pain into arm/jaw, or sudden breathlessness) trigger strict emergency clinical red-flag criteria. These warning signs require immediate medical diagnostic assessment at a hospital emergency room.',
    steps: [
      'Call emergency services immediately (102 / 108 / 112) or have someone drive you to the nearest ER.',
      'Sit in a comfortable upright resting position; loosen any restrictive collar or waistband.',
      'Do not attempt to drive yourself to the clinic or wait to see if discomfort fades.',
      'Have an attendant gather any prior ECGs, chronic medication lists, or recent lab reports.'
    ],
    sources: 'Emergency Department Cardiovascular Triage Guidelines (2025) • Golden Hour Protocol',
    doctorAdvice: 'Seek hospital emergency evaluation right now. Do not delay medical assessment.'
  }
};
