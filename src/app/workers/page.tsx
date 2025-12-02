import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const workers = [
    { id: 'W001', name: 'أحمد محمود', role: 'عامل نظافة', status: 'نشط' },
    { id: 'W002', name: 'علي حسن', role: 'عامل نظافة', status: 'نشط' },
    { id: 'W003', name: 'فاطمة الزهراء', role: 'عاملة نظافة', status: 'في إجازة' },
    { id: 'W004', name: 'يوسف خالد', role: 'مشرف فريق', status: 'نشط' },
];

export default function WorkersPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline text-xl">👥 إدارة العمال</CardTitle>
                    <CardDescription>عرض وإدارة قائمة العمال في الشركة.</CardDescription>
                </div>
                <Button>
                    <PlusCircle className="me-2 h-4 w-4" />
                    إضافة عامل جديد
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>المعرف</TableHead>
                            <TableHead>الاسم</TableHead>
                            <TableHead>الدور</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead>الإجراء</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workers.map((worker) => (
                            <TableRow key={worker.id}>
                                <TableCell className="font-mono">{worker.id}</TableCell>
                                <TableCell className="font-medium">{worker.name}</TableCell>
                                <TableCell>{worker.role}</TableCell>
                                <TableCell>{worker.status}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm">تعديل</Button>
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">حذف</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
