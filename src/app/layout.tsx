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
import { StructuredData } from '@/components/seo/structured-data';

export const metadata: Metadata = {
  title: 'Royal Clean UAE - خدمات التنظيف بالذكاء الاصطناعي في الإمارات',
  description: 'رويال كلين الإمارات - خدمات التنظيف الاحترافية المدعومة بالذكاء الاصطناعي في دبي، أبوظبي، الشارقة، عجمان، أم القيوين، رأس الخيمة، الفجيرة. Royal Clean UAE - AI-powered professional cleaning services across all seven Emirates',
  keywords: [
    'تنظيف منازل الإمارات',
    'شركة تنظيف دبي',
    'شركة تنظيف أبوظبي',
    'شركة تنظيف الشارقة',
    'شركة تنظيف عجمان',
    'شركة تنظيف أم القيوين',
    'شركة تنظيف رأس الخيمة',
    'شركة تنظيف الفجيرة',
    'cleaning services UAE',
    'cleaning company Dubai',
    'cleaning company Abu Dhabi',
    'cleaning company Sharjah',
    'cleaning company Ajman',
    'AI cleaning services',
    'ذكاء اصطناعي تنظيف',
    'Royal Clean UAE',
    'رويال كلين الإمارات',
    'deep cleaning UAE',
    'professional cleaning services',
    'تنظيف احترافي',
    'خدمات النظافة',
  ],
  authors: [{ name: 'Royal Clean UAE' }],
  creator: 'Royal Clean UAE',
  publisher: 'Royal Clean UAE',
  metadataBase: new URL('https://zoka.royalcleanuae.com'),
  alternates: {
    canonical: 'https://zoka.royalcleanuae.com',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_AE',
    alternateLocale: ['en_US', 'en_AE'],
    url: 'https://zoka.royalcleanuae.com',
    title: 'Royal Clean UAE - خدمات التنظيف بالذكاء الاصطناعي',
    description: 'رويال كلين الإمارات - خدمات التنظيف الاحترافية في جميع الإمارات السبع. Professional AI-powered cleaning services in Dubai, Abu Dhabi, Sharjah, Ajman, UAQ, RAK, Fujairah',
    siteName: 'Royal Clean UAE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal Clean UAE - خدمات التنظيف في الإمارات',
    description: 'خدمات التنظيف الاحترافية المدعومة بالذكاء الاصطناعي في جميع إمارات الدولة',
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
  verification: {
    google: 'google-site-verification-code', // TODO: Replace with actual Google Search Console verification code
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
        <StructuredData />
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
