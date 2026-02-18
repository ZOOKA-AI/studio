import { OmniPublisher } from './omni-publisher';
import type { OmniContent } from './omni-publisher';

/**
 * Execute global marketing campaign launch
 * Publishes content for both Royal Clean (local UAE) and Zooka-AI (global)
 */
export async function executeGlobalLaunch(brand: 'royal_clean' | 'zooka_ai' = 'royal_clean') {
  const publisher = new OmniPublisher();
  
  const content: OmniContent = brand === 'royal_clean' 
    ? {
        brand: 'royal_clean',
        content_type: 'local_service',
        platforms: ['instagram_feed', 'facebook_post', 'whatsapp_broadcast'],
        caption_en: "Excellence in every corner. Royal Clean is your trusted partner for premium cleaning services in UAE 💎. Professional, licensed, and eco-friendly.",
        caption_ar: "نحن ملوك النظافة في الإمارات 🇦🇪. احجز خدمتك الآن واستمتع بمنزل يلمع! خدمات احترافية ومرخصة وصديقة للبيئة.",
        media_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200",
        hashtags: {
          local: ["تنظيف_دبي", "أبوظبي", "خدمات_الإمارات", "CleaningDubai"],
          global: ["CleaningServices", "ProfessionalCleaning"],
          platform_specific: {
            instagram_feed: ["DubaiCleaning", "UAEServices", "RoyalCleanUAE"],
            facebook_post: ["DubaiLife", "CleanHome"],
            whatsapp_broadcast: ["احجز_الآن"],
          },
        },
        cta_url: "https://royalclean.ae",
        cta_text_en: "Book Now via WhatsApp",
        cta_text_ar: "احجز الآن عبر واتساب",
      }
    : {
        brand: 'zooka_ai',
        content_type: 'global_platform',
        platforms: ['linkedin_post', 'twitter_tweet'],
        caption_en: "🚀 Zooka-AI: The Future of AI Agent Orchestration. Multi-model support (OpenAI, Anthropic, Google), real-time analytics, and enterprise-grade security. Built for CTOs and tech founders scaling AI operations.",
        caption_ar: "🚀 زوكا-AI: مستقبل إدارة وكلاء الذكاء الاصطناعي. دعم متعدد النماذج، تحليلات فورية، وأمان على مستوى المؤسسات.",
        media_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
        hashtags: {
          local: [],
          global: ["AIAutomation", "SaaS", "MLOps", "EnterpriseTech", "AIAgents"],
          platform_specific: {
            linkedin_post: ["ArtificialIntelligence", "TechInnovation", "B2BSaaS"],
            twitter_tweet: ["AI", "MachineLearning", "DevTools"],
          },
        },
        cta_url: "https://zooka.ai/demo",
        cta_text_en: "Request Demo",
        cta_text_ar: "اطلب عرضاً توضيحياً",
      };

  console.log(`🚀 Launching ${brand === 'royal_clean' ? 'Royal Clean UAE' : 'Zooka-AI Global'} campaign...`);
  
  try {
    const results = await publisher.publishToAll(content);
    
    const successCount = results.filter(r => r.success).length;
    console.log(`✅ Successfully published to ${successCount}/${results.length} platforms`);
    
    return {
      success: true,
      results,
      summary: {
        total: results.length,
        successful: successCount,
        failed: results.length - successCount,
      },
    };
  } catch (error) {
    console.error('❌ Global launch failed:', error);
    throw error;
  }
}

/**
 * Execute scheduled campaign based on UAE time
 * 09:00 GST - Royal Clean local focus
 * 14:00 GST - Zooka-AI global focus
 * 20:00 GST - Mixed campaign
 */
export async function executeScheduledCampaign(timeSlot: '09:00_GST' | '14:00_GST' | '20:00_GST') {
  const strategyMap = {
    '09:00_GST': 'royal_clean',
    '14:00_GST': 'zooka_ai',
    '20:00_GST': 'royal_clean', // Evening focus on local bookings
  } as const;

  const brand = strategyMap[timeSlot];
  
  console.log(`⏰ Executing scheduled campaign for ${timeSlot} - Brand: ${brand}`);
  
  return executeGlobalLaunch(brand);
}
