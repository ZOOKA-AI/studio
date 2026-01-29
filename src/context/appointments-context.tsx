'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import type { Appointment } from '@/lib/types';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, addDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';

type AppointmentsContextType = {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'siteAddress' | 'endTime'>) => void;
  deleteAppointment: (appointmentId: string) => void;
};

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const { firestore } = useFirebase();
  const appointmentsRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'appointments') : null),
    [firestore]
  );
  
  const { data: rawAppointments = [] } = useCollection<Omit<Appointment, 'startTime'|'endTime'> & {startTime: Timestamp, endTime: Timestamp}>(appointmentsRef);

  const appointments: Appointment[] = useMemo(() => 
    (rawAppointments || []).map(appointment => ({
      ...appointment,
      startTime: appointment.startTime.toDate().toISOString(),
      endTime: appointment.endTime.toDate().toISOString(),
    })),
    [rawAppointments]
  );

  const addAppointment = async (appointment: Omit<Appointment, 'id' | 'siteAddress' | 'endTime'>) => {
    if (!firestore) return;
    const startTime = new Date(appointment.startTime);
    const newAppointment = {
        ...appointment,
        startTime: Timestamp.fromDate(startTime),
        siteAddress: 'غير محدد',
        endTime: Timestamp.fromDate(new Date(startTime.getTime() + 2 * 60 * 60 * 1000)),
    };
    await addDoc(collection(firestore, 'appointments'), newAppointment);
  };

  const deleteAppointment = async (appointmentId: string) => {
    if (!firestore) return;
    await deleteDoc(doc(firestore, 'appointments', appointmentId));
  };

  const value = useMemo(
    () => ({ appointments: appointments || [], addAppointment, deleteAppointment }),
    [appointments]
  );

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentsContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentsProvider');
  }
  return context;
}
