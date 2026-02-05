import { createClient } from '@/lib/supabase/server'
import { AppGrid } from '@/components/gallery/app-grid'

export const metadata = {
  title: 'معرض التطبيقات - Zooka AI Studio',
  description: 'استكشف مجموعة متنوعة من التطبيقات والأدوات المبتكرة',
}

export default async function GalleryPage() {
  const supabase = await createClient()
  
  const { data: apps } = await supabase
    .from('apps')
    .select('*, profiles(username, avatar_url)')
    .eq('visibility', 'public')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">معرض التطبيقات</h1>
        <p className="text-muted-foreground">
          اكتشف تطبيقات وأدوات مبتكرة من مطورين حول العالم
        </p>
      </div>
      <AppGrid apps={apps || []} />
    </div>
  )
}
