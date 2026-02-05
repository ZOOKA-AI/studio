import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, Check } from 'lucide-react'

export default async function NotificationsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(50)

  const unreadCount = notifications?.filter(n => !n.read).length || 0

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">الإشعارات</h2>
          <p className="text-muted-foreground">
            لديك {unreadCount} إشعار غير مقروء
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm">
            <Check className="mr-2 h-4 w-4" />
            تعليم الكل كمقروء
          </Button>
        )}
      </div>

      {!notifications || notifications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">لا توجد إشعارات</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification: any) => (
            <Card key={notification.id} className={notification.read ? 'opacity-60' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{notification.title}</CardTitle>
                      {!notification.read && (
                        <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                      )}
                    </div>
                    <CardDescription className="mt-1">
                      {notification.message}
                    </CardDescription>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(notification.created_at).toLocaleDateString('ar-SA')}
                  </div>
                </div>
              </CardHeader>
              {notification.link && (
                <CardContent>
                  <Button asChild variant="link" size="sm" className="p-0 h-auto">
                    <a href={notification.link}>عرض التفاصيل →</a>
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
