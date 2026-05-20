import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    services: {} as Record<string, string>
  };

  // Check Supabase environment variables
  checks.services.supabase = 
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? 'configured'
      : 'missing';

  // Check Anthropic
  checks.services.anthropic = process.env.ANTHROPIC_API_KEY ? 'configured' : 'missing';

  // Check OpenAI
  checks.services.openai = process.env.OPENAI_API_KEY ? 'configured' : 'missing';

  // Overall status
  const unhealthy = Object.values(checks.services).some(v => v === 'unhealthy' || v === 'missing');
  checks.status = unhealthy ? 'degraded' : 'healthy';

  return NextResponse.json(checks, {
    status: unhealthy ? 503 : 200
  });
}
