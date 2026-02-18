# Maintenance Guide - ZOOKA-AI Studio

## Daily Tasks

### Monitor Deployment Health
- Check health endpoint: `https://your-domain.vercel.app/api/health`
- Review Vercel deployment logs for errors
- Monitor error rates in Vercel Analytics

### Database Monitoring
- Check Supabase dashboard for unusual activity
- Monitor database connection pool usage
- Review slow queries

### Content Generation
- Verify AI service (Anthropic) is responding
- Check campaign generation success rate
- Monitor API usage and costs

## Weekly Tasks

### Performance Review
- Review campaign performance metrics
- Analyze hashtag effectiveness
- Check engagement rates by platform
- Update hashtag performance data

### API Usage & Costs
- Review Anthropic API usage
- Monitor Vercel bandwidth usage
- Check Supabase database size
- Optimize if costs are increasing

### Security Audit
- Review access logs
- Check for unauthorized API calls
- Verify RLS policies are enforced
- Monitor failed authentication attempts

### Backup Verification
- Verify Supabase automatic backups
- Test backup restoration (monthly)
- Export critical campaign data

## Monthly Tasks

### Token & Credentials Rotation
- Rotate API keys (if security policy requires)
- Update platform access tokens (Facebook, Instagram, etc.)
- Verify all tokens have not expired

### Database Optimization
- Analyze query performance
- Optimize database indexes
- Clean up old/unused data
- Vacuum database (if self-hosted)

### Dependency Updates
- Check for security updates: `npm audit`
- Update dependencies: `npm update`
- Test after updates
- Deploy if stable

### Performance Audit
- Run Lighthouse audit
- Check Core Web Vitals
- Optimize images and assets
- Review bundle size

### Analytics Review
- Export monthly analytics report
- Analyze user behavior patterns
- Identify popular features
- Plan improvements based on data

## Common Issues & Solutions

### Issue: Campaign generation fails
**Symptoms**: Error when generating content, AI service unavailable

**Solutions**:
1. Check Anthropic API key validity
2. Verify API credits/quota available
3. Check network connectivity
4. Review API rate limits
5. Check Anthropic status page

**Quick Fix**:
```bash
# Verify API key is set
echo $ANTHROPIC_API_KEY

# Test API connectivity
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json"
```

---

### Issue: Database connection errors
**Symptoms**: Supabase queries failing, timeout errors

**Solutions**:
1. Verify Supabase credentials in Vercel
2. Check Supabase project status
3. Review database connection pool
4. Check for network issues
5. Verify RLS policies

**Quick Fix**:
```typescript
// Test Supabase connection
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
const { data, error } = await supabase.from('marketing_campaigns').select('count')
```

---

### Issue: High API costs
**Symptoms**: Unexpected billing, high usage alerts

**Solutions**:
1. Review campaign generation frequency
2. Implement caching for repeated requests
3. Optimize prompt length
4. Add rate limiting
5. Review usage patterns

**Prevention**:
- Set up billing alerts
- Implement request throttling
- Cache AI responses when possible
- Monitor usage dashboard daily

---

### Issue: Slow page load times
**Symptoms**: Dashboard takes long to load, poor performance scores

**Solutions**:
1. Optimize database queries
2. Implement pagination
3. Add loading states
4. Cache static content
5. Optimize images

**Quick Fixes**:
- Enable Vercel Edge Caching
- Use Next.js Image component
- Implement query result caching
- Add database indexes

---

### Issue: Authentication failures
**Symptoms**: Users can't log in, session errors

**Solutions**:
1. Check Supabase Auth configuration
2. Verify environment variables
3. Review RLS policies
4. Check JWT token expiration
5. Clear browser cookies

---

### Issue: Social media publishing fails
**Symptoms**: Posts not appearing on platforms, API errors

**Solutions**:
1. Verify platform access tokens
2. Check token expiration dates
3. Review platform API status
4. Verify permissions/scopes
5. Check rate limits

**Token Refresh**:
- Facebook/Instagram: Refresh every 60 days
- LinkedIn: Check token validity
- Twitter: Regenerate if needed

## Monitoring Checklist

### Daily Monitoring Dashboard
```
✅ Health endpoint status
✅ Error rate < 1%
✅ Response time < 2s
✅ Database uptime 99.9%
✅ API credits available
```

### Weekly Review Dashboard
```
✅ Campaign success rate > 95%
✅ User engagement trends
✅ Database growth rate
✅ API cost trends
✅ Security alerts = 0
```

## Backup & Recovery

### Backup Strategy
1. **Database**: Automatic daily backups via Supabase
2. **Code**: Version controlled in GitHub
3. **Environment**: Document all environment variables
4. **Media**: Store in cloud storage with backup

### Recovery Procedures

**Database Recovery**:
```sql
-- Restore from Supabase backup
-- 1. Go to Supabase Dashboard
-- 2. Navigate to Database → Backups
-- 3. Select backup point
-- 4. Click Restore
```

**Application Recovery**:
```bash
# Rollback to previous deployment
vercel rollback

# Or redeploy specific commit
git checkout <commit-hash>
vercel --prod
```

## Performance Benchmarks

### Target Metrics
- Page load time: < 2 seconds
- API response time: < 500ms
- Database query time: < 100ms
- Campaign generation: < 5 seconds
- Uptime: 99.9%

### Monitoring Tools
- Vercel Analytics (included)
- PostHog (optional)
- Supabase Dashboard
- Custom health checks

## Scaling Considerations

### When to Scale

**Database**:
- Connection pool exhaustion
- Query response time > 200ms
- Storage > 80% capacity

**API**:
- Request rate > current limits
- Response time degradation
- Increased error rates

**Compute**:
- Function timeout errors
- Memory limit reached
- Cold start issues

### Scaling Actions
1. Upgrade Supabase plan
2. Optimize database indexes
3. Implement caching layer
4. Add CDN for static assets
5. Enable Vercel Edge Functions

## Emergency Procedures

### Service Outage
1. Check status pages (Vercel, Supabase, Anthropic)
2. Review error logs
3. Switch to maintenance mode if needed
4. Communicate with users
5. Implement rollback if necessary

### Data Loss Prevention
1. Enable point-in-time recovery
2. Configure automatic backups
3. Test recovery procedures
4. Document critical data
5. Maintain offsite backups

## Maintenance Schedule

```
Daily:    09:00 UTC - Health check review
Weekly:   Monday 10:00 UTC - Performance review
Monthly:  1st of month - Security audit
Quarterly: Dependency updates & major reviews
```

## Contact Information

### Support Resources
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)
- **Anthropic Support**: [anthropic.com/support](https://anthropic.com/support)

### Internal Team
- Technical Lead: [Contact Info]
- DevOps: [Contact Info]
- Security: [Contact Info]

## Change Log

Keep track of all maintenance activities:

```
YYYY-MM-DD: [Description of change/maintenance]
```

---

**Last Updated**: 2026-02-18
**Maintained By**: ZOOKA-AI Team
**Version**: 1.0
