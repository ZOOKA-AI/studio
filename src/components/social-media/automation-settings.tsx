'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Clock, Bell, Calendar, Zap, CheckCircle, Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';

export function AutomationSettings() {
  const [dailyPostEnabled, setDailyPostEnabled] = useState(false);
  const [autoHashtagEnabled, setAutoHashtagEnabled] = useState(true);
  const [engagementEnabled, setEngagementEnabled] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  const automationFeatures = [
    {
      id: '1',
      title: 'نشر يومي تلقائي',
      description: 'نشر محتوى تلقائياً حسب الجدول المحدد',
      icon: Calendar,
      enabled: dailyPostEnabled,
      setEnabled: setDailyPostEnabled,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      id: '2',
      title: 'هاشتاجات ذكية',
      description: 'إضافة هاشتاجات SEO تلقائياً لكل منشور',
      icon: Zap,
      enabled: autoHashtagEnabled,
      setEnabled: setAutoHashtagEnabled,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      id: '3',
      title: 'الرد التلقائي',
      description: 'الرد على التعليقات الشائعة تلقائياً',
      icon: Bell,
      enabled: engagementEnabled,
      setEnabled: setEngagementEnabled,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      id: '4',
      title: 'تقرير أداء أسبوعي',
      description: 'إرسال تقرير تحليلي كل أسبوع',
      icon: CheckCircle,
      enabled: analyticsEnabled,
      setEnabled: setAnalyticsEnabled,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
  ];

  const postingSchedule = [
    { day: 'الأحد', time: '19:00', active: true },
    { day: 'الاثنين', time: '12:00', active: true },
    { day: 'الثلاثاء', time: '20:00', active: true },
    { day: 'الأربعاء', time: '18:00', active: true },
    { day: 'الخميس', time: '19:00', active: true },
    { day: 'الجمعة', time: '15:00', active: true },
    { day: 'السبت', time: '17:00', active: true },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <SettingsIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle>إعدادات الأتمتة الذكية</CardTitle>
              <CardDescription>
                قم بتفعيل الأتمتة لتوفير الوقت وزيادة الكفاءة
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automationFeatures.map((feature) => (
              <Card key={feature.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={feature.enabled}
                      onCheckedChange={feature.setEnabled}
                    />
                  </div>
                  {feature.enabled && (
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="w-3 h-3 ml-1" />
                      مفعّل
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>جدول النشر الأسبوعي (7 مرات)</CardTitle>
          <CardDescription>
            خطة نشر محسّنة بناءً على أوقات التفاعل العالي
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {postingSchedule.map((schedule, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-sm w-20">{schedule.day}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{schedule.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  {schedule.active && (
                    <Badge variant="default" className="text-xs">
                      مفعّل
                    </Badge>
                  )}
                  <Select defaultValue="auto">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">تلقائي</SelectItem>
                      <SelectItem value="manual">يدوي</SelectItem>
                      <SelectItem value="disabled">معطل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>قواعد الهاشتاجات الذكية</CardTitle>
          <CardDescription>
            اختر كيفية إضافة الهاشتاجات تلقائياً
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div>
              <Label className="text-sm font-semibold">إضافة هاشتاجات عامة</Label>
              <p className="text-xs text-muted-foreground mt-1">
                إضافة هاشتاجات Royal Cleaning UAE لكل منشور
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div>
              <Label className="text-sm font-semibold">هاشتاجات ترندنج</Label>
              <p className="text-xs text-muted-foreground mt-1">
                إضافة هاشتاجات ترندنج حالية تلقائياً
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div>
              <Label className="text-sm font-semibold">هاشتاجات حسب نوع المحتوى</Label>
              <p className="text-xs text-muted-foreground mt-1">
                اختيار هاشتاجات مناسبة لنوع المنشور (ريلز، كاروسيل، إلخ)
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div>
              <Label className="text-sm font-semibold">هاشتاجات الموقع</Label>
              <p className="text-xs text-muted-foreground mt-1">
                إضافة هاشتاجات المواقع (#Dubai #UAE #AbuDhabi)
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>إشعارات ذكية</CardTitle>
          <CardDescription>
            تنبيهات لمساعدتك في إدارة حسابك بفعالية
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div>
              <Label className="text-sm font-semibold">تذكير بالنشر</Label>
              <p className="text-xs text-muted-foreground mt-1">
                تنبيه قبل 30 دقيقة من موعد النشر المجدول
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div>
              <Label className="text-sm font-semibold">تنبيه التعليقات</Label>
              <p className="text-xs text-muted-foreground mt-1">
                إشعار عند وصول تعليقات جديدة
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div>
              <Label className="text-sm font-semibold">تقرير أداء يومي</Label>
              <p className="text-xs text-muted-foreground mt-1">
                ملخص يومي للإحصائيات والتفاعل
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
            <div>
              <Label className="text-sm font-semibold">تنبيه الترندات</Label>
              <p className="text-xs text-muted-foreground mt-1">
                إشعار عند ظهور ترند جديد في مجال التنظيف
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardHeader>
          <CardTitle>نصائح للأتمتة الناجحة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">راجع المحتوى قبل النشر التلقائي</p>
                <p className="text-muted-foreground">
                  حتى مع الأتمتة، من المهم مراجعة المحتوى للتأكد من جودته
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">تفاعل شخصي مع الجمهور</p>
                <p className="text-muted-foreground">
                  الرد اليدوي على التعليقات يبني علاقة أقوى مع المتابعين
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">عدّل الجدول حسب الأداء</p>
                <p className="text-muted-foreground">
                  راقب التحليلات وعدّل أوقات النشر للحصول على أفضل نتائج
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
