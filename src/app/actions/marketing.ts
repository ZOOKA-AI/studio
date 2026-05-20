'use server'

import { createClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'

const CampaignInputSchema = z.object({
  serviceType: z.string(),
  emirate: z.string(),
  tone: z.string(),
  discountPercent: z.coerce.number().min(0).max(100),
})

export async function createCampaignAction(formData: FormData) {
  try {
    // Validate input
    const input = CampaignInputSchema.parse({
      serviceType: formData.get('serviceType'),
      emirate: formData.get('emirate'),
      tone: formData.get('tone'),
      discountPercent: formData.get('discountPercent'),
    })

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    // Generate content using Claude
    const prompt = `You are a professional marketing copywriter for Royal Clean UAE, a premium cleaning service company. Generate Instagram content for a ${input.serviceType} service in ${input.emirate}.

Service Type: ${input.serviceType}
Location: ${input.emirate}, UAE
Tone: ${input.tone}
${input.discountPercent > 0 ? `Special Discount: ${input.discountPercent}%` : ''}

Generate content in JSON format with:
1. caption - object with "en" (English) and "ar" (Arabic) versions
2. hashtags - object with arrays for "primary", "location", "trending", and "arabic" categories
3. callToAction - object with "en" and "ar" versions

Keep it engaging, professional, and culturally appropriate for UAE. Include relevant emojis.`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    // Parse AI response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''
    let generatedContent
    
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      generatedContent = jsonMatch ? JSON.parse(jsonMatch[0]) : null
    } catch {
      throw new Error('Failed to parse AI response')
    }

    if (!generatedContent) {
      throw new Error('No content generated')
    }

    // Save to Supabase
    const supabase = await createClient()
    const { data: campaign, error } = await supabase
      .from('marketing_campaigns')
      .insert({
        service_type: input.serviceType,
        emirate: input.emirate,
        tone: input.tone,
        content_en: generatedContent.caption?.en || '',
        content_ar: generatedContent.caption?.ar || '',
        hashtags: [
          ...(generatedContent.hashtags?.primary || []),
          ...(generatedContent.hashtags?.location || []),
          ...(generatedContent.hashtags?.trending || []),
          ...(generatedContent.hashtags?.arabic || []),
        ],
        status: 'draft',
        estimated_reach: 5000,
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    return {
      success: true,
      data: {
        campaignId: campaign.id,
        content: {
          en: generatedContent.caption?.en || '',
          ar: generatedContent.caption?.ar || '',
        },
        hashtags: generatedContent.hashtags || {},
        callToAction: generatedContent.callToAction || {},
        estimatedReach: 5000,
      },
    }
  } catch (error) {
    console.error('Campaign creation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}
