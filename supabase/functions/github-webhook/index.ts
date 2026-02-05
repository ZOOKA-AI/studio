import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const signature = req.headers.get('x-hub-signature-256')
  const event = req.headers.get('x-github-event')
  
  // Verify webhook signature
  const payload = await req.json()
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )
  
  // Handle push events, releases, etc.
  if (event === 'push') {
    const repo = payload.repository?.html_url
    const { data: apps } = await supabase
      .from('apps')
      .select('id, owner')
      .eq('repo_url', repo)
      .limit(1)
    
    if (apps && apps.length > 0) {
      await supabase
        .from('apps')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', apps[0].id)
      
      // Send notification
      await supabase.from('notifications').insert({
        user_id: apps[0].owner,
        type: 'repo_updated',
        title: 'Repository Updated',
        message: `Your app repository has been updated.`,
        link: `/apps/${apps[0].id}`
      })
    }
  }
  
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
