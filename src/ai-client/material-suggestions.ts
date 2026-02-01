/**
 * Client-side AI stub for material suggestions
 * TODO: Implement with a backend API or client-compatible AI service
 */

export type MaterialSuggestionsInput = {
  task: string;
};

export type MaterialSuggestion = {
  materialName: string;
  reason: string;
};

export type MaterialSuggestionsOutput = MaterialSuggestion[];

export async function getMaterialSuggestions(
  input: MaterialSuggestionsInput
): Promise<MaterialSuggestionsOutput> {
  // Stub implementation - returns empty array
  // In production, this should call a backend API
  console.warn('AI material suggestions are currently disabled in Vite build');
  return [];
}
