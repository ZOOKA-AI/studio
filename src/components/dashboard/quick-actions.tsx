'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, UserPlus, FolderPlus, CalendarPlus, Send } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export function QuickActions() {
    const { toast } = useToast();
  const actions = [
    { label: 'إضافة موعد جديد (تسجيل المشرف)', icon: CalendarPlus, variant: 'default' as const, href: '/calendar' },
    { label: 'بدء يومية جديدة', icon: PlusCircle, variant: 'outline' as const, href: '/reports/new' },
    { label: 'إضافة عامل', icon: UserPlus, variant: 'outline' as const, href: '/workers' },
    { label: 'طلب مواد', icon: FolderPlus, variant: 'outline' as const, href: '/inventory' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">⚡ إجراءات سريعة</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button key={index} variant={action.variant} className="w-full justify-start text-base py-6" asChild>
              <Link href={action.href}>
                <Icon className="me-3 h-5 w-5" />
                {action.label}
              </Link>
            </Button>
          );
        })}
        <Button variant={'outline'} className="w-full justify-start text-base py-6" onClick={() => toast({ title: 'تم الإرسال', description: "تم إرسال الإشعار بنجاح."})}>
            <Send className="me-3 h-5 w-5" />
            إرسال إشعار
        </Button>
      </CardContent>
    </Card>
  );
}
