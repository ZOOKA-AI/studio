'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { DailyReport } from '@/lib/types';
import { mockRecentReports } from '@/lib/data';

type ReportsContextType = {
  reports: DailyReport[];
  addReport: (report: Omit<DailyReport, 'hours' | 'id' | 'supervisor' | 'status'>) => void;
};

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<DailyReport[]>(mockRecentReports);

  const addReport = (report: Omit<DailyReport, 'hours' | 'id' | 'supervisor' | 'status'>) => {
    const newReport: DailyReport = {
      ...report,
      id: new Date().toISOString(),
      supervisor: 'محمد', // Placeholder for logged-in user
      hours: 8, // Placeholder
      status: 'قيد المراجعة',
    };
    setReports(prevReports => [newReport, ...prevReports]);
  };

  return (
    <ReportsContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
}
