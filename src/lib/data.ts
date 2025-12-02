import type { Appointment, DailyReport } from './types';
import { subDays, addHours, set, startOfWeek, addDays } from 'date-fns';

const now = new Date();
const startOfWeekDate = startOfWeek(now, { weekStartsOn: 0 }); // Sunday

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    siteName: 'فيلا السيد أحمد',
    siteAddress: 'الشارقة, الإمارات',
    startTime: set(addDays(startOfWeekDate, 0), { hours: 8, minutes: 0, seconds: 0, milliseconds: 0 }),
    endTime: set(addDays(startOfWeekDate, 0), { hours: 14, minutes: 0, seconds: 0, milliseconds: 0 }),
    status: 'مكتمل',
  },
  {
    id: '2',
    siteName: 'مكتب شركة ألفا',
    siteAddress: 'دبي, الإمارات',
    startTime: set(addDays(startOfWeekDate, 1), { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 }),
    endTime: set(addDays(startOfWeekDate, 1), { hours: 13, minutes: 0, seconds: 0, milliseconds: 0 }),
    status: 'قيد التنفيذ',
  },
  {
    id: '3',
    siteName: 'شقة السيدة فاطمة',
    siteAddress: 'عجمان, الإمارات',
    startTime: set(addDays(startOfWeekDate, 1), { hours: 14, minutes: 0, seconds: 0, milliseconds: 0 }),
    endTime: set(addDays(startOfWeekDate, 1), { hours: 17, minutes: 0, seconds: 0, milliseconds: 0 }),
    status: 'متأخر',
  },
  {
    id: '4',
    siteName: 'فيلا السيد سعيد',
    siteAddress: 'الشارقة, الإمارات',
    startTime: set(addDays(startOfWeekDate, 3), { hours: 8, minutes: 0, seconds: 0, milliseconds: 0 }),
    endTime: set(addDays(startOfWeekDate, 3), { hours: 16, minutes: 0, seconds: 0, milliseconds: 0 }),
    status: 'مجدول',
  },
  {
    id: '5',
    siteName: 'فيلا السيد خالد',
    siteAddress: 'دبي, الإمارات',
    startTime: set(addDays(startOfWeekDate, 4), { hours: 10, minutes: 0, seconds: 0, milliseconds: 0 }),
    endTime: set(addDays(startOfWeekDate, 4), { hours: 15, minutes: 0, seconds: 0, milliseconds: 0 }),
    status: 'مجدول',
  },
    {
    id: '6',
    siteName: 'بناية البرج',
    siteAddress: 'دبي, الإمارات',
    startTime: set(addDays(startOfWeekDate, 6), { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 }),
    endTime: set(addDays(startOfWeekDate, 6), { hours: 17, minutes: 0, seconds: 0, milliseconds: 0 }),
    status: 'مؤجل',
  },
];

export const mockRecentReports: DailyReport[] = [
  {
    id: '1',
    siteName: 'فيلا أحمد',
    date: subDays(now, 1),
    supervisor: 'محمد',
    status: 'مكتمل',
    hours: 6,
  },
  {
    id: '2',
    siteName: 'مكتب شركة',
    date: subDays(now, 2),
    supervisor: 'خالد',
    status: 'مسودة',
    hours: 4,
  },
  {
    id: '3',
    siteName: 'فيلا سعيد',
    date: subDays(now, 3),
    supervisor: 'محمد',
    status: 'مكتمل',
    hours: 8,
  },
  {
    id: '4',
    siteName: 'شقة فاطمة',
    date: subDays(now, 4),
    supervisor: 'علي',
    status: 'قيد المراجعة',
    hours: 3,
  },
];

export const mockStats = {
  appointments: {
    label: 'المواعيد',
    value: '8',
    change: '+10%',
  },
  workers: {
    label: 'العمال',
    value: '12',
    change: '+2.5%',
  },
  reports: {
    label: 'اليوميات',
    value: '3',
    change: '-1.4%',
  },
  revenue: {
    label: 'الإيرادات',
    value: 'د.إ 2,500',
    change: '+5.2%',
  },
};
