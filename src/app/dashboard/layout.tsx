import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Royal Clean',
  description: 'Marketing and analytics dashboard for Royal Clean',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
