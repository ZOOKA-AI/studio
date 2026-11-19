'use client';

import { createContext, ReactNode } from 'react';
import type { Appointment } from '@/lib/types';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, addDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { createContextHook } from '@/lib/context-utils';
import { timestampToISO, dateToTimestamp } from '@/lib/timestamp-utils';

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

  const appointments: Appointment[] = (rawAppointments || []).map(appointment => ({
    ...appointment,
    startTime: timestampToISO(appointment.startTime),
    endTime: timestampToISO(appointment.endTime),
  }));

  const addAppointment = async (appointment: Omit<Appointment, 'id' | 'siteAddress' | 'endTime'>) => {
    if (!firestore) return;
    const startTime = new Date(appointment.startTime);
    const newAppointment = {
        ...appointment,
        startTime: dateToTimestamp(startTime),
        siteAddress: 'غير محدد',
        endTime: dateToTimestamp(new Date(startTime.getTime() + 2 * 60 * 60 * 1000)),
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

export const useAppointments = createContextHook(AppointmentsContext, 'useAppointments');
