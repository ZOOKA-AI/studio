'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { generateInstagramHashtags, type GenerateInstagramHashtagsInput, type GenerateInstagramHashtagsOutput } from '@/ai/flows/generate-instagram-hashtags';
import { generateSeoJson, type GenerateSeoJsonInput, type GenerateSeoJsonOutput } from '@/ai/flows/generate-seo-json';
import { Hash, Code, Copy, Loader2, CheckCircle, Instagram } from 'lucide-react';

export default function MarketingPage() {
  const [postContent, setPostContent] = useState('');
  const [targetCities, setTargetCities] = useState('Dubai, Abu Dhabi, Al Ain, Sharjah');
  const [serviceType, setServiceType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [language, setLanguage] = useState<'ar' | 'en' | 'both'>('both');
  
  const [hashtagsLoading, setHashtagsLoading] = useState(false);
  const [seoLoading, setSeoLoading] = useState(false);
  
  const [hashtagsResult, setHashtagsResult] = useState<GenerateInstagramHashtagsOutput | null>(null);
  const [seoResult, setSeoResult] = useState<GenerateSeoJsonOutput | null>(null);

  const handleGenerateHashtags = async () => {
    if (!postContent.trim()) {
      toast({
        title: 'خطأ',
        description: 'الرجاء إدخال محتوى المنشور',
        variant: 'destructive',
      });
      return;
    }

    setHashtagsLoading(true);
    try {
      const input: GenerateInstagramHashtagsInput = {
        postContent,
        targetCities: targetCities.split(',').map(c => c.trim()).filter(Boolean),
        language,
      };
      
      const result = await generateInstagramHashtags(input);
      setHashtagsResult(result);
      
      toast({
        title: 'تم بنجاح',
        description: 'تم إنشاء الهاشتاجات بنجاح',
      });
    } catch (error) {
      console.error('Error generating hashtags:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إنشاء الهاشتاجات',
        variant: 'destructive',
      });
    } finally {
      setHashtagsLoading(false);
    }
  };

  const handleGenerateSeoJson = async () => {
    if (!postContent.trim()) {
      toast({
        title: 'خطأ',
        description: 'الرجاء إدخال محتوى المنشور',
        variant: 'destructive',
      });
      return;
    }

    setSeoLoading(true);
    try {
      const input: GenerateSeoJsonInput = {
        businessName: 'Royal Clean UAE',
        postContent,
        serviceType: serviceType || undefined,
        targetCities: targetCities.split(',').map(c => c.trim()).filter(Boolean),
        priceRange: priceRange || undefined,
      };
      
      const result = await generateSeoJson(input);
      setSeoResult(result);
      
      toast({
        title: 'تم بنجاح',
        description: 'تم إنشاء JSON-LD بنجاح',
      });
    } catch (error) {
      console.error('Error generating SEO JSON:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إنشاء JSON-LD',
        variant: 'destructive',
      });
    } finally {
      setSeoLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'تم النسخ',
      description: `تم نسخ ${label} إلى الحافظة`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary">أدوات التسويق والسيو</h1>
        <p className="text-muted-foreground mt-2">
          إنشاء هاشتاجات وجيسون SEO للمنشورات على Instagram
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Instagram className="h-5 w-5" />
            معلومات المنشور
          </CardTitle>
          <CardDescription>
            أدخل تفاصيل المنشور الذي تريد إنشاء هاشتاجات وجيسون SEO له
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="postContent">محتوى المنشور *</Label>
            <Textarea
              id="postContent"
              placeholder="مثال: خدمات تنظيف عميق للمنازل والفلل في دبي. فريق محترف ومعدات حديثة. احجز الآن!"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetCities">المدن المستهدفة</Label>
              <Input
                id="targetCities"
                placeholder="Dubai, Abu Dhabi, Al Ain, Sharjah"
                value={targetCities}
                onChange={(e) => setTargetCities(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType">نوع الخدمة</Label>
              <Input
                id="serviceType"
                placeholder="مثال: تنظيف عميق، تنظيف منازل، تنظيف مكاتب"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceRange">نطاق السعر (بالدرهم)</Label>
              <Input
                id="priceRange"
                placeholder="مثال: 100-500 AED"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">لغة الهاشتاجات</Label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'ar' | 'en' | 'both')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="both">عربي وإنجليزي</option>
                <option value="ar">عربي فقط</option>
                <option value="en">إنجليزي فقط</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGenerateHashtags}
              disabled={hashtagsLoading || !postContent.trim()}
              className="flex-1"
            >
              {hashtagsLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الإنشاء...
                </>
              ) : (
                <>
                  <Hash className="ml-2 h-4 w-4" />
                  إنشاء هاشتاجات
                </>
              )}
            </Button>

            <Button
              onClick={handleGenerateSeoJson}
              disabled={seoLoading || !postContent.trim()}
              variant="secondary"
              className="flex-1"
            >
              {seoLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الإنشاء...
                </>
              ) : (
                <>
                  <Code className="ml-2 h-4 w-4" />
                  إنشاء SEO JSON
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {(hashtagsResult || seoResult) && (
        <Tabs defaultValue="hashtags" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hashtags">الهاشتاجات</TabsTrigger>
            <TabsTrigger value="seo">SEO JSON-LD</TabsTrigger>
          </TabsList>

          <TabsContent value="hashtags" className="space-y-4">
            {hashtagsResult && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      الهاشتاجات المولدة
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(hashtagsResult.formattedHashtags, 'الهاشتاجات')}
                    >
                      <Copy className="ml-2 h-4 w-4" />
                      نسخ الكل
                    </Button>
                  </div>
                  <CardDescription>
                    تم إنشاء {hashtagsResult.hashtags?.length || 0} هاشتاج
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hashtagsResult.formattedHashtags && (
                    <div className="space-y-2">
                      <Label>جميع الهاشتاجات (جاهزة للنسخ)</Label>
                      <div className="bg-muted p-4 rounded-md">
                        <p className="text-sm font-mono break-words whitespace-pre-wrap">
                          {hashtagsResult.formattedHashtags}
                        </p>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {hashtagsResult.englishHashtags && hashtagsResult.englishHashtags.length > 0 && (
                    <div className="space-y-2">
                      <Label>الهاشتاجات الإنجليزية</Label>
                      <div className="flex flex-wrap gap-2">
                        {hashtagsResult.englishHashtags.map((tag: string, idx: number) => (
                          <Badge key={idx} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {hashtagsResult.arabicHashtags && hashtagsResult.arabicHashtags.length > 0 && (
                    <div className="space-y-2">
                      <Label>الهاشتاجات العربية</Label>
                      <div className="flex flex-wrap gap-2">
                        {hashtagsResult.arabicHashtags.map((tag: string, idx: number) => (
                          <Badge key={idx} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {hashtagsResult.locationHashtags && hashtagsResult.locationHashtags.length > 0 && (
                    <div className="space-y-2">
                      <Label>هاشتاجات المواقع</Label>
                      <div className="flex flex-wrap gap-2">
                        {hashtagsResult.locationHashtags.map((tag: string, idx: number) => (
                          <Badge key={idx} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            {seoResult && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      SEO JSON-LD
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(seoResult.jsonLd, 'JSON-LD')}
                    >
                      <Copy className="ml-2 h-4 w-4" />
                      نسخ JSON
                    </Button>
                  </div>
                  <CardDescription>
                    {seoResult.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>JSON-LD (جاهز للإضافة في HTML)</Label>
                    <div className="bg-muted p-4 rounded-md overflow-x-auto">
                      <pre className="text-xs font-mono">
                        {seoResult.jsonLd}
                      </pre>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>كيفية الاستخدام</Label>
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md text-sm space-y-2">
                      <p>1. انسخ JSON-LD أعلاه</p>
                      <p>2. أضفه في صفحة HTML داخل تاج:</p>
                      <code className="block bg-muted p-2 rounded mt-2 text-xs">
                        {`<script type="application/ld+json">\n  // JSON-LD هنا\n</script>`}
                      </code>
                      <p className="mt-2">3. سيساعد هذا محركات البحث على فهم محتواك بشكل أفضل</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
