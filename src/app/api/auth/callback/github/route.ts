import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GitHubIntegration } from '@/lib/integrations/github'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) {
    return NextResponse.redirect(new URL('/dashboard/integrations?error=no_code', request.url))
  }

  try {
    const github = new GitHubIntegration({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      redirectUri: process.env.GITHUB_REDIRECT_URI!,
    })

    // Exchange code for access token
    const accessToken = await github.exchangeCodeForToken(code)

    // Get user info
    const userInfo = await github.getUserInfo(accessToken)

    // Store integration in Supabase
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    await supabase.from('integrations').upsert({
      user_id: user.id,
      provider: 'github',
      provider_user_id: userInfo.id.toString(),
      access_token: accessToken,
      is_active: true,
      metadata: {
        username: userInfo.login,
        name: userInfo.name,
        avatar_url: userInfo.avatar_url,
      },
    })

    return NextResponse.redirect(new URL('/dashboard/integrations?success=github', request.url))
  } catch (error) {
    console.error('GitHub OAuth error:', error)
    return NextResponse.redirect(new URL('/dashboard/integrations?error=oauth_failed', request.url))
  }
}
