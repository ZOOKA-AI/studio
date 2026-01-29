'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import type { Appointment, AppointmentStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type AddAppointmentDialogProps = {
  onAppointmentAdd: (appointment: Omit<Appointment, 'id' | 'siteAddress' | 'endTime'>) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const appointmentStatuses: AppointmentStatus[] = [
  'حجز جديد',
  'مجدول',
  'قيد التنفيذ',
  'مكتمل',
  'متأخر',
  'مؤجل',
];

export function AddAppointmentDialog({
  onAppointmentAdd,
  open,
  onOpenChange,
}: AddAppointmentDialogProps) {
  const { toast } = useToast();
  const [clientName, setClientName] = useState('');
  const [status, setStatus] = useState<AppointmentStatus>('حجز جديد');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('09:00');
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    if (!clientName || !date || !time) {
      toast({
        variant: 'destructive',
        title: 'الحقول مطلوبة',
        description: 'الرجاء تعبئة جميع الحقول المطلوبة.',
      });
      return;
    }

    const [hours, minutes] = time.split(':').map(Number);
    const startTime = new Date(date);
    startTime.setHours(hours, minutes);

    onAppointmentAdd({ siteName: clientName, status, startTime: startTime.toISOString() });

    toast({
      title: 'تمت إضافة الموعد',
      description: `تم جدولة موعد لـ ${clientName} بنجاح.`,
    });

    // Reset form
    setClientName('');
    setStatus('حجز جديد');
    setDate(new Date());
    setTime('09:00');

    // Close dialog
    onOpenChange ? onOpenChange(false) : setIsOpen(false);
  };

  const controlledOpen = open !== undefined ? open : isOpen;
  const controlledOnOpenChange = onOpenChange !== undefined ? onOpenChange : setIsOpen;

  return (
    <Dialog open={controlledOpen} onOpenChange={controlledOnOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusCircle className="me-2 h-4 w-4" />
          إضافة موعد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إضافة موعد جديد</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="clientName" className="text-right">
              اسم العميل
            </Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              الحالة
            </Label>
            <Select value={status} onValueChange={(value: AppointmentStatus) => setStatus(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                {appointmentStatuses.map(s => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              التاريخ
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'col-span-3 justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: ar }) : <span>اختر تاريخاً</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  locale={ar}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              الوقت
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
          <Button onClick={handleSave}>حفظ الموعد</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
