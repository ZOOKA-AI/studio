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
import type { Worker } from '@/lib/types';
import { useWorkers } from "@/context/workers-context";

export default function Workers() {
    const { toast } = useToast();
    const { workers, addWorker, updateWorker, deleteWorker } = useWorkers();
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
        deleteWorker(workerId);
        toast({
            title: "تم الحذف بنجاح",
            description: "تم حذف العامل من القائمة.",
        });
    };

    const handleSaveWorker = (workerData: Omit<Worker, 'id' | 'type'>, type: 'company' | 'external') => {
        if (editingWorker) {
            // Edit existing worker
            updateWorker(editingWorker.id, { ...editingWorker, ...workerData });
            toast({ title: "تم التعديل بنجاح", description: "تم تحديث بيانات العامل." });
        } else {
            // Add new worker
            addWorker(workerData, type);
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
