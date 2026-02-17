export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://royalclean.ae',
    name: 'Royal Clean UAE',
    alternateName: 'رويال كلين الإمارات',
    description: 'خدمات تنظيف احترافية في جميع إمارات الدولة - دبي، أبوظبي، الشارقة، عجمان، أم القيوين، رأس الخيمة، والفجيرة',
    url: 'https://royalclean.ae',
    logo: 'https://royalclean.ae/logo.png',
    image: 'https://royalclean.ae/og-image.jpg',
    telephone: '+971-XX-XXX-XXXX',
    email: 'info@royalclean.ae',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
      addressRegion: 'Dubai',
      addressLocality: 'Dubai',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.2048,
      longitude: 55.2708,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Dubai',
        alternateName: 'دبي',
      },
      {
        '@type': 'City',
        name: 'Abu Dhabi',
        alternateName: 'أبوظبي',
      },
      {
        '@type': 'City',
        name: 'Sharjah',
        alternateName: 'الشارقة',
      },
      {
        '@type': 'City',
        name: 'Ajman',
        alternateName: 'عجمان',
      },
      {
        '@type': 'City',
        name: 'Umm Al Quwain',
        alternateName: 'أم القيوين',
      },
      {
        '@type': 'City',
        name: 'Ras Al Khaimah',
        alternateName: 'رأس الخيمة',
      },
      {
        '@type': 'City',
        name: 'Fujairah',
        alternateName: 'الفجيرة',
      },
    ],
    serviceType: [
      'خدمات تنظيف',
      'تنظيف السيارات',
      'تنظيف المنازل',
      'تنظيف المكاتب',
      'Cleaning Services',
      'Car Cleaning',
      'Home Cleaning',
      'Office Cleaning',
    ],
    priceRange: '$$',
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
    sameAs: [
      'https://www.instagram.com/royal_cleaning_uae',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
