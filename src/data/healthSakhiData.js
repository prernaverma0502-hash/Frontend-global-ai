// HealthSakhi V1 Educational E-Book Library Data & CMS Service
// Strictly educational e-book library - NOT a medical consultation or AI chatbot.

export const OFFICIAL_LANGUAGES = [
  { id: 'en', name: 'English', native: 'English', dir: 'ltr', flag: '🇬🇧' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी', dir: 'ltr', flag: '🇮🇳' },
  { id: 'mr', name: 'Marathi', native: 'मराठी', dir: 'ltr', flag: '🇮🇳' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা', dir: 'ltr', flag: '🇮🇳' },
  { id: 'gu', name: 'Gujarati', native: 'ગુજરાતી', dir: 'ltr', flag: '🇮🇳' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు', dir: 'ltr', flag: '🇮🇳' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்', dir: 'ltr', flag: '🇮🇳' },
  { id: 'ur', name: 'Urdu', native: 'اردو', dir: 'rtl', flag: '🇵🇰' },
  { id: 'ar', name: 'Arabic', native: 'العربية', dir: 'rtl', flag: '🇦🇪' },
];

export const OFFICIAL_CATEGORIES = [
  {
    id: 'cat-1',
    name: "My Body and Women's Health",
    slug: 'my-body-and-womens-health',
    description: 'Foundational understanding of hormonal cycles, pelvic wellness, bone density, and life-stage health transitions.',
    icon: 'HeartPulse',
    gradient: 'from-pink-500 to-rose-600',
    bgTint: 'bg-pink-50 text-pink-700 border-pink-200',
    publishedCount: 3,
  },
  {
    id: 'cat-2',
    name: 'My Weight and Metabolic Wellness',
    slug: 'my-weight-and-metabolic-wellness',
    description: 'Practical guides to insulin balance, thyroid awareness, visceral fat management, and daily metabolic rhythms.',
    icon: 'Flame',
    gradient: 'from-amber-500 to-orange-600',
    bgTint: 'bg-amber-50 text-amber-700 border-amber-200',
    publishedCount: 2,
  },
  {
    id: 'cat-3',
    name: 'My Beauty and Personal Care',
    slug: 'my-beauty-and-personal-care',
    description: 'Dermatological wisdom, skin barrier preservation, hair health science, and safe personal care routines.',
    icon: 'Sparkles',
    gradient: 'from-fuchsia-500 to-purple-600',
    bgTint: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    publishedCount: 2,
  },
  {
    id: 'cat-4',
    name: 'My Pregnancy and New Motherhood',
    slug: 'my-pregnancy-and-new-motherhood',
    description: 'Trimester-by-trimester nutritional advice, labor preparedness, postpartum recovery, and lactation fundamentals.',
    icon: 'Baby',
    gradient: 'from-sky-500 to-blue-600',
    bgTint: 'bg-sky-50 text-sky-700 border-sky-200',
    publishedCount: 2,
  },
  {
    id: 'cat-5',
    name: 'My Child and Parenting',
    slug: 'my-child-and-parenting',
    description: 'Early childhood milestones, immunity building, balanced childhood nutrition, and gentle behavioural guidance.',
    icon: 'Users',
    gradient: 'from-emerald-500 to-teal-600',
    bgTint: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    publishedCount: 2,
  },
  {
    id: 'cat-6',
    name: 'My Teen and Gen Z',
    slug: 'my-teen-and-gen-z',
    description: 'Navigating adolescent hormone surges, screen fatigue, posture health, social anxiety, and academic balance.',
    icon: 'Zap',
    gradient: 'from-violet-500 to-indigo-600',
    bgTint: 'bg-violet-50 text-violet-700 border-violet-200',
    publishedCount: 1,
  },
  {
    id: 'cat-7',
    name: 'My Marriage and Relationships',
    slug: 'my-marriage-and-relationships',
    description: 'Emotional attunement, conflict de-escalation, intimacy preservation, and shared mental wellness in marriage.',
    icon: 'HeartHandshake',
    gradient: 'from-rose-500 to-red-600',
    bgTint: 'bg-rose-50 text-rose-700 border-rose-200',
    publishedCount: 1,
  },
  {
    id: 'cat-8',
    name: 'My Husband and Family Heart',
    slug: 'my-husband-and-family-heart',
    description: 'Cardiovascular vigilance for midlife men, blood pressure maintenance, lipid profiles, and stress reduction.',
    icon: 'ShieldCheck',
    gradient: 'from-blue-600 to-indigo-700',
    bgTint: 'bg-blue-50 text-blue-700 border-blue-200',
    publishedCount: 2,
  },
  {
    id: 'cat-9',
    name: 'My Mind and Emotional Wellness',
    slug: 'my-mind-and-emotional-wellness',
    description: 'Stress resilience, cognitive hygiene, somatic calming practices, burnout recovery, and emotional balance.',
    icon: 'Brain',
    gradient: 'from-teal-500 to-cyan-600',
    bgTint: 'bg-teal-50 text-teal-700 border-teal-200',
    publishedCount: 3,
  },
  {
    id: 'cat-10',
    name: 'My Sleep and Migraine',
    slug: 'my-sleep-and-migraine',
    description: 'Circadian entrainment, dark-room protocols, sensory headache triggers, and restorative deep-sleep architecture.',
    icon: 'Moon',
    gradient: 'from-indigo-600 to-slate-800',
    bgTint: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    publishedCount: 2,
  },
  {
    id: 'cat-11',
    name: 'My Parents and Healthy Ageing',
    slug: 'my-parents-and-healthy-ageing',
    description: 'Elder mobility preservation, fall risk reduction, cognitive stimulation, memory care, and joint comfort.',
    icon: 'Smile',
    gradient: 'from-amber-600 to-yellow-700',
    bgTint: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    publishedCount: 2,
  },
  {
    id: 'cat-12',
    name: 'My Food and Ayurveda',
    slug: 'my-food-and-ayurveda',
    description: 'Wholesome indigenous cooking principles, seasonal digestion, kitchen spices as wellness allies, and gut balance.',
    icon: 'Utensils',
    gradient: 'from-lime-600 to-emerald-700',
    bgTint: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    publishedCount: 2,
  },
  {
    id: 'cat-13',
    name: 'My Family Leadership',
    slug: 'my-family-leadership',
    description: 'Building a home culture of preventive health, intergenerational resilience, and calm, confident caregiving.',
    icon: 'Compass',
    gradient: 'from-cyan-600 to-blue-700',
    bgTint: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    publishedCount: 1,
  },
  {
    id: 'cat-14',
    name: 'HealthSakhi Talks to Me',
    slug: 'healthsakhi-talks-to-me',
    description: 'Compassionate conversations on overcoming health stigma, quiet fears, hospital visits, and patient dignity.',
    icon: 'MessageCircleHeart',
    gradient: 'from-purple-600 to-pink-600',
    bgTint: 'bg-purple-50 text-purple-800 border-purple-200',
    publishedCount: 2,
  },
];

// Helper to generate full 14-page format per V1 client specification:
// Page 1: Introduction
// Pages 2-13: 12 core educational chapters
// Page 14: Summary & Daily Life
const createStandardBookPages = (bookTitle, topicName, themeColor) => [
  {
    pageNumber: 1,
    title: 'Introduction: The Foundations of Knowledge',
    type: 'introduction',
    readTime: '3 min',
    summary: `Why understanding ${topicName} empowers your everyday decisions and builds generational wellness.`,
    content: `### Welcome to ${bookTitle}
    
Health begins not in the pharmacy or the hospital corridor, but in the quiet, daily choices made around the kitchen counter, the family dinner table, and the evening rest. For generations, accurate wellness knowledge was scattered across complicated medical texts, leaving families feeling uncertain or vulnerable to misinformation.

This educational guide was curated to give you clear, scientifically grounded principles written in accessible, practical language. As you read through these pages, remember: your body communicates in quiet signals before it shouts. Learning to interpret these natural rhythms is the first step toward lasting vitality.

#### What You Will Learn
- The biological mechanics behind ${topicName} in clear, human terms.
- How hormonal and metabolic balance dictates day-to-day energy.
- Practical, kitchen-friendly daily habits that require no expensive supplements.
- Clear indicators of when routine home-care is sufficient versus when to seek a professional clinical assessment.

Let us begin this journey toward calm, informed family wellness.`,
  },
  {
    pageNumber: 2,
    title: 'Chapter 1: The Biological Rhythm & Internal Clock',
    type: 'core',
    readTime: '4 min',
    summary: 'How circadian cycles and hormonal pulses govern internal balance.',
    content: `### Understanding the Body Clock
Every cell in the human body houses molecular timekeepers regulated by the suprachiasmatic nucleus in the brain. When morning light enters our eyes, cortisol levels peak naturally to stimulate alertness, while melatonin production drops.

When we disrupt this rhythm—through irregular eating hours, late-night screen illumination, or chronic low-grade anxiety—the entire endocrine cascade is knocked off balance. For ${topicName}, restoring alignment with daylight cycles is the foundation of recovery.

#### Key Principles
1. **Morning Light Exposure**: Spend 10-15 minutes in natural morning sunlight within an hour of waking.
2. **Predictable Meal Windows**: Ingesting food at roughly the same hours each day stabilizes peripheral metabolic clocks in the liver and pancreas.
3. **The Evening Cool-Down**: Dimming ambient house lights after 8 PM allows natural hormone synthesis without interference.`,
  },
  {
    pageNumber: 3,
    title: 'Chapter 2: Nutritional Synergy & Gut Ecology',
    type: 'core',
    readTime: '4 min',
    summary: 'The relationship between digestive integrity and overall cellular resilience.',
    content: `### Food as Biological Information
Nutrition is more than calories; it is biochemical instructions delivered to your cells. In the context of ${topicName}, the integrity of the gastrointestinal lining plays a central role. Over 70% of the body's immune surveillance resides along the intestinal mucosa.

When the gut microbiome is fed diverse dietary fibers, polyphenols, and fermented foods, it generates short-chain fatty acids like butyrate, which reduce systemic inflammation and support mental clarity.

#### Actionable Dietary Guidelines
- Include a rainbow of seasonal vegetables across every main meal.
- Prioritize minimally processed whole grains over refined starches.
- Utilize carminative home spices—such as ginger, cumin, and turmeric—which support enzyme secretion.`,
  },
  {
    pageNumber: 4,
    title: 'Chapter 3: Stress Physiology & Somatic Grounding',
    type: 'core',
    readTime: '5 min',
    summary: 'How chronic sympathetic overdrive impacts tissues and how to down-regulate.',
    content: `### The Price of Unconscious Tension
Under acute threat, the sympathetic nervous system elevates heart rate and redirects blood away from digestion. In modern life, however, stress rarely presents as a physical predator—it arrives as prolonged emotional worry, financial strain, or caregiving overload.

Prolonged stress hormone elevation depletes tissue repair mechanisms. Somatic down-regulation techniques signal safety to the autonomic nervous system via the vagus nerve.

#### The 4-7-8 Breathing Technique
- Inhale softly through the nose for 4 counts.
- Hold gently without tension for 7 counts.
- Release with a slow, audible sigh through the lips for 8 counts.
- Repeat for 4 cycles to stimulate parasympathetic tone.`,
  },
  {
    pageNumber: 5,
    title: 'Chapter 4: Hydration Mechanics & Electrolyte Homeostasis',
    type: 'core',
    readTime: '3 min',
    summary: 'Moving beyond plain water to achieve genuine intracellular hydration.',
    content: `### True Cellular Hydration
Drinking excessive amounts of plain, stripped water without electrolytes can paradoxically flush out essential minerals like potassium and magnesium. Cellular hydration requires mineral balance to cross semi-permeable cell membranes.

#### Practical Hydration Rules
- Sip lukewarm or room-temperature water rather than ice-cold beverages during digestion.
- Consider adding a pinch of unrefined salt or a squeeze of fresh lemon to mid-morning water.
- Observe urine color: pale straw indicates optimal cellular fluid balance.`,
  },
  {
    pageNumber: 6,
    title: 'Chapter 5: Sleep Architecture & Deep Cellular Repair',
    type: 'core',
    readTime: '5 min',
    summary: 'The restorative phases of slow-wave sleep and glymphatic clearance.',
    content: `### The Nightly Brain Wash
During non-REM Stage 3 sleep, cerebral spinal fluid washes through the brain via the glymphatic system, clearing metabolic waste accumulated throughout daytime mental exertion. 

Skipping sleep or experiencing fragmented sleep deprives the brain of this essential detoxifying wash, contributing to brain fog, hormonal volatility, and weakened emotional resilience.

#### Sanctuary Sleep Environment
- Keep the sleeping quarters cool, quiet, and pitch-black.
- Remove mobile chargers and glowing electronics from within arm's reach of the pillow.
- Establish a 30-minute wind-down ritual dedicated to quiet reading or gentle contemplation.`,
  },
  {
    pageNumber: 7,
    title: 'Chapter 6: Movement as Medicine & Lymphatic Drainage',
    type: 'core',
    readTime: '4 min',
    summary: 'Stimulating passive immune circulation through gentle, regular joint articulation.',
    content: `### The Body Was Built to Ambulate
Unlike the cardiovascular system, which possesses a muscular pump in the heart, the lymphatic system has no central pump. Lymph fluid relies entirely upon skeletal muscle contractions and diaphragmatic breathing to circulate immune cells and filter toxins.

Extended sedentary periods cause stagnation. Incorporating brief movement intervals throughout the day transforms cellular energy.

#### The Daily 10-Minute Movement Ritual
- Gentle neck, shoulder, and spinal rotations upon rising.
- Post-meal 10-minute stroll (the traditional *shatapadi* or 100 steps) to temper glucose spikes.
- Restorative leg elevation against the wall for 10 minutes before bed.`,
  },
  {
    pageNumber: 8,
    title: 'Chapter 7: Hormonal Harmony Across Life Stages',
    type: 'core',
    readTime: '5 min',
    summary: 'Navigating transitions with physiological understanding and self-compassion.',
    content: `### The Dance of the Endocrine System
Hormones are microscopic chemical messengers that travel through the bloodstream to regulate mood, metabolism, sleep, and reproduction. Minor fluctuations are completely natural and necessary across different phases of the calendar month and life chapters.

Understanding these cyclical rhythms allows families to plan nourishment, workloads, and rest in harmony with biological realities rather than fighting them.

#### Supporting Hormonal Balance
- Avoid crash diets or sudden extreme caloric deficits, which signal famine to the hypothalamus.
- Ensure adequate healthy dietary fats (cold-pressed oils, nuts, seeds, and moderate ghee) to supply the raw cholesterol backbone needed for steroid hormone synthesis.`,
  },
  {
    pageNumber: 9,
    title: 'Chapter 8: Environmental Toxins & Clean Living Spaces',
    type: 'core',
    readTime: '4 min',
    summary: 'Minimizing endocrine disruptors in the modern home environment.',
    content: `### The Invisible Load in the Home
Modern households encounter thousands of synthetic compounds daily—from volatile organic compounds in synthetic fragrances to microplastics and phthalates in heating containers.

The liver works tirelessly to conjugate and eliminate these compounds. Lightening this toxic burden gives the body more energy for self-healing.

#### Practical Household Swaps
- Replace plastic food storage containers with glass or food-grade stainless steel, especially when reheating meals.
- Ventilate rooms daily by opening opposing windows for 20 minutes of fresh cross-breeze.
- Choose fragrance-free, plant-based cleaning solutions for kitchen and laundry surfaces.`,
  },
  {
    pageNumber: 10,
    title: 'Chapter 9: The Mind-Body Axis & Emotional Expression',
    type: 'core',
    readTime: '5 min',
    summary: 'How unexpressed sentiments manifest in muscle tension and visceral discomfort.',
    content: `### Emotional Biology
Emotions are not abstract illusions floating in the ether; they are physical biochemical events accompanied by neuropeptide surges, vascular contractions, and muscular bracing.

Suppressed grief, chronic irritation, or persistent loneliness frequently manifest physically as tight neck musculature, digestive spasms, or persistent tension headaches.

#### Emotional Processing Tools
- Morning journaling or unedited expressive writing to offload rumination.
- Honest, grounded communication with a trusted family member or elder.
- Practicing silent witnessing: acknowledging feelings without judgment or panic.`,
  },
  {
    pageNumber: 11,
    title: 'Chapter 10: Immunity Guardians & Seasonal Resilience',
    type: 'core',
    readTime: '4 min',
    summary: 'Harmonizing immunity through seasonal transitions (*Ritucharya*).',
    content: `### Living with the Seasons
During weather transitions—such as the arrival of monsoons or winter cold snaps—the body undergoes temperature and metabolic adjustments. In traditional wisdom, this period is known as *Ritu Sandhi* (the junction of seasons), when digestive fires (*Agni*) fluctuate.

#### Seasonal Preparedness
- Transition toward warming, cooked soups and stewed vegetables as ambient temperatures drop.
- Drink warm herbal teas brewed with fresh ginger, tulsi leaves, and crushed black peppercorn.
- Guard the extremities against sudden cold exposure to protect upper respiratory mucous membranes.`,
  },
  {
    pageNumber: 12,
    title: 'Chapter 11: Preventive Screenings & Clinical Red Flags',
    type: 'core',
    readTime: '5 min',
    summary: 'Knowing when reassurance is appropriate versus when to seek clinical consultation.',
    content: `### True Prevention is Proactive Awareness
Educational self-care is a powerful ally, but it never replaces timely clinical diagnostics. Understanding age-appropriate screening schedules—such as annual blood pressure checks, fasting blood sugar evaluations, lipid profiling, and cervical or breast health examinations—saves lives.

#### When to Consult a Physician Immediately
- Any unexplained, rapid weight reduction without deliberate lifestyle alteration.
- Sudden, severe, persistent headaches that feel different from any prior episode.
- New lumps, changes in skin lesions, or irregular bleeding patterns.
- Persistent shortness of breath, chest pressure, or radiating pain into the arm or jaw.`,
  },
  {
    pageNumber: 13,
    title: 'Chapter 12: Family Wellness Culture & Generational Wisdom',
    type: 'core',
    readTime: '4 min',
    summary: 'Creating an inspiring home environment where healthy habits flourish naturally.',
    content: `### The Power of Household Culture
Children and family members do not learn health habits from lectures; they absorb them by observing the daily micro-behaviors modeled by family leaders. 

When you prioritize calm meals, respect your sleep boundaries, and treat physical symptoms with proactive mindfulness, the entire household adopts a culture of sustainable resilience.

#### Creating Household Rituals
- Establish at least one screen-free family meal every day where conversation centers on gratitude.
- Take family evening walks instead of defaulting to sedentary television streaming.
- Discuss wellness openly without shame, stigma, or unnecessary anxiety.`,
  },
  {
    pageNumber: 14,
    title: 'Chapter 13 & Summary: Daily Life Application Checklist',
    type: 'summary',
    readTime: '4 min',
    summary: 'Your comprehensive, practical daily checklist for lifelong wellness and balance.',
    content: `### Summary of Key Educational Takeaways
We have journeyed through the science of ${topicName}, from circadian synchronization and cellular hydration to emotional expression and family leadership. Knowledge becomes wisdom only when put into consistent, patient practice.

#### Your Morning Ritual Checklist
- [ ] Drink 2 glasses of lukewarm water before consuming morning tea or coffee.
- [ ] Step outdoors into natural daylight for 10 minutes.
- [ ] Practice 5 minutes of conscious diaphragmatic breathing.

#### Your Daytime Nutrition Checklist
- [ ] Eat colorful, seasonal, minimally processed meals with adequate fiber.
- [ ] Take a gentle 10-minute walk after lunch to temper glucose spikes.
- [ ] Maintain steady hydration with room-temperature water and herbal infusions.

#### Your Evening Restoration Checklist
- [ ] Dim house lights 60 minutes prior to intended sleep.
- [ ] Place smartphones and digital screens outside the immediate sleeping perimeter.
- [ ] Reflect on 3 small blessings of the day to settle the nervous system.

*HealthSakhi is proud to be your educational companion on this lifelong journey toward peace, understanding, and vitality.*`,
  },
];

export const PUBLISHED_BOOKS = [
  {
    id: 'book-1',
    categoryId: 'cat-1',
    categoryName: "My Body and Women's Health",
    title: 'The Sacred Cycle: Mastering Your Hormones & Vitality',
    slug: 'the-sacred-cycle-hormones-vitality',
    author: 'HealthSakhi Clinical Editorial Board',
    languages: ['en', 'hi', 'mr', 'bn', 'gu', 'te', 'ta', 'ur', 'ar'],
    defaultLanguage: 'en',
    audioAvailable: true,
    totalReadingPages: 14,
    coverColor: 'from-pink-600 via-rose-700 to-red-900',
    coverBadge: 'Best Seller',
    synopsis: 'A comprehensive educational guide to understanding the four phases of the menstrual cycle, natural fertility signals, perimenopause ease, and lifelong bone health.',
    pages: createStandardBookPages('The Sacred Cycle', "Women's Hormonal Vitality", 'rose'),
  },
  {
    id: 'book-2',
    categoryId: 'cat-1',
    categoryName: "My Body and Women's Health",
    title: 'Graceful Transitions: Understanding Perimenopause & Menopause',
    slug: 'graceful-transitions-perimenopause-menopause',
    author: 'HealthSakhi Clinical Editorial Board',
    languages: ['en', 'hi', 'mr', 'ta', 'te'],
    defaultLanguage: 'en',
    audioAvailable: true,
    totalReadingPages: 14,
    coverColor: 'from-purple-700 via-pink-700 to-rose-800',
    coverBadge: 'Essential Guide',
    synopsis: 'Clear, compassionate biological knowledge explaining hot flashes, mood shifts, bone density preservation, and empowering dietary wisdom for midlife.',
    pages: createStandardBookPages('Graceful Transitions', 'Perimenopause and Menopause', 'purple'),
  },
  {
    id: 'book-3',
    categoryId: 'cat-2',
    categoryName: 'My Weight and Metabolic Wellness',
    title: 'Metabolic Harmony: Healing Insulin Resistance at Home',
    slug: 'metabolic-harmony-insulin-resistance',
    author: 'HealthSakhi Clinical Editorial Board',
    languages: ['en', 'hi', 'mr', 'gu', 'ur'],
    defaultLanguage: 'en',
    audioAvailable: true,
    totalReadingPages: 14,
    coverColor: 'from-amber-600 via-orange-600 to-red-700',
    coverBadge: 'Clinical Favorite',
    synopsis: 'Discover how meal sequence, kitchen spices, walking routines, and circadian timing can naturally balance blood sugar without punitive deprivation.',
    pages: createStandardBookPages('Metabolic Harmony', 'Metabolic Balance & Glucose Stability', 'orange'),
  },
  {
    id: 'book-4',
    categoryId: 'cat-4',
    categoryName: 'My Pregnancy and New Motherhood',
    title: 'Nurturing New Life: The First 1,000 Days Guide',
    slug: 'nurturing-new-life-first-1000-days',
    author: 'HealthSakhi Clinical Editorial Board',
    languages: ['en', 'hi', 'mr', 'bn', 'ar'],
    defaultLanguage: 'en',
    audioAvailable: true,
    totalReadingPages: 14,
    coverColor: 'from-sky-600 via-blue-700 to-indigo-900',
    coverBadge: 'New Motherhood',
    synopsis: 'A warm, medically validated roadmap supporting expectant and new mothers through emotional changes, postpartum nourishment, and infant bonding.',
    pages: createStandardBookPages('Nurturing New Life', 'Maternal Nutrition & Infant Bonding', 'sky'),
  },
  {
    id: 'book-5',
    categoryId: 'cat-8',
    categoryName: 'My Husband and Family Heart',
    title: 'The Guarded Heart: Cardiovascular Health for Midlife Men',
    slug: 'the-guarded-heart-cardiovascular-health',
    author: 'HealthSakhi Clinical Editorial Board',
    languages: ['en', 'hi', 'mr', 'ur'],
    defaultLanguage: 'en',
    audioAvailable: true,
    totalReadingPages: 14,
    coverColor: 'from-blue-700 via-indigo-800 to-slate-900',
    coverBadge: 'Family Health',
    synopsis: 'Understanding subtle vascular warning signs, silent blood pressure escalation, cholesterol balance, and lifestyle antidotes to stress.',
    pages: createStandardBookPages('The Guarded Heart', 'Cardiovascular Resilience', 'blue'),
  },
  {
    id: 'book-6',
    categoryId: 'cat-9',
    categoryName: 'My Mind and Emotional Wellness',
    title: 'Calm in the Storm: Overcoming Anxiety & Overthinking',
    slug: 'calm-in-the-storm-anxiety-overthinking',
    author: 'HealthSakhi Clinical Editorial Board',
    languages: ['en', 'hi', 'mr', 'bn', 'gu', 'te', 'ta', 'ur', 'ar'],
    defaultLanguage: 'en',
    audioAvailable: true,
    totalReadingPages: 14,
    coverColor: 'from-teal-600 via-cyan-700 to-blue-900',
    coverBadge: 'Emotional Wellness',
    synopsis: 'Scientific yet compassionate techniques to soothe an overworked nervous system, quell intrusive worries, and re-establish daily peace.',
    pages: createStandardBookPages('Calm in the Storm', 'Nervous System Regulation', 'teal'),
  },
  {
    id: 'book-7',
    categoryId: 'cat-10',
    categoryName: 'My Sleep and Migraine',
    title: 'Deep Rest: The Science of Restorative Sleep & Migraine Relief',
    slug: 'deep-rest-sleep-migraine-relief',
    author: 'HealthSakhi Clinical Editorial Board',
    languages: ['en', 'hi', 'mr', 'ar'],
    defaultLanguage: 'en',
    audioAvailable: true,
    totalReadingPages: 14,
    coverColor: 'from-indigo-800 via-slate-900 to-black',
    coverBadge: 'Sleep Science',
    synopsis: 'Mastering the dark-room protocol, circadian entrainment, sensory relief for throbbing headaches, and natural sleep depth restoration.',
    pages: createStandardBookPages('Deep Rest', 'Sleep Hygiene and Migraine Prevention', 'indigo'),
  },
  {
    id: 'book-8',
    categoryId: 'cat-12',
    categoryName: 'My Food and Ayurveda',
    title: 'Kitchen as Medicine: Indigenous Healing & Seasonal Cooking',
    slug: 'kitchen-as-medicine-indigenous-healing',
    author: 'HealthSakhi Clinical Editorial Board',
    languages: ['en', 'hi', 'mr', 'gu'],
    defaultLanguage: 'en',
    audioAvailable: true,
    totalReadingPages: 14,
    coverColor: 'from-emerald-700 via-teal-800 to-slate-900',
    coverBadge: 'Ayurvedic Wisdom',
    synopsis: 'How traditional herbs, seasonal spices, proper food combination, and digestive fire (*Agni*) promote lasting immunity and vitality.',
    pages: createStandardBookPages('Kitchen as Medicine', 'Ayurvedic Nutrition & Digestive Agni', 'emerald'),
  },
];

// Exact boundary message required by client for personal medical inquiries
export const MEDICAL_QUERY_BOUNDARY_MESSAGE = 
  "HealthSakhi is an educational book library and cannot answer personal medical questions. I can help you find general educational books on this topic. For advice about your own health, please contact a qualified healthcare professional. If you believe the situation is urgent, contact your local emergency service.";

// Helper to detect if a query is an attempt to seek personal medical consultation or diagnosis
export const isPersonalMedicalQuery = (query) => {
  if (!query || typeof query !== 'string') return false;
  const q = query.toLowerCase().trim();
  
  const medicalTriggers = [
    'i have', 'my chest', 'my head hurts', 'what medicine', 'dosage', 'cure for', 
    'diagnose me', 'should i take', 'prescribe', 'pain in my', 'vomiting', 
    'fever since', 'bleeding from', 'can you treat', 'how to cure', 'is it cancer',
    'symptoms of heart attack', 'am i pregnant', 'emergency'
  ];

  return medicalTriggers.some(trigger => q.includes(trigger));
};

// Search service across all categories, books, and page titles
export const searchLibrary = (query, currentLang = 'en') => {
  if (!query || !query.trim()) return [];

  const cleanQuery = query.toLowerCase().trim();

  // Check boundary restriction
  if (isPersonalMedicalQuery(cleanQuery)) {
    return {
      isMedicalQuery: true,
      boundaryMessage: MEDICAL_QUERY_BOUNDARY_MESSAGE,
      results: [],
    };
  }

  const results = [];

  PUBLISHED_BOOKS.forEach(book => {
    // 1. Check book title or category name
    const titleMatch = book.title.toLowerCase().includes(cleanQuery);
    const categoryMatch = book.categoryName.toLowerCase().includes(cleanQuery);
    const synopsisMatch = book.synopsis.toLowerCase().includes(cleanQuery);

    if (titleMatch || categoryMatch || synopsisMatch) {
      results.push({
        bookId: book.id,
        bookTitle: book.title,
        categoryName: book.categoryName,
        pageNumber: 1,
        pageTitle: book.pages[0].title,
        snippet: book.synopsis,
        coverColor: book.coverColor,
      });
    }

    // 2. Check inner chapters / page contents
    book.pages.forEach(p => {
      if (results.length >= 5) return;
      if (p.pageNumber === 1 && (titleMatch || categoryMatch)) return; // Avoid duplicate intro

      if (p.title.toLowerCase().includes(cleanQuery) || p.summary.toLowerCase().includes(cleanQuery)) {
        results.push({
          bookId: book.id,
          bookTitle: book.title,
          categoryName: book.categoryName,
          pageNumber: p.pageNumber,
          pageTitle: p.title,
          snippet: p.summary,
          coverColor: book.coverColor,
        });
      }
    });
  });

  return {
    isMedicalQuery: false,
    results: results.slice(0, 5), // Maximum 5 relevant results per requirement
  };
};
