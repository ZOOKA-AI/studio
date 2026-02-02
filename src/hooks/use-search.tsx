'use client';

import { useState, useEffect, useCallback } from 'react';
import { Query, DocumentData, getDocs, QuerySnapshot } from 'firebase/firestore';
import { WithId } from '@/firebase/firestore/use-collection';

/**
 * Interface for the return value of the useSearch hook
 */
export interface UseSearchResult<T> {
  /** Search results with ID */
  results: WithId<T>[];
  /** Whether search is in progress */
  isSearching: boolean;
  /** Error object if search failed */
  error: Error | null;
  /** Execute the search */
  executeSearch: () => Promise<void>;
  /** Clear search results */
  clearResults: () => void;
  /** Whether there are more results available */
  hasMore: boolean;
  /** Load more results (pagination) */
  loadMore: () => Promise<void>;
}

/**
 * React hook for searching Firestore collections
 * 
 * Unlike useCollection which provides real-time updates,
 * this hook performs one-time queries and supports pagination.
 * 
 * @template T Type of the document data
 * @param buildQuery Function that builds the Firestore query based on current params
 * @param autoSearch Whether to automatically execute search when query changes
 * @returns UseSearchResult object
 * 
 * @example
 * const { results, isSearching, executeSearch } = useSearch(
 *   () => buildDailyReportsQuery(db, { supervisorId: userId }),
 *   true
 * );
 */
export function useSearch<T = any>(
  buildQuery: (() => Query<DocumentData> | null) | null,
  autoSearch: boolean = false
): UseSearchResult<T> {
  const [results, setResults] = useState<WithId<T>[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const executeSearch = useCallback(async () => {
    if (!buildQuery) {
      setResults([]);
      setError(null);
      setIsSearching(false);
      return;
    }

    const queryToExecute = buildQuery();
    if (!queryToExecute) {
      setResults([]);
      setError(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const snapshot: QuerySnapshot<DocumentData> = await getDocs(queryToExecute);
      
      const searchResults: WithId<T>[] = snapshot.docs.map(doc => ({
        ...(doc.data() as T),
        id: doc.id,
      }));

      setResults(searchResults);
      
      // Store last document for pagination
      if (snapshot.docs.length > 0) {
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        // If we got fewer results than expected, there might not be more
        setHasMore(snapshot.docs.length >= 20); // Assuming default limit of 20
      } else {
        setLastDoc(null);
        setHasMore(false);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err : new Error('Search failed'));
      setResults([]);
      setHasMore(false);
    } finally {
      setIsSearching(false);
    }
  }, [buildQuery]);

  const loadMore = useCallback(async () => {
    if (!buildQuery || !lastDoc || !hasMore) return;

    const queryToExecute = buildQuery();
    if (!queryToExecute) return;

    setIsSearching(true);
    setError(null);

    try {
      const snapshot: QuerySnapshot<DocumentData> = await getDocs(queryToExecute);
      
      const moreResults: WithId<T>[] = snapshot.docs.map(doc => ({
        ...(doc.data() as T),
        id: doc.id,
      }));

      setResults(prev => [...prev, ...moreResults]);
      
      if (snapshot.docs.length > 0) {
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length >= 20);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Load more error:', err);
      setError(err instanceof Error ? err : new Error('Load more failed'));
    } finally {
      setIsSearching(false);
    }
  }, [buildQuery, lastDoc, hasMore]);

  const clearResults = useCallback(() => {
    setResults([]);
    setLastDoc(null);
    setHasMore(true);
    setError(null);
  }, []);

  // Auto-search when query changes (if enabled)
  useEffect(() => {
    if (autoSearch) {
      executeSearch();
    }
  }, [autoSearch, executeSearch]);

  return {
    results,
    isSearching,
    error,
    executeSearch,
    clearResults,
    hasMore,
    loadMore,
  };
}

/**
 * Hook for debounced search (useful for search-as-you-type)
 * 
 * @param buildQuery Function that builds the query
 * @param delay Debounce delay in milliseconds
 * @returns UseSearchResult object
 */
export function useDebouncedSearch<T = any>(
  buildQuery: (() => Query<DocumentData> | null) | null,
  delay: number = 300
): UseSearchResult<T> {
  const [debouncedBuildQuery, setDebouncedBuildQuery] = useState<(() => Query<DocumentData> | null) | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedBuildQuery(() => buildQuery);
    }, delay);

    return () => clearTimeout(timer);
  }, [buildQuery, delay]);

  return useSearch<T>(debouncedBuildQuery, true);
}
