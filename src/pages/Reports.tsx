import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RecentReports } from "@/components/dashboard/recent-reports";
import { useReports } from "@/context/reports-context";

export default function ReportsLogPage() {
    const { reports } = useReports();
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">📚 سجل اليوميات</CardTitle>
                    <CardDescription>
                        هنا يمكنك عرض جميع التقارير اليومية السابقة والبحث فيها.
                    </CardDescription>
                </CardHeader>
            </Card>
            <RecentReports reports={reports} />
        </div>
    );
}
