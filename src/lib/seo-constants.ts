/**
 * SEO Constants for Royal Clean UAE
 * Comprehensive keywords, hashtags, and metadata for UAE market
 */

// UAE Emirates and Cities
export const UAE_EMIRATES = [
  { ar: 'دبي', en: 'Dubai', code: 'DXB' },
  { ar: 'أبوظبي', en: 'Abu Dhabi', code: 'AUH' },
  { ar: 'الشارقة', en: 'Sharjah', code: 'SHJ' },
  { ar: 'عجمان', en: 'Ajman', code: 'AJM' },
  { ar: 'أم القيوين', en: 'Umm Al Quwain', code: 'UAQ' },
  { ar: 'رأس الخيمة', en: 'Ras Al Khaimah', code: 'RAK' },
  { ar: 'الفجيرة', en: 'Fujairah', code: 'FUJ' },
]

// Major Dubai Areas for Hyper-Local SEO
export const DUBAI_AREAS = [
  { ar: 'دبي مارينا', en: 'Dubai Marina' },
  { ar: 'داون تاون دبي', en: 'Downtown Dubai' },
  { ar: 'جميرا', en: 'Jumeirah' },
  { ar: 'ديرة', en: 'Deira' },
  { ar: 'الخليج التجاري', en: 'Business Bay' },
  { ar: 'جي بي آر', en: 'JBR' },
  { ar: 'جي ال تي', en: 'JLT' },
  { ar: 'تيكوم', en: 'TECOM' },
  { ar: 'البرشاء', en: 'Al Barsha' },
  { ar: 'الصفوح', en: 'Al Sufouh' },
]

// Arabic SEO Keywords
export const ARABIC_KEYWORDS = [
  // General cleaning
  'خدمات تنظيف',
  'شركة تنظيف',
  'تنظيف منازل',
  'تنظيف شقق',
  'تنظيف فلل',
  'تنظيف مكاتب',
  'تنظيف شركات',
  'تنظيف احترافي',
  'تنظيف عميق',
  
  // Location-specific
  'تنظيف دبي',
  'تنظيف أبوظبي',
  'تنظيف الشارقة',
  'تنظيف عجمان',
  'تنظيف رأس الخيمة',
  'تنظيف الفجيرة',
  'تنظيف أم القيوين',
  
  // Service types
  'تنظيف ما بعد البناء',
  'تنظيف ما قبل الانتقال',
  'تنظيف ما بعد الانتقال',
  'تنظيف دورى',
  'تنظيف يومي',
  'تنظيف أسبوعي',
  'تنظيف شهري',
  
  // Specific areas
  'تنظيف السجاد',
  'تنظيف الستائر',
  'تنظيف الأثاث',
  'تنظيف الحمامات',
  'تنظيف المطابخ',
  'تنظيف النوافذ',
  'تنظيف الواجهات',
  
  // Quality indicators
  'أفضل شركة تنظيف',
  'شركة تنظيف موثوقة',
  'خدمة تنظيف سريعة',
  'أسعار تنظيف معقولة',
  'تنظيف بالضمان',
]

// English SEO Keywords
export const ENGLISH_KEYWORDS = [
  // General cleaning
  'cleaning services',
  'cleaning company',
  'home cleaning',
  'apartment cleaning',
  'villa cleaning',
  'office cleaning',
  'corporate cleaning',
  'professional cleaning',
  'deep cleaning',
  
  // Location-specific
  'cleaning Dubai',
  'cleaning Abu Dhabi',
  'cleaning Sharjah',
  'cleaning Ajman',
  'cleaning Ras Al Khaimah',
  'cleaning Fujairah',
  'cleaning Umm Al Quwain',
  
  // Service types
  'post construction cleaning',
  'move in cleaning',
  'move out cleaning',
  'regular cleaning',
  'daily cleaning',
  'weekly cleaning',
  'monthly cleaning',
  
  // Specific areas
  'carpet cleaning',
  'curtain cleaning',
  'furniture cleaning',
  'bathroom cleaning',
  'kitchen cleaning',
  'window cleaning',
  'facade cleaning',
  
  // Quality indicators
  'best cleaning company',
  'reliable cleaning service',
  'quick cleaning service',
  'affordable cleaning',
  'guaranteed cleaning',
]

// Social Media Hashtags
export const ARABIC_HASHTAGS = [
  '#تنظيف_الإمارات',
  '#تنظيف_دبي',
  '#تنظيف_أبوظبي',
  '#تنظيف_الشارقة',
  '#خدمات_تنظيف',
  '#شركة_تنظيف',
  '#تنظيف_منازل',
  '#تنظيف_فلل',
  '#تنظيف_شقق',
  '#تنظيف_مكاتب',
  '#رويال_كلين',
  '#تنظيف_احترافي',
  '#تنظيف_عميق',
  '#النظافة',
  '#الإمارات',
  '#دبي',
  '#أبوظبي',
  '#خدمات_منزلية',
]

export const ENGLISH_HASHTAGS = [
  '#CleaningUAE',
  '#DubaiCleaning',
  '#AbuDhabiCleaning',
  '#SharjahCleaning',
  '#CleaningServices',
  '#CleaningCompany',
  '#HomeCleaning',
  '#VillaCleaning',
  '#ApartmentCleaning',
  '#OfficeCleaning',
  '#RoyalClean',
  '#ProfessionalCleaning',
  '#DeepCleaning',
  '#CleanHome',
  '#UAE',
  '#Dubai',
  '#AbuDhabi',
  '#HomeServices',
  '#CleaningTips',
  '#SparklingClean',
]

