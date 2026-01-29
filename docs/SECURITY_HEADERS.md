# Security Headers Reference

## Overview
This document provides a quick reference for all security headers implemented in the ZOOKA-AI/studio application.

## Headers Implementation

All headers are configured in `/next.config.ts` and `/src/middleware.ts`.

### 1. Content-Security-Policy (CSP)

**Purpose**: Prevents XSS attacks, clickjacking, and other code injection attacks.

**Configuration**:
```
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: https: blob:;
font-src 'self' data:;
connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.google.com wss://*.firebaseio.com;
frame-src 'self' https://*.firebaseapp.com;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'self';
upgrade-insecure-requests;
```

**Explanation**:
- `default-src 'self'`: Only allow resources from same origin by default
- `script-src`: Allow scripts from self and necessary third parties (Google Analytics)
- `style-src 'unsafe-inline'`: Required for CSS-in-JS libraries
- `img-src`: Allow images from self, data URIs, and HTTPS sources
- `connect-src`: Allow API connections to Firebase and Google services
- `object-src 'none'`: Block plugins like Flash
- `upgrade-insecure-requests`: Automatically upgrade HTTP to HTTPS

**How to modify**:
1. Edit the CSP value array in `next.config.ts`
2. Add new domains to appropriate directives
3. Test thoroughly to ensure functionality isn't broken

### 2. X-Frame-Options

**Purpose**: Prevents clickjacking attacks by controlling if the site can be embedded in iframes.

**Value**: `SAMEORIGIN`

**Explanation**: Allows the page to be framed only by pages on the same origin.

**Alternatives**:
- `DENY`: Completely prevent framing
- `ALLOW-FROM uri`: Allow specific origins (deprecated in favor of CSP frame-ancestors)

### 3. X-Content-Type-Options

**Purpose**: Prevents MIME type sniffing attacks.

**Value**: `nosniff`

**Explanation**: Browsers must respect the declared Content-Type and not try to "guess" the type.

### 4. Strict-Transport-Security (HSTS)

**Purpose**: Forces browsers to use HTTPS connections only.

**Value**: `max-age=31536000; includeSubDomains; preload`

**Explanation**:
- `max-age=31536000`: Remember this setting for 1 year (in seconds)
- `includeSubDomains`: Apply to all subdomains
- `preload`: Eligible for browser HSTS preload list

**Important Notes**:
- Only sent over HTTPS connections
- Once set, cannot easily be undone (browser caches the setting)
- Requires valid HTTPS certificate

**Implementation**: Configured in `src/middleware.ts`, only applied when request is HTTPS.

### 5. Referrer-Policy

**Purpose**: Controls how much referrer information is sent with requests.

**Value**: `strict-origin-when-cross-origin`

**Explanation**:
- Same-origin requests: Send full URL
- Cross-origin HTTPS→HTTPS: Send origin only
- HTTPS→HTTP: Send nothing (downgrade)

**Alternatives**:
- `no-referrer`: Never send referrer
- `same-origin`: Only send for same-origin requests
- `strict-origin`: Only send origin, not full URL

### 6. Permissions-Policy

**Purpose**: Controls which browser features and APIs can be used.

**Value**: `camera=(), microphone=(), geolocation=()`

**Explanation**: Disables access to:
- Camera
- Microphone
- Geolocation

Empty parentheses `()` means "allow none".

**How to allow features**:
```
camera=(self)           // Allow same origin
camera=(self "https://trusted.com")  // Allow specific origins
camera=(*)              // Allow all origins (not recommended)
```

### 7. X-XSS-Protection

**Purpose**: Enables XSS filtering in older browsers.

**Value**: `1; mode=block`

**Explanation**:
- `1`: Enable XSS filter
- `mode=block`: Block page if attack detected

**Note**: Modern browsers rely on CSP instead, but this provides defense-in-depth for older browsers.

## Cache-Control Headers

**Purpose**: Optimize performance through aggressive caching of static assets.

**Configuration** (in `src/middleware.ts`):
```javascript
// For static assets (JS, CSS, images, fonts)
Cache-Control: public, max-age=31536000, immutable
```

**Explanation**:
- `public`: Can be cached by any cache (CDN, browser)
- `max-age=31536000`: Cache for 1 year
- `immutable`: Content will never change (safe for fingerprinted assets)

**Applies to**:
- `/_next/static/*` (Next.js static assets)
- `.jpg`, `.jpeg`, `.png`, `.gif`, `.ico`, `.svg`, `.webp`, `.avif` (images)
- `.woff`, `.woff2` (fonts)

## Testing Headers

### Using curl
```bash
# Check all headers
curl -I https://your-domain.com

# Check specific header
curl -I https://your-domain.com | grep -i "content-security-policy"
```

### Using browser DevTools
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Click on main document
5. Check "Response Headers" section

### Online Tools
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)

## Common Issues and Solutions

### Issue: CSP blocking legitimate resources

**Solution**:
1. Check browser console for CSP violations
2. Identify the blocked resource domain
3. Add domain to appropriate CSP directive
4. Test thoroughly

**Example**:
```
Blocked by CSP: https://cdn.example.com/script.js
```
Add to script-src: `script-src 'self' https://cdn.example.com`

### Issue: Styles not working (CSS-in-JS)

**Solution**: Ensure `'unsafe-inline'` is in `style-src` directive.

**Better Solution**: Use nonces or hashes for inline styles (requires Next.js configuration).

### Issue: HSTS errors after switching back to HTTP

**Solution**: 
1. HSTS is designed to prevent this - don't switch back to HTTP
2. If testing locally, clear browser HSTS cache or use Incognito mode
3. For Chrome: chrome://net-internals/#hsts (can delete domain entry)

### Issue: Images from external CDN not loading

**Solution**: Add CDN domain to CSP `img-src` directive.

## Security Header Checklist

Before deploying:
- [ ] CSP is configured for all required resources
- [ ] HSTS is only enabled on HTTPS
- [ ] All external resources are whitelisted in CSP
- [ ] Headers tested with security scanning tools
- [ ] No console errors related to CSP violations
- [ ] Application functionality verified with headers enabled

## Maintenance

### Regular Reviews
- **Monthly**: Check for CSP violations in logs
- **Quarterly**: Review and tighten CSP if possible
- **On new feature**: Update CSP for new third-party integrations

### Updating CSP
When adding new third-party service:
1. Identify all domains used by the service
2. Update appropriate CSP directives
3. Test in development
4. Deploy and monitor for violations
5. Document the change

## Resources

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Web Docs - HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [Can I Use - Browser compatibility](https://caniuse.com/)

## References

Configuration files:
- `/next.config.ts` - Main security headers
- `/src/middleware.ts` - Dynamic headers (HSTS, Cache-Control)

Documentation:
- `/docs/SECURITY_PERFORMANCE.md` - Overall security and performance guide
- `/docs/SECURITY_AUDIT.md` - Vulnerability audit report
