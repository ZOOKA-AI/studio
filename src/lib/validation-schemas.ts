/**
 * Zod Validation Schemas for Firestore Collections
 * 
 * These schemas provide runtime validation for data going into and coming out of Firestore.
 * They ensure type safety and data integrity across the application.
 */

import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';

/**
 * Custom Zod schema for Firestore Timestamp
 */
export const FirestoreTimestampSchema = z.custom<Timestamp>(
  (val) => val instanceof Timestamp,
  { message: 'Must be a Firestore Timestamp' }
);

/**
 * User roles enum
 */
export const UserRoleSchema = z.enum(['admin', 'supervisor', 'worker']);
export type UserRole = z.infer<typeof UserRoleSchema>;

/**
 * User schema
 */
export const UserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  role: UserRoleSchema,
  phone: z.string().optional(),
  createdAt: FirestoreTimestampSchema.optional(),
  updatedAt: FirestoreTimestampSchema.optional(),
});

export type User = z.infer<typeof UserSchema>;

/**
 * User input schema (for creating/updating users)
 */
export const UserInputSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type UserInput = z.infer<typeof UserInputSchema>;

/**
 * Site schema
 */
export const SiteSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  clientId: z.string().min(1),
  address: z.string().min(1),
  specialInstructions: z.string().optional(),
  createdAt: FirestoreTimestampSchema.optional(),
  updatedAt: FirestoreTimestampSchema.optional(),
});

export type Site = z.infer<typeof SiteSchema>;

export const SiteInputSchema = SiteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type SiteInput = z.infer<typeof SiteInputSchema>;

/**
 * Client schema
 */
export const ClientSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  createdAt: FirestoreTimestampSchema.optional(),
  updatedAt: FirestoreTimestampSchema.optional(),
});

export type Client = z.infer<typeof ClientSchema>;

export const ClientInputSchema = ClientSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ClientInput = z.infer<typeof ClientInputSchema>;

/**
 * Report status enum
 */
export const ReportStatusSchema = z.enum(['draft', 'in_progress', 'completed', 'approved']);
export type ReportStatus = z.infer<typeof ReportStatusSchema>;

/**
 * Worker info schema (embedded in reports)
 */
export const WorkerInfoSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

export type WorkerInfo = z.infer<typeof WorkerInfoSchema>;

/**
 * Daily Report schema
 */
export const DailyReportSchema = z.object({
  id: z.string().min(1),
  date: FirestoreTimestampSchema,
  siteId: z.string().min(1),
  siteName: z.string().optional(),
  clientName: z.string().min(1),
  supervisorId: z.string().min(1),
  workerIds: z.array(z.string()).min(1),
  workers: z.array(WorkerInfoSchema).min(1),
  startTime: z.string(),
  endTime: z.string(),
  tasks: z.array(z.string()).min(1),
  additionalTasks: z.array(z.string()).optional().default([]),
  materials: z.array(z.string()).optional().default([]),
  beforeImages: z.array(z.string().url()).optional().default([]),
  afterImages: z.array(z.string().url()).optional().default([]),
  clientSignature: z.string().optional(),
  supervisorSignature: z.string().optional(),
  status: ReportStatusSchema,
  totalCost: z.number().min(0).optional(),
  notes: z.string().optional(),
  createdAt: FirestoreTimestampSchema.optional(),
  updatedAt: FirestoreTimestampSchema.optional(),
});

export type DailyReportType = z.infer<typeof DailyReportSchema>;

export const DailyReportInputSchema = DailyReportSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial({
  status: true,
  workerIds: true,
  supervisorId: true,
});

export type DailyReportInput = z.infer<typeof DailyReportInputSchema>;

/**
 * Schedule status enum
 */
export const ScheduleStatusSchema = z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']);
export type ScheduleStatus = z.infer<typeof ScheduleStatusSchema>;

/**
 * Schedule schema
 */
export const ScheduleSchema = z.object({
  id: z.string().min(1),
  siteId: z.string().min(1),
  siteName: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  supervisorId: z.string().optional(),
  workerIds: z.array(z.string()).optional().default([]),
  status: ScheduleStatusSchema.optional(),
  notes: z.string().optional(),
  createdAt: FirestoreTimestampSchema.optional(),
  updatedAt: FirestoreTimestampSchema.optional(),
});

export type Schedule = z.infer<typeof ScheduleSchema>;

export const ScheduleInputSchema = ScheduleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ScheduleInput = z.infer<typeof ScheduleInputSchema>;

/**
 * Task schema
 */
