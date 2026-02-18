# Deployment Guide - ZOOKA-AI Studio

## Overview

This deployment implements a complete fix for Vercel routing issues and adds an autonomous marketing system for multi-platform publishing.

## Changes Summary

### Files Created
1. **vercel.json** - Vercel configuration with routing rules
2. **src/middleware.ts** - Authentication middleware
3. **src/lib/ai/omni-publisher.ts** - Multi-platform publisher
4. **src/lib/ai/master-execution.ts** - Campaign orchestration
5. **src/lib/ai/campaign-config.ts** - Campaign content configuration
6. **.env.example** - Environment variable template
7. **docs/ENVIRONMENT_SETUP.md** - Comprehensive setup guide

### Files Modified
1. **next.config.ts** - Added reactStrictMode, timezone, and image domains
2. **.gitignore** - Fixed to allow .env.example
3. **package.json** - Added @supabase/ssr dependency

## Pre-Deployment Checklist

### 1. Environment Variables
Ensure all required environment variables are set in Vercel Dashboard:

**Required for Authentication:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Required for Marketing System:**
- `FACEBOOK_PAGE_ID` & `FACEBOOK_ACCESS_TOKEN`
- `INSTAGRAM_BUSINESS_ACCOUNT_ID`
- `LINKEDIN_ACCESS_TOKEN` & `LINKEDIN_ORGANIZATION_ID`
- `TWITTER_BEARER_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID` & `WHATSAPP_ACCESS_TOKEN`
- `AUTONOMOUS_PUBLISHER_API_KEY`

See `docs/ENVIRONMENT_SETUP.md` for detailed instructions.

### 2. Vercel Configuration
The `vercel.json` file configures:
- Node.js version: 24.0.0
- Timezone: Asia/Dubai (GST)
- Routing: Dashboard and API routes
- Build command: `next build`
- Install command: `npm install`

### 3. Middleware Configuration
The middleware (`src/middleware.ts`) protects:
- All `/dashboard/*` routes (requires authentication)
- All `/api/*` routes (for future API protection)

Unauthenticated users are redirected to `/login`.

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)
1. Merge this PR to your main branch
2. Vercel will automatically deploy
3. Verify deployment at your Vercel URL

### Option 2: Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Follow prompts to configure
```

## Post-Deployment Verification

### 1. Check Routes
Visit these URLs and verify they work (no 404 errors):
- `https://your-domain.vercel.app/` - Main page
- `https://your-domain.vercel.app/dashboard` - Should redirect to /login if not authenticated
- `https://your-domain.vercel.app/api/health` - Should return 404 (route not implemented yet)

### 2. Verify Environment Variables
Create a test API route to verify environment variables are loaded:

```typescript
// src/app/api/test-env/route.ts
export async function GET() {
  return Response.json({
    supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    facebook: !!process.env.FACEBOOK_ACCESS_TOKEN,
    linkedin: !!process.env.LINKEDIN_ACCESS_TOKEN,
  });
}
```

Visit `/api/test-env` - should return true for configured variables.

### 3. Test Build Logs
Check Vercel build logs for:
- ✅ Build successful
- ✅ Middleware compiled (should show "ƒ Middleware 80 kB")
- ✅ All routes generated
- ⚠️ Firebase warning is expected and safe to ignore

## Marketing System Usage

### Execute Global Launch
```typescript
import { executeGlobalLaunch } from '@/lib/ai/master-execution';

// Royal Clean campaign (UAE local)
const result = await executeGlobalLaunch('royal_clean');

// Zooka-AI campaign (global)
const result = await executeGlobalLaunch('zooka_ai');
```

### Execute Scheduled Campaign
```typescript
import { executeScheduledCampaign } from '@/lib/ai/master-execution';

// Morning campaign (09:00 GST)
await executeScheduledCampaign('09:00_GST');

// Afternoon campaign (14:00 GST)
await executeScheduledCampaign('14:00_GST');

// Evening campaign (20:00 GST)
await executeScheduledCampaign('20:00_GST');
```

### Update Campaign Content
Edit `src/lib/ai/campaign-config.ts` to update:
- Captions (English & Arabic)
- Hashtags (local, global, platform-specific)
- Media URLs
- CTA text and URLs
- Target platforms

## Troubleshooting

### Issue: 404 on Dashboard Routes
**Solution**: Ensure `vercel.json` is in the root directory and properly configured.

### Issue: Authentication Not Working
**Solution**: 
1. Verify Supabase environment variables are set
2. Check middleware is being executed (look for 80 kB middleware in build logs)
3. Ensure `src/middleware.ts` is in the correct location

### Issue: Build Fails
**Solution**:
1. Check build logs in Vercel dashboard
2. Verify all dependencies are installed (`@supabase/ssr`)
3. Ensure Node.js version is 24.0.0

### Issue: Marketing System Fails
**Solution**:
1. Verify all platform API credentials are set
2. Check token expiration dates
3. Ensure media URLs are publicly accessible
4. Review API rate limits

## Support

- **GitHub Issues**: https://github.com/ZOOKA-AI/studio/issues
- **Documentation**: Check `docs/ENVIRONMENT_SETUP.md`
- **Sponsors**: https://github.com/sponsors/ZOOKA-AI

## Next Steps

After deployment:
1. Set up all environment variables in Vercel Dashboard
2. Test authentication flow
3. Create API routes for marketing system triggers
4. Set up scheduled jobs (e.g., Vercel Cron Jobs)
5. Configure monitoring and analytics
6. Test multi-platform publishing with test accounts

## Security Notes

✅ **CodeQL Scan**: Passed with 0 alerts
✅ **Best Practices**: All credentials via environment variables
✅ **Authentication**: Supabase SSR properly implemented
✅ **HTTPS**: All API calls use HTTPS
✅ **No Secrets**: No hardcoded credentials in code

## Rollback Plan

If deployment fails:
1. Revert to previous commit
2. Redeploy via Vercel dashboard
3. Check error logs for specific issues
4. Fix issues and redeploy

---

**Last Updated**: 2026-02-18
**Build Status**: ✅ Passing
**Security Status**: ✅ 0 Vulnerabilities
