import { AppointmentsCalendar } from '@/components/dashboard/appointments-calendar';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RecentReports } from '@/components/dashboard/recent-reports';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { mockAppointments, mockRecentReports } from '@/lib/data';

export default function SupervisorDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <StatsCards />
      <AppointmentsCalendar appointments={mockAppointments} />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
            <RecentReports reports={mockRecentReports} />
        </div>
        <div className="lg:col-span-2">
            <QuickActions />
        </div>
      </div>
    </div>
  );
}
