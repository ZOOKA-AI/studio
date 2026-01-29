'use client';

import { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import type { Equipment } from '@/lib/types';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

type EquipmentContextType = {
  equipment: Equipment[];
  addEquipment: (equipmentData: Omit<Equipment, 'id'>) => void;
  updateEquipment: (equipmentId: string, updatedData: Partial<Omit<Equipment, 'id'>>) => void;
  deleteEquipment: (equipmentId: string) => void;
};

const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

export function EquipmentProvider({ children }: { children: ReactNode }) {
  const { firestore } = useFirebase();
  const equipmentRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'equipment') : null),
    [firestore]
  );
  
  const { data: equipment = [] } = useCollection<Equipment>(equipmentRef);

  const addEquipment = useCallback((equipmentData: Omit<Equipment, 'id'>) => {
    if (!firestore) return;
    const equipmentCollection = collection(firestore, 'equipment');
    
    addDoc(equipmentCollection, equipmentData)
      .catch((error) => {
        const permissionError = new FirestorePermissionError({
          path: equipmentCollection.path,
          operation: 'create',
          requestResourceData: equipmentData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  }, [firestore]);

  const updateEquipment = useCallback((equipmentId: string, updatedData: Partial<Omit<Equipment, 'id'>>) => {
    if (!firestore) return;
    const equipmentDocRef = doc(firestore, 'equipment', equipmentId);
    
    updateDoc(equipmentDocRef, updatedData)
      .catch((error) => {
        const permissionError = new FirestorePermissionError({
          path: equipmentDocRef.path,
          operation: 'update',
          requestResourceData: updatedData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  }, [firestore]);
  
  const deleteEquipment = useCallback((equipmentId: string) => {
    if (!firestore) return;
    const equipmentDocRef = doc(firestore, 'equipment', equipmentId);

    deleteDoc(equipmentDocRef)
      .catch((error) => {
        const permissionError = new FirestorePermissionError({
          path: equipmentDocRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  }, [firestore]);

  const value = useMemo(
    () => ({ equipment: equipment || [], addEquipment, updateEquipment, deleteEquipment }),
    [equipment, addEquipment, updateEquipment, deleteEquipment]
  );

  return (
    <EquipmentContext.Provider value={value}>
      {children}
    </EquipmentContext.Provider>
  );
}

export function useEquipment() {
  const context = useContext(EquipmentContext);
  if (context === undefined) {
    throw new Error('useEquipment must be used within a EquipmentProvider');
  }
  return context;
}
