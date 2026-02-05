import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Eye, Download, Star, Edit, Plus } from 'lucide-react'

export default async function MyAppsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: apps } = await supabase
    .from('apps')
    .select('*')
    .eq('owner', user!.id)
    .order('created_at', { ascending: false })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      case 'rejected': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">تطبيقاتي</h2>
        <Button asChild>
          <Link href="/dashboard/apps/new">
            <Plus className="mr-2 h-4 w-4" />
            إضافة تطبيق جديد
          </Link>
        </Button>
      </div>

      {!apps || apps.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">لم تقم بإضافة أي تطبيقات بعد</p>
            <Button asChild>
              <Link href="/dashboard/apps/new">إضافة تطبيق جديد</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {apps.map((app: any) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {app.title}
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                      {app.featured && <Badge variant="secondary">مميز</Badge>}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {app.short_description}
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/apps/${app.id}/edit`}>
                      <Edit className="h-4 w-4 mr-1" />
                      تعديل
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{app.views_count} مشاهدة</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{app.downloads_count} تحميل</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>{app.rating_avg.toFixed(1)} ({app.rating_count})</span>
                  </div>
                  <div>
                    <span>التصنيف: {app.category || 'غير محدد'}</span>
                  </div>
                  <div>
                    <span>الرؤية: {app.visibility}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
