'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSocialMedia } from '@/context/social-media-context';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { CalendarIcon, Plus, Download, Trash2, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function ContentScheduler() {
  const { posts, addPost, deletePost, hashtagSets } = useSocialMedia();
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [postType, setPostType] = useState<'reel' | 'carousel' | 'story' | 'post'>('post');
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  const handleAddPost = () => {
    if (content && selectedDate) {
      // Validate that the date is not in the past
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const schedDate = new Date(selectedDate);
      schedDate.setHours(0, 0, 0, 0);
      
      if (schedDate < now) {
        // Could use a toast notification here instead
        alert('لا يمكن جدولة منشور لتاريخ في الماضي');
        return;
      }
      
      addPost({
        content,
        hashtags: selectedHashtags,
        scheduledDate: selectedDate,
        type: postType,
        status: 'scheduled',
      });
      setContent('');
      setSelectedHashtags([]);
      setSelectedDate(undefined);
      setShowForm(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(posts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `royal_cleaning_posts_${format(new Date(), 'yyyy-MM-dd')}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const addHashtagsFromSet = (setId: string) => {
    const set = hashtagSets.find(s => s.id === setId);
    if (set) {
      setSelectedHashtags([...new Set([...selectedHashtags, ...set.hashtags])]);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>جدولة المحتوى</CardTitle>
              <CardDescription>خطط ونظم منشوراتك على انستقرام - 7 مرات أسبوعياً للوصول الأمثل</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleExportJSON} variant="outline" size="sm">
                <Download className="w-4 h-4 ml-2" />
                تصدير JSON
              </Button>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="w-4 h-4 ml-2" />
                منشور جديد
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <Card className="mb-6 border-2 border-primary/20">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>نوع المنشور</Label>
                  <Select value={postType} onValueChange={(v: typeof postType) => setPostType(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="post">منشور عادي</SelectItem>
                      <SelectItem value="reel">ريلز (Reel)</SelectItem>
                      <SelectItem value="carousel">كاروسيل (Carousel)</SelectItem>
                      <SelectItem value="story">ستوري (Story)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>المحتوى</Label>
                  <Textarea
                    placeholder="اكتب محتوى المنشور هنا..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    maxLength={2200}
                  />
                  <p className="text-xs text-muted-foreground">
                    {content.length} / 2200 حرف
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>إضافة هاشتاجات من مجموعة</Label>
                  <Select onValueChange={addHashtagsFromSet}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر مجموعة هاشتاجات..." />
                    </SelectTrigger>
                    <SelectContent>
                      {hashtagSets.map((set) => (
                        <SelectItem key={set.id} value={set.id}>
                          {set.name} ({set.hashtags.length} هاشتاج)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedHashtags.length > 0 && (
                  <div className="space-y-2">
                    <Label>الهاشتاجات المحددة ({selectedHashtags.length})</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedHashtags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                          <button
                            onClick={() => setSelectedHashtags(selectedHashtags.filter((_, i) => i !== index))}
                            className="ml-2 hover:text-destructive"
                            aria-label={`إزالة ${tag}`}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>تاريخ النشر</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !selectedDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP', { locale: ar }) : 'اختر التاريخ'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddPost} disabled={!content || !selectedDate}>
                    جدولة المنشور
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد منشورات مجدولة بعد</p>
                <p className="text-sm">ابدأ بإضافة منشور جديد للتخطيط لمحتواك</p>
              </div>
            ) : (
              posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={post.type === 'reel' ? 'default' : 'secondary'}>
                            {post.type === 'reel' && 'ريلز'}
                            {post.type === 'carousel' && 'كاروسيل'}
                            {post.type === 'story' && 'ستوري'}
                            {post.type === 'post' && 'منشور'}
                          </Badge>
                          <Badge variant="outline">
                            {format(post.scheduledDate, 'PPP', { locale: ar })}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2 whitespace-pre-wrap">{post.content}</p>
                        <div className="flex flex-wrap gap-1">
                          {post.hashtags.slice(0, 5).map((tag, index) => (
                            <span key={index} className="text-xs text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                          {post.hashtags.length > 5 && (
                            <span className="text-xs text-muted-foreground">
                              +{post.hashtags.length - 5} المزيد
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
