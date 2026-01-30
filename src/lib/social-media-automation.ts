/**
 * Social Media Automation Helper
 * This file provides utilities for automating social media content
 */

import {
  UAE_EMIRATES,
  ARABIC_HASHTAGS,
  ENGLISH_HASHTAGS,
  ALL_HASHTAGS,
  SOCIAL_MEDIA_STRATEGY,
  CONTENT_IDEAS,
  POSTING_SCHEDULE,
} from './seo-constants'

// Content templates for different types of posts
export const POST_TEMPLATES = {
  beforeAfter: {
    ar: `✨ تحول مذهل! ✨

قبل ❌ → بعد ✅

خدمة تنظيف احترافية في {emirate}
نتائج مضمونة 💯
احجز الآن! 📞 +971-XX-XXX-XXXX

{hashtags}`,
    en: `✨ Amazing Transformation! ✨

Before ❌ → After ✅

Professional cleaning service in {emirate}
Guaranteed results 💯
Book now! 📞 +971-XX-XXX-XXXX

{hashtags}`,
  },

  cleaningTip: {
    ar: `💡 نصيحة تنظيف اليوم

{tip}

#نصائح_التنظيف #رويال_كلين
{hashtags}`,
    en: `💡 Cleaning Tip of the Day

{tip}

#CleaningTips #RoyalClean
{hashtags}`,
  },

  specialOffer: {
    ar: `🎉 عرض خاص! 🎉

{offer}

محدود لفترة محدودة! ⏰
احجز الآن واحصل على خصم {discount}%

📞 +971-XX-XXX-XXXX
🌐 zooka-ai.com

{hashtags}`,
    en: `🎉 Special Offer! 🎉

{offer}

Limited time only! ⏰
Book now and get {discount}% off

📞 +971-XX-XXX-XXXX
🌐 zooka-ai.com

{hashtags}`,
  },

  testimonial: {
    ar: `⭐⭐⭐⭐⭐

"{testimonial}"

- {customerName}، {emirate}

نفتخر بخدمة عملائنا الكرام في جميع أنحاء الإمارات 🇦🇪

{hashtags}`,
    en: `⭐⭐⭐⭐⭐

"{testimonial}"

- {customerName}, {emirate}

Proud to serve our valued customers across UAE 🇦🇪

{hashtags}`,
  },

  serviceHighlight: {
    ar: `✨ {service} ✨

نقدم أفضل خدمات {service} في {emirate}

✅ فريق محترف
✅ معدات حديثة
✅ نتائج مضمونة
✅ أسعار تنافسية

احجز الآن! 📞 +971-XX-XXX-XXXX

{hashtags}`,
    en: `✨ {service} ✨

Best {service} services in {emirate}

✅ Professional team
✅ Modern equipment
✅ Guaranteed results
✅ Competitive prices

Book now! 📞 +971-XX-XXX-XXXX

{hashtags}`,
  },
}

// Sample content data
export const SAMPLE_CONTENT = {
  cleaningTips: [
    {
      ar: 'استخدم الخل الأبيض والماء الدافئ لتنظيف النوافذ بدون خطوط',
      en: 'Use white vinegar and warm water to clean windows without streaks',
    },
    {
      ar: 'رش البيكنج صودا على السجاد قبل التنظيف بالمكنسة لإزالة الروائح',
      en: 'Sprinkle baking soda on carpets before vacuuming to remove odors',
    },
    {
      ar: 'نظف من الأعلى إلى الأسفل دائماً لتجنب إعادة تنظيف نفس المنطقة',
      en: 'Always clean from top to bottom to avoid re-cleaning the same area',
    },
    {
      ar: 'استخدم عصير الليمون لإزالة البقع الصعبة من الحمامات',
      en: 'Use lemon juice to remove tough stains from bathrooms',
    },
    {
      ar: 'نظف الميكروويف بوضع وعاء من الماء والخل وتشغيله لمدة 5 دقائق',
      en: 'Clean microwave by placing a bowl of water and vinegar and running for 5 minutes',
    },
  ],

  services: [
    { ar: 'تنظيف المنازل', en: 'Home Cleaning' },
    { ar: 'تنظيف الفلل', en: 'Villa Cleaning' },
    { ar: 'تنظيف المكاتب', en: 'Office Cleaning' },
    { ar: 'التنظيف العميق', en: 'Deep Cleaning' },
    { ar: 'تنظيف السجاد', en: 'Carpet Cleaning' },
    { ar: 'تنظيف النوافذ', en: 'Window Cleaning' },
  ],

  offers: [
    {
      ar: 'احصل على خصم 20% على أول حجز',
      en: 'Get 20% off on your first booking',
    },
    {
      ar: 'عرض خاص: باقة تنظيف شاملة بـ 299 درهم فقط',
      en: 'Special: Complete cleaning package for only AED 299',
    },
    {
      ar: 'احجز 3 جلسات واحصل على الرابعة مجاناً',
      en: 'Book 3 sessions and get the 4th free',
    },
  ],

  testimonials: [
    {
      ar: 'خدمة ممتازة وفريق محترف جداً. منزلي أصبح نظيفاً تماماً!',
      en: 'Excellent service and very professional team. My home is spotless!',
      name: 'فاطمة أحمد',
      nameEn: 'Fatima Ahmed',
    },
    {
      ar: 'أفضل شركة تنظيف في دبي! سريعون وموثوقون',
      en: 'Best cleaning company in Dubai! Fast and reliable',
      name: 'محمد علي',
      nameEn: 'Mohammed Ali',
    },
    {
      ar: 'نتائج رائعة! سأحجز معهم مرة أخرى بالتأكيد',
      en: 'Amazing results! Will definitely book again',
      name: 'سارة خالد',
      nameEn: 'Sara Khaled',
    },
  ],
}

