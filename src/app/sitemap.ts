import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://quran.zekr.by.zooka-ai.com';
  
  // Define Quran-specific routes
  const routes = [
    '',
    '/quran',
    '/surahs',
    '/bookmarks',
    '/recitation',
    '/tafsir',
    '/search',
  ];

  // Generate sitemap entries
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
    alternates: {
      languages: {
        'ar-EG': `${baseUrl}${route}`,
        'ar-SA': `${baseUrl}/sa${route}`,
        'ar-AE': `${baseUrl}/ae${route}`,
        en: `${baseUrl}/en${route}`,
      },
    },
  }));
}
