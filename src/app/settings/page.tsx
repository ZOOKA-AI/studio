'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
    const { toast } = useToast();
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>الإعدادات</CardTitle>
          <CardDescription>إدارة إعدادات حسابك وتفضيلات الواجهة.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="dark-mode" className="text-base">الوضع الليلي</Label>
                    <p className="text-sm text-muted-foreground">
                        قم بتبديل الواجهة بين الوضع الفاتح والداكن.
                    </p>
                </div>
                 <Switch id="dark-mode" onCheckedChange={() => toast({ title: "سيتم تفعيل هذه الميزة قريبًا!"})} />
            </div>
             <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="notifications" className="text-base">الإشعارات</Label>
                    <p className="text-sm text-muted-foreground">
                        إدارة تفضيلات الإشعارات الخاصة بك.
                    </p>
                </div>
                 <Switch id="notifications" onCheckedChange={() => toast({ title: "سيتم تفعيل هذه الميزة قريبًا!"})} />
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>إدارة الحساب</CardTitle>
            <CardDescription>إجراءات إدارية لحسابك.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button variant="destructive" onClick={() => toast({variant: 'destructive', title: "هل أنت متأكد؟", description: "هذه الميزة لم يتم تفعيلها بعد."})}>
                حذف الحساب
            </Button>
             <p className="text-sm text-muted-foreground mt-2">
                سيؤدي هذا الإجراء إلى حذف حسابك وجميع بياناتك بشكل دائم. لا يمكن التراجع عن هذا الإجراء.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
