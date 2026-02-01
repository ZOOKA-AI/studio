import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useEquipment } from '@/context/equipment-context';
import type { Equipment, EquipmentCondition } from '@/lib/types';
import { AddEditEquipmentDialog } from '@/components/equipment/add-edit-equipment-dialog';
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

const conditionVariant: Record<EquipmentCondition, 'default' | 'secondary' | 'destructive'> = {
    'ممتازة': 'default',
    'جيدة': 'secondary',
    'تحتاج صيانة': 'destructive'
};

export default function Equipment() {
    const { toast } = useToast();
    const { equipment, addEquipment, updateEquipment, deleteEquipment } = useEquipment();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

    const handleAddEquipment = () => {
        setEditingEquipment(null);
        setIsDialogOpen(true);
    };

    const handleEditEquipment = (item: Equipment) => {
        setEditingEquipment(item);
        setIsDialogOpen(true);
    };
    
    const handleDeleteEquipment = (id: string) => {
        deleteEquipment(id);
        toast({
            title: "تم الحذف بنجاح",
            description: "تم حذف المعدة من القائمة.",
        });
    };

    const handleSaveEquipment = (data: Omit<Equipment, 'id'>) => {
        if (editingEquipment) {
            updateEquipment(editingEquipment.id, data);
            toast({ title: "تم التعديل بنجاح", description: "تم تحديث بيانات المعدة." });
        } else {
            addEquipment(data);
            toast({ title: "تمت الإضافة بنجاح", description: "تمت إضافة المعدة الجديدة." });
        }
        setEditingEquipment(null);
    };

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline text-xl">🛠️ جرد المعدات</CardTitle>
                        <CardDescription>قائمة بجميع المعدات التي بحوزة المشرفين.</CardDescription>
                    </div>
                    <Button onClick={handleAddEquipment}>
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
                                <TableHead className="text-left">الإجراء</TableHead>
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
                                    <TableCell className="text-left">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEditEquipment(item)}>
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
                                                                لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف المعدة نهائيًا.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteEquipment(item.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
                </CardContent>
            </Card>
            <AddEditEquipmentDialog 
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveEquipment}
                equipment={editingEquipment}
            />
        </>
    );
}
