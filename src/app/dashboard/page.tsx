import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Package, Bell, Settings } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: apps } = await supabase
    .from('apps')
    .select('*')
    .eq('owner', user!.id)
    .order('created_at', { ascending: false })
  
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user!.id)
    .eq('read', false)
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = {
    totalApps: apps?.length || 0,
    publishedApps: apps?.filter(app => app.status === 'approved').length || 0,
    pendingApps: apps?.filter(app => app.status === 'pending').length || 0,
    totalDownloads: apps?.reduce((sum, app) => sum + app.downloads_count, 0) || 0,
    totalViews: apps?.reduce((sum, app) => sum + app.views_count, 0) || 0,
    unreadNotifications: notifications?.length || 0,
  }

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">إجمالي التطبيقات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalApps}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">التطبيقات المنشورة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.publishedApps}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">إجمالي التحميلات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalDownloads}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">إجمالي المشاهدات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalViews}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button asChild size="lg" className="h-auto py-6">
            <Link href="/dashboard/apps/new">
              <div className="flex flex-col items-center gap-2">
                <Plus className="h-8 w-8" />
                <span>إرسال تطبيق جديد</span>
              </div>
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="h-auto py-6">
            <Link href="/dashboard/apps">
              <div className="flex flex-col items-center gap-2">
                <Package className="h-8 w-8" />
                <span>إدارة التطبيقات</span>
              </div>
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="h-auto py-6">
            <Link href="/dashboard/integrations">
              <div className="flex flex-col items-center gap-2">
                <Settings className="h-8 w-8" />
                <span>التكاملات</span>
              </div>
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      {notifications && notifications.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>الإشعارات الأخيرة</CardTitle>
              <CardDescription>لديك {stats.unreadNotifications} إشعارات غير مقروءة</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/notifications">عرض الكل</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification: any) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                  <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(notification.created_at).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
