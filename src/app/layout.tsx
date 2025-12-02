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

export const metadata: Metadata = {
  title: 'Royal Clean Dashboard',
  description: 'لوحة تحكم لشركة رويال للتنظيف',
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
        <FirebaseClientProvider>
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
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
