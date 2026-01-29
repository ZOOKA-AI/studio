import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware runs on every request
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers for enhanced protection
  // Note: These supplement the headers in next.config.ts
  
  // Add HSTS for HTTPS enforcement (only on production HTTPS)
  if (request.nextUrl.protocol === 'https:') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // Add cache control for static assets
  if (
    request.nextUrl.pathname.startsWith('/_next/static/') ||
    request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|ico|svg|webp|avif|woff|woff2)$/)
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/image|favicon.ico).*)',
  ],
};
