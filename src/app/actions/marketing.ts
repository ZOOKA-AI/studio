'use server';

/**
 * Server actions for marketing dashboard
 * Handles campaign creation, preview, and content generation
 */

import { generateMarketingContent, type GenerateMarketingContentInput } from '@/ai/flows/generate-marketing-content';
import { calculatePrice, getServiceDisplayName, type ServiceType, type PropertyType } from '@/lib/pricing/royal-clean-pricing';

export interface CampaignInput {
  serviceType: ServiceType;
  propertyType: PropertyType;
  emirate: string;
  discount?: number;
  tone: string;
  platforms: string[];
}

export interface CampaignPreview {
  englishCaption: string;
  arabicCaption: string;
  hashtags: {
    primary: string[];
    location: string[];
    trending: string[];
    arabic: string[];
  };
  pricing: {
    basePrice: number;
    discountAmount: number;
    finalPrice: number;
    currency: string;
  };
}

/**
 * Preview campaign content before publishing
 */
export async function previewCampaignAction(input: CampaignInput): Promise<CampaignPreview> {
  try {
    // Calculate pricing
    const pricing = calculatePrice(input.serviceType, input.propertyType, input.discount || 0);

    // Generate content using AI
    const contentInput: GenerateMarketingContentInput = {
      serviceType: getServiceDisplayName(input.serviceType),
      propertyType: input.propertyType.charAt(0).toUpperCase() + input.propertyType.slice(1),
      emirate: input.emirate,
      price: pricing.finalPrice,
      discount: input.discount,
      tone: input.tone,
      platforms: input.platforms,
    };

    const content = await generateMarketingContent(contentInput);

    return {
      englishCaption: content.englishCaption,
      arabicCaption: content.arabicCaption,
      hashtags: {
        primary: content.primaryHashtags,
        location: content.locationHashtags,
        trending: content.trendingHashtags,
        arabic: content.arabicHashtags,
      },
      pricing,
    };
  } catch (error) {
    console.error('Error previewing campaign:', error);
    throw new Error('Failed to generate campaign preview');
  }
}

/**
 * Create and publish campaign to selected platforms
 */
export async function createCampaignAction(
  input: CampaignInput,
  scheduledDate?: Date
): Promise<{ success: boolean; message: string; campaignId?: string }> {
  try {
    // Generate campaign preview
    const preview = await previewCampaignAction(input);

    // In a real implementation, this would:
    // 1. Save the campaign to database
    // 2. Schedule posts to social media platforms
    // 3. Return campaign ID for tracking

    // For now, we'll simulate success
    const campaignId = `camp_${Date.now()}`;

    return {
      success: true,
      message: scheduledDate
        ? `Campaign scheduled for ${scheduledDate.toLocaleDateString()}`
        : 'Campaign published successfully to all platforms',
      campaignId,
    };
  } catch (error) {
    console.error('Error creating campaign:', error);
    return {
      success: false,
      message: 'Failed to create campaign. Please try again.',
    };
  }
}
