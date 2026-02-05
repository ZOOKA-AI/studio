import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || (profile.role !== 'admin' && profile.role !== 'moderator')) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">لوحة الإدارة</h1>
            <nav className="flex gap-4">
              <a href="/admin" className="text-sm hover:underline">Dashboard</a>
              <a href="/admin/apps" className="text-sm hover:underline">التطبيقات</a>
              <a href="/admin/users" className="text-sm hover:underline">المستخدمين</a>
            </nav>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
