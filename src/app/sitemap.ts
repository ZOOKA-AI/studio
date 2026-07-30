import { MetadataRoute } from 'next'
import { SEO_CONFIG } from '@/lib/config'

// UAE Emirates and major cities
const uaeLocations = [
  'dubai',
  'abu-dhabi',
  'sharjah',
  'ajman',
  'umm-al-quwain',
  'ras-al-khaimah',
  'fujairah',
]

// Major Dubai areas for local SEO
const dubaiAreas = [
  'downtown-dubai',
  'dubai-marina',
  'jumeirah',
  'deira',
  'business-bay',
  'jbr',
  'jlt',
  'tecom',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.baseUrl
  
  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Location pages for each Emirate
  const emiratePages: MetadataRoute.Sitemap = uaeLocations.map((location) => ({
    url: `${baseUrl}/${location}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Dubai area pages for hyper-local SEO
  const dubaiAreaPages: MetadataRoute.Sitemap = dubaiAreas.map((area) => ({
    url: `${baseUrl}/dubai/${area}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Service pages
  const services = [
    'home-cleaning',
    'villa-cleaning',
    'apartment-cleaning',
    'office-cleaning',
    'deep-cleaning',
    'move-in-cleaning',
    'move-out-cleaning',
  ]

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  return [...mainPages, ...emiratePages, ...dubaiAreaPages, ...servicePages]
}
