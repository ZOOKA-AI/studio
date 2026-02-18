'use client';

/**
 * @fileOverview SEO keywords generator component
 * 
 * Generate SEO keywords and metadata for content
 */

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useToast} from '@/hooks/use-toast';
import {generateSeoKeywords} from '@/ai/flows/generate-seo-keywords';
import {Loader2, Copy, Check} from 'lucide-react';
import {Badge} from '@/components/ui/badge';

export function SeoKeywordsGenerator() {
  const [content, setContent] = useState('');
  const [service, setService] = useState('');
  const [location, setLocation] = useState('UAE');
  const [language, setLanguage] = useState<'ar' | 'en' | 'both'>('both');
  const [result, setResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const {toast} = useToast();

  const handleGenerate = async () => {
    if (!content.trim()) {
      toast({
        title: 'خطأ',
        description: 'الرجاء إدخال محتوى لتحليله',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const seoResult = await generateSeoKeywords({
        content,
        service: service || undefined,
        location,
        language,
      });

      setResult(seoResult);
      
      toast({
        title: 'تم بنجاح',
        description: 'تم إنشاء الكلمات المفتاحية بنجاح',
      });
    } catch (error) {
      console.error('Error generating SEO keywords:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إنشاء الكلمات المفتاحية',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    toast({
      title: 'تم النسخ',
      description: 'تم نسخ المحتوى إلى الحافظة',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>مولد الكلمات المفتاحية SEO</CardTitle>
        <CardDescription>
          إنشاء كلمات مفتاحية محسّنة لمحركات البحث
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="seo-content">المحتوى</Label>
          <Textarea
            id="seo-content"
            placeholder="أدخل المحتوى أو الوصف الذي تريد تحسينه لمحركات البحث..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="service">الخدمة (اختياري)</Label>
            <Input
              id="service"
              placeholder="مثال: تنظيف، تعقيم، مكافحة حشرات"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">الموقع</Label>
            <Input
              id="location"
              placeholder="الموقع الجغرافي"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo-language">اللغة</Label>
            <Select value={language} onValueChange={(v) => setLanguage(v as any)}>
              <SelectTrigger id="seo-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="both">كلاهما</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !content.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري التحليل...
            </>
          ) : (
            'إنشاء الكلمات المفتاحية'
          )}
        </Button>

        {result && (
          <div className="space-y-6 mt-6">
            {/* Meta Title */}
            <div className="p-4 border rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center justify-between">
                <Label className="font-semibold">Meta Title</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(result.metaTitle, 'title')}
                >
                  {copiedField === 'title' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm">{result.metaTitle}</p>
            </div>

            {/* Meta Description */}
            <div className="p-4 border rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center justify-between">
                <Label className="font-semibold">Meta Description</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(result.metaDescription, 'description')}
                >
                  {copiedField === 'description' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm">{result.metaDescription}</p>
            </div>

            {/* Primary Keywords */}
            <div className="space-y-2">
              <Label className="font-semibold">الكلمات المفتاحية الأساسية</Label>
              <div className="flex flex-wrap gap-2">
                {result.primaryKeywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="default">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Secondary Keywords */}
            <div className="space-y-2">
              <Label className="font-semibold">الكلمات المفتاحية الثانوية</Label>
              <div className="flex flex-wrap gap-2">
                {result.secondaryKeywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Long-tail Keywords */}
            <div className="space-y-2">
              <Label className="font-semibold">كلمات مفتاحية طويلة (Long-tail)</Label>
              <div className="flex flex-wrap gap-2">
                {result.longTailKeywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Hashtags */}
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
