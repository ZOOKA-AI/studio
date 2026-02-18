'use server';

/**
 * @fileOverview AI flow for generating social media content for Royal Clean UAE
 * 
 * This flow generates engaging social media posts with brand voice and tone
 * 
 * @Exported Members:
 *   - generateSocialContent: Function to generate social media content
 *   - GenerateSocialContentInput: Input type
 *   - GenerateSocialContentOutput: Output type
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type {SocialPlatform} from '@/types/marketing';

const GenerateSocialContentInputSchema = z.object({
  topic: z.string().describe('The topic or service to create content about'),
  platform: z.enum(['facebook', 'instagram', 'linkedin', 'twitter', 'tiktok', 'snapchat', 'whatsapp']).describe('Target social media platform'),
  tone: z.enum(['professional', 'friendly', 'promotional', 'educational']).optional().describe('Tone of the content'),
  language: z.enum(['ar', 'en']).default('ar').describe('Language for the content'),
});
export type GenerateSocialContentInput = z.infer<typeof GenerateSocialContentInputSchema>;

const GenerateSocialContentOutputSchema = z.object({
  content: z.string().describe('The generated social media post content'),
  hashtags: z.array(z.string()).describe('Relevant hashtags for the post'),
  callToAction: z.string().describe('Call to action for the post'),
  bestTimeToPost: z.string().describe('Recommended time to post (e.g., "Morning 9-11 AM")'),
});
export type GenerateSocialContentOutput = z.infer<typeof GenerateSocialContentOutputSchema>;

export async function generateSocialContent(input: GenerateSocialContentInput): Promise<GenerateSocialContentOutput> {
  return generateSocialContentFlow(input);
}

const generateSocialContentPrompt = ai.definePrompt({
  name: 'generateSocialContentPrompt',
  input: {schema: GenerateSocialContentInputSchema},
  output: {schema: GenerateSocialContentOutputSchema},
  prompt: `You are a social media expert for Royal Clean UAE (شركة رويال للتنظيف والتعقيم ومكافحة الحشرات), a professional cleaning and sanitization company in UAE.

Company Information:
- Services: Cleaning, sanitization, pest control
- Location: UAE
- Brand Voice: Professional, trustworthy, customer-focused
- Contact: +971563177803
- Website: royalcleanuae.com

Create engaging social media content for {{platform}} platform in {{language}} language.
Topic: {{{topic}}}
Tone: {{tone}}

The content should:
1. Be appropriate for the platform's character limits and style
2. Highlight Royal Clean UAE's expertise and professionalism
3. Include a clear call to action
4. Use relevant hashtags (mix of Arabic and English if language is Arabic)
5. Emphasize trust, quality, and customer satisfaction

Generate the content with hashtags, call to action, and best time to post.`,
});

const generateSocialContentFlow = ai.defineFlow(
  {
    name: 'generateSocialContentFlow',
    inputSchema: GenerateSocialContentInputSchema,
    outputSchema: GenerateSocialContentOutputSchema,
  },
  async input => {
    const {output} = await generateSocialContentPrompt(input);
    return output!;
  }
);
