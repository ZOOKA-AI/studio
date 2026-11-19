/**
 * SEO Constants for Quran Zekr Platform
 * Optimized for Egypt, Gulf Region, and UAE
 */

// Primary hashtags for social media and content
export const PRIMARY_HASHTAGS = [
  // Arabic hashtags - Core
  '#القرآن_الكريم',
  '#القرآن',
  '#ذكر',
  '#المصحف_الشريف',
  '#تلاوة_القرآن',
  
  // Arabic hashtags - Egypt focus
  '#القرآن_مصر',
  '#القرآن_في_مصر',
  '#مصر',
  
  // Arabic hashtags - Gulf & UAE
  '#القرآن_الإمارات',
  '#القرآن_السعودية',
  '#القرآن_الخليج',
  '#الإمارات',
  '#دبي',
  '#أبوظبي',
  '#السعودية',
  '#الرياض',
  
  // Arabic hashtags - Actions
  '#حفظ_القرآن',
  '#تجويد',
  '#ختم_القرآن',
  '#قراءة_القرآن',
  '#تفسير_القرآن',
  
  // English hashtags
  '#HolyQuran',
  '#Quran',
  '#Zekr',
  '#QuranApp',
  '#IslamicApp',
  '#QuranEgypt',
  '#QuranUAE',
  '#QuranGulf',
  '#QuranRecitation',
  '#QuranMemorization',
  
  // Technology
  '#AI',
  '#ذكاء_اصطناعي',
  '#تقنية',
  '#Technology',
];

// Keywords for meta tags and content optimization
export const SEO_KEYWORDS = {
  arabic: [
    'القرآن الكريم',
    'قرآن كريم',
    'القران الكريم',
    'قران',
    'ذكر',
    'تلاوة القرآن',
    'قراءة القرآن',
    'حفظ القرآن',
    'تفسير القرآن',
    'القرآن الكريم كامل',
    'المصحف الشريف',
    'تجويد القرآن',
    'ترتيل القرآن',
    'ختم القرآن',
    'ورد القرآن',
    'أحكام التجويد',
    'تطبيق القرآن',
    'برنامج القرآن',
    'القرآن اون لاين',
    'القرآن الالكتروني',
    'استماع القرآن',
    'تحفيظ القرآن',
  ],
  regions: [
    'القرآن مصر',
    'القرآن الإمارات',
    'القرآن الخليج',
    'القرآن السعودية',
    'القرآن الكويت',
    'القرآن قطر',
    'القرآن البحرين',
    'القرآن عمان',
    'القرآن دبي',
    'القرآن أبوظبي',
    'القرآن الرياض',
    'القرآن جدة',
    'القرآن القاهرة',
    'القرآن الاسكندرية',
  ],
  english: [
    'Holy Quran',
    'Quran',
    "Qur'an",
    'Koran',
    'Zekr',
    'Quran online',
    'Read Quran',
    'Quran app',
    'Islamic app',
    'Quran Egypt',
    'Quran UAE',
    'Quran Gulf',
    'Quran Saudi Arabia',
    'Quran recitation',
    'Quran memorization',
    'Quran tafsir',
    'Quran tajweed',
    'Digital Quran',
    'Quran learning',
  ],
  tech: [
    'AI Quran',
    'Smart Quran',
    'Quran technology',
    'Digital Quran',
    'ذكاء اصطناعي قرآن',
    'تقنية القرآن',
    'قرآن ذكي',
  ],
};

// Social sharing content
export const SOCIAL_SHARING = {
  defaultText: 'اكتشف تطبيق ذكر للقرآن الكريم - أفضل منصة لقراءة وحفظ وتفسير القرآن الكريم 📖✨',
  twitterText: 'اكتشف تطبيق ذكر للقرآن الكريم - أفضل منصة لقراءة وحفظ وتفسير القرآن الكريم 📖✨\n\n#القرآن_الكريم #ذكر #القرآن_مصر #القرآن_الإمارات',
  facebookText: 'منصة ذكر للقرآن الكريم - تلاوة، تفسير، وحفظ القرآن الكريم مع أدوات ذكية 🌟',
  whatsappText: 'السلام عليكم 🌙\nاكتشف تطبيق ذكر للقرآن الكريم - أفضل منصة لقراءة وحفظ القرآن الكريم\n\nhttps://quran.zekr.by.zooka-ai.com',
};

// Structured data templates
export const STRUCTURED_DATA_TEMPLATES = {
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ذكر - القرآن الكريم',
    alternateName: 'Zekr - Holy Quran',
    url: 'https://quran.zekr.by.zooka-ai.com',
    inLanguage: ['ar', 'ar-EG', 'ar-SA', 'ar-AE'],
  },
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ZOOKA AI',
    url: 'https://zooka-ai.com',
    logo: 'https://quran.zekr.by.zooka-ai.com/logo.png',
    sameAs: [
      'https://twitter.com/ZOOKA_AI',
      'https://facebook.com/ZOOKA.AI',
      'https://github.com/ZOOKA-AI',
    ],
  },
};

// Regional targeting
export const REGIONAL_CONFIG = {
  primary: 'Egypt',
  secondary: ['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman'],
  languages: ['ar-EG', 'ar-SA', 'ar-AE', 'en'],
  currencies: ['EGP', 'AED', 'SAR'],
};

// Performance and indexing hints
export const INDEXING_CONFIG = {
  crawlDelay: 0,
  revisitAfter: '1 day',
  robotsRules: {
    allow: '/',
    disallow: ['/api/', '/admin/', '/_next/'],
  },
  sitemapChangeFrequency: 'daily',
  priority: 1.0,
};
