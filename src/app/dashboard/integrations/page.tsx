import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, Youtube, CheckCircle, XCircle } from 'lucide-react'

export default async function IntegrationsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: integrations } = await supabase
    .from('integrations')
    .select('*')
    .eq('user_id', user!.id)

  const getIntegrationStatus = (provider: string) => {
    const integration = integrations?.find(i => i.provider === provider)
    return integration?.is_active ? 'متصل' : 'غير متصل'
  }

  const isConnected = (provider: string) => {
    const integration = integrations?.find(i => i.provider === provider)
    return integration?.is_active || false
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">التكاملات</h2>
        <p className="text-muted-foreground">
          ربط حساباتك من منصات مختلفة لتعزيز تجربتك
        </p>
      </div>

      <div className="grid gap-4">
        {/* GitHub Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Github className="h-8 w-8" />
                <div>
                  <CardTitle>GitHub</CardTitle>
                  <CardDescription>
                    ربط مستودعاتك وتتبع التحديثات
                  </CardDescription>
                </div>
              </div>
              <Badge variant={isConnected('github') ? 'default' : 'secondary'}>
                {getIntegrationStatus('github')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  يسمح لك بعرض معلومات المستودع، النجوم، والفروع مباشرة في صفحة التطبيق
                </p>
                {isConnected('github') && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">متصل بنجاح</span>
                  </div>
                )}
              </div>
              <Button variant={isConnected('github') ? 'outline' : 'default'}>
                {isConnected('github') ? 'قطع الاتصال' : 'ربط الحساب'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* YouTube Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Youtube className="h-8 w-8 text-red-500" />
                <div>
                  <CardTitle>YouTube</CardTitle>
                  <CardDescription>
                    عرض فيديوهاتك التوضيحية
                  </CardDescription>
                </div>
              </div>
              <Badge variant={isConnected('youtube') ? 'default' : 'secondary'}>
                {getIntegrationStatus('youtube')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  قم بتضمين فيديوهات توضيحية من قناتك على YouTube
                </p>
                {isConnected('youtube') && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">متصل بنجاح</span>
                  </div>
                )}
              </div>
              <Button variant={isConnected('youtube') ? 'outline' : 'default'}>
                {isConnected('youtube') ? 'قطع الاتصال' : 'ربط الحساب'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vercel Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-black text-white rounded flex items-center justify-center font-bold">
                  V
                </div>
                <div>
                  <CardTitle>Vercel</CardTitle>
                  <CardDescription>
                    نشر تلقائي وإدارة المشاريع
                  </CardDescription>
                </div>
              </div>
              <Badge variant="secondary">قريباً</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              اربط مشاريعك على Vercel وتتبع حالة النشر مباشرة
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
