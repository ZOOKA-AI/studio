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

  return (
    <div className="flex flex-col gap-8">
      <StatsCards stats={dynamicStats} />
      <AppointmentsCalendar />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
            <RecentReports reports={reports} />
        </div>
        <div className="lg:col-span-2">
            <QuickActions />
        </div>
      </div>
    </div>
  );
}
