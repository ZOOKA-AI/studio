/**
 * OmniPublisher - Autonomous Multi-Platform Content Publisher
 * Supports: Instagram, Facebook, LinkedIn, Twitter, TikTok, WhatsApp
 */

// API Version Configuration
const FACEBOOK_GRAPH_API_VERSION = 'v18.0';

export interface OmniContent {
  brand: 'royal_clean' | 'zooka_ai';
  content_type: 'local_service' | 'global_platform';
  platforms: Platform[];
  caption_en: string;
  caption_ar?: string;
  media_url?: string;
  hashtags: {
    local: string[];
    global: string[];
    platform_specific: Record<string, string[]>;
  };
  cta_url: string;
  cta_text_en: string;
  cta_text_ar?: string;
}

export type Platform =
  | 'instagram_feed'
  | 'facebook_post'
  | 'linkedin_post'
  | 'twitter_tweet'
  | 'tiktok_video'
  | 'whatsapp_broadcast';

export interface PublishResult {
  platform: Platform;
  success: boolean;
  post_id?: string;
  error?: string;
  timestamp: Date;
}

export class OmniPublisher {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.AUTONOMOUS_PUBLISHER_API_KEY || '';
  }

  /**
   * Publish content to all specified platforms
   */
  async publishToAll(content: OmniContent): Promise<PublishResult[]> {
    console.log(`📢 Publishing to ${content.platforms.length} platforms...`);

    const results = await Promise.allSettled(
      content.platforms.map((platform) => this.publishToPlatform(platform, content))
    );

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          platform: content.platforms[index],
          success: false,
          error: result.reason?.message || 'Unknown error',
          timestamp: new Date(),
        };
      }
    });
  }

  /**
   * Publish to a single platform
   */
  private async publishToPlatform(
    platform: Platform,
    content: OmniContent
  ): Promise<PublishResult> {
    console.log(`🚀 Publishing to ${platform}...`);

    try {
      switch (platform) {
        case 'instagram_feed':
          return await this.publishToInstagram(content);
        case 'facebook_post':
          return await this.publishToFacebook(content);
        case 'linkedin_post':
          return await this.publishToLinkedIn(content);
        case 'twitter_tweet':
          return await this.publishToTwitter(content);
        case 'tiktok_video':
          return await this.publishToTikTok(content);
        case 'whatsapp_broadcast':
          return await this.publishToWhatsApp(content);
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }
    } catch (error) {
      console.error(`❌ Failed to publish to ${platform}:`, error);
      return {
        platform,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      };
    }
  }

  /**
   * Instagram Feed Post (Graph API)
   */
  private async publishToInstagram(content: OmniContent): Promise<PublishResult> {
    const caption = this.buildCaption(content, 'instagram_feed');
    const igAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    if (!igAccountId || !accessToken) {
      throw new Error('Instagram credentials not configured');
    }

    // Create media container
    const createMediaUrl = `https://graph.facebook.com/${FACEBOOK_GRAPH_API_VERSION}/${igAccountId}/media`;
    const mediaResponse = await fetch(createMediaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: content.media_url,
        caption,
        access_token: accessToken,
      }),
    });

    const mediaData = await mediaResponse.json();
    if (!mediaData.id) {
      throw new Error(`Instagram media creation failed: ${JSON.stringify(mediaData)}`);
    }

    // Publish media
    const publishUrl = `https://graph.facebook.com/${FACEBOOK_GRAPH_API_VERSION}/${igAccountId}/media_publish`;
    const publishResponse = await fetch(publishUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creation_id: mediaData.id,
        access_token: accessToken,
      }),
    });

    const publishData = await publishResponse.json();

    return {
      platform: 'instagram_feed',
      success: !!publishData.id,
      post_id: publishData.id,
      timestamp: new Date(),
    };
  }

  /**
   * Facebook Page Post (Graph API)
   */
  private async publishToFacebook(content: OmniContent): Promise<PublishResult> {
    const caption = this.buildCaption(content, 'facebook_post');
    const pageId = process.env.FACEBOOK_PAGE_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    if (!pageId || !accessToken) {
      throw new Error('Facebook credentials not configured');
    }

    const url = `https://graph.facebook.com/${FACEBOOK_GRAPH_API_VERSION}/${pageId}/photos`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: content.media_url,
        caption,
        access_token: accessToken,
      }),
    });

    const data = await response.json();

    return {
      platform: 'facebook_post',
      success: !!data.id,
      post_id: data.id,
      timestamp: new Date(),
    };
  }

  /**
   * LinkedIn Post (LinkedIn API v2)
   */
  private async publishToLinkedIn(content: OmniContent): Promise<PublishResult> {
    const caption = this.buildCaption(content, 'linkedin_post');
    const orgId = process.env.LINKEDIN_ORGANIZATION_ID;
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

    if (!orgId || !accessToken) {
      throw new Error('LinkedIn credentials not configured');
    }

    const url = 'https://api.linkedin.com/v2/ugcPosts';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify({
        author: `urn:li:organization:${orgId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: caption,
            },
            shareMediaCategory: 'ARTICLE',
            media: [
              {
                status: 'READY',
                originalUrl: content.cta_url,
              },
            ],
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      }),
    });

    const data = await response.json();

    return {
      platform: 'linkedin_post',
      success: !!data.id,
      post_id: data.id,
      timestamp: new Date(),
    };
  }

  /**
   * Twitter/X Post (API v2)
   */
  private async publishToTwitter(content: OmniContent): Promise<PublishResult> {
    const caption = this.buildCaption(content, 'twitter_tweet');
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;

    if (!bearerToken) {
      throw new Error('Twitter credentials not configured');
    }

    const url = 'https://api.twitter.com/2/tweets';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({
        text: caption,
      }),
    });

    const data = await response.json();

    return {
      platform: 'twitter_tweet',
      success: !!data.data?.id,
      post_id: data.data?.id,
      timestamp: new Date(),
    };
  }

  /**
   * TikTok Video Post (TikTok API)
   */
  private async publishToTikTok(content: OmniContent): Promise<PublishResult> {
    const caption = this.buildCaption(content, 'tiktok_video');
    const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
    const openId = process.env.TIKTOK_OPEN_ID;

    if (!accessToken || !openId) {
      throw new Error('TikTok credentials not configured');
    }

    // Note: TikTok requires video upload flow, simplified here
    const url = 'https://open-api.tiktok.com/share/video/upload/';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        video: {
          caption,
        },
      }),
    });

    const data = await response.json();

    return {
      platform: 'tiktok_video',
      success: Boolean(data.data?.share_id),
      post_id: data.data?.share_id,
      timestamp: new Date(),
    };
  }

  /**
   * WhatsApp Business Broadcast (Cloud API)
   */
  private async publishToWhatsApp(content: OmniContent): Promise<PublishResult> {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!phoneNumberId || !accessToken) {
      throw new Error('WhatsApp credentials not configured');
    }

    const message = content.caption_ar
      ? `${content.caption_ar}\n\n${content.caption_en}`
      : content.caption_en;

    const url = `https://graph.facebook.com/${FACEBOOK_GRAPH_API_VERSION}/${phoneNumberId}/messages`;
    
    // Note: Replace 'BROADCAST_LIST' with your actual WhatsApp broadcast list ID
    // Format: The recipient should be a valid WhatsApp phone number or broadcast list ID
    // For testing, use a valid phone number with country code (e.g., '971501234567')
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: 'BROADCAST_LIST', // Replace with actual broadcast list
        type: 'text',
        text: {
          body: message,
        },
      }),
    });

    const data = await response.json();

    return {
      platform: 'whatsapp_broadcast',
      success: !!data.messages?.[0]?.id,
      post_id: data.messages?.[0]?.id,
      timestamp: new Date(),
    };
  }

  /**
   * Build caption with hashtags for specific platform
   */
  private buildCaption(content: OmniContent, platform: Platform): string {
    const baseCaption = content.caption_en;
    const platformHashtags = content.hashtags.platform_specific[platform] || [];
    const globalHashtags = content.hashtags.global;
    const localHashtags = content.hashtags.local;

    const allHashtags = [
      ...platformHashtags,
      ...globalHashtags,
      ...localHashtags,
    ]
      .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`))
      .join(' ');

    let caption = `${baseCaption}\n\n${allHashtags}`;

    // Add CTA if available
    if (content.cta_url) {
      caption += `\n\n${content.cta_text_en}: ${content.cta_url}`;
    }

    // Add Arabic caption for bilingual content
    if (content.caption_ar && (platform === 'instagram_feed' || platform === 'facebook_post')) {
      caption = `${content.caption_ar}\n\n${caption}`;
    }

    return caption;
  }
}
