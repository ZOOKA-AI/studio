'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate Instagram hashtags for posts.
 *
 * The flow takes post content and generates relevant hashtags targeting UAE audience
 * for a cleaning company, including both Arabic and English hashtags.
 *
 * @Exported Members:
 *   - generateInstagramHashtags: An async function that triggers the hashtag generation flow.
 *   - GenerateInstagramHashtagsInput: The TypeScript type definition for the input to the flow.
 *   - GenerateInstagramHashtagsOutput: The TypeScript type definition for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the generateInstagramHashtags flow
const GenerateInstagramHashtagsInputSchema = z.object({
  postContent: z.string().describe('The content/description of the Instagram post about cleaning services.'),
  targetCities: z.array(z.string()).optional().describe('Optional array of UAE cities to target (e.g., Dubai, Abu Dhabi, Al Ain, Sharjah)'),
  language: z.enum(['ar', 'en', 'both']).default('both').describe('Language preference for hashtags: Arabic, English, or both'),
});
export type GenerateInstagramHashtagsInput = z.infer<typeof GenerateInstagramHashtagsInputSchema>;

// Define the output schema for the generateInstagramHashtags flow
const GenerateInstagramHashtagsOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('Array of relevant hashtags for the post'),
  arabicHashtags: z.array(z.string()).describe('Arabic-specific hashtags'),
  englishHashtags: z.array(z.string()).describe('English-specific hashtags'),
  locationHashtags: z.array(z.string()).describe('Location-based hashtags for UAE cities'),
  formattedHashtags: z.string().describe('All hashtags formatted as a single string ready to copy'),
});
export type GenerateInstagramHashtagsOutput = z.infer<typeof GenerateInstagramHashtagsOutputSchema>;

// Exported function to generate Instagram hashtags
export async function generateInstagramHashtags(input: GenerateInstagramHashtagsInput): Promise<GenerateInstagramHashtagsOutput> {
  return generateInstagramHashtagsFlow(input);
}

// Define the prompt for generating Instagram hashtags
const generateInstagramHashtagsPrompt = ai.definePrompt({
  name: 'generateInstagramHashtagsPrompt',
  input: {schema: GenerateInstagramHashtagsInputSchema},
  output: {schema: GenerateInstagramHashtagsOutputSchema},
  prompt: `You are an expert in Instagram marketing and SEO for cleaning services in the UAE.

Given the post content, generate relevant hashtags that will help increase visibility and engagement.

Post Content: {{{postContent}}}
Target Cities: {{{targetCities}}}
Language Preference: {{{language}}}

Generate hashtags following these guidelines:
1. Include popular cleaning service hashtags
2. Include location-specific hashtags for UAE cities (Dubai, Abu Dhabi, Al Ain, Sharjah)
3. Include both Arabic and English hashtags based on language preference
4. Include industry-specific hashtags (deep cleaning, home cleaning, office cleaning, etc.)
5. Mix of high-volume and niche hashtags (aim for 20-30 total hashtags)
6. Ensure hashtags are relevant to the cleaning industry
7. Format hashtags properly (no spaces, proper capitalization for readability)

Popular cleaning hashtags to consider:
- #CleaningServices #DeepCleaning #HomeCleaning #OfficeCleaning #ProfessionalCleaning
- #تنظيف #تنظيف_منازل #تنظيف_عميق #خدمات_تنظيف #نظافة
- #DubaiCleaning #AbuDhabiCleaning #UAECleaning #CleaningCompanyUAE
- #دبي #ابوظبي #الامارات #الشارقة #العين

Return the hashtags organized by category and include a formatted string ready to copy.`,
});

// Define the Genkit flow for generating Instagram hashtags
const generateInstagramHashtagsFlow = ai.defineFlow(
  {
    name: 'generateInstagramHashtagsFlow',
    inputSchema: GenerateInstagramHashtagsInputSchema,
    outputSchema: GenerateInstagramHashtagsOutputSchema,
  },
  async input => {
    const {output} = await generateInstagramHashtagsPrompt(input);
    return output!;
  }
);
