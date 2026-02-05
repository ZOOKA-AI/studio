'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewAppPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    // Create slug from title
    const title = formData.get('title') as string
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    try {
      // TODO: Implement app creation with Supabase
      console.log('Creating app:', { slug, title })
      
      // Redirect to apps list after creation
      router.push('/dashboard/apps')
    } catch (error) {
      console.error('Error creating app:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">إرسال تطبيق جديد</h2>
        <p className="text-muted-foreground">
          املأ المعلومات التالية لإرسال تطبيقك للمراجعة
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>معلومات التطبيق</CardTitle>
            <CardDescription>
              المعلومات الأساسية عن تطبيقك
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان التطبيق *</Label>
              <Input
                id="title"
                name="title"
                placeholder="اسم تطبيقك"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">وصف قصير *</Label>
              <Input
                id="short_description"
                name="short_description"
                placeholder="وصف مختصر في جملة واحدة"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">الوصف الكامل *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="وصف تفصيلي عن تطبيقك وميزاته"
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">التصنيف</Label>
                <Select name="category">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="productivity">إنتاجية</SelectItem>
                    <SelectItem value="education">تعليم</SelectItem>
                    <SelectItem value="development">تطوير</SelectItem>
                    <SelectItem value="design">تصميم</SelectItem>
                    <SelectItem value="business">أعمال</SelectItem>
                    <SelectItem value="ai">ذكاء اصطناعي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visibility">الرؤية</Label>
                <Select name="visibility" defaultValue="private">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">عام</SelectItem>
                    <SelectItem value="private">خاص</SelectItem>
                    <SelectItem value="unlisted">غير مدرج</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon_url">رابط الأيقونة</Label>
              <Input
                id="icon_url"
                name="icon_url"
                type="url"
                placeholder="https://example.com/icon.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repo_url">رابط المستودع (GitHub)</Label>
              <Input
                id="repo_url"
                name="repo_url"
                type="url"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="live_url">رابط العرض المباشر</Label>
              <Input
                id="live_url"
                name="live_url"
                type="url"
                placeholder="https://your-app.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="download_url">رابط التحميل</Label>
              <Input
                id="download_url"
                name="download_url"
                type="url"
                placeholder="https://example.com/download"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">الوسوم (مفصولة بفواصل)</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="react, nextjs, ai, productivity"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            إلغاء
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'جارٍ الإرسال...' : 'إرسال للمراجعة'}
          </Button>
        </div>
      </form>
    </div>
  )
}
