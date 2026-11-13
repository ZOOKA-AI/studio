'use client';

import { createContext, ReactNode } from 'react';
import type { Task } from '@/lib/types';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, doc, Timestamp } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { createDocument, updateDocument, deleteDocument } from '@/firebase/firestore-operations';
import { createContextHook } from '@/lib/context-utils';
import { timestampToISO, isoToTimestamp } from '@/lib/timestamp-utils';

type TasksContextType = {
  tasks: Task[];
  addTask: (taskData: Omit<Task, 'id'>) => void;
  updateTask: (taskId: string, updatedData: Partial<Omit<Task, 'id'>>) => void;
  deleteTask: (taskId: string) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const { firestore } = useFirebase();
  const tasksRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'tasks') : null),
    [firestore]
  );
  
  const { data: rawTasks = [] } = useCollection<Omit<Task, 'dueDate'> & {dueDate: Timestamp}>(tasksRef);
  
  const tasks: Task[] = (rawTasks || []).map(task => ({
      ...task,
      dueDate: timestampToISO(task.dueDate),
  })).sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const addTask = (taskData: Omit<Task, 'id'>) => {
    if (!firestore) return;
    const tasksCollection = collection(firestore, 'tasks');
    const newTask = {
        ...taskData,
        dueDate: isoToTimestamp(taskData.dueDate),
    };
    
    createDocument(tasksCollection, newTask);
  };

  const updateTask = (taskId: string, updatedData: Partial<Omit<Task, 'id'>>) => {
    if (!firestore) return;
    const taskDocRef = doc(firestore, 'tasks', taskId);
    
    // Convert dueDate back to Timestamp if it exists
    const dataToUpdate: any = {...updatedData};
    if (updatedData.dueDate) {
        dataToUpdate.dueDate = isoToTimestamp(updatedData.dueDate);
    }

    updateDocument(taskDocRef, dataToUpdate);
  };
  
  const deleteTask = (taskId: string) => {
    if (!firestore) return;
    const taskDocRef = doc(firestore, 'tasks', taskId);

    deleteDocument(taskDocRef);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = createContextHook(TasksContext, 'useTasks');
