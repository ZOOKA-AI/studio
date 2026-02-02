export function StructuredData() {
  const uaeLocations = [
    { name: 'Dubai', nameAr: 'دبي', lat: 25.2048, lng: 55.2708 },
    { name: 'Abu Dhabi', nameAr: 'أبوظبي', lat: 24.4539, lng: 54.3773 },
    { name: 'Sharjah', nameAr: 'الشارقة', lat: 25.3463, lng: 55.4209 },
    { name: 'Ajman', nameAr: 'عجمان', lat: 25.4052, lng: 55.5136 },
    { name: 'Umm Al Quwain', nameAr: 'أم القيوين', lat: 25.5647, lng: 55.5552 },
    { name: 'Ras Al Khaimah', nameAr: 'رأس الخيمة', lat: 25.7889, lng: 55.9433 },
    { name: 'Fujairah', nameAr: 'الفجيرة', lat: 25.1288, lng: 56.3265 },
  ];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Royal Clean UAE',
    alternateName: 'رويال كلين الإمارات',
    url: 'https://royalcleanuae.com',
    logo: 'https://royalcleanuae.com/logo.png',
    sameAs: [
      'https://zoka.royalcleanuae.com',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971-xxx-xxxx', // TODO: Replace with actual contact number
      contactType: 'Customer Service',
      areaServed: 'AE',
      availableLanguage: ['Arabic', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
      addressRegion: 'Dubai',
    },
  };

  const localBusinessSchemas = uaeLocations.map((location) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://royalcleanuae.com/#${location.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: `Royal Clean UAE - ${location.name}`,
    alternateName: `رويال كلين - ${location.nameAr}`,
    description: `Professional AI-powered cleaning services in ${location.name}, UAE - خدمات التنظيف الاحترافية المدعومة بالذكاء الاصطناعي في ${location.nameAr}، الإمارات`,
    url: 'https://royalcleanuae.com',
    telephone: '+971-xxx-xxxx', // TODO: Replace with actual contact number
    priceRange: '$$',
    image: 'https://royalcleanuae.com/logo.png',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.lat,
      longitude: location.lng,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.name,
      addressRegion: location.name,
      addressCountry: 'AE',
    },
    areaServed: {
      '@type': 'City',
      name: location.name,
      alternateName: location.nameAr,
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: location.lat,
        longitude: location.lng,
      },
      geoRadius: '50000',
    },
  }));

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Cleaning Services',
    provider: {
      '@type': 'Organization',
      name: 'Royal Clean UAE',
    },
    areaServed: uaeLocations.map((loc) => ({
      '@type': 'City',
      name: loc.name,
      alternateName: loc.nameAr,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'تنظيف المنازل - Home Cleaning',
            description: 'خدمات تنظيف منازل احترافية بالذكاء الاصطناعي',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'التنظيف العميق - Deep Cleaning',
            description: 'خدمات التنظيف العميق الشامل',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'تنظيف المكاتب - Office Cleaning',
            description: 'خدمات تنظيف المكاتب التجارية',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {localBusinessSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