// All hashtags combined for easy use
export const ALL_HASHTAGS = [...ARABIC_HASHTAGS, ...ENGLISH_HASHTAGS]

// Social Media Platform Recommendations
export const SOCIAL_MEDIA_STRATEGY = {
  facebook: {
    name: 'Facebook',
    url: 'https://facebook.com/royalcleanuae',
    recommendations: [
      'Post 2-3 times per week',
      'Use local community groups',
      'Share before/after photos',
      'Create Facebook Events for special offers',
      'Use Facebook Marketplace for service promotion',
    ],
    hashtags: ALL_HASHTAGS.slice(0, 5), // Facebook works better with fewer hashtags
  },
  instagram: {
    name: 'Instagram',
    url: 'https://instagram.com/royalcleanuae',
    recommendations: [
      'Post daily Stories',
      'Create Reels showing cleaning process',
      'Use location tags for all 7 Emirates',
      'Collaborate with UAE influencers',
      'Use carousel posts for before/after transformations',
    ],
    hashtags: ALL_HASHTAGS, // Instagram supports many hashtags
  },
  twitter: {
    name: 'Twitter/X',
    url: 'https://twitter.com/royalcleanuae',
    recommendations: [
      'Tweet 3-5 times daily',
      'Engage with local UAE accounts',
      'Share cleaning tips',
      'Respond to customer inquiries quickly',
    ],
    hashtags: ALL_HASHTAGS.slice(0, 3), // Twitter works better with fewer hashtags
  },
  linkedin: {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/royalcleanuae',
    recommendations: [
      'Focus on B2B content',
      'Share case studies',
      'Post corporate cleaning projects',
      'Connect with facility managers',
    ],
    hashtags: ENGLISH_HASHTAGS.filter(tag => 
      tag.includes('Office') || tag.includes('Professional') || tag.includes('Corporate')
    ),
  },
  tiktok: {
    name: 'TikTok',
    url: 'https://tiktok.com/@royalcleanuae',
    recommendations: [
      'Create satisfying cleaning videos',
      'Use trending audio',
      'Show cleaning hacks',
      'Participate in viral challenges',
    ],
    hashtags: [...ENGLISH_HASHTAGS, '#CleanTok', '#SatisfyingCleaning', '#CleaningHacks'],
  },
  youtube: {
    name: 'YouTube',
    url: 'https://youtube.com/@royalcleanuae',
    recommendations: [
      'Create cleaning tutorials',
      'Show full cleaning process videos',
      'Create area-specific guides',
      'Share customer testimonials',
    ],
    hashtags: ENGLISH_HASHTAGS,
  },
}

// Content Ideas for Social Media
export const CONTENT_IDEAS = [
  {
    type: 'Before & After',
    description: 'Show transformation photos of cleaned spaces',
    platforms: ['Instagram', 'Facebook', 'TikTok'],
  },
  {
    type: 'Cleaning Tips',
    description: 'Share quick cleaning hacks and tips',
    platforms: ['Twitter', 'Instagram Stories', 'TikTok'],
  },
  {
    type: 'Customer Testimonials',
    description: 'Share positive reviews and feedback',
    platforms: ['Facebook', 'LinkedIn', 'Instagram'],
  },
  {
    type: 'Behind the Scenes',
    description: 'Show the team at work',
    platforms: ['Instagram Stories', 'TikTok', 'YouTube'],
  },
  {
    type: 'Special Offers',
    description: 'Promote seasonal discounts and packages',
    platforms: ['All platforms'],
  },
  {
    type: 'Educational Content',
    description: 'Teach about different cleaning methods and products',
    platforms: ['YouTube', 'LinkedIn', 'Blog'],
  },
  {
    type: 'Local Community',
    description: 'Engage with local UAE events and news',
    platforms: ['Twitter', 'Facebook', 'Instagram'],
  },
]

// Posting Schedule Recommendation
export const POSTING_SCHEDULE = {
  monday: ['Facebook: Morning post', 'Instagram: Story + Feed post'],
  tuesday: ['Twitter: 3 tweets throughout day', 'LinkedIn: Professional post'],
  wednesday: ['Instagram: Reel', 'TikTok: Video'],
  thursday: ['Facebook: Engagement post', 'Twitter: Tips thread'],
  friday: ['Instagram: Weekend offer', 'All platforms: Weekend promotion'],
  saturday: ['Instagram Stories: Weekend work', 'Facebook: Community post'],
  sunday: ['Planning and scheduling for next week'],
}

// UAE-specific SEO metadata
export const UAE_META_DESCRIPTION = 
  'خدمات التنظيف الاحترافية رقم 1 في الإمارات العربية المتحدة. نخدم دبي، أبوظبي، الشارقة، عجمان، أم القيوين، رأس الخيمة، الفجيرة. تنظيف منازل، شقق، فلل، مكاتب. احجز الآن!'

export const UAE_META_TITLE = 
  'رويال كلين - خدمات التنظيف الأفضل في الإمارات | Royal Clean UAE'

// Structured data for automation
export const AUTOMATION_CONFIG = {
  autoPosting: {
    enabled: true,
    platforms: ['facebook', 'instagram', 'twitter'],
    times: ['09:00', '14:00', '19:00'], // UAE timezone
  },
  contentRotation: {
    enabled: true,
    types: ['tips', 'offers', 'testimonials', 'before-after'],
    frequency: 'daily',
  },
  responseAutomation: {
    enabled: true,
    platforms: ['facebook', 'instagram', 'twitter'],
    workingHours: { start: '08:00', end: '22:00' },
  },
}
