'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';

// This matches the Material entity in backend.json, but for client-side use.
export type Material = {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unit: string;
};

type MaterialsContextType = {
  materials: Material[];
  // Future actions like addMaterial, updateMaterialQuantity will go here
};

const MaterialsContext = createContext<MaterialsContextType | undefined>(undefined);

export function MaterialsProvider({ children }: { children: ReactNode }) {
  const { firestore } = useFirebase();

  // Memoize the collection reference.
  const materialsRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'materials') : null),
    [firestore]
  );
  
  // Use the useCollection hook to fetch data.
  const { data: materials = [] } = useCollection<Material>(materialsRef);

  const value = useMemo(
    () => ({ materials: materials || [] }),
    [materials]
  );

  return (
    <MaterialsContext.Provider value={value}>
      {children}
    </MaterialsContext.Provider>
  );
}

export function useMaterials() {
  const context = useContext(MaterialsContext);
  if (context === undefined) {
    throw new Error('useMaterials must be used within a MaterialsProvider');
  }
  return context;
}
