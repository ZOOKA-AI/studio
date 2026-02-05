import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { app_id } = await req.json()
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )
  
  // Auto-approve if meets criteria
  const { data: app } = await supabase
    .from('apps')
    .select('*')
    .eq('id', app_id)
    .single()
  
  if (app) {
    const autoApprove = app.repo_url && app.description?.length > 50
    
    await supabase
      .from('apps')
      .update({ 
        status: autoApprove ? 'approved' : 'pending',
        published_at: autoApprove ? new Date().toISOString() : null
      })
      .eq('id', app_id)
    
    await supabase.from('notifications').insert({
      user_id: app.owner,
      type: 'app_status_changed',
      title: autoApprove ? 'App Approved!' : 'App Pending Review',
      message: autoApprove 
        ? 'Your app has been approved and is now live!'
        : 'Your app is under review.',
      link: `/apps/${app_id}`
    })
  }
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
