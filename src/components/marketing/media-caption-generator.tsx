'use client';

/**
 * @fileOverview Media caption generator component
 * 
 * Generate engaging captions for images and videos
 */

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useToast} from '@/hooks/use-toast';
import {generateMediaCaption} from '@/ai/flows/generate-media-caption';
import {SocialPlatform} from '@/context/content-scheduler-context';
import {Loader2} from 'lucide-react';
import {Input} from '@/components/ui/input';

export function MediaCaptionGenerator() {
  const [description, setDescription] = useState('');
  const [service, setService] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [platform, setPlatform] = useState<SocialPlatform>('instagram');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [result, setResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const {toast} = useToast();

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({
        title: 'خطأ',
        description: 'الرجاء وصف المحتوى المرئي',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const captionResult = await generateMediaCaption({
        mediaType,
        description,
        service: service || undefined,
        platform,
        language,
      });

      setResult(captionResult);
      
      toast({
        title: 'تم بنجاح',
        description: 'تم إنشاء التعليق بنجاح',
      });
    } catch (error) {
      console.error('Error generating caption:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إنشاء التعليق',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>مولد تعليقات الصور والفيديو</CardTitle>
        <CardDescription>
          إنشاء تعليقات جذابة للمحتوى المرئي
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="media-description">وصف المحتوى المرئي</Label>
          <Textarea
            id="media-description"
            placeholder="صف ما يظهر في الصورة أو الفيديو... مثال: عامل ينظف أرضية رخامية باستخدام معدات حديثة"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="media-type">نوع المحتوى</Label>
            <Select value={mediaType} onValueChange={(v) => setMediaType(v as any)}>
              <SelectTrigger id="media-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">صورة</SelectItem>
                <SelectItem value="video">فيديو</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="media-service">الخدمة (اختياري)</Label>
            <Input
              id="media-service"
              placeholder="مثال: تنظيف الفلل"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="media-platform">المنصة</Label>
            <Select value={platform} onValueChange={(v) => setPlatform(v as SocialPlatform)}>
              <SelectTrigger id="media-platform">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="snapchat">Snapchat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="media-language">اللغة</Label>
            <Select value={language} onValueChange={(v) => setLanguage(v as 'ar' | 'en')}>
              <SelectTrigger id="media-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !description.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري الإنشاء...
            </>
          ) : (
            'إنشاء التعليق'
          )}
        </Button>

        {result && (
          <div className="space-y-4 mt-6 p-4 border rounded-lg bg-muted/50">
            <div className="space-y-2">
              <Label className="font-semibold">التعليق</Label>
              <Textarea
                value={result.caption}
                readOnly
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">الإيموجي المقترحة</Label>
              <div className="flex flex-wrap gap-2">
                {result.emojis.map((emoji: string, index: number) => (
                  <span key={index} className="text-2xl">
                    {emoji}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">الهاشتاقات</Label>
              <div className="flex flex-wrap gap-2">
                {result.hashtags.map((tag: string, index: number) => (
                  <span key={index} className="text-sm text-primary">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">دعوة للعمل (CTA)</Label>
              <p className="text-sm p-2 bg-primary/10 rounded">
                {result.callToAction}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">نص بديل للوصول (Alt Text)</Label>
              <p className="text-sm text-muted-foreground">
                {result.accessibility}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
