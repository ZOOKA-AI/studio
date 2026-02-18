'use server';

/**
 * @fileOverview AI flow for generating SEO keywords and metadata
 * 
 * Generates SEO-optimized keywords, meta descriptions, and tags
 * 
 * @Exported Members:
 *   - generateSeoKeywords: Function to generate SEO keywords
 *   - GenerateSeoKeywordsInput: Input type
 *   - GenerateSeoKeywordsOutput: Output type
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoKeywordsInputSchema = z.object({
  content: z.string().describe('The content to generate SEO keywords for'),
  service: z.string().optional().describe('Specific service category'),
  location: z.string().default('UAE').describe('Target location'),
  language: z.enum(['ar', 'en', 'both']).default('both').describe('Language for keywords'),
});
export type GenerateSeoKeywordsInput = z.infer<typeof GenerateSeoKeywordsInputSchema>;

const GenerateSeoKeywordsOutputSchema = z.object({
  primaryKeywords: z.array(z.string()).describe('Primary SEO keywords'),
  secondaryKeywords: z.array(z.string()).describe('Secondary SEO keywords'),
  longTailKeywords: z.array(z.string()).describe('Long-tail keywords for niche targeting'),
  metaTitle: z.string().describe('SEO-optimized meta title'),
  metaDescription: z.string().describe('SEO-optimized meta description'),
  hashtags: z.array(z.string()).describe('Social media hashtags'),
});
export type GenerateSeoKeywordsOutput = z.infer<typeof GenerateSeoKeywordsOutputSchema>;

export async function generateSeoKeywords(input: GenerateSeoKeywordsInput): Promise<GenerateSeoKeywordsOutput> {
  return generateSeoKeywordsFlow(input);
}

const generateSeoKeywordsPrompt = ai.definePrompt({
  name: 'generateSeoKeywordsPrompt',
  input: {schema: GenerateSeoKeywordsInputSchema},
  output: {schema: GenerateSeoKeywordsOutputSchema},
  prompt: `You are an SEO expert specializing in the cleaning and sanitization industry in the UAE/Middle East region.

Generate comprehensive SEO keywords and metadata for Royal Clean UAE.

Content: {{{content}}}
Service: {{service}}
Location: {{location}}
Language: {{language}}

Consider:
1. Local SEO for UAE market
2. Cleaning and sanitization industry terms
3. Pest control services
4. Arabic and English search patterns
5. Mobile search optimization
6. Voice search optimization

Generate:
- Primary keywords (5-7 high-impact keywords)
- Secondary keywords (8-10 supporting keywords)
- Long-tail keywords (5-8 specific phrases)
- SEO-optimized meta title (max 60 characters)
- SEO-optimized meta description (max 160 characters)
- Social media hashtags (10-15 hashtags)

Ensure keywords are relevant, high-converting, and suitable for search engines and social media.`,
});

const generateSeoKeywordsFlow = ai.defineFlow(
  {
    name: 'generateSeoKeywordsFlow',
    inputSchema: GenerateSeoKeywordsInputSchema,
    outputSchema: GenerateSeoKeywordsOutputSchema,
  },
  async input => {
    const {output} = await generateSeoKeywordsPrompt(input);
    return output!;
  }
);
