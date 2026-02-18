import type { OmniContent } from './omni-publisher';

/**
 * Campaign Content Configuration
 * Non-technical team members can update campaign content here
 */

export const CAMPAIGNS = {
  royal_clean: {
    brand: 'royal_clean',
    content_type: 'local_service',
    platforms: ['instagram_feed', 'facebook_post', 'whatsapp_broadcast'],
    caption_en:
      'Excellence in every corner. Royal Clean is your trusted partner for premium cleaning services in UAE 💎. Professional, licensed, and eco-friendly.',
    caption_ar:
      'نحن ملوك النظافة في الإمارات 🇦🇪. احجز خدمتك الآن واستمتع بمنزل يلمع! خدمات احترافية ومرخصة وصديقة للبيئة.',
    media_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200',
    hashtags: {
      local: ['تنظيف_دبي', 'أبوظبي', 'خدمات_الإمارات', 'CleaningDubai'],
      global: ['CleaningServices', 'ProfessionalCleaning'],
      platform_specific: {
        instagram_feed: ['DubaiCleaning', 'UAEServices', 'RoyalCleanUAE'],
        facebook_post: ['DubaiLife', 'CleanHome'],
        whatsapp_broadcast: ['احجز_الآن'],
      },
    },
    cta_url: 'https://royalclean.ae',
    cta_text_en: 'Book Now via WhatsApp',
    cta_text_ar: 'احجز الآن عبر واتساب',
  },
  zooka_ai: {
    brand: 'zooka_ai',
    content_type: 'global_platform',
    platforms: ['linkedin_post', 'twitter_tweet'],
    caption_en:
      '🚀 Zooka-AI: The Future of AI Agent Orchestration. Multi-model support (OpenAI, Anthropic, Google), real-time analytics, and enterprise-grade security. Built for CTOs and tech founders scaling AI operations.',
    caption_ar:
      '🚀 زوكا-AI: مستقبل إدارة وكلاء الذكاء الاصطناعي. دعم متعدد النماذج، تحليلات فورية، وأمان على مستوى المؤسسات.',
    media_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
    hashtags: {
      local: [],
      global: ['AIAutomation', 'SaaS', 'MLOps', 'EnterpriseTech', 'AIAgents'],
      platform_specific: {
        linkedin_post: ['ArtificialIntelligence', 'TechInnovation', 'B2BSaaS'],
        twitter_tweet: ['AI', 'MachineLearning', 'DevTools'],
      },
    },
    cta_url: 'https://zooka.ai/demo',
    cta_text_en: 'Request Demo',
    cta_text_ar: 'اطلب عرضاً توضيحياً',
  },
} as const satisfies Record<string, OmniContent>;

export type CampaignBrand = keyof typeof CAMPAIGNS;
