'use client';

import type { Appointment } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { ar } from "date-fns/locale";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { AddAppointmentDialog } from "./add-appointment-dialog";
import { useAppointments } from "@/context/appointments-context";

const statusColors: { [key: string]: string } = {
  'مكتمل': 'bg-green-100 text-green-800 border-green-200',
  'قيد التنفيذ': 'bg-blue-100 text-blue-800 border-blue-200',
  'متأخر': 'bg-red-100 text-red-800 border-red-200',
  'مجدول': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'مؤجل': 'bg-gray-100 text-gray-800 border-gray-200',
  'حجز جديد': 'bg-purple-100 text-purple-800 border-purple-200',
};

export function AppointmentsCalendar() {
  const { appointments, addAppointment, deleteAppointment } = useAppointments();
  const [today, setToday] = useState(new Date());
  
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // This ensures 'today' is set only on the client, avoiding hydration mismatch.
    setToday(new Date());
  }, []);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const weekRange = `${format(weekStart, 'd', { locale: ar })} - ${format(addDays(weekStart, 6), 'd MMMM yyyy', { locale: ar })}`;

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handlePrevWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };


  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
                 <CardTitle className="font-headline text-lg">📅 مواعيد الأسبوع</CardTitle>
                 <AddAppointmentDialog onAppointmentAdd={addAppointment} />
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-medium">{weekRange}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrevWeek}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNextWeek}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {weekDays.map((day) => {
              const dayAppointments = appointments.filter((appointment) =>
                isSameDay(new Date(appointment.startTime), day)
              );
              return (
                <div key={day.toString()} className={cn("bg-card p-2", isSameDay(day, today) && "bg-primary/5")}>
                  <div className="text-center mb-2">
                    <p className="text-xs text-muted-foreground">{format(day, 'E', { locale: ar })}</p>
                    <p className={cn("text-lg font-bold", isSameDay(day, today) && "text-primary")}>
                      {format(day, 'd', { locale: ar })}
                    </p>
                  </div>
                  <div className="space-y-2 min-h-24">
                    {dayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="relative group p-2 rounded-lg border bg-background shadow-sm text-xs"
                      >
                        <p className="font-bold truncate">{appointment.siteName}</p>
                        <p className="text-muted-foreground">
                          {format(new Date(appointment.startTime), 'p', { locale: ar })}
                        </p>
                        <Badge variant="outline" className={cn("mt-1 text-xs", statusColors[appointment.status])}>
                          {appointment.status}
                        </Badge>
                         <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => deleteAppointment(appointment.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
