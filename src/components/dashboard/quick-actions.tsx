import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, UserPlus, FolderPlus, CalendarPlus, Send } from "lucide-react";

const actions = [
  { label: 'بدء يومية جديدة', icon: PlusCircle, variant: 'default' as const },
  { label: 'إضافة عامل', icon: UserPlus, variant: 'outline' as const },
  { label: 'طلب مواد', icon: FolderPlus, variant: 'outline' as const },
  { label: 'جدولة موعد', icon: CalendarPlus, variant: 'outline' as const },
  { label: 'إرسال إشعار', icon: Send, variant: 'outline' as const },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">⚡ إجراءات سريعة</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button key={index} variant={action.variant} className="w-full justify-start text-base py-6">
              <Icon className="me-3 h-5 w-5" />
              {action.label}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
