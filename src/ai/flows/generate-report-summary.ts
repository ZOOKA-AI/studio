'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a summary of a daily report.
 *
 * The flow takes in a daily report as input and returns a summary of the key tasks completed and any issues encountered.
 *
 * @Exported Members:
 *   - generateReportSummary: An async function that triggers the report summary generation flow.
 *   - GenerateReportSummaryInput: The TypeScript type definition for the input to the flow.
 *   - GenerateReportSummaryOutput: The TypeScript type definition for the output of the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema for the generateReportSummary flow
const GenerateReportSummaryInputSchema = z.object({
  reportDetails: z
    .string()
    .describe('Details of the daily report including tasks, materials, and any issues.'),
});
export type GenerateReportSummaryInput = z.infer<typeof GenerateReportSummaryInputSchema>;

// Define the output schema for the generateReportSummary flow
const GenerateReportSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the daily report.'),
});
export type GenerateReportSummaryOutput = z.infer<typeof GenerateReportSummaryOutputSchema>;

// Exported function to generate the report summary
export async function generateReportSummary(
  input: GenerateReportSummaryInput
): Promise<GenerateReportSummaryOutput> {
  return generateReportSummaryFlow(input);
}

// Define the prompt for summarizing the daily report
const generateReportSummaryPrompt = ai.definePrompt({
  name: 'generateReportSummaryPrompt',
  input: { schema: GenerateReportSummaryInputSchema },
  output: { schema: GenerateReportSummaryOutputSchema },
  prompt: `You are an AI assistant tasked with summarizing daily reports for a cleaning company.
  Given the details of the report, create a concise summary highlighting the key tasks completed, any issues encountered, and the overall status of the cleaning job.
  Report Details: {{{reportDetails}}}`,
});

// Define the Genkit flow for generating the report summary
const generateReportSummaryFlow = ai.defineFlow(
  {
    name: 'generateReportSummaryFlow',
    inputSchema: GenerateReportSummaryInputSchema,
    outputSchema: GenerateReportSummaryOutputSchema,
  },
  async input => {
    const { output } = await generateReportSummaryPrompt(input);
    return output!;
  }
);
