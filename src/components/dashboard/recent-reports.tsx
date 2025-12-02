import type { DailyReport } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "../ui/button";

type RecentReportsProps = {
  reports: DailyReport[];
};

const statusColors: { [key: string]: string } = {
    'مكتمل': 'bg-green-100 text-green-800 border-green-200',
    'مسودة': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'قيد المراجعة': 'bg-blue-100 text-blue-800 border-blue-200',
};

export function RecentReports({ reports }: RecentReportsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">📝 آخر اليوميات المسجلة</CardTitle>
        <CardDescription>نظرة سريعة على أحدث التقارير التي تم تسجيلها.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الموقع</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>المشرف</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الإجراء</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.siteName}</TableCell>
                <TableCell>{format(report.date, 'yyyy/MM/dd')}</TableCell>
                <TableCell>{report.supervisor}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("font-medium", statusColors[report.status])}>
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>
                    <Button variant="ghost" size="sm">عرض</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
