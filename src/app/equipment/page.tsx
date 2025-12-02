'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const equipment = [
    { id: 'E001', name: 'ماكينة تنظيف الأرضيات', condition: 'جيدة', quantity: 2, supervisor: 'محمد' },
    { id: 'E002', name: 'مكنسة كهربائية صناعية', condition: 'تحتاج صيانة', quantity: 1, supervisor: 'محمد' },
    { id: 'E003', name: 'سلم ألومنيوم 5 متر', condition: 'ممتازة', quantity: 3, supervisor: 'علي' },
    { id: 'E004', name: 'ماكينة غسيل بالضغط', condition: 'جيدة', quantity: 1, supervisor: 'محمد' },
    { id: 'E005', name: 'عربة أدوات تنظيف', condition: 'ممتازة', quantity: 5, supervisor: 'علي' },
];

const conditionVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
    'ممتازة': 'default',
    'جيدة': 'secondary',
    'تحتاج صيانة': 'destructive'
};

export default function EquipmentPage() {
    const { toast } = useToast();
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline text-xl">🛠️ جرد المعدات</CardTitle>
                    <CardDescription>قائمة بجميع المعدات التي بحوزة المشرفين.</CardDescription>
                </div>
                <Button onClick={() => toast({ title: "قيد التنفيذ", description: "سيتم تفعيل هذه الميزة قريبًا."})}>
                    <PlusCircle className="me-2 h-4 w-4" />
                    إضافة معدات جديدة
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>اسم المعدة</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead>الكمية</TableHead>
                            <TableHead>المشرف المسؤول</TableHead>
                            <TableHead>الإجراء</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {equipment.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>
                                    <Badge variant={conditionVariant[item.condition]}>{item.condition}</Badge>
                                </TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.supervisor}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm" onClick={() => toast({ title: "قيد التنفيذ", description: "سيتم تفعيل هذه الميزة قريبًا."})}>عرض التفاصيل</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
