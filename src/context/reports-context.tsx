'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { DailyReport } from '@/lib/types';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';

type ReportsContextType = {
  reports: DailyReport[];
  addReport: (report: Omit<DailyReport, 'hours' | 'id' | 'supervisor' | 'status'>) => void;
};

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: ReactNode }) {
  const { firestore } = useFirebase();
  const reportsRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'dailyReports') : null),
    [firestore]
  );
  
  const { data: rawReports = [] } = useCollection(reportsRef);

  const reports = (rawReports || []).map(report => ({
    ...report,
    date: report.date.toDate(),
  }));


  const addReport = async (report: Omit<DailyReport, 'hours' | 'id' | 'supervisor' | 'status'>) => {
    if (!firestore) return;
    
    const newReport = {
      ...report,
      date: Timestamp.fromDate(report.date),
      supervisor: 'محمد', // Placeholder for logged-in user
      hours: 8, // Placeholder
      status: 'قيد المراجعة',
    };
    await addDoc(collection(firestore, 'dailyReports'), newReport);
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
