'use client';

import { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import type { DailyReport } from '@/lib/types';
import type { TimestampReport, NewReport } from '@/lib/type-utils';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { SUPERVISOR_NAME, DEFAULT_WORKING_HOURS, DEFAULT_REPORT_STATUS } from '@/lib/constants';

type ReportsContextType = {
  reports: DailyReport[];
  addReport: (report: NewReport) => void;
};

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: ReactNode }) {
  const { firestore, user } = useFirebase(); // Get the user from useFirebase
  const reportsRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'dailyReports') : null),
    [firestore]
  );
  
  const { data: rawReports = [] } = useCollection<TimestampReport>(reportsRef);

  const reports: DailyReport[] = useMemo(() =>
    (rawReports || []).map(report => ({
      ...report,
      date: report.date.toDate(),
    })),
    [rawReports]
  );


  const addReport = useCallback(async (report: NewReport) => {
    if (!firestore || !user) return; // Ensure user is available
    const reportsCollection = collection(firestore, 'dailyReports');
    
    const newReport = {
      ...report,
      date: Timestamp.fromDate(report.date),
      supervisorId: user.uid,
      supervisor: SUPERVISOR_NAME,
      hours: DEFAULT_WORKING_HOURS,
      status: DEFAULT_REPORT_STATUS,
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
  }, [firestore, user]);

  const value = useMemo(
    () => ({ reports, addReport }),
    [reports, addReport]
  );

  return (
    <ReportsContext.Provider value={value}>
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
