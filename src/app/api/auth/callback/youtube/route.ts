import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { YouTubeIntegration } from '@/lib/integrations/youtube'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) {
    return NextResponse.redirect(new URL('/dashboard/integrations?error=no_code', request.url))
  }

  try {
    const youtube = new YouTubeIntegration({
      clientId: process.env.YOUTUBE_CLIENT_ID!,
      clientSecret: process.env.YOUTUBE_CLIENT_SECRET!,
      redirectUri: process.env.YOUTUBE_REDIRECT_URI!,
    })

    // Exchange code for tokens
    const tokens = await youtube.exchangeCodeForToken(code)

    // Get channel info
    const channelInfo = await youtube.getChannelInfo(tokens.access_token!)

    // Store integration in Supabase
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    await supabase.from('integrations').upsert({
      user_id: user.id,
      provider: 'youtube',
      provider_user_id: channelInfo?.id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      token_expires_at: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
      is_active: true,
      metadata: {
        channel_title: channelInfo?.snippet?.title,
        channel_description: channelInfo?.snippet?.description,
        subscriber_count: channelInfo?.statistics?.subscriberCount,
      },
    })

    return NextResponse.redirect(new URL('/dashboard/integrations?success=youtube', request.url))
  } catch (error) {
    console.error('YouTube OAuth error:', error)
    return NextResponse.redirect(new URL('/dashboard/integrations?error=oauth_failed', request.url))
  }
}
