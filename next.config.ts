import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // NOTE: Remove these ignores once all errors are fixed
  typescript: {
    ignoreBuildErrors: true, // TODO: Fix TypeScript errors in src/lib/data.ts
  },
  eslint: {
    ignoreDuringBuilds: true, // TODO: Fix ESLint errors before removing
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
