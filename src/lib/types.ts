/**
 * @fileOverview Type definitions for the Royal Clean Dashboard application
 * Contains all TypeScript type definitions used throughout the application
 */

/**
 * User roles in the system
 * - admin: Full system access
 * - supervisor: Manage teams and reports
 * - worker: View assigned tasks
 */
export type UserRole = 'admin' | 'supervisor' | 'worker';

/**
 * User entity representing system users
 */
export type User = {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl: string;
};

/**
 * Appointment status values (in Arabic)
 * - حجز جديد: New booking
 * - مكتمل: Completed
 * - قيد التنفيذ: In progress
 * - متأخر: Delayed
 * - مجدول: Scheduled
 * - مؤجل: Postponed
 */
export type AppointmentStatus = 'حجز جديد' | 'مكتمل' | 'قيد التنفيذ' | 'متأخر' | 'مجدول' | 'مؤجل';

/**
 * Appointment entity for client site visits
 */
export type Appointment = {
  id: string;
  siteName: string;
  siteAddress: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  status: AppointmentStatus;
};

/**
 * Daily report status values (in Arabic)
 * - مكتمل: Completed
 * - مسودة: Draft
 * - قيد المراجعة: Under review
 */
export type DailyReportStatus = 'مكتمل' | 'مسودة' | 'قيد المراجعة';

/**
 * Daily report entity containing detailed information about cleaning jobs
 */
export type DailyReport = {
  id: string;
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

/**
 * Statistics card data
 */
export type Stat = {
  label: string;
  value: string;
  change: string; // Percentage change (e.g., "+12%" or "-5%")
};

/**
 * Worker status values (in Arabic)
 * - نشط: Active
 * - في إجازة: On leave
 */
export type WorkerStatus = 'نشط' | 'في إجازة';

/**
 * Worker entity representing team members
 */
export type Worker = {
    id: string;
    name: string;
    phone: string;
    nationalId: string;
    role: string;
    status: WorkerStatus;
    type: 'company' | 'external'; // Company employee or external contractor
};

/**
 * Task status values (in Arabic)
 * - جديدة: New
 * - قيد التنفيذ: In progress
 * - مكتملة: Completed
 */
export type TaskStatus = 'جديدة' | 'قيد التنفيذ' | 'مكتملة';

/**
 * Task priority levels (in Arabic)
 * - عالية: High
 * - متوسطة: Medium
 * - منخفضة: Low
 */
export type TaskPriority = 'عالية' | 'متوسطة' | 'منخفضة';

/**
 * Task entity for tracking work items
 */
export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO string for date
};

/**
 * Material/inventory item entity
 */
export type Material = {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unit: string; // e.g., "kg", "liters", "pieces"
}

/**
 * Equipment condition values (in Arabic)
 * - ممتازة: Excellent
 * - جيدة: Good
 * - تحتاج صيانة: Needs maintenance
 */
export type EquipmentCondition = 'ممتازة' | 'جيدة' | 'تحتاج صيانة';

/**
 * Equipment entity for tracking company tools and machinery
 */
export type Equipment = {
  id: string;
  name: string;
  condition: EquipmentCondition;
  quantity: number;
  supervisor: string; // Assigned supervisor
};
