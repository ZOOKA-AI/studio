/**
 * Client-side AI stub for report summary generation
 * TODO: Implement with a backend API or client-compatible AI service
 */

export type GenerateReportSummaryInput = {
  reportDetails: string;
};

export type GenerateReportSummaryOutput = {
  summary: string;
};

export async function generateReportSummary(
  input: GenerateReportSummaryInput
): Promise<GenerateReportSummaryOutput> {
  // Stub implementation - returns a default summary
  // In production, this should call a backend API
  console.warn('AI report summary generation is currently disabled in Vite build');
  return {
    summary: 'ملخص التقرير غير متاح حالياً',
  };
}
