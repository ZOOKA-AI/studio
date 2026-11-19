/**
 * Search Utilities for Firestore
 * 
 * Provides search functionality for various collections in the Royal Clean Dashboard.
 * Since Firestore doesn't support full-text search natively, we implement:
 * 
 * 1. Field-based filtering (exact match, prefix match)
 * 2. Array-contains queries for tags/categories
 * 3. Range queries for dates and numbers
 * 
 * For advanced full-text search, consider integrating:
 * - Algolia
 * - Elasticsearch
 * - Cloud Functions with text indexing
 */

import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint,
  Query,
  DocumentData,
  Firestore,
  WhereFilterOp,
} from 'firebase/firestore';

/**
 * Base search parameters
 */
export interface SearchParams {
  /** Search text (for prefix matching on specified fields) */
  searchText?: string;
  /** Maximum number of results to return */
  limit?: number;
  /** Last document from previous page (for pagination) */
  startAfterDoc?: DocumentData;
}

/**
 * Daily Reports search parameters
 */
export interface DailyReportSearchParams extends SearchParams {
  /** Filter by site ID */
  siteId?: string;
  /** Filter by supervisor ID */
  supervisorId?: string;
  /** Filter by worker ID (array-contains) */
  workerId?: string;
  /** Filter by status */
  status?: string;
  /** Filter by date range */
  dateFrom?: Date;
  dateTo?: Date;
  /** Search in client name */
  clientName?: string;
}

/**
 * Sites search parameters
 */
export interface SiteSearchParams extends SearchParams {
  /** Filter by client ID */
  clientId?: string;
  /** Search in site name */
  name?: string;
}

/**
 * Clients search parameters
 */
export interface ClientSearchParams extends SearchParams {
  /** Search in client name */
  name?: string;
  /** Search in contact email */
  contactEmail?: string;
}

/**
 * Workers search parameters
 */
export interface WorkerSearchParams extends SearchParams {
  /** Filter by role */
  role?: string;
  /** Search in name */
  name?: string;
  /** Search in email */
  email?: string;
}

/**
 * Schedules search parameters
 */
export interface ScheduleSearchParams extends SearchParams {
  /** Filter by site ID */
  siteId?: string;
  /** Filter by supervisor ID */
  supervisorId?: string;
  /** Filter by worker ID (array-contains) */
  workerId?: string;
  /** Filter by status */
  status?: string;
  /** Filter by time range */
  startTimeFrom?: Date;
  startTimeTo?: Date;
}

/**
 * Build a Firestore query for searching daily reports
 */
export function buildDailyReportsQuery(
  db: Firestore,
  params: DailyReportSearchParams
): Query<DocumentData> {
  const constraints: QueryConstraint[] = [];
  const collectionRef = collection(db, 'dailyReports');

  // Add filters
  if (params.siteId) {
    constraints.push(where('siteId', '==', params.siteId));
  }

  if (params.supervisorId) {
    constraints.push(where('supervisorId', '==', params.supervisorId));
  }

  if (params.workerId) {
    constraints.push(where('workerIds', 'array-contains', params.workerId));
  }

  if (params.status) {
    constraints.push(where('status', '==', params.status));
  }

  // Date range queries
  if (params.dateFrom) {
    constraints.push(where('date', '>=', params.dateFrom));
  }

  if (params.dateTo) {
    constraints.push(where('date', '<=', params.dateTo));
  }

  // Default ordering by date (descending)
  if (!constraints.some(c => c.type === 'orderBy')) {
    constraints.push(orderBy('date', 'desc'));
  }

  // Limit results
  if (params.limit) {
    constraints.push(limit(params.limit));
  }

  // Pagination
  if (params.startAfterDoc) {
    constraints.push(startAfter(params.startAfterDoc));
  }

  return query(collectionRef, ...constraints);
}

/**
 * Build a Firestore query for searching sites
 */
export function buildSitesQuery(
  db: Firestore,
  params: SiteSearchParams
): Query<DocumentData> {
  const constraints: QueryConstraint[] = [];
  const collectionRef = collection(db, 'sites');

  if (params.clientId) {
    constraints.push(where('clientId', '==', params.clientId));
  }

  // For name search, we can use prefix matching with >= and <
  if (params.name) {
    constraints.push(where('name', '>=', params.name));
    constraints.push(where('name', '<', params.name + '\uf8ff'));
  }

  // Default ordering
  if (!constraints.some(c => c.type === 'orderBy')) {
    constraints.push(orderBy('createdAt', 'desc'));
  }

  if (params.limit) {
    constraints.push(limit(params.limit));
  }

  if (params.startAfterDoc) {
    constraints.push(startAfter(params.startAfterDoc));
  }

  return query(collectionRef, ...constraints);
}

