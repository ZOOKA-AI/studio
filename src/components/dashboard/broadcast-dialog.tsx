'use client';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useWorkers } from '@/context/workers-context';
import { useBroadcasts } from '@/context/broadcasts-context';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(1, { message: "عنوان الإشعار مطلوب." }),
  message: z.string().min(1, { message: "نص الرسالة مطلوب." }),
  recipients: z.array(z.string()).min(1, { message: "يجب اختيار مستلم واحد على الأقل." }),
});

type BroadcastDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function BroadcastDialog({ open, onOpenChange }: BroadcastDialogProps) {
  const { workers } = useWorkers();
  const { addBroadcast } = useBroadcasts();
  const { toast } = useToast();
  const [selectAll, setSelectAll] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      message: '',
      recipients: [],
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addBroadcast(values);
    toast({
      title: "تم إرسال الإشعار",
      description: `تم إرسال الإشعار إلى ${values.recipients.includes('all') ? 'جميع العمال' : values.recipients.length + ' عامل'}.`,
    });
    form.reset();
    setSelectAll(false);
    onOpenChange(false);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      form.setValue('recipients', ['all']);
    } else {
      form.setValue('recipients', []);
    }
  };

  const handleWorkerToggle = (workerId: string, checked: boolean) => {
    const currentRecipients = form.getValues('recipients');
    
    // Remove 'all' if it's there
    const filteredRecipients = currentRecipients.filter(r => r !== 'all');
    
    if (checked) {
      form.setValue('recipients', [...filteredRecipients, workerId]);
    } else {
      form.setValue('recipients', filteredRecipients.filter(r => r !== workerId));
      setSelectAll(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إرسال إشعار جماعي</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان الإشعار</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="مثال: تحديث في جدول العمل" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نص الرسالة</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="اكتب رسالتك هنا..." className="min-h-[100px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipients"
              render={() => (
                <FormItem>
                  <FormLabel>المستلمون</FormLabel>
                  <div className="flex items-center space-x-2 mb-2 space-x-reverse">
                    <Checkbox 
                      id="select-all" 
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                    <Label htmlFor="select-all" className="font-semibold cursor-pointer">
                      تحديد الكل ({workers.length} عامل)
                    </Label>
                  </div>
                  <ScrollArea className="h-[150px] rounded-md border p-3">
                    <div className="space-y-2">
                      {workers.map((worker) => {
                        const currentRecipients = form.watch('recipients');
                        const isChecked = selectAll || currentRecipients.includes(worker.id) || currentRecipients.includes('all');
                        
                        return (
                          <div key={worker.id} className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox 
                              id={`worker-${worker.id}`}
                              checked={isChecked}
                              onCheckedChange={(checked) => handleWorkerToggle(worker.id, checked as boolean)}
                              disabled={selectAll}
                            />
                            <Label 
                              htmlFor={`worker-${worker.id}`} 
                              className="text-sm font-normal cursor-pointer flex-1"
                            >
                              {worker.name} - {worker.role}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">إلغاء</Button>
              </DialogClose>
              <Button type="submit">إرسال الإشعار</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
