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
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Button } from "../ui/button";
import Link from "next/link";

type RecentReportsProps = {
  reports: DailyReport[];
};

export function RecentReports({ reports }: RecentReportsProps) {
  // Group reports by date to show one entry per day
  const dailySummaries = reports.reduce((acc, report) => {
    const reportDate = format(report.date, 'yyyy-MM-dd');
    if (!acc[reportDate]) {
      acc[reportDate] = {
        date: report.date,
        reportId: report.id // Use the first report ID for the link
      };
    }
    return acc;
  }, {} as Record<string, { date: Date, reportId: string }>);

  const sortedDailyEntries = Object.values(dailySummaries).sort((a, b) => b.date.getTime() - a.date.getTime());


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">📝 اليوميات المسجلة</CardTitle>
        <CardDescription>
            هنا يقوم المشرف بتسجيل جميع الأعمال التي قام بها خلال اليوم.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اليوم</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الإجراء</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDailyEntries.map((entry) => (
              <TableRow key={entry.reportId}>
                <TableCell className="font-medium">{format(entry.date, 'eeee', { locale: ar })}</TableCell>
                <TableCell>{format(entry.date, 'yyyy/MM/dd', { locale: ar })}</TableCell>
                <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/reports/new?date=${format(entry.date, 'yyyy-MM-dd')}`}>
                            عرض أو إضافة مهام
                        </Link>
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
