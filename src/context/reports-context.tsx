'use client';

import { createContext, ReactNode } from 'react';
import type { DailyReport } from '@/lib/types';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, Timestamp } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { createDocument } from '@/firebase/firestore-operations';
import { createContextHook } from '@/lib/context-utils';
import { dateToTimestamp } from '@/lib/timestamp-utils';

type ReportsContextType = {
  reports: DailyReport[];
  addReport: (report: Omit<DailyReport, 'hours' | 'id' | 'supervisor' | 'status'>) => void;
};

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: ReactNode }) {
  const { firestore, user } = useFirebase(); // Get the user from useFirebase
  const reportsRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'dailyReports') : null),
    [firestore]
  );
  
  const { data: rawReports = [] } = useCollection<Omit<DailyReport, 'date'> & { date: Timestamp }>(reportsRef);

  const reports: DailyReport[] = (rawReports || []).map(report => ({
    ...report,
    date: report.date.toDate(),
  }));


  const addReport = async (report: Omit<DailyReport, 'hours' | 'id' | 'supervisor' | 'status'>) => {
    if (!firestore || !user) return; // Ensure user is available
    const reportsCollection = collection(firestore, 'dailyReports');
    
    const newReport = {
      ...report,
      date: dateToTimestamp(report.date),
      supervisorId: user.uid, // Use the actual user ID
      supervisor: 'محمد المشرف', // Hardcode supervisor name
      hours: 8, // Placeholder
      status: 'قيد المراجعة',
    };
    
    await createDocument(reportsCollection, newReport);
  };

  return (
    <ReportsContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportsContext.Provider>
  );
}

export const useReports = createContextHook(ReportsContext, 'useReports');
