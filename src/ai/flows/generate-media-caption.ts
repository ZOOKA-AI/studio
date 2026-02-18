'use server';

/**
 * @fileOverview AI flow for generating image and video captions
 * 
 * Creates engaging captions for visual content with brand consistency
 * 
 * @Exported Members:
 *   - generateMediaCaption: Function to generate media captions
 *   - GenerateMediaCaptionInput: Input type
 *   - GenerateMediaCaptionOutput: Output type
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type {SocialPlatform} from '@/types/marketing';

const GenerateMediaCaptionInputSchema = z.object({
  mediaType: z.enum(['image', 'video']).describe('Type of media'),
  description: z.string().describe('Description of what the media shows'),
  service: z.string().optional().describe('Service being showcased'),
  platform: z.enum(['facebook', 'instagram', 'linkedin', 'tiktok', 'snapchat', 'whatsapp']).describe('Target platform'),
  language: z.enum(['ar', 'en']).default('ar').describe('Language for the caption'),
});
export type GenerateMediaCaptionInput = z.infer<typeof GenerateMediaCaptionInputSchema>;

const GenerateMediaCaptionOutputSchema = z.object({
  caption: z.string().describe('The generated caption'),
  hashtags: z.array(z.string()).describe('Relevant hashtags'),
  emojis: z.array(z.string()).describe('Suggested emojis to use'),
  callToAction: z.string().describe('Call to action'),
  accessibility: z.string().describe('Alt text for accessibility'),
});
export type GenerateMediaCaptionOutput = z.infer<typeof GenerateMediaCaptionOutputSchema>;

export async function generateMediaCaption(input: GenerateMediaCaptionInput): Promise<GenerateMediaCaptionOutput> {
  return generateMediaCaptionFlow(input);
}

const generateMediaCaptionPrompt = ai.definePrompt({
  name: 'generateMediaCaptionPrompt',
  input: {schema: GenerateMediaCaptionInputSchema},
  output: {schema: GenerateMediaCaptionOutputSchema},
  prompt: `You are a social media content creator for Royal Clean UAE, specializing in creating engaging captions for visual content.

Company: Royal Clean UAE (شركة رويال للتنظيف والتعقيم ومكافحة الحشرات)
Contact: +971563177803
Website: royalcleanuae.com

Media Type: {{mediaType}}
Description: {{{description}}}
Service: {{service}}
Platform: {{platform}}
Language: {{language}}

Create an engaging caption that:
1. Captures attention in the first line
2. Describes the value/benefit shown in the media
3. Builds trust in Royal Clean UAE's expertise
4. Includes a clear call to action
5. Uses platform-appropriate length and style
6. Incorporates relevant emojis naturally
7. Optimized for {{platform}} engagement

Also provide:
- Relevant hashtags (mix of trending and niche)
- Suggested emojis
- Clear call to action
- Accessibility alt text for visually impaired users

Make it engaging, professional, and conversion-focused.`,
});

const generateMediaCaptionFlow = ai.defineFlow(
  {
    name: 'generateMediaCaptionFlow',
    inputSchema: GenerateMediaCaptionInputSchema,
    outputSchema: GenerateMediaCaptionOutputSchema,
  },
  async input => {
    const {output} = await generateMediaCaptionPrompt(input);
    return output!;
  }
);
