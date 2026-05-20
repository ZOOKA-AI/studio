# API Documentation - ZOOKA-AI Studio

## Table of Contents
- [Health Check](#health-check)
- [Marketing Actions](#marketing-actions)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Rate Limits](#rate-limits)

---

## Health Check

### GET `/api/health`

Check the health status of the application and its dependencies.

**Authentication**: None required

**Response**: `200 OK` (healthy) or `503 Service Unavailable` (degraded)

```json
{
  "timestamp": "2026-02-18T09:57:54.463Z",
  "status": "healthy",
  "services": {
    "supabase": "configured",
    "anthropic": "configured",
    "openai": "configured"
  }
}
```

**Service Status Values**:
- `configured` - Service is properly configured
- `missing` - Required environment variables are missing
- `unhealthy` - Service check failed

**Example Usage**:
```bash
curl https://your-domain.vercel.app/api/health
```

---

## Marketing Actions

Server actions for creating and managing marketing campaigns.

### `createCampaignAction(formData)`

Generate AI-powered marketing content and save it to the database.

**Type**: Server Action

**Authentication**: Required (Supabase Auth)

**Parameters** (FormData):
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `serviceType` | string | Yes | Type of cleaning service (e.g., 'apartment_cleaning') |
| `emirate` | string | Yes | UAE emirate (e.g., 'dubai') |
| `tone` | string | Yes | Campaign tone (e.g., 'professional') |
| `discountPercent` | number | No | Discount percentage (0-100) |

**Service Types**:
- `studio_cleaning`
- `apartment_cleaning`
- `villa_cleaning`
- `office_cleaning`
- `deep_cleaning`
- `move_in_out`
- `sofa_cleaning`

**Emirates**:
- `dubai`
- `abu_dhabi`
- `sharjah`
- `ajman`
- `ras_al_khaimah`
- `fujairah`
- `umm_al_quwain`

**Tones**:
- `professional`
- `friendly`
- `luxury`
- `promotional`

**Success Response**:
```typescript
{
  success: true,
  data: {
    campaignId: "uuid-string",
    content: {
      en: "English caption text...",
      ar: "Arabic caption text..."
    },
    hashtags: {
      primary: ["#CleaningDubai", "#RoyalClean"],
      location: ["#Dubai", "#UAE"],
      trending: ["#CleanHome", "#HomeCare"],
      arabic: ["#تنظيف_دبي", "#رويال_كلين"]
    },
    callToAction: {
      en: "Book now for a sparkling clean home!",
      ar: "احجز الآن للحصول على منزل نظيف ومتألق!"
    },
    estimatedReach: 5000
  }
}
```

**Error Response**:
```typescript
{
  success: false,
  error: "Error message here"
}
```

**Example Usage (Client Component)**:
```typescript
import { createCampaignAction } from '@/app/actions/marketing'

const formData = new FormData()
formData.append('serviceType', 'apartment_cleaning')
formData.append('emirate', 'dubai')
formData.append('tone', 'professional')
formData.append('discountPercent', '10')

const result = await createCampaignAction(formData)

if (result.success) {
  console.log('Campaign created:', result.data.campaignId)
  console.log('English caption:', result.data.content.en)
  console.log('Arabic caption:', result.data.content.ar)
} else {
  console.error('Error:', result.error)
}
```

---

## Authentication

All dashboard routes and API endpoints (except `/api/health`) require authentication via Supabase Auth.

### Middleware Protection

The application uses middleware to protect routes:

**Protected Routes**:
- `/dashboard/*` - All dashboard pages
- `/api/*` - All API endpoints (except health check)

**Behavior**:
- Unauthenticated users are redirected to `/login`
- Session is automatically refreshed via cookies
- JWT tokens are managed by Supabase

### Authentication Flow

1. User signs in via Supabase Auth
2. Session cookie is set
3. Middleware validates session on each request
4. Server actions have access to authenticated user context

---

## Error Handling

### Client-Side Errors

All server actions return a consistent error format:

```typescript
{
  success: false,
  error: string // Human-readable error message
}
```

### Server-Side Errors

Server components may throw errors that are caught by error boundaries.

**Common Error Codes**:

| Code | Description | Resolution |
|------|-------------|------------|
| `VALIDATION_ERROR` | Invalid input parameters | Check input format and values |
| `AUTH_ERROR` | Authentication failed | Sign in again |
| `DATABASE_ERROR` | Database operation failed | Check Supabase connection |
| `AI_ERROR` | AI service unavailable | Check Anthropic API key and credits |
| `RATE_LIMIT` | Too many requests | Wait before retrying |

### Error Example

```typescript
try {
  const result = await createCampaignAction(formData)
  if (!result.success) {
    // Handle error
    alert(result.error)
  }
} catch (error) {
  // Handle unexpected errors
  console.error('Unexpected error:', error)
}
```

---

## Rate Limits

### Anthropic API

Rate limits are determined by your Anthropic API tier:

- **Free Tier**: Limited requests per day
- **Pro Tier**: Higher rate limits
- **Enterprise**: Custom limits

**Best Practices**:
- Implement request throttling on client-side
- Cache generated content when possible
- Monitor usage via Anthropic dashboard

### Supabase

Database operations are subject to Supabase plan limits:

- **Free Tier**: 500 MB database, 2 GB bandwidth
- **Pro Tier**: 8 GB database, 50 GB bandwidth
- **Enterprise**: Custom limits

**Optimization Tips**:
- Use database indexes (already created via migration)
- Implement pagination for large queries
- Use connection pooling

### Vercel

Function execution limits vary by plan:

- **Hobby**: 10 second timeout
- **Pro**: 60 second timeout
- **Enterprise**: 900 second timeout

---

## Database Schema

### Marketing Campaigns Table

```sql
CREATE TABLE marketing_campaigns (
  id UUID PRIMARY KEY,
  service_type TEXT NOT NULL,
  emirate TEXT NOT NULL,
  tone TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  hashtags TEXT[] NOT NULL,
  status TEXT DEFAULT 'draft',
  estimated_reach INTEGER DEFAULT 5000,
  actual_reach INTEGER,
  engagement_rate DECIMAL(5,2),
  scheduled_for TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Campaign Status Values

- `draft` - Campaign created but not published
- `scheduled` - Campaign scheduled for future publication
- `published` - Campaign has been published
- `failed` - Publication attempt failed

---

## Analytics Events

PostHog events tracked by the marketing dashboard:

### Campaign Events

| Event Name | Properties | Description |
|------------|-----------|-------------|
| `campaign_generation_started` | `serviceType`, `emirate`, `tone` | User initiated campaign generation |
| `campaign_generated_success` | `serviceType`, `estimatedReach` | Campaign successfully generated |
| `campaign_generation_failed` | `error` | Campaign generation failed |
| `content_copied` | `type` (english/arabic) | User copied content to clipboard |

### Example Analytics Query

```typescript
// Get all successful campaigns this month
posthog.getEvents({
  event: 'campaign_generated_success',
  date_from: '2026-02-01',
  date_to: '2026-02-28'
})
```

---

## Security

### Environment Variables

Sensitive keys should never be exposed to the client:

**Server-Side Only** (never prefix with `NEXT_PUBLIC_`):
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY`
- Platform access tokens (Facebook, Instagram, etc.)

**Client-Side Safe** (can be prefixed with `NEXT_PUBLIC_`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_APP_URL`

### Row Level Security (RLS)

All database tables have RLS enabled. Policies allow authenticated users full access to their data.

**Example Policy**:
```sql
CREATE POLICY "Allow all for authenticated users - campaigns"
  ON marketing_campaigns 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);
```

### API Key Security

- Never commit API keys to version control
- Rotate keys regularly (monthly recommended)
- Use environment-specific keys (dev/staging/prod)
- Monitor API key usage for anomalies

---

## Support & Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [PostHog Documentation](https://posthog.com/docs)

### Support Channels
- **GitHub Issues**: [github.com/ZOOKA-AI/studio/issues](https://github.com/ZOOKA-AI/studio/issues)
- **Email**: helmyharoon8@gmail.com
- **Website**: [zooka-ai.com](https://www.zooka-ai.com/)

### Useful Links
- [Deployment Guide](../DEPLOYMENT.md)
- [Maintenance Guide](../MAINTENANCE.md)
- [Database Migration Script](supabase-migration.sql)

---

**Last Updated**: 2026-02-18  
**API Version**: 1.0  
**Maintained By**: ZOOKA-AI Team
