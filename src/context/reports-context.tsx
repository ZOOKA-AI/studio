'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { DailyReport } from '@/lib/types';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
      date: Timestamp.fromDate(report.date),
      supervisorId: user.uid, // Use the actual user ID
      supervisor: 'محمد المشرف', // Hardcode supervisor name
      hours: 8, // Placeholder
      status: 'قيد المراجعة',
    };
    
    addDoc(reportsCollection, newReport)
      .catch((error) => {
        const permissionError = new FirestorePermissionError({
          path: reportsCollection.path,
          operation: 'create',
          requestResourceData: newReport,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
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
