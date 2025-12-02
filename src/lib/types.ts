export type UserRole = 'admin' | 'supervisor' | 'worker';

export type User = {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl: string;
};

export type AppointmentStatus = 'حجز جديد' | 'مكتمل' | 'قيد التنفيذ' | 'متأخر' | 'مجدول' | 'مؤجل';

export type Appointment = {
  id: string;
  siteName: string;
  siteAddress: string;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
};

export type DailyReportStatus = 'مكتمل' | 'مسودة' | 'قيد المراجعة';

export type DailyReport = {
  id: string;
  siteName: string;
  date: Date;
  supervisor: string;
  status: DailyReportStatus;
  hours: number;
};

export type Stat = {
  label: string;
  value: string;
  change: string;
};
