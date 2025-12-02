import { AppointmentsCalendar } from '@/components/dashboard/appointments-calendar';
import { mockAppointments } from '@/lib/data';

export default function CalendarPage() {
  return (
    <div>
      <AppointmentsCalendar appointments={mockAppointments} />
    </div>
  );
}
