'use client';

/**
 * @fileOverview Social media content generation component
 * 
 * Allows users to generate AI-powered social media content
 */

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {generateSocialContent} from '@/ai/flows/generate-social-content';
import {SocialPlatform, useContentScheduler} from '@/context/content-scheduler-context';
import {Loader2} from 'lucide-react';

export function SocialContentGenerator() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<SocialPlatform>('facebook');
  const [tone, setTone] = useState<'professional' | 'friendly' | 'promotional' | 'educational'>('friendly');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const {addPost} = useContentScheduler();
  const {toast} = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: 'خطأ',
        description: 'الرجاء إدخال موضوع للمحتوى',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateSocialContent({
        topic,
        platform,
        tone,
        language,
      });

      setGeneratedContent(result.content);
      setHashtags(result.hashtags);
      
      toast({
        title: 'تم بنجاح',
        description: 'تم إنشاء المحتوى بنجاح',
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إنشاء المحتوى',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAsDraft = () => {
    if (!generatedContent) return;

    addPost({
      platform,
      content: generatedContent,
      hashtags,
      status: 'draft',
    });

    toast({
      title: 'تم الحفظ',
      description: 'تم حفظ المنشور كمسودة',
    });

    // Reset form
    setTopic('');
    setGeneratedContent('');
    setHashtags([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إنشاء محتوى لوسائل التواصل الاجتماعي</CardTitle>
        <CardDescription>
          استخدم الذكاء الاصطناعي لإنشاء محتوى جذاب لحساباتك على وسائل التواصل
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic">الموضوع أو الخدمة</Label>
          <Textarea
            id="topic"
            placeholder="مثال: تنظيف الفلل، مكافحة الحشرات، تعقيم المنازل..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="platform">المنصة</Label>
            <Select value={platform} onValueChange={(v) => setPlatform(v as SocialPlatform)}>
              <SelectTrigger id="platform">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="snapchat">Snapchat</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">الأسلوب</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as any)}>
              <SelectTrigger id="tone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">احترافي</SelectItem>
                <SelectItem value="friendly">ودود</SelectItem>
                <SelectItem value="promotional">ترويجي</SelectItem>
                <SelectItem value="educational">تعليمي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">اللغة</Label>
            <Select value={language} onValueChange={(v) => setLanguage(v as 'ar' | 'en')}>
              <SelectTrigger id="language">
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
          disabled={isGenerating || !topic.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري الإنشاء...
            </>
          ) : (
            'إنشاء المحتوى'
          )}
        </Button>

        {generatedContent && (
          <div className="space-y-4 mt-6 p-4 border rounded-lg bg-muted/50">
            <div className="space-y-2">
              <Label>المحتوى المُنشأ</Label>
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label>الهاشتاقات</Label>
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <Button onClick={handleSaveAsDraft} variant="outline" className="w-full">
              حفظ كمسودة
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
