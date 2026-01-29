'use client';

import { createFirestoreContext } from '@/lib/create-firestore-context';
import type { Task } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';
import { parseISO } from 'date-fns';

const { Provider, useHook } = createFirestoreContext<Task>({
  collectionName: 'tasks',
  contextName: 'useTasks',
  // Transform Firestore Timestamps to ISO strings when reading
  transformData: (rawTasks: (Omit<Task, 'dueDate'> & { dueDate: Timestamp })[]) => {
    return rawTasks
      .map(task => ({
        ...task,
        dueDate: task.dueDate.toDate().toISOString(),
      }))
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  },
  // Transform ISO string to Firestore Timestamp when adding
  transformBeforeAdd: (taskData: Omit<Task, 'id'>) => ({
    ...taskData,
    dueDate: Timestamp.fromDate(parseISO(taskData.dueDate)),
  }),
  // Transform ISO string to Firestore Timestamp when updating
  transformBeforeUpdate: (updatedData: Partial<Omit<Task, 'id'>>) => {
    const dataToUpdate: any = { ...updatedData };
    if (updatedData.dueDate) {
      dataToUpdate.dueDate = Timestamp.fromDate(parseISO(updatedData.dueDate));
    }
    return dataToUpdate;
  },
});

export const TasksProvider = Provider;

export function useTasks() {
  const { data, add, update, delete: deleteItem } = useHook();
  return {
    tasks: data,
    addTask: add,
    updateTask: update,
    deleteTask: deleteItem,
  };
}
