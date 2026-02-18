import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // For now, allow all requests to dashboard routes
  // In production, implement proper authentication
  
  // You can add custom headers or logging here
  const response = NextResponse.next();
  
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