/**
 * Build a Firestore query for searching clients
 */
export function buildClientsQuery(
  db: Firestore,
  params: ClientSearchParams
): Query<DocumentData> {
  const constraints: QueryConstraint[] = [];
  const collectionRef = collection(db, 'clients');

  // Prefix matching for name
  if (params.name) {
    constraints.push(where('name', '>=', params.name));
    constraints.push(where('name', '<', params.name + '\uf8ff'));
  }

  // Prefix matching for email
  if (params.contactEmail) {
    constraints.push(where('contactEmail', '>=', params.contactEmail));
    constraints.push(where('contactEmail', '<', params.contactEmail + '\uf8ff'));
  }

  if (!constraints.some(c => c.type === 'orderBy')) {
    constraints.push(orderBy('name', 'asc'));
  }

  if (params.limit) {
    constraints.push(limit(params.limit));
  }

  if (params.startAfterDoc) {
    constraints.push(startAfter(params.startAfterDoc));
  }

  return query(collectionRef, ...constraints);
}

/**
 * Build a Firestore query for searching workers/users
 */
export function buildWorkersQuery(
  db: Firestore,
  params: WorkerSearchParams
): Query<DocumentData> {
  const constraints: QueryConstraint[] = [];
  const collectionRef = collection(db, 'users');

  if (params.role) {
    constraints.push(where('role', '==', params.role));
  }

  // Prefix matching for name
  if (params.name) {
    constraints.push(where('name', '>=', params.name));
    constraints.push(where('name', '<', params.name + '\uf8ff'));
  }

  // Prefix matching for email
  if (params.email) {
    constraints.push(where('email', '>=', params.email));
    constraints.push(where('email', '<', params.email + '\uf8ff'));
  }

  if (!constraints.some(c => c.type === 'orderBy')) {
    constraints.push(orderBy('createdAt', 'desc'));
  }

  if (params.limit) {
    constraints.push(limit(params.limit));
  }

  if (params.startAfterDoc) {
    constraints.push(startAfter(params.startAfterDoc));
  }

  return query(collectionRef, ...constraints);
}

/**
 * Build a Firestore query for searching schedules
 */
export function buildSchedulesQuery(
  db: Firestore,
  params: ScheduleSearchParams
): Query<DocumentData> {
  const constraints: QueryConstraint[] = [];
  const collectionRef = collection(db, 'schedules');

  if (params.siteId) {
    constraints.push(where('siteId', '==', params.siteId));
  }

  if (params.supervisorId) {
    constraints.push(where('supervisorId', '==', params.supervisorId));
  }

  if (params.workerId) {
    constraints.push(where('workerIds', 'array-contains', params.workerId));
  }

  if (params.status) {
    constraints.push(where('status', '==', params.status));
  }

  // Time range queries
  if (params.startTimeFrom) {
    constraints.push(where('startTime', '>=', params.startTimeFrom.toISOString()));
  }

  if (params.startTimeTo) {
    constraints.push(where('startTime', '<=', params.startTimeTo.toISOString()));
  }

  // Default ordering by start time
  if (!constraints.some(c => c.type === 'orderBy')) {
    constraints.push(orderBy('startTime', 'asc'));
  }

  if (params.limit) {
    constraints.push(limit(params.limit));
  }

  if (params.startAfterDoc) {
    constraints.push(startAfter(params.startAfterDoc));
  }

  return query(collectionRef, ...constraints);
}

/**
 * Client-side filtering for more complex searches
 * Use this after fetching initial results for additional filtering
 */
export function filterResultsClientSide<T extends Record<string, any>>(
  results: T[],
  searchText: string,
  fields: (keyof T)[]
): T[] {
  if (!searchText) return results;

  const lowerSearch = searchText.toLowerCase();
  return results.filter(item =>
    fields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerSearch);
      }
      return false;
    })
  );
}

/**
 * Get search suggestions based on partial input
 */
export async function getSearchSuggestions(
  db: Firestore,
  collectionName: string,
  field: string,
  partialText: string,
  maxSuggestions: number = 5
): Promise<string[]> {
  const q = query(
    collection(db, collectionName),
    where(field, '>=', partialText),
    where(field, '<', partialText + '\uf8ff'),
    orderBy(field),
    limit(maxSuggestions)
  );

  // Note: This would need to be executed with getDocs
  // This is a helper to build the query
  return [];
}
