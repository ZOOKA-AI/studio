'use client';
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Task, TaskPriority, TaskStatus } from "@/lib/types";
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
import { useTasks } from "@/context/tasks-context";
import { useToast } from "@/hooks/use-toast";
import { AddEditTaskDialog } from "@/components/tasks/add-edit-task-dialog";

const priorityVariant: Record<TaskPriority, 'default' | 'secondary' | 'destructive'> = {
    'عالية': 'destructive',
    'متوسطة': 'secondary',
    'منخفضة': 'default'
};

const statusVariant: Record<TaskStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'جديدة': 'secondary',
    'قيد التنفيذ': 'default',
    'مكتملة': 'outline',
};

export default function TasksPage() {
    const { toast } = useToast();
    const { tasks, addTask, updateTask, deleteTask } = useTasks();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleAddTask = () => {
        setEditingTask(null);
        setIsDialogOpen(true);
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setIsDialogOpen(true);
    };
    
    const handleDeleteTask = (taskId: string) => {
        deleteTask(taskId);
        toast({
            title: "تم الحذف بنجاح",
            description: "تم حذف المهمة من القائمة.",
        });
    };

    const handleSaveTask = (taskData: Omit<Task, 'id'>) => {
        if (editingTask) {
            updateTask(editingTask.id, { ...editingTask, ...taskData });
            toast({ title: "تم التعديل بنجاح", description: "تم تحديث بيانات المهمة." });
        } else {
            addTask(taskData);
            toast({ title: "تمت الإضافة بنجاح", description: "تمت إضافة المهمة الجديدة." });
        }
        setEditingTask(null);
    };

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline text-xl">📋 إدارة المهام</CardTitle>
                        <CardDescription>عرض وتتبع المهام الموكلة إليك.</CardDescription>
                    </div>
                    <Button onClick={handleAddTask}>
                        <PlusCircle className="me-2 h-4 w-4" />
                        إضافة مهمة جديدة
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>المهمة</TableHead>
                                <TableHead>الأولوية</TableHead>
                                <TableHead>الحالة</TableHead>
                                <TableHead>تاريخ الاستحقاق</TableHead>
                                <TableHead className="text-left">الإجراء</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell className="font-medium">{task.title}</TableCell>
                                    <TableCell>
                                        <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
                                    </TableCell>
                                     <TableCell>
                                        <Badge variant={statusVariant[task.status]}>{task.status}</Badge>
                                    </TableCell>
                                    <TableCell>{task.dueDate}</TableCell>
                                    <TableCell className="text-left">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEditTask(task)}>
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
                                                                لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف المهمة نهائيًا.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteTask(task.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
             <AddEditTaskDialog 
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSave={handleSaveTask}
                task={editingTask}
            />
        </>
    );
}
