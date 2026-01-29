'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { handlePermissionError } from './firestore-utils';

/**
 * Configuration for creating a Firestore context
 */
export interface FirestoreContextConfig<T extends { id: string }> {
  /** Firestore collection name */
  collectionName: string;
  /** Name of the context for error messages */
  contextName: string;
  /** Optional: Transform data after fetching from Firestore */
  transformData?: (data: any[]) => T[];
  /** Optional: Transform data before adding to Firestore */
  transformBeforeAdd?: (data: Omit<T, 'id'>) => any;
  /** Optional: Transform data before updating in Firestore */
  transformBeforeUpdate?: (data: Partial<Omit<T, 'id'>>) => any;
}

/**
 * Generic context type for Firestore collections
 */
export interface FirestoreContextType<T extends { id: string }> {
  data: T[];
  add: (item: Omit<T, 'id'>) => void;
  update: (id: string, item: Partial<Omit<T, 'id'>>) => void;
  delete: (id: string) => void;
}

/**
 * Creates a Firestore context provider and hook
 * This generic factory eliminates code duplication across similar context providers
 * 
 * @param config Configuration for the Firestore context
 * @returns Object containing Provider component and useHook function
 */
export function createFirestoreContext<T extends { id: string }>(
  config: FirestoreContextConfig<T>
) {
  const {
    collectionName,
    contextName,
    transformData = (data) => data as T[],
    transformBeforeAdd = (data) => data,
    transformBeforeUpdate = (data) => data,
  } = config;

  // Create the context
  const Context = createContext<FirestoreContextType<T> | undefined>(undefined);

  // Create the provider component
  function Provider({ children }: { children: ReactNode }) {
    const { firestore } = useFirebase();
    
    const collectionRef = useMemoFirebase(
      () => (firestore ? collection(firestore, collectionName) : null),
      [firestore]
    );

    const { data: rawData = [] } = useCollection<any>(collectionRef);
    
    // Transform data if needed
    const data = transformData(rawData || []);

    const add = (item: Omit<T, 'id'>) => {
      if (!firestore) return;
      const colRef = collection(firestore, collectionName);
      const transformedData = transformBeforeAdd(item);
      
      addDoc(colRef, transformedData)
        .catch(() => {
          handlePermissionError(colRef.path, 'create', transformedData);
        });
    };

    const update = (id: string, item: Partial<Omit<T, 'id'>>) => {
      if (!firestore) return;
      const docRef = doc(firestore, collectionName, id);
      const transformedData = transformBeforeUpdate(item);
      
      updateDoc(docRef, transformedData)
        .catch(() => {
          handlePermissionError(docRef.path, 'update', transformedData);
        });
    };

    const deleteItem = (id: string) => {
      if (!firestore) return;
      const docRef = doc(firestore, collectionName, id);

      deleteDoc(docRef)
        .catch(() => {
          handlePermissionError(docRef.path, 'delete');
        });
    };

    return (
      <Context.Provider value={{ data, add, update, delete: deleteItem }}>
        {children}
      </Context.Provider>
    );
  }

  // Create the hook
  function useHook() {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error(`${contextName} must be used within a ${contextName}Provider`);
    }
    return context;
  }

  return {
    Provider,
    useHook,
    Context,
  };
}
