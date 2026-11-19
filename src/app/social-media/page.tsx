'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentScheduler } from '@/components/social-media/content-scheduler';
import { HashtagManager } from '@/components/social-media/hashtag-manager';
import { PostTemplates } from '@/components/social-media/post-templates';
import { AnalyticsDashboard } from '@/components/social-media/analytics-dashboard';
import { AutomationSettings } from '@/components/social-media/automation-settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Instagram, TrendingUp, Hash, Calendar, Settings, FileText } from 'lucide-react';

export default function SocialMediaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 rounded-lg bg-pink-500/10 p-3">
          <Instagram className="w-8 h-8 text-pink-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">إدارة وسائل التواصل</h1>
          <p className="text-muted-foreground">@royal_cleaning_uae - تحسين وأتمتة الحساب</p>
        </div>
      </div>

      <Tabs defaultValue="scheduler" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="scheduler" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">جدولة المحتوى</span>
            <span className="sm:hidden">جدولة</span>
          </TabsTrigger>
          <TabsTrigger value="hashtags" className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            <span className="hidden sm:inline">الهاشتاجات</span>
            <span className="sm:hidden">هاشتاج</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">القوالب</span>
            <span className="sm:hidden">قوالب</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">التحليلات</span>
            <span className="sm:hidden">إحصائيات</span>
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">الأتمتة</span>
            <span className="sm:hidden">أتمتة</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scheduler" className="mt-6">
          <ContentScheduler />
        </TabsContent>

        <TabsContent value="hashtags" className="mt-6">
          <HashtagManager />
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <PostTemplates />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="automation" className="mt-6">
          <AutomationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