export const TaskSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  estimatedDuration: z.number().min(0).optional(),
  createdAt: FirestoreTimestampSchema.optional(),
  updatedAt: FirestoreTimestampSchema.optional(),
});

export type Task = z.infer<typeof TaskSchema>;

export const TaskInputSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type TaskInput = z.infer<typeof TaskInputSchema>;

/**
 * Material schema
 */
export const MaterialSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  unit: z.string().optional(),
  createdAt: FirestoreTimestampSchema.optional(),
  updatedAt: FirestoreTimestampSchema.optional(),
});

export type Material = z.infer<typeof MaterialSchema>;

export const MaterialInputSchema = MaterialSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type MaterialInput = z.infer<typeof MaterialInputSchema>;

/**
 * Equipment condition enum
 */
export const EquipmentConditionSchema = z.enum(['ممتازة', 'جيدة', 'تحتاج صيانة']);
export type EquipmentCondition = z.infer<typeof EquipmentConditionSchema>;

/**
 * Equipment schema
 */
export const EquipmentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  condition: EquipmentConditionSchema,
  quantity: z.number().min(0),
  supervisor: z.string().min(1),
  lastMaintenanceDate: z.string().optional(),
  nextMaintenanceDate: z.string().optional(),
  createdAt: FirestoreTimestampSchema.optional(),
  updatedAt: FirestoreTimestampSchema.optional(),
});

export type Equipment = z.infer<typeof EquipmentSchema>;

export const EquipmentInputSchema = EquipmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type EquipmentInput = z.infer<typeof EquipmentInputSchema>;

/**
 * Worker Task status enum
 */
export const WorkerTaskStatusSchema = z.enum(['pending', 'in_progress', 'completed']);
export type WorkerTaskStatus = z.infer<typeof WorkerTaskStatusSchema>;

/**
 * Worker Task schema
 */
export const WorkerTaskSchema = z.object({
  id: z.string().min(1),
  workerId: z.string().min(1),
  taskId: z.string().min(1),
  dailyReportId: z.string().min(1),
  hours: z.number().min(0),
  status: WorkerTaskStatusSchema.optional(),
  notes: z.string().optional(),
  createdAt: FirestoreTimestampSchema.optional(),
  updatedAt: FirestoreTimestampSchema.optional(),
});

export type WorkerTask = z.infer<typeof WorkerTaskSchema>;

export const WorkerTaskInputSchema = WorkerTaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type WorkerTaskInput = z.infer<typeof WorkerTaskInputSchema>;

/**
 * Appointment status enum
 */
export const AppointmentStatusSchema = z.enum(['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled']);
export type AppointmentStatus = z.infer<typeof AppointmentStatusSchema>;

/**
 * Appointment schema
 */
export const AppointmentSchema = z.object({
  id: z.string().min(1),
  clientId: z.string().min(1),
  siteId: z.string().optional(),
  title: z.string().min(1),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  status: AppointmentStatusSchema.optional(),
  supervisorId: z.string().optional(),
  notes: z.string().optional(),
  createdAt: FirestoreTimestampSchema.optional(),
  updatedAt: FirestoreTimestampSchema.optional(),
});

export type Appointment = z.infer<typeof AppointmentSchema>;

export const AppointmentInputSchema = AppointmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type AppointmentInput = z.infer<typeof AppointmentInputSchema>;

/**
 * Audit action enum
 */
export const AuditActionSchema = z.enum(['create', 'update', 'delete']);
export type AuditAction = z.infer<typeof AuditActionSchema>;

/**
 * Audit Log schema
 */
export const AuditLogSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  entityType: z.string().min(1),
  entityId: z.string().min(1),
  timestamp: FirestoreTimestampSchema,
  action: AuditActionSchema,
  oldValue: z.string().optional(),
  newValue: z.string().optional(),
  changes: z.record(z.object({
    old: z.any(),
    new: z.any(),
  })).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

export type AuditLog = z.infer<typeof AuditLogSchema>;

export const AuditLogInputSchema = AuditLogSchema.omit({
  id: true,
  timestamp: true,
});

export type AuditLogInput = z.infer<typeof AuditLogInputSchema>;

/**
 * Validation helper functions
 */

/**
 * Validate data against a schema
 * @throws ZodError if validation fails
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

/**
 * Safely validate data against a schema
 * @returns { success: true, data } or { success: false, error }
 */
export function safeValidateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Get validation errors in a human-readable format
 */
export function getValidationErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    errors[path] = err.message;
  });
  
  return errors;
}
