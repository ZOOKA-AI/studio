import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Package, AlertCircle, CheckCircle } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  
  // Get stats
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
  
  const { count: totalApps } = await supabase
    .from('apps')
    .select('*', { count: 'exact', head: true })
  
  const { count: pendingApps } = await supabase
    .from('apps')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')
  
  const { count: approvedApps } = await supabase
    .from('apps')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved')

  const { data: recentApps } = await supabase
    .from('apps')
    .select('*, profiles(username)')
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUsers || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التطبيقات</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalApps || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">قيد المراجعة</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingApps || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">منشورة</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{approvedApps || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Apps */}
      <Card>
        <CardHeader>
          <CardTitle>أحدث التطبيقات المضافة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApps && recentApps.length > 0 ? (
              recentApps.map((app: any) => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{app.title}</p>
                    <p className="text-sm text-muted-foreground">
                      by {app.profiles?.username}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      app.status === 'approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {app.status}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(app.created_at).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">لا توجد تطبيقات</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
