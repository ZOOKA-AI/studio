'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate marketing content for Royal Clean UAE.
 *
 * The flow generates bilingual (English + Arabic) marketing content with hashtags for various platforms.
 *
 * @Exported Members:
 *   - generateMarketingContent: An async function that triggers the marketing content generation flow.
 *   - GenerateMarketingContentInput: The TypeScript type definition for the input to the flow.
 *   - GenerateMarketingContentOutput: The TypeScript type definition for the output of the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema for the generateMarketingContent flow
const GenerateMarketingContentInputSchema = z.object({
  serviceType: z.string().describe('Type of cleaning service (e.g., Deep Cleaning, Regular Cleaning)'),
  propertyType: z.string().describe('Property type (Studio, Apartment, Villa)'),
  emirate: z.string().describe('Target emirate (Dubai, Abu Dhabi, Sharjah)'),
  price: z.number().describe('Service price in AED'),
  discount: z.number().optional().describe('Discount percentage if applicable'),
  tone: z.string().describe('Campaign tone (Professional, Friendly, Luxury, Value)'),
  platforms: z.array(z.string()).describe('Target platforms for content'),
});
export type GenerateMarketingContentInput = z.infer<typeof GenerateMarketingContentInputSchema>;

// Define the output schema for the generateMarketingContent flow
const GenerateMarketingContentOutputSchema = z.object({
  englishCaption: z.string().describe('Marketing caption in English'),
  arabicCaption: z.string().describe('Marketing caption in Arabic'),
  primaryHashtags: z.array(z.string()).describe('Primary hashtags for the campaign'),
  locationHashtags: z.array(z.string()).describe('Location-based hashtags'),
  trendingHashtags: z.array(z.string()).describe('Trending hashtags'),
  arabicHashtags: z.array(z.string()).describe('Arabic hashtags'),
});
export type GenerateMarketingContentOutput = z.infer<typeof GenerateMarketingContentOutputSchema>;

// Exported function to generate the marketing content
export async function generateMarketingContent(input: GenerateMarketingContentInput): Promise<GenerateMarketingContentOutput> {
  return generateMarketingContentFlow(input);
}

// Define the prompt for generating marketing content
const generateMarketingContentPrompt = ai.definePrompt({
  name: 'generateMarketingContentPrompt',
  input: { schema: GenerateMarketingContentInputSchema },
  output: { schema: GenerateMarketingContentOutputSchema },
  prompt: `You are an AI marketing expert for Royal Clean UAE, a professional cleaning service company.

Generate compelling, bilingual marketing content for the following service:

Service Details:
- Service Type: {{{serviceType}}}
- Property Type: {{{propertyType}}}
- Location: {{{emirate}}}
- Price: {{{price}}} AED
{{#if discount}}- Special Discount: {{{discount}}}%{{/if}}
- Campaign Tone: {{{tone}}}
- Target Platforms: {{{platforms}}}

Requirements:
1. English Caption: Create an engaging 150-200 character caption in English that:
   - Highlights the service and value proposition
   - Includes the price and any discount
   - Uses a {{tone}} tone
   - Includes a clear call-to-action
   - Mentions the emirate for local targeting

2. Arabic Caption: Create a native Arabic caption (not translation) that:
   - Conveys the same message naturally in Arabic
   - Maintains cultural appropriateness
   - Uses proper RTL formatting
   - Includes pricing in Arabic format

3. Hashtags (return without # symbol):
   - Primary Hashtags: 5-7 core hashtags related to cleaning services
   - Location Hashtags: 3-5 hashtags for {{{emirate}}} and UAE
   - Trending Hashtags: 3-4 popular cleaning/lifestyle hashtags
   - Arabic Hashtags: 4-6 relevant Arabic hashtags

Make the content professional, trustworthy, and locally relevant to UAE.`,
});

// Define the Genkit flow for generating the marketing content
const generateMarketingContentFlow = ai.defineFlow(
  {
    name: 'generateMarketingContentFlow',
    inputSchema: GenerateMarketingContentInputSchema,
    outputSchema: GenerateMarketingContentOutputSchema,
  },
  async (input) => {
    const { output } = await generateMarketingContentPrompt(input);
    return output!;
  }
);
