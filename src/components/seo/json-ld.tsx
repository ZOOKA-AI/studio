import Script from 'next/script';
import { CONTACT_INFO, SEO_CONFIG } from '@/lib/config';

// UAE Emirates and major cities
const uaeLocations = [
  { name: 'دبي', nameEn: 'Dubai', lat: '25.2048', lng: '55.2708' },
  { name: 'أبوظبي', nameEn: 'Abu Dhabi', lat: '24.4539', lng: '54.3773' },
  { name: 'الشارقة', nameEn: 'Sharjah', lat: '25.3463', lng: '55.4209' },
  { name: 'عجمان', nameEn: 'Ajman', lat: '25.4052', lng: '55.5136' },
  { name: 'أم القيوين', nameEn: 'Umm Al Quwain', lat: '25.5647', lng: '55.5553' },
  { name: 'رأس الخيمة', nameEn: 'Ras Al Khaimah', lat: '25.7896', lng: '55.9433' },
  { name: 'الفجيرة', nameEn: 'Fujairah', lat: '25.1288', lng: '56.3265' },
];

export function JsonLd() {
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Royal Clean UAE',
    alternateName: 'رويال كلين الإمارات',
    url: SEO_CONFIG.baseUrl,
    logo: `${SEO_CONFIG.baseUrl}/logo.png`,
    description: 'شركة تنظيف احترافية تخدم جميع إمارات دولة الإمارات العربية المتحدة',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
      addressRegion: 'Dubai',
      addressLocality: 'Dubai',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phone,
      contactType: 'customer service',
      areaServed: ['AE'],
      availableLanguage: ['ar', 'en'],
    },
    sameAs: [
      `https://facebook.com/${CONTACT_INFO.social.facebook}`,
      `https://twitter.com/${CONTACT_INFO.social.twitter}`,
      `https://instagram.com/${CONTACT_INFO.social.instagram}`,
      `https://linkedin.com/${CONTACT_INFO.social.linkedin}`,
      `https://youtube.com/${CONTACT_INFO.social.youtube}`,
    ],
  };

  // Local Business Schema for each Emirate
  const localBusinessSchemas = uaeLocations.map((location) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SEO_CONFIG.baseUrl}/#${location.nameEn.toLowerCase().replace(/\s/g, '-')}`,
    name: `Royal Clean - ${location.name}`,
    image: `${SEO_CONFIG.baseUrl}/logo.png`,
    description: `خدمات تنظيف احترافية في ${location.name}. تنظيف منازل، شقق، فلل، مكاتب. خدمة سريعة وموثوقة.`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
      addressRegion: location.nameEn,
      addressLocality: location.nameEn,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.lat,
      longitude: location.lng,
    },
    url: `${SEO_CONFIG.baseUrl}/${location.nameEn.toLowerCase().replace(/\s/g, '-')}`,
    telephone: CONTACT_INFO.phone,
    priceRange: 'AED 100 - AED 5000',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '22:00',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: location.nameEn,
    },
  }));

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Cleaning Service',
    provider: {
      '@type': 'Organization',
      name: 'Royal Clean UAE',
    },
    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'City', name: 'Abu Dhabi' },
      { '@type': 'City', name: 'Sharjah' },
      { '@type': 'City', name: 'Ajman' },
      { '@type': 'City', name: 'Umm Al Quwain' },
      { '@type': 'City', name: 'Ras Al Khaimah' },
      { '@type': 'City', name: 'Fujairah' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات التنظيف',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'تنظيف المنازل',
            description: 'خدمة تنظيف شاملة للمنازل والشقق',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'تنظيف الفلل',
            description: 'تنظيف عميق للفلل والقصور',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'تنظيف المكاتب',
            description: 'خدمات تنظيف احترافية للمكاتب والشركات',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'التنظيف العميق',
            description: 'خدمة التنظيف العميق الشامل',
          },
        },
      ],
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: SEO_CONFIG.baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'خدمات التنظيف',
        item: `${SEO_CONFIG.baseUrl}/services`,
      },
    ],
  };

  // FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'ما هي المناطق التي تخدمونها في الإمارات؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'نخدم جميع إمارات دولة الإمارات العربية المتحدة: دبي، أبوظبي، الشارقة، عجمان، أم القيوين، رأس الخيمة، والفجيرة.',
        },
      },
      {
        '@type': 'Question',
        name: 'ما هي ساعات العمل؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'نعمل يومياً من الساعة 8 صباحاً حتى 10 مساءً، بما في ذلك عطلات نهاية الأسبوع.',
        },
      },
      {
        '@type': 'Question',
        name: 'كيف يمكنني حجز خدمة التنظيف؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'يمكنك الحجز من خلال موقعنا الإلكتروني أو الاتصال بنا مباشرة. نوفر خدمة حجز سهلة وسريعة.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {localBusinessSchemas.map((schema, index) => (
        <Script
          key={`local-business-${index}`}
          id={`local-business-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
