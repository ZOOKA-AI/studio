import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, X, Eye } from 'lucide-react'
import Link from 'next/link'

export default async function AdminAppsPage() {
  const supabase = await createClient()
  
  const { data: pendingApps } = await supabase
    .from('apps')
    .select('*, profiles(username, avatar_url)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  const { data: approvedApps } = await supabase
    .from('apps')
    .select('*, profiles(username, avatar_url)')
    .eq('status', 'approved')
    .order('published_at', { ascending: false })
    .limit(20)

  const { data: rejectedApps } = await supabase
    .from('apps')
    .select('*, profiles(username, avatar_url)')
    .eq('status', 'rejected')
    .order('updated_at', { ascending: false })
    .limit(20)

  const renderAppCard = (app: any) => (
    <Card key={app.id}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {app.title}
              <Badge 
                variant={
                  app.status === 'approved' ? 'default' : 
                  app.status === 'pending' ? 'secondary' : 
                  'destructive'
                }
              >
                {app.status}
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              by {app.profiles.username}
            </p>
            <p className="text-sm mt-2">{app.short_description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <p>Category: {app.category || 'N/A'}</p>
            <p>Created: {new Date(app.created_at).toLocaleDateString('ar-SA')}</p>
            {app.repo_url && <p className="truncate max-w-xs">Repo: {app.repo_url}</p>}
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href={`/gallery/${app.slug}`}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
            {app.status === 'pending' && (
              <>
                <Button size="sm" variant="default">
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button size="sm" variant="destructive">
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">إدارة التطبيقات</h2>
        <p className="text-muted-foreground">
          مراجعة وإدارة التطبيقات المرسلة
        </p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            قيد المراجعة ({pendingApps?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="approved">
            منشورة ({approvedApps?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            مرفوضة ({rejectedApps?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {pendingApps && pendingApps.length > 0 ? (
            pendingApps.map(renderAppCard)
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">لا توجد تطبيقات قيد المراجعة</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 mt-6">
          {approvedApps && approvedApps.length > 0 ? (
            approvedApps.map(renderAppCard)
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">لا توجد تطبيقات منشورة</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4 mt-6">
          {rejectedApps && rejectedApps.length > 0 ? (
            rejectedApps.map(renderAppCard)
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">لا توجد تطبيقات مرفوضة</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
