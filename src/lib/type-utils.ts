/**
 * Type utilities for common patterns in the application
 */

import type { Timestamp } from 'firebase/firestore';
import type { Task, Appointment, DailyReport } from './types';

/**
 * Firestore types - converts Date fields to Timestamp for database operations
 */
export type TimestampTask = Omit<Task, 'dueDate'> & { dueDate: Timestamp };
export type TimestampAppointment = Omit<Appointment, 'startTime' | 'endTime'> & {
  startTime: Timestamp;
  endTime: Timestamp;
};
export type TimestampReport = Omit<DailyReport, 'date'> & { date: Timestamp };

/**
 * Form submission types - omits auto-generated or computed fields
 */
export type NewTask = Omit<Task, 'id'>;
export type NewAppointment = Omit<Appointment, 'id' | 'siteAddress' | 'endTime'>;
export type NewReport = Omit<DailyReport, 'hours' | 'id' | 'supervisor' | 'status'>;
export type UpdateTask = Partial<Omit<Task, 'id'>>;
