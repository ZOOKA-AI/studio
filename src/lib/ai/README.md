# AI Marketing System - Autonomous Multi-Platform Publisher

## Overview

The AI Marketing System is an autonomous content publisher that manages campaigns across multiple social media platforms for two brands:

1. **Royal Clean** - Premium cleaning services in UAE (local focus)
2. **Zooka-AI** - AI Agent Orchestration Platform (global focus)

## Features

### Multi-Platform Support
- ✅ **Instagram** - Feed posts with images and hashtags
- ✅ **Facebook** - Page posts with media
- ✅ **LinkedIn** - Organization posts for B2B
- ✅ **Twitter/X** - Tweets with hashtags
- ✅ **TikTok** - Video posts (placeholder implementation)
- ✅ **WhatsApp** - Business broadcasts

### Bilingual Content
- English captions for global reach
- Arabic captions for local UAE audience
- Platform-specific hashtags
- Localized call-to-actions

### Scheduled Campaigns
- **09:00 GST** - Royal Clean (morning bookings)
- **14:00 GST** - Zooka-AI (business hours)
- **20:00 GST** - Royal Clean (evening focus)

## Usage

### Execute Global Launch

```typescript
import { executeGlobalLaunch } from '@/lib/ai/master-execution';

// Launch Royal Clean campaign
const result = await executeGlobalLaunch('royal_clean');
console.log(`Published to ${result.summary.successful} platforms`);

// Launch Zooka-AI campaign
const result = await executeGlobalLaunch('zooka_ai');
```

### Execute Scheduled Campaign

```typescript
import { executeScheduledCampaign } from '@/lib/ai/master-execution';

// Morning campaign (09:00 GST)
await executeScheduledCampaign('09:00_GST');

// Afternoon campaign (14:00 GST)
await executeScheduledCampaign('14:00_GST');

// Evening campaign (20:00 GST)
await executeScheduledCampaign('20:00_GST');
```

### Direct Platform Publishing

```typescript
import { OmniPublisher } from '@/lib/ai/omni-publisher';
import type { OmniContent } from '@/lib/ai/omni-publisher';

const publisher = new OmniPublisher();

const content: OmniContent = {
  brand: 'royal_clean',
  content_type: 'local_service',
  platforms: ['instagram_feed', 'facebook_post'],
  caption_en: 'Your custom caption here',
  caption_ar: 'التسمية التوضيحية المخصصة هنا',
  media_url: 'https://example.com/image.jpg',
  hashtags: {
    local: ['Dubai', 'UAE'],
    global: ['CleaningServices'],
    platform_specific: {
      instagram_feed: ['DubaiCleaning'],
      facebook_post: ['CleanHome'],
    },
  },
  cta_url: 'https://example.com',
  cta_text_en: 'Book Now',
  cta_text_ar: 'احجز الآن',
};

const results = await publisher.publishToAll(content);
```

## Configuration

### Update Campaign Content

Edit `src/lib/ai/campaign-config.ts` to modify:

```typescript
export const CAMPAIGNS = {
  royal_clean: {
    brand: 'royal_clean',
    content_type: 'local_service',
    platforms: ['instagram_feed', 'facebook_post', 'whatsapp_broadcast'],
    caption_en: 'Your new caption',
    caption_ar: 'التسمية التوضيحية الجديدة',
    media_url: 'https://images.unsplash.com/...',
    hashtags: {
      local: ['تنظيف_دبي', 'CleaningDubai'],
      global: ['CleaningServices'],
      platform_specific: {
        instagram_feed: ['DubaiCleaning'],
        facebook_post: ['CleanHome'],
      },
    },
    cta_url: 'https://royalclean.ae',
    cta_text_en: 'Book Now',
    cta_text_ar: 'احجز الآن',
  },
  // ... zooka_ai config
};
```

### Environment Variables

Required environment variables (see `.env.example`):

```bash
# Meta (Facebook/Instagram)
FACEBOOK_PAGE_ID=your-page-id
FACEBOOK_ACCESS_TOKEN=your-token
INSTAGRAM_BUSINESS_ACCOUNT_ID=your-ig-id

# LinkedIn
LINKEDIN_ACCESS_TOKEN=your-token
LINKEDIN_ORGANIZATION_ID=your-org-id

# Twitter
TWITTER_BEARER_TOKEN=your-token

# TikTok
TIKTOK_ACCESS_TOKEN=your-token
TIKTOK_OPEN_ID=your-id

# WhatsApp
WHATSAPP_PHONE_NUMBER_ID=your-phone-id
WHATSAPP_ACCESS_TOKEN=your-token

# Security
AUTONOMOUS_PUBLISHER_API_KEY=your-secret-key
```

