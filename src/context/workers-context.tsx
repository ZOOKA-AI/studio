'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { Worker } from '@/lib/types';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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

    addDoc(workersCollection, newWorker).catch(error => {
      const permissionError = new FirestorePermissionError({
        path: workersCollection.path,
        operation: 'create',
        requestResourceData: newWorker,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const updateWorker = (workerId: string, updatedData: Partial<Omit<Worker, 'id'>>) => {
    if (!firestore) return;
    const workerDocRef = doc(firestore, 'workers', workerId);

    updateDoc(workerDocRef, updatedData).catch(error => {
      const permissionError = new FirestorePermissionError({
        path: workerDocRef.path,
        operation: 'update',
        requestResourceData: updatedData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const deleteWorker = (workerId: string) => {
    if (!firestore) return;
    const workerDocRef = doc(firestore, 'workers', workerId);

    deleteDoc(workerDocRef).catch(error => {
      const permissionError = new FirestorePermissionError({
        path: workerDocRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  return (
    <WorkersContext.Provider
      value={{ workers: workers || [], addWorker, updateWorker, deleteWorker }}
    >
      {children}
    </WorkersContext.Provider>
  );
}

export function useWorkers() {
  const context = useContext(WorkersContext);
  if (context === undefined) {
    throw new Error('useWorkers must be used within a WorkersProvider');
  }
  return context;
}
