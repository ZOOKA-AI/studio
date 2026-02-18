'use client';

/**
 * @fileOverview Marketing automation dashboard
 * 
 * Central hub for content marketing and social media management
 */

import {SocialContentGenerator} from '@/components/marketing/social-content-generator';
import {SocialMediaQueue} from '@/components/marketing/social-media-queue';
import {SocialMediaConfig} from '@/components/marketing/social-media-config';
import {SeoKeywordsGenerator} from '@/components/marketing/seo-keywords-generator';
import {MediaCaptionGenerator} from '@/components/marketing/media-caption-generator';
import {ContentSchedulerProvider} from '@/context/content-scheduler-context';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

export default function MarketingDashboardPage() {
  return (
    <ContentSchedulerProvider>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">إدارة المحتوى التسويقي</h1>
          <p className="text-muted-foreground">
            نظام آلي لإنشاء ونشر المحتوى على وسائل التواصل الاجتماعي - Royal Clean UAE
          </p>
        </div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="content">إنشاء المحتوى</TabsTrigger>
            <TabsTrigger value="media">تعليقات الوسائط</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="queue">قائمة النشر</TabsTrigger>
            <TabsTrigger value="config">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-6">
            <div className="grid grid-cols-1 gap-8">
              <SocialContentGenerator />
              <Card>
                <CardHeader>
                  <CardTitle>نظرة عامة على نظام الأتمتة</CardTitle>
                  <CardDescription>
                    كيف يعمل نظام إدارة المحتوى التلقائي
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <h3>🚀 ميزات النظام</h3>
                  <ul>
                    <li>✨ إنشاء محتوى ذكي باستخدام الذكاء الاصطناعي</li>
                    <li>📱 دعم جميع منصات التواصل الاجتماعي الرئيسية</li>
                    <li>🔍 توليد كلمات مفتاحية محسّنة لمحركات البحث</li>
                    <li>🎨 إنشاء تعليقات جذابة للصور والفيديو</li>
                    <li>⏰ جدولة ونشر المحتوى تلقائياً</li>
                    <li>📊 تتبع الأداء والتحليلات</li>
                  </ul>

                  <h3>🌐 الحسابات المدمجة</h3>
                  <ul>
                    <li>Facebook: <a href="https://www.facebook.com/share/1D2Dppyjux/" target="_blank">Royal Clean UAE</a></li>
                    <li>Instagram: <a href="https://www.instagram.com/royal_cleaning_uae" target="_blank">@royal_cleaning_uae</a></li>
                    <li>TikTok: <a href="https://www.tiktok.com/@royal_cleaning_uae" target="_blank">@royal_cleaning_uae</a></li>
                    <li>LinkedIn: <a href="https://www.linkedin.com/in/شركه-رويال-للتنظيف-والتعقيم-ومكافحه-الحشرات-🐜🦗👌-3a1186226" target="_blank">Royal Clean UAE</a></li>
                    <li>Snapchat: <a href="https://www.snapchat.com/add/royalcleane_uae" target="_blank">royalcleane_uae</a></li>
                    <li>WhatsApp: <a href="https://wa.me/971563177803" target="_blank">+971 56 317 7803</a></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-6">
            <MediaCaptionGenerator />
          </TabsContent>

          <TabsContent value="seo" className="mt-6">
            <SeoKeywordsGenerator />
          </TabsContent>

          <TabsContent value="queue" className="mt-6">
            <SocialMediaQueue />
          </TabsContent>

          <TabsContent value="config" className="mt-6">
            <SocialMediaConfig />
          </TabsContent>
        </Tabs>
      </div>
    </ContentSchedulerProvider>
  );
}
