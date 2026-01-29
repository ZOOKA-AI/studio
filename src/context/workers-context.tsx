'use client';

import { createFirestoreContext } from '@/lib/create-firestore-context';
import type { Worker } from '@/lib/types';

const { Provider, useHook } = createFirestoreContext<Worker>({
  collectionName: 'workers',
  contextName: 'useWorkers',
});

export const WorkersProvider = Provider;

export function useWorkers() {
  const { data, add, update, delete: deleteItem } = useHook();
  
  // Custom addWorker that accepts type parameter
  const addWorker = (workerData: Omit<Worker, 'id' | 'type'>, type: 'company' | 'external') => {
    add({ ...workerData, type } as Omit<Worker, 'id'>);
  };
  
  return {
    workers: data,
    addWorker,
    updateWorker: update,
    deleteWorker: deleteItem,
  };
}