## API Integration

### Create API Route for Publishing

```typescript
// src/app/api/publish/route.ts
import { executeGlobalLaunch } from '@/lib/ai/master-execution';

export async function POST(request: Request) {
  const { brand } = await request.json();
  
  // Verify API key
  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== process.env.AUTONOMOUS_PUBLISHER_API_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const result = await executeGlobalLaunch(brand);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

### Set Up Cron Job (Vercel)

```typescript
// src/app/api/cron/campaigns/route.ts
import { executeScheduledCampaign } from '@/lib/ai/master-execution';

export async function GET(request: Request) {
  // Verify Vercel Cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const hour = new Date().getHours();
  const timeSlot = hour === 9 ? '09:00_GST' 
    : hour === 14 ? '14:00_GST' 
    : '20:00_GST';
  
  const result = await executeScheduledCampaign(timeSlot);
  return Response.json(result);
}
```

Then add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/campaigns",
      "schedule": "0 9,14,20 * * *"
    }
  ]
}
```

## Campaign Strategy

### Royal Clean (Local UAE)

**Target Audience**: UAE residents (Dubai, Abu Dhabi, Sharjah)

**Services**:
- Deep cleaning
- Regular cleaning
- Move-in/out cleaning
- Carpet & upholstery cleaning
- Window cleaning
- Disinfection services

**Pricing**:
- Studio: 150 AED
- Apartment: 250 AED
- Villa: 500 AED

**Platforms**: Instagram, Facebook, WhatsApp
**Languages**: Arabic (primary), English (secondary)
**Peak Times**: 09:00 GST, 20:00 GST

### Zooka-AI (Global Platform)

**Target Audience**: CTOs, Product Managers, Tech Founders

**Features**:
- Multi-model support (OpenAI, Anthropic, Google)
- Real-time analytics
- Enterprise-grade security
- Agent orchestration

**Platforms**: LinkedIn, Twitter/X
**Languages**: English (primary), Arabic (secondary)
**Peak Times**: 14:00 GST (business hours)

## Best Practices

1. **Content Guidelines**
   - Keep captions under 2,200 characters (Instagram limit)
   - Use high-quality images (1200x1200px minimum)
   - Include relevant hashtags (max 30 per post)
   - Add clear call-to-actions

2. **Hashtag Strategy**
   - Use a mix of local and global hashtags
   - Platform-specific hashtags for better reach
   - Include branded hashtags (#RoyalCleanUAE, #ZookaAI)

3. **Posting Schedule**
   - Test different times for engagement
   - Avoid weekends for B2B (Zooka-AI)
   - Peak times for B2C (Royal Clean): evenings and weekends

4. **Token Management**
   - Rotate API tokens every 60-90 days
   - Monitor token expiration dates
   - Keep backup tokens ready
   - Use token refresh mechanisms

5. **Error Handling**
   - Log all failed publishes
   - Retry failed posts with exponential backoff
   - Alert on consecutive failures
   - Monitor API rate limits

## Troubleshooting

### Publishing Fails

**Check**:
1. API tokens are valid and not expired
2. Media URLs are publicly accessible
3. Content meets platform policies
4. API rate limits not exceeded

### Partial Success

**Reasons**:
- Some platforms may have stricter content policies
- Token permissions may vary by platform
- Rate limits may affect some platforms

**Solution**:
- Review individual platform errors
- Adjust content for specific platforms
- Implement retry logic

### Authentication Errors

**Common Issues**:
- Expired tokens
- Invalid credentials
- Missing permissions/scopes

**Solution**:
- Regenerate tokens
- Verify token permissions
- Check platform API documentation

## Support

- **Documentation**: `/docs/ENVIRONMENT_SETUP.md`
- **GitHub Issues**: https://github.com/ZOOKA-AI/studio/issues
- **Sponsors**: https://github.com/sponsors/ZOOKA-AI

## License

This marketing system is part of the ZOOKA-AI Studio project.
