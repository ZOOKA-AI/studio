/**
 * Application-wide constants
 * Centralized location for all hardcoded values to improve maintainability
 */

// User and Company Information
export const SUPERVISOR_NAME = 'محمد المشرف';
export const COMPANY_NAME = 'رويال للتنظيف';

// Default Time Values
export const DEFAULT_START_TIME = '09:00';
export const DEFAULT_END_TIME = '17:00';
export const DEFAULT_WORKING_HOURS = 8;
export const DEFAULT_APPOINTMENT_DURATION_HOURS = 2;

// Appointment Statuses
export const APPOINTMENT_STATUSES = [
  'مكتمل',
  'قيد التنفيذ',
  'متأخر',
  'مجدول',
  'مؤجل',
  'حجز جديد',
] as const;

// Default Values
export const DEFAULT_SITE_ADDRESS = 'غير محدد';
export const DEFAULT_REPORT_STATUS = 'قيد المراجعة';

// Placeholder IDs
export const USER_AVATAR_ID = 'user-avatar-1';
export const COMPANY_LOGO_ID = 'company-logo-1';
