import { google } from 'googleapis'

export interface YouTubeOAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
}

export class YouTubeIntegration {
  private oauth2Client: any

  constructor(config: YouTubeOAuthConfig) {
    this.oauth2Client = new google.auth.OAuth2(
      config.clientId,
      config.clientSecret,
      config.redirectUri
    )
  }

  getAuthorizationUrl(state: string): string {
    const scopes = [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/userinfo.profile',
    ]

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      state,
    })
  }

  async exchangeCodeForToken(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code)
    this.oauth2Client.setCredentials(tokens)
    return tokens
  }

  async getChannelInfo(accessToken: string) {
    this.oauth2Client.setCredentials({ access_token: accessToken })
    const youtube = google.youtube({ version: 'v3', auth: this.oauth2Client })
    
    const response = await youtube.channels.list({
      part: ['snippet', 'statistics'],
      mine: true,
    })

    return response.data.items?.[0]
  }

  async getPlaylistVideos(accessToken: string, playlistId: string) {
    this.oauth2Client.setCredentials({ access_token: accessToken })
    const youtube = google.youtube({ version: 'v3', auth: this.oauth2Client })
    
    const response = await youtube.playlistItems.list({
      part: ['snippet'],
      playlistId,
      maxResults: 50,
    })

    return response.data.items
  }
}
