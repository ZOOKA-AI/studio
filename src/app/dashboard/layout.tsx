import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">لوحة تحكم المطور</h1>
            <nav className="flex gap-4">
              <a href="/dashboard" className="text-sm hover:underline">Dashboard</a>
              <a href="/dashboard/apps" className="text-sm hover:underline">تطبيقاتي</a>
              <a href="/dashboard/integrations" className="text-sm hover:underline">التكاملات</a>
              <a href="/dashboard/notifications" className="text-sm hover:underline">الإشعارات</a>
            </nav>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
