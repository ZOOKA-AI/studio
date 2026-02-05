import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-hub-signature-256')
    const event = request.headers.get('x-github-event')
    
    const payload = await request.json()

    // Verify webhook signature (implement proper verification in production)
    // const verified = verifyGitHubSignature(payload, signature, process.env.GITHUB_WEBHOOK_SECRET!)
    
    const supabase = await createClient()

    // Handle push events
    if (event === 'push') {
      const repo = payload.repository?.html_url

      const { data: apps } = await supabase
        .from('apps')
        .select('id, owner')
        .eq('repo_url', repo)
        .limit(1)

      if (apps && apps.length > 0) {
        // Update app's updated_at timestamp
        await supabase
          .from('apps')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', apps[0].id)

        // Send notification to owner
        await supabase.from('notifications').insert({
          user_id: apps[0].owner,
          type: 'repo_updated',
          title: 'Repository Updated',
          message: `Your app repository has been updated with new commits.`,
          link: `/dashboard/apps`,
        })
      }
    }

    // Handle release events
    if (event === 'release') {
      const repo = payload.repository?.html_url
      const releaseTag = payload.release?.tag_name

      const { data: apps } = await supabase
        .from('apps')
        .select('id, owner')
        .eq('repo_url', repo)
        .limit(1)

      if (apps && apps.length > 0) {
        await supabase.from('notifications').insert({
          user_id: apps[0].owner,
          type: 'new_release',
          title: 'New Release Published',
          message: `Version ${releaseTag} has been released.`,
          link: `/dashboard/apps`,
        })
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('GitHub webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
