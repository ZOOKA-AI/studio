'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarIcon, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useState } from 'react';
import { getMaterialSuggestions } from '@/ai/flows/material-suggestions';
import { generateReportSummary } from '@/ai/flows/generate-report-summary';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  siteName: z.string().min(2, { message: 'اسم الموقع مطلوب.' }),
  date: z.date({ required_error: 'تاريخ اليومية مطلوب.' }),
  tasks: z.array(z.object({ value: z.string() })).min(1, 'يجب إضافة مهمة واحدة على الأقل.'),
  materials: z.array(z.object({ value: z.string() })),
  notes: z.string().optional(),
});

export function NewReportForm() {
    const { toast } = useToast();
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [isSummarizing, setIsSummarizing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: '',
      tasks: [{ value: '' }],
      materials: [],
      notes: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
        title: 'تم حفظ اليومية بنجاح!',
        description: `تم حفظ تقرير موقع ${values.siteName}`,
    });
  };

  const handleSuggestMaterials = async () => {
    const tasks = form.getValues('tasks');
    const taskDescriptions = tasks.map(task => task.value).filter(Boolean).join(', ');

    if (!taskDescriptions) {
        toast({
            variant: 'destructive',
            title: 'لا يوجد مهام',
            description: 'الرجاء إدخال بعض المهام أولاً للحصول على اقتراحات.',
        });
      return;
    }

    setIsSuggesting(true);
    try {
      const suggestions = await getMaterialSuggestions({ task: taskDescriptions });
      const newMaterials = suggestions.map(s => ({ value: s.materialName }));
      const currentMaterials = form.getValues('materials').map(m => m.value);
      const uniqueNewMaterials = newMaterials.filter(nm => !currentMaterials.includes(nm.value));
      
      if(uniqueNewMaterials.length > 0) {
        form.setValue('materials', [...form.getValues('materials'), ...uniqueNewMaterials]);
      }
      
    } catch (error) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'خطأ في جلب الاقتراحات',
            description: 'حدث خطأ أثناء محاولة الحصول على اقتراحات المواد.',
        });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleGenerateSummary = async () => {
    const values = form.getValues();
    const reportDetails = `
      الموقع: ${values.siteName}
      التاريخ: ${values.date ? format(values.date, 'PPP', { locale: ar }) : ''}
      المهام: ${values.tasks.map(t => t.value).join(', ')}
      المواد: ${values.materials.map(m => m.value).join(', ')}
      الملاحظات: ${values.notes || 'لا يوجد'}
    `;

    setIsSummarizing(true);
    try {
        const result = await generateReportSummary({ reportDetails });
        form.setValue('notes', result.summary);
    } catch (error) {
        console.error(error);
         toast({
            variant: 'destructive',
            title: 'خطأ في إنشاء الملخص',
            description: 'حدث خطأ أثناء محاولة إنشاء ملخص التقرير.',
        });
    } finally {
        setIsSummarizing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">📝 يومية جديدة</CardTitle>
        <CardDescription>
          املأ الحقول التالية لتوثيق تفاصيل يوم العمل.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="siteName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>اسم الموقع</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الموقع" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="فيلا السيد أحمد">فيلا السيد أحمد</SelectItem>
                          <SelectItem value="مكتب شركة ألفا">مكتب شركة ألفا</SelectItem>
                          <SelectItem value="شقة السيدة فاطمة">شقة السيدة فاطمة</SelectItem>
                          <SelectItem value="فيلا السيد سعيد">فيلا السيد سعيد</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>التاريخ</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: ar })
                              ) : (
                                <span>اختر تاريخاً</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
             <div>
              <FormLabel>المهام المنجزة</FormLabel>
              <div className="space-y-2 mt-2">
                {form.watch('tasks').map((task, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`tasks.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <Input placeholder={`مهمة #${index + 1}`} {...field} />
                        </FormControl>
                        <Button type="button" variant="ghost" size="icon" onClick={() => {
                            const currentTasks = form.getValues('tasks');
                            form.setValue('tasks', currentTasks.filter((_, i) => i !== index));
                        }}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => form.setValue('tasks', [...form.getValues('tasks'), {value: ''}])}>
                إضافة مهمة
              </Button>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>المواد المستخدمة</FormLabel>
                <Button type="button" variant="ghost" size="sm" onClick={handleSuggestMaterials} disabled={isSuggesting}>
                    {isSuggesting ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <Sparkles className="me-2 h-4 w-4 text-yellow-500" />}
                    اقترح مواد
                </Button>
              </div>
              <div className="space-y-2">
                {form.watch('materials').map((material, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`materials.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <Input placeholder={`مادة #${index + 1}`} {...field} />
                        </FormControl>
                        <Button type="button" variant="ghost" size="icon" onClick={() => {
                            const currentMaterials = form.getValues('materials');
                            form.setValue('materials', currentMaterials.filter((_, i) => i !== index));
                        }}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
               <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => form.setValue('materials', [...form.getValues('materials'), {value: ''}])}>
                إضافة مادة
              </Button>
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                    <div className="flex items-center justify-between">
                        <FormLabel>ملاحظات وملخص اليوم</FormLabel>
                        <Button type="button" variant="ghost" size="sm" onClick={handleGenerateSummary} disabled={isSummarizing}>
                            {isSummarizing ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <Sparkles className="me-2 h-4 w-4 text-yellow-500" />}
                            إنشاء ملخص تلقائي
                        </Button>
                    </div>
                  <FormControl>
                    <Textarea
                      placeholder="أضف ملاحظات إضافية، مثل أي مشاكل واجهتها أو ملاحظات خاصة بالموقع..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">حفظ اليومية</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
