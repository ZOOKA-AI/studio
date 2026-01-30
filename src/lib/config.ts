/**
 * Configuration File for Royal Clean UAE
 * 
 * IMPORTANT: Update these values before deploying to production
 */

// Contact Information
export const CONTACT_INFO = {
  // TODO: Replace with actual phone number
  phone: '+971-XX-XXX-XXXX',
  
  // TODO: Replace with actual email addresses
  email: {
    general: 'info@royalcleanuae.com',
    support: 'support@royalcleanuae.com',
    social: 'social@royalcleanuae.com',
    dev: 'dev@royalcleanuae.com',
  },
  
  // TODO: Replace with actual physical addresses for each Emirate
  addresses: {
    dubai: {
      street: 'Dubai Office Address',
      area: 'Dubai',
      country: 'UAE',
    },
    abuDhabi: {
      street: 'Abu Dhabi Office Address',
      area: 'Abu Dhabi',
      country: 'UAE',
    },
    // Add other Emirates as needed
  },
  
  // TODO: Replace with actual social media handles
  social: {
    instagram: '@royalcleanuae',
    facebook: 'royalcleanuae',
    twitter: '@royalcleanuae',
    tiktok: '@royalcleanuae',
    linkedin: 'company/royalcleanuae',
    youtube: '@royalcleanuae',
  },
}

// SEO Configuration
export const SEO_CONFIG = {
  // TODO: Replace with actual verification codes
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  
  // Base URL
  baseUrl: 'https://zooka-ai.com',
  
  // Default metadata
  defaultTitle: 'رويال كلين - خدمات التنظيف الأفضل في الإمارات | Royal Clean UAE',
  defaultDescription: 'خدمات التنظيف الاحترافية رقم 1 في الإمارات العربية المتحدة. نخدم دبي، أبوظبي، الشارقة، عجمان، أم القيوين، رأس الخيمة، الفجيرة. تنظيف منازل، شقق، فلل، مكاتب. احجز الآن!',
}

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  // TODO: Add your Google Analytics ID
  googleAnalyticsId: 'G-XXXXXXXXXX',
  
  // TODO: Add your Facebook Pixel ID
  facebookPixelId: 'XXXXXXXXXXXXXXXXX',
  
  // TODO: Add your Google Tag Manager ID
  googleTagManagerId: 'GTM-XXXXXXX',
}

// Business Hours
export const BUSINESS_HOURS = {
  workdays: {
    opens: '08:00',
    closes: '22:00',
  },
  weekend: {
    opens: '08:00',
    closes: '22:00',
  },
}

// Pricing Configuration
export const PRICING = {
  priceRange: 'AED 100 - AED 5000',
  currency: 'AED',
  minPrice: 100,
  maxPrice: 5000,
}

// Feature Flags
export const FEATURES = {
  // Enable/disable features
  enableOnlineBooking: true,
  enableChatSupport: false,
  enableBlog: false,
  enableReviews: true,
  enableMultilingual: true,
}

/**
 * SETUP CHECKLIST:
 * 
 * Before deploying to production, make sure to:
 * 
 * [ ] Update CONTACT_INFO.phone with actual phone number
 * [ ] Update CONTACT_INFO.email addresses
 * [ ] Update CONTACT_INFO.addresses for each Emirate
 * [ ] Verify CONTACT_INFO.social handles are created
 * [ ] Add SEO_CONFIG.verification codes from Google & Yandex
 * [ ] Update SEO_CONFIG.baseUrl if different
 * [ ] Add ANALYTICS_CONFIG IDs from respective platforms
 * [ ] Review and update BUSINESS_HOURS if needed
 * [ ] Review and update PRICING if needed
 * [ ] Configure FEATURES flags as needed
 * 
 * See docs/SEO-IMPLEMENTATION.md for detailed setup guide
 */
