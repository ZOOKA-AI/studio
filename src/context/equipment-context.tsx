'use client';

import { createContext, ReactNode } from 'react';
import type { Equipment } from '@/lib/types';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, doc } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { createDocument, updateDocument, deleteDocument } from '@/firebase/firestore-operations';
import { createContextHook } from '@/lib/context-utils';

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

  const addEquipment = (equipmentData: Omit<Equipment, 'id'>) => {
    if (!firestore) return;
    const equipmentCollection = collection(firestore, 'equipment');
    
    createDocument(equipmentCollection, equipmentData);
  };

  const updateEquipment = (equipmentId: string, updatedData: Partial<Omit<Equipment, 'id'>>) => {
    if (!firestore) return;
    const equipmentDocRef = doc(firestore, 'equipment', equipmentId);
    
    updateDocument(equipmentDocRef, updatedData);
  };
  
  const deleteEquipment = (equipmentId: string) => {
    if (!firestore) return;
    const equipmentDocRef = doc(firestore, 'equipment', equipmentId);

    deleteDocument(equipmentDocRef);
  };

  return (
    <EquipmentContext.Provider value={{ equipment: equipment || [], addEquipment, updateEquipment, deleteEquipment }}>
      {children}
    </EquipmentContext.Provider>
  );
}

export const useEquipment = createContextHook(EquipmentContext, 'useEquipment');
