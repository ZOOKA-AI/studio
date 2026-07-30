import { Timestamp } from 'firebase/firestore';
import { parseISO } from 'date-fns';

/**
 * Converts a Firestore Timestamp to an ISO string
 */
export function timestampToISO(timestamp: Timestamp): string {
  return timestamp.toDate().toISOString();
}

/**
 * Converts an ISO string to a Firestore Timestamp
 */
export function isoToTimestamp(isoString: string): Timestamp {
  return Timestamp.fromDate(parseISO(isoString));
}

/**
 * Converts a Date object to a Firestore Timestamp
 */
export function dateToTimestamp(date: Date): Timestamp {
  return Timestamp.fromDate(date);
}
