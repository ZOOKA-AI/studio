'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Heart, MessageCircle, Share2, Eye, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function AnalyticsDashboard() {
  // Mock data - في التطبيق الحقيقي، ستأتي من Instagram Graph API
  const metrics = [
    {
      label: 'المتابعون',
      value: '2,543',
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'الوصول',
      value: '15.2K',
      change: '+24.3%',
      icon: Eye,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'التفاعل',
      value: '8.7%',
      change: '+3.2%',
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: 'الإعجابات',
      value: '1,234',
      change: '+18.7%',
      icon: Heart,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
    },
    {
      label: 'التعليقات',
      value: '342',
      change: '+15.4%',
      icon: MessageCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      label: 'المشاركات',
      value: '187',
      change: '+22.1%',
      icon: Share2,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
    },
  ];

  const topPosts = [
    {
      id: '1',
      type: 'reel',
      title: 'ريلز قبل وبعد - تنظيف المطبخ',
      likes: 2543,
      comments: 187,
      shares: 94,
      reach: 12500,
    },
    {
      id: '2',
      type: 'carousel',
      title: 'دليل التنظيف الموسمي',
      likes: 1876,
      comments: 142,
      shares: 67,
      reach: 9800,
    },
    {
      id: '3',
      type: 'reel',
      title: 'نصيحة تنظيف سريعة',
      likes: 1654,
      comments: 98,
      shares: 123,
      reach: 11200,
    },
  ];

  const bestTimes = [
    { day: 'الأحد', time: '19:00 - 21:00', engagement: 'عالي جداً' },
    { day: 'الاثنين', time: '12:00 - 14:00', engagement: 'متوسط' },
    { day: 'الثلاثاء', time: '20:00 - 22:00', engagement: 'عالي' },
    { day: 'الأربعاء', time: '18:00 - 20:00', engagement: 'عالي' },
    { day: 'الخميس', time: '19:00 - 21:00', engagement: 'عالي جداً' },
    { day: 'الجمعة', time: '15:00 - 17:00', engagement: 'عالي' },
    { day: 'السبت', time: '17:00 - 19:00', engagement: 'متوسط' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>نظرة عامة على الأداء</CardTitle>
          <CardDescription>إحصائيات الـ 30 يوم الماضية</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-sm text-green-600 mt-1">
                        <TrendingUp className="w-3 h-3 inline ml-1" />
                        {metric.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أفضل المنشورات أداءً</CardTitle>
            <CardDescription>حسب عدد الوصول والتفاعل</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {post.type === 'reel' ? 'ريلز' : 'كاروسيل'}
                        </Badge>
                        <p className="text-sm font-semibold">{post.title}</p>
                      </div>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">وصول</p>
                        <p className="text-sm font-semibold">{post.reach.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">إعجاب</p>
                        <p className="text-sm font-semibold">{post.likes.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">تعليق</p>
                        <p className="text-sm font-semibold">{post.comments}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">مشاركة</p>
                        <p className="text-sm font-semibold">{post.shares}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>أفضل أوقات النشر</CardTitle>
            <CardDescription>بناءً على معدل التفاعل</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bestTimes.map((time, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <div className="font-semibold text-sm w-20">{time.day}</div>
                    <div className="text-sm text-muted-foreground">{time.time}</div>
                  </div>
                  <Badge
                    variant={
                      time.engagement === 'عالي جداً'
                        ? 'default'
                        : time.engagement === 'عالي'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {time.engagement}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>توصيات لتحسين الأداء</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                ما يعمل بشكل جيد
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>الريلز تحصل على أعلى وصول (متوسط 12K)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>محتوى "قبل وبعد" يحقق تفاعل عالي</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>النشر مساءً (7-9 م) الأفضل</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>الهاشتاجات المحلية تزيد الوصول</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-500" />
                فرص للتحسين
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">→</span>
                  <span>زيادة تكرار النشر إلى 7 مرات أسبوعياً</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">→</span>
                  <span>استخدام المزيد من الريلز الترندنج</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">→</span>
                  <span>الرد على التعليقات خلال ساعة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">→</span>
                  <span>نشر ستوريز يومية (5-7 مرات)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
        <CardHeader>
          <CardTitle>ملاحظة هامة</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            📊 هذه بيانات توضيحية. للحصول على بيانات حقيقية، قم بربط حساب Instagram الخاص بك عبر 
            <span className="font-semibold"> Instagram Graph API</span> في قسم الإعدادات.
            سيمكنك ذلك من تتبع الأداء الفعلي، جدولة المنشورات تلقائياً، والحصول على تحليلات دقيقة.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
