import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMaterials } from "@/context/materials-context";

export default function Inventory() {
    const { toast } = useToast();
    const { materials } = useMaterials();

    const getStatus = (quantity: number) => {
        if (quantity === 0) return { text: 'نفذت الكمية', variant: 'destructive' as const };
        if (quantity < 20) return { text: 'كمية منخفضة', variant: 'secondary' as const };
        return { text: 'متوفر', variant: 'default' as const };
    };

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
                        {materials.map((item) => {
                            const statusInfo = getStatus(item.quantity);
                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="font-mono">{item.id.substring(0, 6)}</TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.quantity} {item.unit}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusInfo.variant}>
                                            {statusInfo.text}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm" onClick={() => toast({ title: "لماذا هذا لا يعمل؟", description: "هذه الميزة لم يتم تفعيلها بعد. سأقوم بتفعيلها في الخطوة التالية."})}>تعديل</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