// Generate a post using template and data
export function generatePost(
  template: keyof typeof POST_TEMPLATES,
  language: 'ar' | 'en',
  data: Record<string, string>
): string {
  let post = POST_TEMPLATES[template][language]

  // Replace placeholders with data
  Object.entries(data).forEach(([key, value]) => {
    post = post.replace(`{${key}}`, value)
  })

  // Add hashtags
  const hashtags =
    language === 'ar'
      ? ARABIC_HASHTAGS.slice(0, 10).join(' ')
      : ENGLISH_HASHTAGS.slice(0, 10).join(' ')
  post = post.replace('{hashtags}', hashtags)

  return post
}

// Generate a week's worth of content
export function generateWeeklyContent(): Array<{
  day: string
  platform: string
  language: 'ar' | 'en'
  content: string
  type: string
}> {
  const weeklyPosts = []

  // Monday: Before/After post (Instagram & Facebook)
  UAE_EMIRATES.slice(0, 2).forEach((emirate, index) => {
    weeklyPosts.push({
      day: 'Monday',
      platform: index === 0 ? 'Instagram' : 'Facebook',
      language: 'ar' as const,
      content: generatePost('beforeAfter', 'ar', {
        emirate: emirate.ar,
      }),
      type: 'beforeAfter',
    })
  })

  // Tuesday: Cleaning Tip (Twitter & LinkedIn)
  const tipIndex = Math.floor(Math.random() * SAMPLE_CONTENT.cleaningTips.length)
  weeklyPosts.push({
    day: 'Tuesday',
    platform: 'Twitter',
    language: 'ar' as const,
    content: generatePost('cleaningTip', 'ar', {
      tip: SAMPLE_CONTENT.cleaningTips[tipIndex].ar,
    }),
    type: 'cleaningTip',
  })

  // Wednesday: Service Highlight (Instagram Reel)
  const serviceIndex = Math.floor(Math.random() * SAMPLE_CONTENT.services.length)
  weeklyPosts.push({
    day: 'Wednesday',
    platform: 'Instagram',
    language: 'en' as const,
    content: generatePost('serviceHighlight', 'en', {
      service: SAMPLE_CONTENT.services[serviceIndex].en,
      emirate: 'Dubai',
    }),
    type: 'serviceHighlight',
  })

  // Thursday: Testimonial (Facebook)
  const testimonialIndex = Math.floor(
    Math.random() * SAMPLE_CONTENT.testimonials.length
  )
  weeklyPosts.push({
    day: 'Thursday',
    platform: 'Facebook',
    language: 'ar' as const,
    content: generatePost('testimonial', 'ar', {
      testimonial: SAMPLE_CONTENT.testimonials[testimonialIndex].ar,
      customerName: SAMPLE_CONTENT.testimonials[testimonialIndex].name,
      emirate: UAE_EMIRATES[0].ar,
    }),
    type: 'testimonial',
  })

  // Friday: Special Offer (All platforms)
  const offerIndex = Math.floor(Math.random() * SAMPLE_CONTENT.offers.length)
  ;['Instagram', 'Facebook', 'Twitter'].forEach((platform) => {
    weeklyPosts.push({
      day: 'Friday',
      platform,
      language: 'ar' as const,
      content: generatePost('specialOffer', 'ar', {
        offer: SAMPLE_CONTENT.offers[offerIndex].ar,
        discount: '15',
      }),
      type: 'specialOffer',
    })
  })

  return weeklyPosts
}

// Best posting times for UAE (in 24h format)
export const BEST_POSTING_TIMES = {
  Instagram: ['09:00', '13:00', '19:00'],
  Facebook: ['10:00', '14:00', '20:00'],
  Twitter: ['08:00', '12:00', '18:00', '21:00'],
  TikTok: ['18:00', '20:00', '22:00'],
  LinkedIn: ['09:00', '12:00', '17:00'],
}

// Content calendar helper
export function createMonthlyCalendar(month: number, year: number) {
  const calendar = []
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })

    // Get content ideas for this day
    const dayContent = POSTING_SCHEDULE[dayName.toLowerCase() as keyof typeof POSTING_SCHEDULE]

    calendar.push({
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      dayName,
      content: dayContent || ['Rest day'],
    })
  }

  return calendar
}

// Analytics tracking helper
export function trackSocialPost(
  platform: string,
  postType: string,
  language: string
) {
  // This would integrate with analytics services
  console.log('Post tracked:', {
    platform,
    postType,
    language,
    timestamp: new Date().toISOString(),
  })
}

// Export all utilities
export default {
  POST_TEMPLATES,
  SAMPLE_CONTENT,
  generatePost,
  generateWeeklyContent,
  BEST_POSTING_TIMES,
  createMonthlyCalendar,
  trackSocialPost,
}
