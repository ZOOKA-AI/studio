# Deployment Checklist for ZOOKA-AI Studio

## Pre-Deployment

- [ ] All TypeScript errors resolved
- [ ] Build completes successfully locally (`npm run build`)
- [ ] All tests pass (if applicable)
- [ ] Environment variables documented in `.env.example`
- [ ] Database migrations prepared (`docs/supabase-migration.sql`)

## Supabase Setup

- [ ] Project created at [supabase.com](https://supabase.com)
- [ ] SQL migrations executed from `docs/supabase-migration.sql`
- [ ] RLS policies configured and tested
- [ ] API keys copied to Vercel environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

## Vercel Setup

- [ ] Project connected to GitHub repository
- [ ] Environment variables added from `.env.example`:
  - Core Services (Supabase)
  - AI Services (Anthropic, OpenAI)
  - Security (API keys)
  - Optional: Social Media Platform tokens
  - Optional: Analytics (PostHog)
- [ ] Build settings configured:
  - Framework: Next.js
  - Node version: 24.0.0
  - Build command: `next build`
  - Install command: `npm install`
- [ ] Custom domain configured (optional)
- [ ] Environment set to `production`
- [ ] Timezone set to `Asia/Dubai`

## Post-Deployment Verification

- [ ] All routes accessible (no 404 errors):
  - `/` - Home page
  - `/dashboard/marketing` - Marketing dashboard
  - `/api/health` - Health check endpoint
- [ ] Health check endpoint returns healthy status:
  - Visit: `https://your-domain.vercel.app/api/health`
  - Verify all services show "configured"
- [ ] Marketing dashboard loads correctly
- [ ] Can generate campaign content (test with dummy data)
- [ ] Database writes successful (check Supabase dashboard)
- [ ] Analytics tracking works (if PostHog configured)

## Security Verification

- [ ] Environment variables secured in Vercel
- [ ] RLS policies tested with authenticated users
- [ ] API endpoints require proper authentication
- [ ] CORS settings verified
- [ ] No sensitive data exposed in client-side code

## Monitoring Setup

- [ ] Vercel Analytics enabled
- [ ] Error tracking configured
- [ ] Health checks scheduled (use external monitoring service)
- [ ] Database backups enabled in Supabase
- [ ] Log retention configured

## Performance Optimization

- [ ] Static pages optimized
- [ ] Images optimized (use Next.js Image component)
- [ ] API routes cached where appropriate
- [ ] Database indexes created (via migration script)

## Documentation

- [ ] README.md updated with deployment instructions
- [ ] API documentation created
- [ ] Environment variables documented
- [ ] Troubleshooting guide available

## Final Checks

- [ ] Test campaign generation end-to-end
- [ ] Verify bilingual content (English/Arabic) displays correctly
- [ ] Test responsive design on mobile/tablet/desktop
- [ ] Check loading states and error handling
- [ ] Verify all external integrations work

## Rollback Plan

- [ ] Previous deployment version noted
- [ ] Rollback procedure documented
- [ ] Database migration rollback script prepared (if schema changed)
- [ ] Team notified of deployment window

## Success Criteria

✅ Build succeeds without errors
✅ All routes return 200 status
✅ Health endpoint shows all services healthy
✅ Marketing dashboard fully functional
✅ Database operations working
✅ No console errors in production

---

## Quick Deploy Command

```bash
# Local verification
npm install
npm run build
npm run typecheck
npm run lint

# Deploy via Vercel CLI (optional)
vercel --prod
```

## Emergency Contacts

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)
- **Anthropic Support**: [anthropic.com/support](https://anthropic.com/support)
