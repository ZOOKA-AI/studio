import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const sites = [
    { id: 'S001', name: 'فيلا السيد أحمد', address: 'الشارقة, الإمارات', type: 'سكني' },
    { id: 'S002', name: 'مكتب شركة ألفا', address: 'دبي, الإمارات', type: 'تجاري' },
    { id: 'S003', name: 'شقة السيدة فاطمة', address: 'عجمان, الإمارات', type: 'سكني' },
    { id: 'S004', name: 'فيلا السيد سعيد', address: 'الشارقة, الإمارات', type: 'سكني' },
    { id: 'S005', name: 'بناية البرج', address: 'دبي, الإمارات', type: 'تجاري' },
];

export default function SitesPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline text-xl">🏢 إدارة المواقع</CardTitle>
                    <CardDescription>قائمة بجميع مواقع العملاء.</CardDescription>
                </div>
                <Button>
                    <PlusCircle className="me-2 h-4 w-4" />
                    إضافة موقع جديد
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>المعرف</TableHead>
                            <TableHead>اسم الموقع</TableHead>
                            <TableHead>العنوان</TableHead>
                            <TableHead>النوع</TableHead>
                            <TableHead>الإجراء</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sites.map((site) => (
                            <TableRow key={site.id}>
                                <TableCell className="font-mono">{site.id}</TableCell>
                                <TableCell className="font-medium">{site.name}</TableCell>
                                <TableCell>{site.address}</TableCell>
                                <TableCell>{site.type}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm">عرض التفاصيل</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
