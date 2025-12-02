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
  startTime: string; // ISO string
  endTime: string;   // ISO string
  status: AppointmentStatus;
};

export type DailyReportStatus = 'مكتمل' | 'مسودة' | 'قيد المراجعة';

export type DailyReport = {
  id: string;
  // siteName is now clientName to better reflect what it is
  clientName: string;
  date: Date;
  supervisor: string;
  status: DailyReportStatus;
  hours: number;
  clientPhone?: string;
  clientLocation?: string;
  agreedAmount?: number;
  paymentMethod?: string;
  workDescription?: string;
  vehicleNumber?: string;
  startTime?: string;
  endTime?: string;
  workers: { name: string; phone?: string }[];
  tasks: { value: string }[];
  materials: { name: string; quantity?: string }[];
  notes?: string;
};

export type Stat = {
  label: string;
  value: string;
  change: string;
};


export type WorkerStatus = 'نشط' | 'في إجازة';

export type Worker = {
    id: string;
    name: string;
    phone: string;
    nationalId: string;
    role: string;
    status: WorkerStatus;
    type: 'company' | 'external';
};

export type TaskStatus = 'جديدة' | 'قيد التنفيذ' | 'مكتملة';
export type TaskPriority = 'عالية' | 'متوسطة' | 'منخفضة';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO string for date
};


export type Material = {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unit: string;
}
