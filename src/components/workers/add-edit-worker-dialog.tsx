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
import type { Worker, WorkerStatus } from '@/app/workers/page';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type AddEditWorkerDialogProps = {
  onSave: (worker: Omit<Worker, 'id' | 'type'>, type: 'company' | 'external') => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  worker: Worker | null;
};

const workerStatuses: WorkerStatus[] = ['نشط', 'في إجازة'];

export function AddEditWorkerDialog({ onSave, open, onOpenChange, worker }: AddEditWorkerDialogProps) {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState<WorkerStatus>('نشط');
    const [type, setType] = useState<'company' | 'external'>('company');

    useEffect(() => {
        if (worker) {
            setName(worker.name);
            setPhone(worker.phone);
            setNationalId(worker.nationalId);
            setRole(worker.role);
            setStatus(worker.status);
            setType(worker.type);
        } else {
            // Reset form for new worker
            setName('');
            setPhone('');
            setNationalId('');
            setRole('');
            setStatus('نشط');
            setType('company');
        }
    }, [worker, open]);


    const handleSave = () => {
        if (!name || !role || !nationalId || !phone) {
             toast({
                variant: "destructive",
                title: "الحقول مطلوبة",
                description: "الرجاء تعبئة جميع الحقول المطلوبة.",
            });
            return;
        }
        
        onSave({ name, phone, nationalId, role, status }, type);
        onOpenChange(false);
    };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{worker ? 'تعديل بيانات العامل' : 'إضافة عامل جديد'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <Tabs defaultValue={type} onValueChange={(value) => setType(value as 'company' | 'external')} dir="rtl">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="company">عامل شركة</TabsTrigger>
                    <TabsTrigger value="external">عامل خارجي</TabsTrigger>
                </TabsList>
            </Tabs>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    الاسم
                </Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                    رقم الهاتف
                </Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nationalId" className="text-right">
                    رقم الهوية
                </Label>
                <Input id="nationalId" value={nationalId} onChange={(e) => setNationalId(e.target.value)} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                    الدور
                </Label>
                <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} className="col-span-3" />
            </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              الحالة
            </Label>
             <Select value={status} onValueChange={(value: WorkerStatus) => setStatus(value)}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                    {workerStatuses.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
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