/**
 * @fileOverview Shared types for marketing automation
 * 
 * Common types used across AI flows and components
 */

export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'snapchat' | 'whatsapp';

export const SOCIAL_PLATFORMS = {
  FACEBOOK: 'facebook' as const,
  INSTAGRAM: 'instagram' as const,
  LINKEDIN: 'linkedin' as const,
  TWITTER: 'twitter' as const,
  TIKTOK: 'tiktok' as const,
  SNAPCHAT: 'snapchat' as const,
  WHATSAPP: 'whatsapp' as const,
};
