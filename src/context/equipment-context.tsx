'use client';

import { createFirestoreContext } from '@/lib/create-firestore-context';
import type { Equipment } from '@/lib/types';

const { Provider, useHook } = createFirestoreContext<Equipment>({
  collectionName: 'equipment',
  contextName: 'useEquipment',
});

export const EquipmentProvider = Provider;

export function useEquipment() {
  const { data, add, update, delete: deleteItem } = useHook();
  return {
    equipment: data,
    addEquipment: add,
    updateEquipment: update,
    deleteEquipment: deleteItem,
  };
}
