import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function AdminUsersPage() {
  const supabase = await createClient()
  
  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  // Get app counts for each user
  const usersWithStats = await Promise.all(
    (users || []).map(async (user) => {
      const { count: appCount } = await supabase
        .from('apps')
        .select('*', { count: 'exact', head: true })
        .eq('owner', user.id)
      
      return {
        ...user,
        appCount: appCount || 0,
      }
    })
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
        <p className="text-muted-foreground">
          عرض وإدارة حسابات المستخدمين
        </p>
      </div>

      {usersWithStats.length > 0 ? (
        <div className="grid gap-4">
          {usersWithStats.map((user: any) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar_url} alt={user.username} />
                      <AvatarFallback>
                        {user.username?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {user.full_name || user.username}
                        <Badge variant={
                          user.role === 'admin' ? 'default' :
                          user.role === 'moderator' ? 'secondary' :
                          'outline'
                        }>
                          {user.role}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{user.appCount} تطبيقات</p>
                    <p>انضم {new Date(user.created_at).toLocaleDateString('ar-SA')}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {user.bio && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">{user.bio}</p>
                    </div>
                  )}
                  <div className="space-y-1">
                    {user.github_username && (
                      <p>GitHub: @{user.github_username}</p>
                    )}
                    {user.youtube_channel && (
                      <p>YouTube: {user.youtube_channel}</p>
                    )}
                    {user.website && (
                      <p>Website: {user.website}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">لا يوجد مستخدمين</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
