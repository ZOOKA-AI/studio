'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Worker } from '@/lib/types';
import { initialCompanyWorkers, initialExternalWorkers } from '@/lib/data';

type WorkersContextType = {
  workers: Worker[];
  addWorker: (workerData: Omit<Worker, 'id' | 'type'>, type: 'company' | 'external') => void;
  updateWorker: (workerId: string, updatedData: Partial<Omit<Worker, 'id'>>) => void;
  deleteWorker: (workerId: string) => void;
};

const WorkersContext = createContext<WorkersContextType | undefined>(undefined);

export function WorkersProvider({ children }: { children: ReactNode }) {
  const [workers, setWorkers] = useState<Worker[]>([...initialCompanyWorkers, ...initialExternalWorkers]);

  const addWorker = (workerData: Omit<Worker, 'id' | 'type'>, type: 'company' | 'external') => {
    const newWorker: Worker = {
      id: `${type === 'company' ? 'W' : 'E'}${Math.floor(Math.random() * 1000)}`,
      ...workerData,
      type,
    };
    setWorkers(prevWorkers => [newWorker, ...prevWorkers]);
  };

  const updateWorker = (workerId: string, updatedData: Partial<Omit<Worker, 'id'>>) => {
    setWorkers(prevWorkers =>
      prevWorkers.map(w => (w.id === workerId ? { ...w, ...updatedData } : w))
    );
  };
  
  const deleteWorker = (workerId: string) => {
    setWorkers(prevWorkers => prevWorkers.filter(w => w.id !== workerId));
  };


  return (
    <WorkersContext.Provider value={{ workers, addWorker, updateWorker, deleteWorker }}>
      {children}
    </WorkersContext.Provider>
  );
}

export function useWorkers() {
  const context = useContext(WorkersContext);
  if (context === undefined) {
    throw new Error('useWorkers must be used within a WorkersProvider');
  }
  return context;
}
