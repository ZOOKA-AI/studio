import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStats } from "@/lib/data";
import type { Stat } from "@/lib/types";
import { CalendarCheck, Users, FileText, DollarSign } from "lucide-react";

const iconMap = {
  المواعيد: CalendarCheck,
  العمال: Users,
  اليوميات: FileText,
  'الإيراد اليومي': DollarSign,
};


export function StatsCards() {
  const stats = mockStats;
  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-lg">📈 إحصائيات اليوم</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {Object.values(stats).map((stat) => {
            const Icon = iconMap[stat.label as keyof typeof iconMap] || FileText;
            return (
                <div key={stat.label} className="flex flex-col items-center justify-center p-4 bg-background/50 rounded-lg text-center">
                    <Icon className="w-7 h-7 mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-lg font-bold font-headline">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
            )
          })}
        </CardContent>
    </Card>
  );
}
