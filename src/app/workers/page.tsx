'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { AddEditWorkerDialog } from "@/components/workers/add-edit-worker-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


export type Worker = {
    id: string;
    name: string;
    phone: string;
    nationalId: string;
    role: string;
    status: 'نشط' | 'في إجازة';
    type: 'company' | 'external';
};

const initialCompanyWorkers: Worker[] = [
    { id: 'W001', name: 'أحمد محمود', phone: '0501234567', nationalId: '784-1990-1234567-1', role: 'عامل نظافة', status: 'نشط', type: 'company' },
    { id: 'W002', name: 'علي حسن', phone: '0557654321', nationalId: '784-1985-7654321-2', role: 'عامل نظافة', status: 'نشط', type: 'company' },
    { id: 'W004', name: 'يوسف خالد', phone: '0561122334', nationalId: '784-1992-1122334-3', role: 'مشرف فريق', status: 'نشط', type: 'company' },
    { id: 'W003', name: 'فاطمة الزهراء', phone: '0509876543', nationalId: '784-1995-9876543-4', role: 'عاملة نظافة', status: 'في إجازة', type: 'company' },
];

const initialExternalWorkers: Worker[] = [
    { id: 'E001', name: 'محمد خان', phone: '0521234567', nationalId: '202-2000-1234567-5', role: 'عامل يومي', status: 'نشط', type: 'external' },
    { id: 'E002', name: 'سانجاي كومار', phone: '0587654321', nationalId: '202-1998-7654321-6', role: 'عامل يومي', status: 'نشط', type: 'external' },
];

export default function WorkersPage() {
    const { toast } = useToast();
    const [workers, setWorkers] = useState<Worker[]>([...initialCompanyWorkers, ...initialExternalWorkers]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingWorker, setEditingWorker] = useState<Worker | null>(null);

    const handleAddWorker = () => {
        setEditingWorker(null);
        setIsDialogOpen(true);
    };

    const handleEditWorker = (worker: Worker) => {
        setEditingWorker(worker);
        setIsDialogOpen(true);
    };
    
    const handleDeleteWorker = (workerId: string) => {
        setWorkers(workers.filter(w => w.id !== workerId));
        toast({
            title: "تم الحذف بنجاح",
            description: "تم حذف العامل من القائمة.",
        });
    };

    const handleSaveWorker = (workerData: Omit<Worker, 'id' | 'type'>, type: 'company' | 'external') => {
        if (editingWorker) {
            // Edit existing worker
            setWorkers(workers.map(w => w.id === editingWorker.id ? { ...editingWorker, ...workerData } : w));
            toast({ title: "تم التعديل بنجاح", description: "تم تحديث بيانات العامل." });
        } else {
            // Add new worker
            const newWorker: Worker = {
                id: `W${Math.floor(Math.random() * 1000)}`,
                ...workerData,
                type,
            };
            setWorkers([...workers, newWorker]);
            toast({ title: "تمت الإضافة بنجاح", description: "تمت إضافة العامل الجديد." });
        }
        setEditingWorker(null);
    };

    const companyWorkers = workers.filter(w => w.type === 'company');
    const externalWorkers = workers.filter(w => w.type === 'external');

    const renderTable = (data: Worker[]) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>الدور</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left">الإجراء</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((worker) => (
                    <TableRow key={worker.id}>
                        <TableCell className="font-medium">{worker.name}</TableCell>
                        <TableCell>{worker.role}</TableCell>
                        <TableCell>
                            <Badge variant={worker.status === 'نشط' ? 'default' : 'secondary'}>{worker.status}</Badge>
                        </TableCell>
                        <TableCell className="text-left">
                           <DropdownMenu>
                               <DropdownMenuTrigger asChild>
                                   <Button variant="ghost" size="icon">
                                       <MoreHorizontal className="h-4 w-4" />
                                   </Button>
                               </DropdownMenuTrigger>
                               <DropdownMenuContent align="end">
                                   <DropdownMenuItem onClick={() => handleEditWorker(worker)}>
                                       تعديل
                                   </DropdownMenuItem>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                حذف
                                            </DropdownMenuItem>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف العامل نهائيًا.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteWorker(worker.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                    حذف
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                               </DropdownMenuContent>
                           </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline text-xl">👥 إدارة العمال</CardTitle>
                        <CardDescription>عرض وإدارة قائمة العمال في الشركة والعمالة الخارجية.</CardDescription>
                    </div>
                    <Button onClick={handleAddWorker}>
                        <PlusCircle className="me-2 h-4 w-4" />
                        إضافة عامل جديد
                    </Button>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="company" dir="rtl">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="company">عمال الشركة</TabsTrigger>
                            <TabsTrigger value="external">عمالة خارجية</TabsTrigger>
                        </TabsList>
                        <TabsContent value="company">
                            {renderTable(companyWorkers)}
                        </TabsContent>
                        <TabsContent value="external">
                            {renderTable(externalWorkers)}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
            <AddEditWorkerDialog 
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveWorker}
                worker={editingWorker}
            />
        </>
    );
}