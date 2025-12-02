import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarCheck, Users, FileText, CheckSquare, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import type { Stat } from "@/lib/types";

const iconMap = {
  'المواعيد': CalendarCheck,
  'العمال': Users,
  'اليوميات': FileText,
  'المهام': CheckSquare,
  'الإيرادات': BarChart3,
};

type StatsCardsProps = {
  stats: Stat[];
};

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = iconMap[stat.label as keyof typeof iconMap] || FileText;
        const isPositive = stat.change.startsWith('+');
        const isNegative = stat.change.startsWith('-');
        
        return (
          <Card key={stat.label}>
            <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold font-headline">{stat.value}</p>
                    </div>
                </div>
                <div className={cn(
                    "flex items-center gap-1 text-sm font-semibold",
                    isPositive && "text-green-600",
                    isNegative && "text-red-600"
                )}>
                    {isPositive && <TrendingUp className="w-4 h-4" />}
                    {isNegative && <TrendingDown className="w-4 h-4" />}
                    <span>{stat.change}</span>
                </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  );
}
