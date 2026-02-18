# Environment Variables Setup Guide

## Required Variables

### Supabase
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### AI Services
```bash
ANTHROPIC_API_KEY=sk-ant-your-key
OPENAI_API_KEY=sk-your-openai-key
```

### Social Media Platforms

#### Meta (Facebook/Instagram)
```bash
FACEBOOK_PAGE_ID=your-page-id
FACEBOOK_ACCESS_TOKEN=your-long-lived-token
INSTAGRAM_BUSINESS_ACCOUNT_ID=your-ig-business-id
```

#### LinkedIn
```bash
LINKEDIN_ACCESS_TOKEN=your-access-token
LINKEDIN_ORGANIZATION_ID=your-org-id
```

#### Twitter/X
```bash
TWITTER_BEARER_TOKEN=your-bearer-token
TWITTER_API_KEY=your-api-key
TWITTER_API_SECRET=your-api-secret
```

#### TikTok
```bash
TIKTOK_ACCESS_TOKEN=your-access-token
TIKTOK_OPEN_ID=your-open-id
```

#### WhatsApp Business
```bash
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
WHATSAPP_ACCESS_TOKEN=your-access-token
```

### Security
```bash
AUTONOMOUS_PUBLISHER_API_KEY=generate-random-secure-key
```

## Setting up in Vercel

1. Go to your project in Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable above
4. Select environments (Production, Preview, Development)
5. Click "Save"
6. Redeploy your application

## Token Acquisition Guides

### Facebook/Instagram
1. Visit https://developers.facebook.com
2. Create/select your app
3. Go to Graph API Explorer
4. Generate User Access Token
5. Extend to long-lived token (60 days)

### LinkedIn
1. Visit https://www.linkedin.com/developers
2. Create app
3. Add "Share on LinkedIn" product
4. Generate OAuth 2.0 access token

### Twitter
1. Visit https://developer.twitter.com
2. Create project + app
3. Enable OAuth 2.0
4. Generate Bearer Token

### WhatsApp Business
1. Visit https://business.facebook.com/wa/manage
2. Set up Cloud API
3. Get Phone Number ID and Access Token

## Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your environment variables in `.env.local`

3. Run the development server:
   ```bash
   npm run dev
   ```

## Production Deployment

### Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

3. Verify deployment:
   - Visit your production URL
   - Check `/dashboard` routes
   - Test API endpoints at `/api/publish/*`

## Testing Environment Variables

Create a simple API route to test if environment variables are loaded:

```typescript
// src/app/api/test-env/route.ts
export async function GET() {
  return Response.json({
    supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    facebook: !!process.env.FACEBOOK_ACCESS_TOKEN,
    linkedin: !!process.env.LINKEDIN_ACCESS_TOKEN,
    twitter: !!process.env.TWITTER_BEARER_TOKEN,
  });
}
```

Visit `/api/test-env` to verify variables are loaded (returns true/false without exposing values).

## Security Best Practices

1. **Never commit** `.env.local` or `.env` files to version control
2. **Use different keys** for development and production
3. **Rotate tokens** regularly (every 60-90 days)
4. **Monitor API usage** for unusual activity
5. **Enable 2FA** on all social media accounts
6. **Use IP allowlisting** when available
7. **Set up webhook verification** for API callbacks

## Troubleshooting

### Environment Variables Not Loading

1. Check file name is `.env.local` (not `.env`)
2. Restart the development server after adding variables
3. Ensure no trailing spaces in variable values
4. Verify variables are added in Vercel Dashboard for production

### Authentication Errors

1. Verify Supabase URL and keys are correct
2. Check token expiration dates
3. Ensure tokens have required permissions/scopes
4. Test tokens in API explorers (Graph API, LinkedIn API)

### Publishing Failures

1. Verify platform-specific credentials are set
2. Check API rate limits
3. Ensure media URLs are publicly accessible
4. Verify content meets platform policies

## Support

For issues or questions:
- GitHub Issues: https://github.com/ZOOKA-AI/studio/issues
- Documentation: Check `docs/` directory
- Sponsors: https://github.com/sponsors/ZOOKA-AI
