'use client';

import Script from 'next/script';

/**
 * Analytics component for privacy-friendly web analytics
 * Supports Plausible Analytics (privacy-focused, GDPR compliant)
 * 
 * To use, set NEXT_PUBLIC_ANALYTICS_DOMAIN in your environment variables
 * Example: NEXT_PUBLIC_ANALYTICS_DOMAIN=yourdomain.com
 * 
 * For self-hosted Plausible, also set NEXT_PUBLIC_PLAUSIBLE_HOST
 * Example: NEXT_PUBLIC_PLAUSIBLE_HOST=https://analytics.yourdomain.com
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
  const plausibleHost = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || 'https://plausible.io';

  // Only load analytics in production and if domain is configured
  if (process.env.NODE_ENV !== 'production' || !domain) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={domain}
      src={`${plausibleHost}/js/script.js`}
      strategy="afterInteractive"
    />
  );
}
