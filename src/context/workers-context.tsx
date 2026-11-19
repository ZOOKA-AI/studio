'use client';

import { createContext, ReactNode } from 'react';
import type { Worker } from '@/lib/types';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, doc } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { createDocument, updateDocument, deleteDocument } from '@/firebase/firestore-operations';
import { createContextHook } from '@/lib/context-utils';

type WorkersContextType = {
  workers: Worker[];
  addWorker: (workerData: Omit<Worker, 'id' | 'type'>, type: 'company' | 'external') => void;
  updateWorker: (workerId: string, updatedData: Partial<Omit<Worker, 'id'>>) => void;
  deleteWorker: (workerId: string) => void;
};

const WorkersContext = createContext<WorkersContextType | undefined>(undefined);

export function WorkersProvider({ children }: { children: ReactNode }) {
  const { firestore } = useFirebase();
  const workersRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'workers') : null),
    [firestore]
  );
  
  const { data: workers = [] } = useCollection<Worker>(workersRef);

  const addWorker = (workerData: Omit<Worker, 'id' | 'type'>, type: 'company' | 'external') => {
    if (!firestore) return;
    const workersCollection = collection(firestore, 'workers');
    const newWorker = { ...workerData, type };
    
    createDocument(workersCollection, newWorker);
  };

  const updateWorker = (workerId: string, updatedData: Partial<Omit<Worker, 'id'>>) => {
    if (!firestore) return;
    const workerDocRef = doc(firestore, 'workers', workerId);
    
    updateDocument(workerDocRef, updatedData);
  };
  
  const deleteWorker = (workerId: string) => {
    if (!firestore) return;
    const workerDocRef = doc(firestore, 'workers', workerId);

    deleteDocument(workerDocRef);
  };

  return (
    <WorkersContext.Provider value={{ workers: workers || [], addWorker, updateWorker, deleteWorker }}>
      {children}
    </WorkersContext.Provider>
  );
}

export const useWorkers = createContextHook(WorkersContext, 'useWorkers');
