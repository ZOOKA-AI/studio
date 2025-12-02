import { AppointmentsCalendar } from '@/components/dashboard/appointments-calendar';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RecentReports } from '@/components/dashboard/recent-reports';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { mockAppointments, mockRecentReports } from '@/lib/data';

export default function SupervisorDashboardPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
      <div className="xl:col-span-2 space-y-8">
        <AppointmentsCalendar appointments={mockAppointments} />
        <RecentReports reports={mockRecentReports} />
      </div>
      <div className="xl:col-span-1 space-y-8">
        <QuickActions />
        <StatsCards />
      </div>
    </div>
  );
}
