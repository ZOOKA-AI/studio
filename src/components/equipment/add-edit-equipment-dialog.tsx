'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import type { Equipment, EquipmentCondition } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type AddEditEquipmentDialogProps = {
  onSave: (equipment: Omit<Equipment, 'id'>) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment: Equipment | null;
};

const equipmentConditions: EquipmentCondition[] = ['ممتازة', 'جيدة', 'تحتاج صيانة'];

export function AddEditEquipmentDialog({
  onSave,
  open,
  onOpenChange,
  equipment,
}: AddEditEquipmentDialogProps) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState<EquipmentCondition>('جيدة');
  const [supervisor, setSupervisor] = useState('');

  useEffect(() => {
    if (equipment) {
      setName(equipment.name);
      setQuantity(equipment.quantity);
      setCondition(equipment.condition);
      setSupervisor(equipment.supervisor);
    } else {
      setName('');
      setQuantity(1);
      setCondition('جيدة');
      setSupervisor('');
    }
  }, [equipment, open]);

  const handleSave = () => {
    if (!name || !supervisor || quantity < 0) {
      toast({
        variant: 'destructive',
        title: 'الحقول مطلوبة',
        description: 'الرجاء تعبئة جميع الحقول المطلوبة بشكل صحيح.',
      });
      return;
    }

    onSave({ name, quantity, condition, supervisor });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{equipment ? 'تعديل بيانات المعدة' : 'إضافة معدة جديدة'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              اسم المعدة
            </Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              الكمية
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value, 10))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="condition" className="text-right">
              الحالة
            </Label>
            <Select
              value={condition}
              onValueChange={(value: EquipmentCondition) => setCondition(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                {equipmentConditions.map(s => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="supervisor" className="text-right">
              المشرف المسؤول
            </Label>
            <Input
              id="supervisor"
              value={supervisor}
              onChange={e => setSupervisor(e.target.value)}
              className="col-span-3"
            />
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
