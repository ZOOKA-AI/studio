import type { DailyReport } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Button } from '../ui/button';
import Link from 'next/link';

type RecentReportsProps = {
  reports: DailyReport[];
};

export function RecentReports({ reports }: RecentReportsProps) {
  const sortedDailyEntries = reports.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
              <TableHead>العميل</TableHead>
              <TableHead>الإجراء</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDailyEntries.map(entry => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">
                  {format(new Date(entry.date), 'eeee', { locale: ar })}
                </TableCell>
                <TableCell>{format(new Date(entry.date), 'yyyy/MM/dd', { locale: ar })}</TableCell>
                <TableCell>{entry.clientName}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/reports/new?date=${format(new Date(entry.date), 'yyyy-MM-dd')}`}>
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
