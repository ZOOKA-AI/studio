import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarCheck, Users, FileText, CheckSquare, TrendingUp, TrendingDown, BarChart3, DollarSign, Package } from "lucide-react";
import type { Stat } from "@/lib/types";

/**
 * Icon mapping for Arabic labels to Lucide icons
 * Maps Arabic statistics labels to their corresponding visual icons
 */
const iconMap = {
  'المواعيد': CalendarCheck,
  'العمال': Users,
  'اليوميات': FileText,
  'المهام': CheckSquare,
  'الإيرادات': DollarSign,
  'المصروفات': Package,
};

type StatsCardsProps = {
  /** Array of statistics to display */
  stats: Stat[];
};

/**
 * StatsCards Component
 * Displays a responsive grid of statistics cards with icons and trend indicators
 * 
 * Features:
 * - Responsive grid layout (1 column mobile, 2 columns tablet, up to 4 columns desktop)
 * - Dynamic icon mapping based on Arabic labels
 * - Visual trend indicators (up/down arrows with color coding)
 * - Positive trends shown in green, negative in red
 * 
 * @param stats - Array of Stat objects containing label, value, and change
 */
export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", stats.length > 2 ? "lg:grid-cols-4" : "lg:grid-cols-2")}>
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
