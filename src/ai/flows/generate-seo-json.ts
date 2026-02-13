'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate SEO-optimized JSON-LD structured data.
 *
 * The flow generates LocalBusiness and Service schema markup for cleaning company posts
 * to improve search engine visibility and ranking in UAE search results.
 *
 * @Exported Members:
 *   - generateSeoJson: An async function that triggers the SEO JSON generation flow.
 *   - GenerateSeoJsonInput: The TypeScript type definition for the input to the flow.
 *   - GenerateSeoJsonOutput: The TypeScript type definition for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the generateSeoJson flow
const GenerateSeoJsonInputSchema = z.object({
  businessName: z.string().default('Royal Clean UAE').describe('The name of the cleaning business'),
  postContent: z.string().describe('The content/description of the post or service being offered'),
  serviceType: z.string().optional().describe('Type of cleaning service (e.g., deep cleaning, home cleaning, office cleaning)'),
  targetCities: z.array(z.string()).optional().describe('UAE cities to target (e.g., Dubai, Abu Dhabi, Al Ain, Sharjah)'),
  priceRange: z.string().optional().describe('Price range for the service (e.g., 100-500 AED)'),
});
export type GenerateSeoJsonInput = z.infer<typeof GenerateSeoJsonInputSchema>;

// Define the output schema for the generateSeoJson flow
const GenerateSeoJsonOutputSchema = z.object({
  jsonLd: z.string().describe('The complete JSON-LD structured data as a formatted string'),
  localBusinessSchema: z.record(z.any()).describe('LocalBusiness schema object'),
  serviceSchema: z.record(z.any()).optional().describe('Service schema object if applicable'),
  description: z.string().describe('Brief explanation of what the JSON-LD includes'),
});
export type GenerateSeoJsonOutput = z.infer<typeof GenerateSeoJsonOutputSchema>;

// Exported function to generate SEO JSON-LD
export async function generateSeoJson(input: GenerateSeoJsonInput): Promise<GenerateSeoJsonOutput> {
  return generateSeoJsonFlow(input);
}

// Define the prompt for generating SEO JSON-LD
const generateSeoJsonPrompt = ai.definePrompt({
  name: 'generateSeoJsonPrompt',
  input: {schema: GenerateSeoJsonInputSchema},
  output: {schema: GenerateSeoJsonOutputSchema},
  prompt: `You are an expert in SEO and structured data markup (JSON-LD) for local businesses.

Generate comprehensive JSON-LD structured data for a cleaning company in the UAE to improve search engine visibility.

Business Name: {{{businessName}}}
Post Content: {{{postContent}}}
Service Type: {{{serviceType}}}
Target Cities: {{{targetCities}}}
Price Range: {{{priceRange}}}

Create JSON-LD that includes:
1. LocalBusiness schema with:
   - Business name, description
   - Address covering UAE locations (if cities specified)
   - Contact information (@type: ContactPoint)
   - Service area (UAE cities)
   - Opening hours (typical: 24/7 for cleaning services)
   - Payment methods accepted
   - Price range if provided

2. Service schema (if applicable) with:
   - Service type and description
   - Provider (the business)
   - Area served (UAE cities)
   - Price range

3. Additional helpful schema:
   - AggregateRating (if applicable)
   - Review snippets structure

Ensure the JSON-LD:
- Follows schema.org specifications
- Is properly formatted and valid JSON
- Includes Arabic and English descriptions where appropriate
- Targets UAE search engines and potential customers
- Includes relevant keywords for cleaning services
- Uses proper UAE formatting (AED currency, UAE addresses)

Return the complete JSON-LD as a formatted string ready to be embedded in HTML <script type="application/ld+json"> tag.`,
});

// Define the Genkit flow for generating SEO JSON-LD
const generateSeoJsonFlow = ai.defineFlow(
  {
    name: 'generateSeoJsonFlow',
    inputSchema: GenerateSeoJsonInputSchema,
    outputSchema: GenerateSeoJsonOutputSchema,
  },
  async input => {
    const {output} = await generateSeoJsonPrompt(input);
    return output!;
  }
);
