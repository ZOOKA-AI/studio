/**
 * @fileOverview Provides material suggestions for tasks in the daily report.
 *
 * - getMaterialSuggestions - A function that suggests frequently used materials for specific tasks.
 * - MaterialSuggestionsInput - The input type for the getMaterialSuggestions function.
 * - MaterialSuggestionsOutput - The return type for the getMaterialSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MaterialSuggestionsInputSchema = z.object({
  task: z
    .string()
    .describe('The task for which material suggestions are requested.'),
});
export type MaterialSuggestionsInput = z.infer<typeof MaterialSuggestionsInputSchema>;

const MaterialSuggestionSchema = z.object({
  materialName: z.string().describe('The name of the suggested material.'),
  reason: z.string().describe('Why this material is suggested for this task.'),
});

const MaterialSuggestionsOutputSchema = z.array(MaterialSuggestionSchema).describe('An array of material suggestions for the task.');
export type MaterialSuggestionsOutput = z.infer<typeof MaterialSuggestionsOutputSchema>;

export async function getMaterialSuggestions(input: MaterialSuggestionsInput): Promise<MaterialSuggestionsOutput> {
  return materialSuggestionsFlow(input);
}

const materialSuggestionsPrompt = ai.definePrompt({
  name: 'materialSuggestionsPrompt',
  input: {schema: MaterialSuggestionsInputSchema},
  output: {schema: MaterialSuggestionsOutputSchema},
  prompt: `You are an expert in cleaning supplies and materials.

  Given a task, suggest the most appropriate materials to use.

  Task: {{{task}}}

  Respond with a list of materials, and a short description of why each material is suggested for the provided task.
  Output in JSON format.
  `,
});

const materialSuggestionsFlow = ai.defineFlow(
  {
    name: 'materialSuggestionsFlow',
    inputSchema: MaterialSuggestionsInputSchema,
    outputSchema: MaterialSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await materialSuggestionsPrompt(input);
    return output!;
  }
);
