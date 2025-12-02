import type { Appointment, DailyReport, Worker } from './types';
import { subDays, addHours, set, startOfWeek, addDays as dateFnsAddDays } from 'date-fns';

const now = new Date();
const startOfWeekDate = startOfWeek(now, { weekStartsOn: 0 }); // Sunday

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    siteName: 'فيلا السيد أحمد',
    siteAddress: 'الشارقة, الإمارات',
    startTime: set(dateFnsAddDays(startOfWeekDate, 0), { hours: 8, minutes: 0, seconds: 0, milliseconds: 0 }),
    endTime: set(dateFnsAddDays(startOfWeekDate, 0), { hours: 14, minutes: 0, seconds: 0, milliseconds: 0 }),
    status: 'مكتمل',
  },
  {
    id: '2',
    siteName: 'مكتب شركة ألفا',
    siteAddress: 'دبي, الإمارات',
    startTime: set(dateFnsAddDays(startOfWeekDate, 1), { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 }),
    endTime: set(dateFnsAddDays(startOfWeekDate, 1), { hours: 13, minutes: 0, seconds: 0, milliseconds: 0 }),
    status: 'قيد التنفيذ',
  },
  {
    id: '3',
    siteName: 'شقة السيدة فاطمة',
    siteAddress: 'عجمان, الإمارات',
    startTime: set(dateFnsAddDays(startOfWeekDate, 1), { hours: 14, minutes: 0, seconds: 0, milliseconds: 0 }),
    endTime: set(dateFnsAddDays(startOfWeekDate, 1), { hours: 17, minutes: 0, seconds: 0, milliseconds: 0 }),
    status: 'متأخر',
  },
  {
    id: '4',
    siteName: 'فيلا السيد سعيد',
    siteAddress: 'الشارقة, الإمارات',
    startTime: set(dateFnsAddDays(startOfWeekDate, 3), { hours: 8, minutes: 0, seconds: 0, milliseconds: 0 }),
    endTime: set(dateFnsAddDays(startOfWeekDate, 3), { hours: 16, minutes: 0, seconds: 0, milliseconds: 0 }),
    status: 'مجدول',
  },
  {
    id: '5',
    siteName: 'فيلا السيد خالد',
    siteAddress: 'دبي, الإمارات',
    startTime: set(dateFnsAddDays(startOfWeekDate, 4), { hours: 10, minutes: 0, seconds: 0, milliseconds: 0 }),
    endTime: set(dateFnsAddDays(startOfWeekDate, 4), { hours: 15, minutes: 0, seconds: 0, milliseconds: 0 }),
    status: 'مجدول',
  },
    {
    id: '6',
    siteName: 'بناية البرج',
    siteAddress: 'دبي, الإمارات',
    startTime: set(dateFnsAddDays(startOfWeekDate, 6), { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 }),
    endTime: set(dateFnsAddDays(startOfWeekDate, 6), { hours: 17, minutes: 0, seconds: 0, milliseconds: 0 }),
    status: 'مؤجل',
  },
];

export const mockRecentReports: DailyReport[] = [
  {
    id: '1',
    clientName: 'فيلا أحمد',
    date: subDays(now, 1),
    supervisor: 'محمد',
    status: 'مكتمل',
    hours: 6,
    workers: [],
    tasks: [],
    materials: [],
  },
  {
    id: '2',
    clientName: 'مكتب شركة',
    date: subDays(now, 2),
    supervisor: 'خالد',
    status: 'مسودة',
    hours: 4,
    workers: [],
    tasks: [],
    materials: [],
  },
  {
    id: '3',
    clientName: 'فيلا سعيد',
    date: subDays(now, 3),
    supervisor: 'محمد',
    status: 'مكتمل',
    hours: 8,
    workers: [],
    tasks: [],
    materials: [],
  },
  {
    id: '4',
    clientName: 'شقة فاطمة',
    date: subDays(now, 4),
    supervisor: 'علي',
    status: 'قيد المراجعة',
    hours: 3,
    workers: [],
    tasks: [],
    materials: [],
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


export const initialCompanyWorkers: Worker[] = [
    { id: 'W001', name: 'أحمد محمود', phone: '0501234567', nationalId: '784-1990-1234567-1', role: 'عامل نظافة', status: 'نشط', type: 'company' },
    { id: 'W002', name: 'علي حسن', phone: '0557654321', nationalId: '784-1985-7654321-2', role: 'عامل نظافة', status: 'نشط', type: 'company' },
    { id: 'W004', name: 'يوسف خالد', phone: '0561122334', nationalId: '784-1992-1122334-3', role: 'مشرف فريق', status: 'نشط', type: 'company' },
    { id: 'W003', name: 'فاطمة الزهراء', phone: '0509876543', nationalId: '784-1995-9876543-4', role: 'عاملة نظافة', status: 'في إجازة', type: 'company' },
];

export const initialExternalWorkers: Worker[] = [
    { id: 'E001', name: 'محمد خان', phone: '0521234567', nationalId: '202-2000-1234567-5', role: 'عامل يومي', status: 'نشط', type: 'external' },
    { id: 'E002', name: 'سانجاي كومار', phone: '0587654321', nationalId: '202-1998-7654321-6', role: 'عامل يومي', status: 'نشط', type: 'external' },
];
