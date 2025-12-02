'use client';

import { AppointmentsCalendar } from '@/components/dashboard/appointments-calendar';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RecentReports } from '@/components/dashboard/recent-reports';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { useAppointments } from '@/context/appointments-context';
import { useReports } from '@/context/reports-context';
import { useTasks } from '@/context/tasks-context';
import { useWorkers } from '@/context/workers-context';

export default function SupervisorDashboardPage() {
  const { reports } = useReports();
  const { workers } = useWorkers();
  const { tasks } = useTasks();
  const { appointments } = useAppointments();

  const totalRevenue = reports.reduce((sum, report) => sum + (report.agreedAmount || 0), 0);

  const dynamicStats = [
    {
      label: 'المواعيد',
      value: appointments.length.toString(),
      change: '+10%',
    },
    {
      label: 'العمال',
      value: workers.length.toString(),
      change: '+2.5%',
    },
    {
      label: 'اليوميات',
      value: reports.length.toString(),
      change: '-1.4%',
    },
     {
      label: 'المهام',
      value: tasks.length.toString(),
      change: '+5.2%',
    },
  ];

  const financialStats = [
    {
      label: 'الإيرادات',
      value: `د.إ ${totalRevenue.toFixed(2)}`,
      change: '+8.1%',
    },
    {
      label: 'المصروفات',
      value: 'د.إ 0.00',
      change: '+0%',
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <StatsCards stats={dynamicStats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatsCards stats={financialStats} />
      </div>
      <AppointmentsCalendar />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
            <RecentReports reports={reports || []} />
        </div>
        <div className="lg:col-span-2">
            <QuickActions />
        </div>
      </div>
    </div>
  );
}
