'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const inventoryItems = [
    { id: 'M001', name: 'سائل تنظيف الأرضيات', quantity: 50, unit: 'لتر', status: 'متوفر' },
    { id: 'M002', name: 'معقم أسطح', quantity: 25, unit: 'لتر', status: 'متوفر' },
    { id: 'M003', name: 'مناشف ورقية', quantity: 10, unit: 'صندوق', status: 'كمية منخفضة' },
    { id: 'M004', name: 'أكياس قمامة', quantity: 200, unit: 'كيس', status: 'متوفر' },
    { id: 'M005', name: 'قفازات لاتكس', quantity: 0, unit: 'صندوق', status: 'نفذت الكمية' },
];

export default function InventoryPage() {
    const { toast } = useToast();
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline text-xl">📦 إدارة المخزون والمواد</CardTitle>
                    <CardDescription>تتبع كميات المواد المستخدمة في عمليات التنظيف.</CardDescription>
                </div>
                <Button onClick={() => toast({ title: "تم الإرسال!", description: "تم إرسال طلب المواد الجديدة للموافقة." })}>
                    <PlusCircle className="me-2 h-4 w-4" />
                    طلب مواد جديدة
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>المعرف</TableHead>
                            <TableHead>اسم المادة</TableHead>
                            <TableHead>الكمية الحالية</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead>الإجراء</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inventoryItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-mono">{item.id}</TableCell>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.quantity} {item.unit}</TableCell>
                                <TableCell>
                                    <Badge variant={item.status === 'نفذت الكمية' ? 'destructive' : item.status === 'كمية منخفضة' ? 'secondary' : 'default'}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm" onClick={() => toast({ title: "لماذا هذا لا يعمل؟", description: "هذه الميزة لم يتم تفعيلها بعد. سأقوم بتفعيلها في الخطوة التالية."})}>تعديل</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
