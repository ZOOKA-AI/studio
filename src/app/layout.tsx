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
  title: 'Royal Clean Dashboard - نظام إدارة خدمات التنظيف في الإمارات',
  description: 'نظام متكامل لإدارة خدمات التنظيف في دبي، أبوظبي، الشارقة، عجمان، أم القيوين، رأس الخيمة، والفجيرة. إدارة المواعيد، العمال، التقارير، والمعدات بكفاءة عالية.',
  keywords: [
    'تنظيف',
    'خدمات تنظيف',
    'تنظيف السيارات',
    'تنظيف منازل',
    'تنظيف مكاتب',
    'رويال كلين',
    'Royal Clean',
    'التنظيف في الإمارات',
    'تنظيف دبي',
    'تنظيف أبوظبي',
    'تنظيف الشارقة',
    'تنظيف عجمان',
    'تنظيف أم القيوين',
    'تنظيف رأس الخيمة',
    'تنظيف الفجيرة',
    'cleaning services UAE',
    'car cleaning Dubai',
    'cleaning company Emirates',
    'professional cleaning',
    'dashboard',
    'إدارة التنظيف',
    'cleaning management',
    'خدمات النظافة',
    'شركة تنظيف',
  ],
  authors: [{ name: 'Royal Clean UAE' }],
  creator: 'Royal Clean UAE',
  publisher: 'Royal Clean UAE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://royalclean.ae'),
  alternates: {
    canonical: '/',
    languages: {
      'ar-AE': '/',
      'en-AE': '/en',
    },
  },
  openGraph: {
    title: 'Royal Clean Dashboard - نظام إدارة خدمات التنظيف في الإمارات',
    description: 'نظام متكامل لإدارة خدمات التنظيف في جميع إمارات الدولة. إدارة احترافية للمواعيد، العمال، التقارير، والمعدات.',
    url: 'https://royalclean.ae',
    siteName: 'Royal Clean Dashboard',
    locale: 'ar_AE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Royal Clean - خدمات التنظيف الاحترافية في الإمارات',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal Clean Dashboard - نظام إدارة خدمات التنظيف',
    description: 'نظام متكامل لإدارة خدمات التنظيف في الإمارات العربية المتحدة',
    images: ['/twitter-image.jpg'],
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
    google: 'google-site-verification-code',
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
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
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
