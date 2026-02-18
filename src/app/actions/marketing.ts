'use server';

import { createServerClient } from '@/lib/supabase/server';
import { z } from 'zod';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const CampaignInputSchema = z.object({
  serviceType: z.string(),
  emirate: z.string(),
  tone: z.string(),
  discountPercent: z.string().optional(),
});

export async function createCampaignAction(formData: FormData) {
  const parsed = CampaignInputSchema.parse({
    serviceType: formData.get('serviceType'),
    emirate: formData.get('emirate'),
    tone: formData.get('tone'),
    discountPercent: formData.get('discountPercent'),
  });

  // Generate content with Claude
  const prompt = `Generate Instagram marketing content for Royal Clean UAE:
Service: ${parsed.serviceType}
Location: ${parsed.emirate}
Tone: ${parsed.tone}

Output JSON format:
{
  "caption": {"en": "...", "ar": "..."},
  "hashtags": {
    "primary": [...],
    "location": [...],
    "trending": [...],
    "arabic": [...]
  },
  "callToAction": {"en": "...", "ar": "..."}
}`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Invalid response');
  }

  const result = JSON.parse(content.text);

  // Save to Supabase
  const supabase = await createServerClient();
  const { data: campaign, error } = await supabase
    .from('marketing_campaigns')
    .insert({
      service_type: parsed.serviceType,
      emirate: parsed.emirate,
      tone: parsed.tone,
      content_en: result.caption.en,
      content_ar: result.caption.ar,
      hashtags: Object.values(result.hashtags).flat(),
      status: 'draft',
    })
    .select()
    .single();

  if (error) throw error;

  return {
    ...result,
    metadata: {
      serviceType: parsed.serviceType,
      emirate: parsed.emirate,
      estimatedReach: 5000,
      campaignId: campaign.id,
    },
  };
}
