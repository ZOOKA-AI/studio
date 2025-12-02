'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockTasks } from "@/lib/data";
import { Task, TaskPriority, TaskStatus } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const priorityVariant: Record<TaskPriority, 'default' | 'secondary' | 'destructive'> = {
    'عالية': 'destructive',
    'متوسطة': 'secondary',
    'منخفضة': 'default'
};

const statusVariant: Record<TaskStatus, 'default' | 'secondary' | 'destructive'> = {
    'جديدة': 'default',
    'قيد التنفيذ': 'secondary',
    'مكتملة': 'default',
};

export default function TasksPage() {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline text-xl">📋 إدارة المهام</CardTitle>
                    <CardDescription>عرض وتتبع المهام الموكلة إليك.</CardDescription>
                </div>
                <Button>
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
                        {mockTasks.map((task) => (
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
                                            <DropdownMenuItem>
                                                تعديل
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                حذف
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
