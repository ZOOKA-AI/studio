'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import type { Task, TaskPriority, TaskStatus } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type AddEditTaskDialogProps = {
  onSave: (task: Omit<Task, 'id'>) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
};

const taskPriorities: TaskPriority[] = ['عالية', 'متوسطة', 'منخفضة'];
const taskStatuses: TaskStatus[] = ['جديدة', 'قيد التنفيذ', 'مكتملة'];

export function AddEditTaskDialog({ onSave, open, onOpenChange, task }: AddEditTaskDialogProps) {
    const { toast } = useToast();
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<TaskPriority>('متوسطة');
    const [status, setStatus] = useState<TaskStatus>('جديدة');
    const [dueDate, setDueDate] = useState<Date | undefined>(new Date());

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setPriority(task.priority);
            setStatus(task.status);
            setDueDate(parseISO(task.dueDate));
        } else {
            setTitle('');
            setPriority('متوسطة');
            setStatus('جديدة');
            setDueDate(new Date());
        }
    }, [task, open]);


    const handleSave = () => {
        if (!title || !dueDate) {
             toast({
                variant: "destructive",
                title: "الحقول مطلوبة",
                description: "الرجاء تعبئة جميع الحقول المطلوبة.",
            });
            return;
        }
        
        onSave({ title, priority, status, dueDate: format(dueDate, 'yyyy-MM-dd') });
        onOpenChange(false);
    };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{task ? 'تعديل المهمة' : 'إضافة مهمة جديدة'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                    المهمة
                </Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                    الأولوية
                </Label>
                 <Select value={priority} onValueChange={(value: TaskPriority) => setPriority(value)}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="اختر الأولوية" />
                    </SelectTrigger>
                    <SelectContent>
                        {taskPriorities.map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
           <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                الحالة
                </Label>
                <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                        {taskStatuses.map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">
                    تاريخ الاستحقاق
                </Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "col-span-3 justify-start text-left font-normal",
                            !dueDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dueDate ? format(dueDate, "PPP", {locale: ar}) : <span>اختر تاريخاً</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={dueDate}
                            onSelect={setDueDate}
                            initialFocus
                            locale={ar}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
             <Button variant="outline">إلغاء</Button>
          </DialogClose>
          <Button onClick={handleSave}>حفظ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
