'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { Task } from '@/lib/types';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { parseISO } from 'date-fns';

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

  const { data: rawTasks = [] } = useCollection<Omit<Task, 'dueDate'> & { dueDate: Timestamp }>(
    tasksRef
  );

  const tasks: Task[] = (rawTasks || [])
    .map(task => ({
      ...task,
      dueDate: task.dueDate.toDate().toISOString(),
    }))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const addTask = (taskData: Omit<Task, 'id'>) => {
    if (!firestore) return;
    const tasksCollection = collection(firestore, 'tasks');
    const newTask = {
      ...taskData,
      dueDate: Timestamp.fromDate(parseISO(taskData.dueDate)),
    };

    addDoc(tasksCollection, newTask).catch(error => {
      const permissionError = new FirestorePermissionError({
        path: tasksCollection.path,
        operation: 'create',
        requestResourceData: newTask,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const updateTask = (taskId: string, updatedData: Partial<Omit<Task, 'id'>>) => {
    if (!firestore) return;
    const taskDocRef = doc(firestore, 'tasks', taskId);

    // Convert dueDate back to Timestamp if it exists
    const dataToUpdate: any = { ...updatedData };
    if (updatedData.dueDate) {
      dataToUpdate.dueDate = Timestamp.fromDate(parseISO(updatedData.dueDate));
    }

    updateDoc(taskDocRef, dataToUpdate).catch(error => {
      const permissionError = new FirestorePermissionError({
        path: taskDocRef.path,
        operation: 'update',
        requestResourceData: dataToUpdate,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const deleteTask = (taskId: string) => {
    if (!firestore) return;
    const taskDocRef = doc(firestore, 'tasks', taskId);

    deleteDoc(taskDocRef).catch(error => {
      const permissionError = new FirestorePermissionError({
        path: taskDocRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}
