'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Task } from '@/lib/types';
import { mockTasks } from '@/lib/data';
import { format } from 'date-fns';

type TasksContextType = {
  tasks: Task[];
  addTask: (taskData: Omit<Task, 'id'>) => void;
  updateTask: (taskId: string, updatedData: Partial<Omit<Task, 'id'>>) => void;
  deleteTask: (taskId: string) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      id: new Date().toISOString(),
      ...taskData,
    };
    setTasks(prevTasks => [newTask, ...prevTasks].sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
  };

  const updateTask = (taskId: string, updatedData: Partial<Omit<Task, 'id'>>) => {
    setTasks(prevTasks =>
      prevTasks.map(t => (t.id === taskId ? { ...t, ...updatedData } : t)).sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    );
  };
  
  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
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
