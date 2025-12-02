'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const companyWorkers = [
    { id: 'W001', name: 'أحمد محمود', phone: '0501234567', nationalId: '784-1990-1234567-1', role: 'عامل نظافة', status: 'نشط' },
    { id: 'W002', name: 'علي حسن', phone: '0557654321', nationalId: '784-1985-7654321-2', role: 'عامل نظافة', status: 'نشط' },
    { id: 'W004', name: 'يوسف خالد', phone: '0561122334', nationalId: '784-1992-1122334-3', role: 'مشرف فريق', status: 'نشط' },
    { id: 'W003', name: 'فاطمة الزهراء', phone: '0509876543', nationalId: '784-1995-9876543-4', role: 'عاملة نظافة', status: 'في إجازة' },
];

const externalWorkers = [
    { id: 'E001', name: 'محمد خان', phone: '0521234567', nationalId: '202-2000-1234567-5', role: 'عامل يومي' },
    { id: 'E002', name: 'سانجاي كومار', phone: '0587654321', nationalId: '202-1998-7654321-6', role: 'عامل يومي' },
];

export default function WorkersPage() {
    const { toast } = useToast();
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline text-xl">👥 إدارة العمال</CardTitle>
                    <CardDescription>عرض وإدارة قائمة العمال في الشركة والعمالة الخارجية.</CardDescription>
                </div>
                <Button onClick={() => toast({ title: "قيد التنفيذ", description: "سيتم تفعيل هذه الميزة قريبًا."})}>
                    <PlusCircle className="me-2 h-4 w-4" />
                    ايضا لما لا يمكن اضافة عمال
                </Button>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="company">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="company">عمال الشركة</TabsTrigger>
                        <TabsTrigger value="external">عمالة خارجية</TabsTrigger>
                    </TabsList>
                    <TabsContent value="company">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>الاسم</TableHead>
                                    <TableHead>رقم الهاتف</TableHead>
                                    <TableHead>رقم الهوية</TableHead>
                                    <TableHead>الدور</TableHead>
                                    <TableHead>الحالة</TableHead>
                                    <TableHead>الإجراء</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {companyWorkers.map((worker) => (
                                    <TableRow key={worker.id}>
                                        <TableCell className="font-medium">{worker.name}</TableCell>
                                        <TableCell>{worker.phone}</TableCell>
                                        <TableCell className="font-mono">{worker.nationalId}</TableCell>
                                        <TableCell>{worker.role}</TableCell>
                                        <TableCell>
                                            <Badge variant={worker.status === 'نشط' ? 'default' : 'secondary'}>{worker.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm" onClick={() => toast({ title: "قيد التنفيذ", description: "سيتم تفعيل هذه الميزة قريبًا."})}>تعديل</Button>
                                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => toast({ title: "قيد التنفيذ", description: "سيتم تفعيل هذه الميزة قريبًا."})}>حذف</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="external">
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>الاسم</TableHead>
                                    <TableHead>رقم الهاتف</TableHead>
                                    <TableHead>رقم الهوية</TableHead>
                                    <TableHead>الدور</TableHead>
                                    <TableHead>الإجراء</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {externalWorkers.map((worker) => (
                                    <TableRow key={worker.id}>
                                        <TableCell className="font-medium">{worker.name}</TableCell>
                                        <TableCell>{worker.phone}</TableCell>
                                        <TableCell className="font-mono">{worker.nationalId}</TableCell>
                                        <TableCell>{worker.role}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm" onClick={() => toast({ title: "قيد التنفيذ", description: "سيتم تفعيل هذه الميزة قريبًا."})}>تعديل</Button>
                                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => toast({ title: "قيد التنفيذ", description: "سيتم تفعيل هذه الميزة قريبًا."})}>حذف</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}