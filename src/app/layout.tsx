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
import { JsonLd } from '@/components/seo/json-ld';
import { SEO_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.baseUrl),
  title: {
    default: 'رويال كلين - خدمات التنظيف الأفضل في الإمارات | Royal Clean UAE',
    template: '%s | رويال كلين - خدمات التنظيف في الإمارات'
  },
  description: 'خدمات التنظيف الاحترافية رقم 1 في الإمارات العربية المتحدة. نخدم دبي، أبوظبي، الشارقة، عجمان، أم القيوين، رأس الخيمة، الفجيرة. تنظيف منازل، شقق، فلل، مكاتب، شركات. احجز الآن!',
  keywords: [
    // Arabic Keywords
    'خدمات تنظيف الإمارات',
    'شركة تنظيف دبي',
    'تنظيف منازل أبوظبي',
    'تنظيف شقق الشارقة',
    'تنظيف فلل عجمان',
    'خدمات تنظيف أم القيوين',
    'شركة تنظيف رأس الخيمة',
    'تنظيف الفجيرة',
    'تنظيف احترافي الإمارات',
    'خدمات التنظيف المنزلي',
    'تنظيف عميق',
    'تنظيف مكاتب',
    'تنظيف شركات',
    'رويال كلين',
    'Royal Clean',
    // English Keywords
    'cleaning services UAE',
    'Dubai cleaning company',
    'Abu Dhabi home cleaning',
    'Sharjah apartment cleaning',
    'Ajman villa cleaning',
    'Umm Al Quwain cleaning',
    'Ras Al Khaimah cleaning',
    'Fujairah cleaning services',
    'professional cleaning UAE',
    'deep cleaning',
    'office cleaning',
    'residential cleaning',
    // Location-specific
    'تنظيف دبي مارينا',
    'تنظيف داون تاون دبي',
    'تنظيف جميرا',
    'تنظيف ديرة',
    'تنظيف الخليج التجاري',
  ],
  authors: [{ name: 'Royal Clean UAE' }],
  creator: 'Royal Clean',
  publisher: 'Royal Clean UAE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_AE',
    alternateLocale: ['en_AE', 'ar_SA'],
    url: SEO_CONFIG.baseUrl,
    title: 'رويال كلين - خدمات التنظيف الأفضل في الإمارات | Royal Clean UAE',
    description: 'خدمات التنظيف الاحترافية رقم 1 في الإمارات العربية المتحدة. نخدم جميع الإمارات السبع. احجز الآن!',
    siteName: 'Royal Clean UAE',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Royal Clean - خدمات التنظيف في الإمارات',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'رويال كلين - خدمات التنظيف الأفضل في الإمارات',
    description: 'خدمات التنظيف الاحترافية رقم 1 في الإمارات. نخدم جميع الإمارات السبع. احجز الآن!',
    images: ['/twitter-image.jpg'],
    creator: '@RoyalCleanUAE',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SEO_CONFIG.baseUrl,
    languages: {
      'ar-AE': `${SEO_CONFIG.baseUrl}/ar`,
      'en-AE': `${SEO_CONFIG.baseUrl}/en`,
    },
  },
  verification: {
    google: SEO_CONFIG.verification.google, // TODO: Replace with actual Google Search Console verification code
    yandex: SEO_CONFIG.verification.yandex, // TODO: Replace with actual Yandex Webmaster verification code
  },
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
      </head>
      <body className={cn("font-body antialiased", 'bg-background')}>
        <JsonLd />
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
