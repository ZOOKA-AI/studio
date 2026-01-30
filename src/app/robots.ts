import { MetadataRoute } from 'next'
import { SEO_CONFIG } from '@/lib/config'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/settings/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/settings/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/settings/'],
      },
    ],
    sitemap: `${SEO_CONFIG.baseUrl}/sitemap.xml`,
  }
}
