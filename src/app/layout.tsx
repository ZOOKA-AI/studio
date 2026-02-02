import type { Metadata } from 'next';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { ReportsProvider } from '@/context/reports-context';
import { WorkersProvider } from '@/context/workers-context';
import { TasksProvider } from '@/context/tasks-context';
import { AppointmentsProvider } from '@/context/appointments-context';
import { FirebaseClientProvider } from '@/firebase';
import { MaterialsProvider } from '@/context/materials-context';
import { EquipmentProvider } from '@/context/equipment-context';

export const metadata: Metadata = {
  metadataBase: new URL('https://quran.zekr.by.zooka-ai.com'),
  title: {
    default: 'ذكر - القرآن الكريم | Zekr - Holy Quran',
    template: '%s | ذكر - القرآن الكريم'
  },
  description: 'منصة ذكر للقرآن الكريم - تلاوة، تفسير، وحفظ القرآن الكريم مع أدوات ذكية. أفضل تطبيق لقراءة القرآن في مصر والخليج العربي والإمارات. Zekr - Read, understand, and memorize the Holy Quran with smart tools.',
  keywords: [
    // Arabic keywords - Egypt focus
    'القرآن الكريم', 'قرآن كريم', 'القران الكريم', 'قران', 'ذكر',
    'تلاوة القرآن', 'قراءة القرآن', 'حفظ القرآن', 'تفسير القرآن',
    'القرآن الكريم كامل', 'المصحف الشريف', 'القرآن مصر',
    
    // Gulf and UAE specific
    'القرآن الإمارات', 'القرآن الخليج', 'القرآن السعودية',
    'القرآن الكويت', 'القرآن قطر', 'القرآن البحرين', 'القرآن عمان',
    
    // Actions and features
    'تطبيق القرآن', 'برنامج القرآن', 'القرآن اون لاين', 'القرآن الالكتروني',
    'استماع القرآن', 'تحفيظ القرآن', 'ختم القرآن', 'ورد القرآن',
    'تجويد القرآن', 'ترتيل القرآن', 'أحكام التجويد',
    
    // English keywords
    'Holy Quran', 'Quran', 'Qur\'an', 'Koran', 'Zekr',
    'Quran online', 'Read Quran', 'Quran app', 'Islamic app',
    'Quran Egypt', 'Quran UAE', 'Quran Gulf', 'Quran Saudi Arabia',
    'Quran recitation', 'Quran memorization', 'Quran tafsir',
    
    // Technology & AI
    'AI Quran', 'Smart Quran', 'Quran technology', 'Digital Quran',
    'ذكاء اصطناعي قرآن', 'تقنية القرآن',
  ],
  authors: [{ name: 'ZOOKA AI', url: 'https://zooka-ai.com' }],
  creator: 'ZOOKA AI',
  publisher: 'ZOOKA AI',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: ['ar_SA', 'ar_AE', 'en_US', 'en_GB'],
    url: 'https://quran.zekr.by.zooka-ai.com',
    title: 'ذكر - القرآن الكريم | Zekr - Holy Quran',
    description: 'منصة ذكر للقرآن الكريم - تلاوة، تفسير، وحفظ القرآن الكريم مع أدوات ذكية. أفضل تطبيق لقراءة القرآن في مصر والخليج العربي والإمارات.',
    siteName: 'ذكر - Zekr',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ذكر - القرآن الكريم',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ذكر - القرآن الكريم | Zekr - Holy Quran',
    description: 'منصة ذكر للقرآن الكريم - تلاوة، تفسير، وحفظ القرآن الكريم مع أدوات ذكية. أفضل تطبيق لقراءة القرآن في مصر والخليج العربي والإمارات.',
    creator: '@ZOOKA_AI',
    images: ['/twitter-image.png'],
  },
  alternates: {
    canonical: 'https://quran.zekr.by.zooka-ai.com',
    languages: {
      'ar-EG': 'https://quran.zekr.by.zooka-ai.com',
      'ar-SA': 'https://quran.zekr.by.zooka-ai.com/sa',
      'ar-AE': 'https://quran.zekr.by.zooka-ai.com/ae',
      'en': 'https://quran.zekr.by.zooka-ai.com/en',
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  category: 'religion',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
        
        {/* Geo-targeting meta tags */}
        <meta name="geo.region" content="EG" />
        <meta name="geo.placename" content="Egypt" />
        <meta name="geo.region" content="AE" />
        <meta name="geo.placename" content="United Arab Emirates" />
        
        {/* Additional SEO meta tags */}
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 days" />
        <meta name="distribution" content="global" />
        <meta name="language" content="Arabic, ar, ar-EG, ar-SA, ar-AE" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ذكر - القرآن الكريم',
              alternateName: 'Zekr - Holy Quran',
              url: 'https://quran.zekr.by.zooka-ai.com',
              description: 'منصة ذكر للقرآن الكريم - تلاوة، تفسير، وحفظ القرآن الكريم مع أدوات ذكية',
              inLanguage: ['ar', 'ar-EG', 'ar-SA', 'ar-AE'],
              publisher: {
                '@type': 'Organization',
                name: 'ZOOKA AI',
                url: 'https://zooka-ai.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://quran.zekr.by.zooka-ai.com/logo.png',
                }
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://quran.zekr.by.zooka-ai.com/search?q={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              },
              about: {
                '@type': 'Thing',
                name: 'القرآن الكريم',
                sameAs: [
                  'https://ar.wikipedia.org/wiki/القرآن',
                  'https://www.wikidata.org/wiki/Q428',
                ]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'ذكر - تطبيق القرآن الكريم',
              applicationCategory: 'ReligiousApplication',
              operatingSystem: 'All',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '10000'
              },
              description: 'تطبيق ذكر للقرآن الكريم - قراءة، استماع، وحفظ القرآن الكريم',
              inLanguage: 'ar',
              availableInRegion: ['EG', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM']
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'الرئيسية',
                  item: 'https://quran.zekr.by.zooka-ai.com'
                }
              ]
            })
          }}
        />
      </head>
      <body className={cn("font-body antialiased", 'bg-background')}>
        <FirebaseClientProvider>
          <EquipmentProvider>
            <MaterialsProvider>
              <AppointmentsProvider>
                <TasksProvider>
                  <ReportsProvider>
                    <WorkersProvider>
                      <SidebarProvider>
                          <div className="relative flex min-h-screen">
                              <AppSidebar />
                              <div className="flex-1">
                                  <Header />
                                  <main className="p-4 sm:p-6 lg:p-8">
                                      {children}
                                  </main>
                              </div>
                          </div>
                          <Toaster />
                      </SidebarProvider>
                    </WorkersProvider>
                  </ReportsProvider>
                </TasksProvider>
              </AppointmentsProvider>
            </MaterialsProvider>
          </EquipmentProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
