'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { Broadcast } from '@/lib/types';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

type BroadcastsContextType = {
  broadcasts: Broadcast[];
  addBroadcast: (broadcastData: Omit<Broadcast, 'id' | 'createdAt' | 'createdBy'>) => void;
  deleteBroadcast: (broadcastId: string) => void;
};

const BroadcastsContext = createContext<BroadcastsContextType | undefined>(undefined);

export function BroadcastsProvider({ children }: { children: ReactNode }) {
  const { firestore } = useFirebase();
  const broadcastsRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'broadcasts') : null),
    [firestore]
  );
  
  const { data: broadcasts = [] } = useCollection<Broadcast>(broadcastsRef);

  const addBroadcast = (broadcastData: Omit<Broadcast, 'id' | 'createdAt' | 'createdBy'>) => {
    if (!firestore) return;
    const broadcastsCollection = collection(firestore, 'broadcasts');
    const newBroadcast = { 
      ...broadcastData, 
      createdAt: new Date().toISOString(),
      createdBy: 'المشرف' // This should be the current user in a real implementation
    };
    
    addDoc(broadcastsCollection, newBroadcast)
      .catch((error) => {
        const permissionError = new FirestorePermissionError({
          path: broadcastsCollection.path,
          operation: 'create',
          requestResourceData: newBroadcast,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };
  
  const deleteBroadcast = (broadcastId: string) => {
    if (!firestore) return;
    const broadcastDocRef = doc(firestore, 'broadcasts', broadcastId);

    deleteDoc(broadcastDocRef)
      .catch((error) => {
        const permissionError = new FirestorePermissionError({
          path: broadcastDocRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  return (
    <BroadcastsContext.Provider value={{ broadcasts: broadcasts || [], addBroadcast, deleteBroadcast }}>
      {children}
    </BroadcastsContext.Provider>
  );
}

export function useBroadcasts() {
  const context = useContext(BroadcastsContext);
  if (context === undefined) {
    throw new Error('useBroadcasts must be used within a BroadcastsProvider');
  }
  return context;
}
