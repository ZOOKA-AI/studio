import { Octokit } from 'octokit'

export interface GitHubOAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
}

export class GitHubIntegration {
  private config: GitHubOAuthConfig

  constructor(config: GitHubOAuthConfig) {
    this.config = config
  }

  getAuthorizationUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: 'read:user repo',
      state,
    })
    return `https://github.com/login/oauth/authorize?${params.toString()}`
  }

  async exchangeCodeForToken(code: string): Promise<string> {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        redirect_uri: this.config.redirectUri,
      }),
    })

    const data = await response.json()
    return data.access_token
  }

  async getUserInfo(accessToken: string) {
    const octokit = new Octokit({ auth: accessToken })
    const { data } = await octokit.rest.users.getAuthenticated()
    return data
  }

  async getRepoInfo(accessToken: string, owner: string, repo: string) {
    const octokit = new Octokit({ auth: accessToken })
    const { data } = await octokit.rest.repos.get({ owner, repo })
    return data
  }

  async listUserRepos(accessToken: string) {
    const octokit = new Octokit({ auth: accessToken })
    const { data } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
    })
    return data
  }
}
