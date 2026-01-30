'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useSocialMedia } from '@/context/social-media-context';
import { Hash, Copy, Download, Plus, Trash2, CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function HashtagManager() {
  const { hashtagSets, addHashtagSet, deleteHashtagSet } = useSocialMedia();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newSetName, setNewSetName] = useState('');
  const [newHashtags, setNewHashtags] = useState('');
  const [newCategory, setNewCategory] = useState<'general' | 'service' | 'location' | 'trending'>('general');
  const [newLanguage, setNewLanguage] = useState<'ar' | 'en' | 'both'>('both');

  const copyHashtags = (hashtags: string[], setId: string) => {
    const text = hashtags.join(' ');
    navigator.clipboard.writeText(text);
    setCopiedId(setId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportHashtagsJSON = () => {
    const dataStr = JSON.stringify(hashtagSets, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'royal_cleaning_hashtags.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleAddHashtagSet = () => {
    if (newSetName && newHashtags) {
      const hashtags = newHashtags
        .split(/[\s,]+/)
        .map(tag => tag.trim())
        .filter(tag => tag.startsWith('#'))
        .filter(Boolean);
      
      if (hashtags.length > 0) {
        addHashtagSet({
          name: newSetName,
          hashtags,
          category: newCategory,
          language: newLanguage,
        });
        setNewSetName('');
        setNewHashtags('');
        setShowForm(false);
      }
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      general: 'عام',
      service: 'خدمات',
      location: 'مواقع',
      trending: 'ترندنج',
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getLanguageLabel = (language: string) => {
    const labels = {
      ar: 'عربي',
      en: 'إنجليزي',
      both: 'عربي/إنجليزي',
    };
    return labels[language as keyof typeof labels] || language;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>إدارة الهاشتاجات</CardTitle>
              <CardDescription>هاشتاجات SEO محسّنة لزيادة الوصول والظهور في نتائج البحث</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={exportHashtagsJSON} variant="outline" size="sm">
                <Download className="w-4 h-4 ml-2" />
                تصدير JSON
              </Button>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="w-4 h-4 ml-2" />
                مجموعة جديدة
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <Card className="mb-6 border-2 border-primary/20">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>اسم المجموعة</Label>
                  <Input
                    placeholder="مثال: خدمات التنظيف الخاصة"
                    value={newSetName}
                    onChange={(e) => setNewSetName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>الفئة</Label>
                    <Select value={newCategory} onValueChange={(v: any) => setNewCategory(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">عام</SelectItem>
                        <SelectItem value="service">خدمات</SelectItem>
                        <SelectItem value="location">مواقع</SelectItem>
                        <SelectItem value="trending">ترندنج</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>اللغة</Label>
                    <Select value={newLanguage} onValueChange={(v: any) => setNewLanguage(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">عربي</SelectItem>
                        <SelectItem value="en">إنجليزي</SelectItem>
                        <SelectItem value="both">عربي/إنجليزي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>الهاشتاجات (افصل بمسافة أو فاصلة)</Label>
                  <Input
                    placeholder="#تنظيف_منازل #CleaningService #Dubai"
                    value={newHashtags}
                    onChange={(e) => setNewHashtags(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    تأكد من بدء كل هاشتاج بعلامة #
                  </p>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddHashtagSet} disabled={!newSetName || !newHashtags}>
                    إضافة المجموعة
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hashtagSets.map((set) => (
              <Card key={set.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{set.name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{getCategoryLabel(set.category)}</Badge>
                        <Badge variant="secondary">{getLanguageLabel(set.language)}</Badge>
                        <Badge>{set.hashtags.length} هاشتاج</Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteHashtagSet(set.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-md max-h-32 overflow-y-auto">
                      {set.hashtags.map((tag, index) => (
                        <span key={index} className="text-sm text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      onClick={() => copyHashtags(set.hashtags, set.id)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      {copiedId === set.id ? (
                        <>
                          <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                          تم النسخ!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 ml-2" />
                          نسخ الهاشتاجات
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>نصائح SEO للهاشتاجات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Hash className="w-4 h-4 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">استخدم 20-30 هاشتاج لكل منشور</p>
                <p className="text-muted-foreground">مزيج من الهاشتاجات الشائعة والمتخصصة</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Hash className="w-4 h-4 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">نوّع بين العربية والإنجليزية</p>
                <p className="text-muted-foreground">للوصول إلى جمهور أوسع في الإمارات</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Hash className="w-4 h-4 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">حدّث الهاشتاجات الترندنج أسبوعياً</p>
                <p className="text-muted-foreground">تابع الترندات في Explore و Reels</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Hash className="w-4 h-4 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">استخدم هاشتاجات الموقع</p>
                <p className="text-muted-foreground">#Dubai #AbuDhabi #Sharjah #UAE</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
