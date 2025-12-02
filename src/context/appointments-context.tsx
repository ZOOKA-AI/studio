'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { Appointment } from '@/lib/types';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
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
  const { data: appointments = [], isLoading } = useCollection<Appointment>(appointmentsRef);

  const addAppointment = async (appointment: Omit<Appointment, 'id' | 'siteAddress' | 'endTime'>) => {
    if (!firestore) return;
    const newAppointment = {
        ...appointment,
        siteAddress: 'غير محدد',
        endTime: new Date(new Date(appointment.startTime).getTime() + 2 * 60 * 60 * 1000).toISOString(),
    };
    await addDoc(collection(firestore, 'appointments'), newAppointment);
  };

  const deleteAppointment = async (appointmentId: string) => {
    if (!firestore) return;
    await deleteDoc(doc(firestore, 'appointments', appointmentId));
  };

  return (
    <AppointmentsContext.Provider value={{ appointments: appointments || [], addAppointment, deleteAppointment }}>
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
