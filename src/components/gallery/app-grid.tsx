'use client'

import { AppCard } from './app-card'

interface AppGridProps {
  apps: any[]
}

export function AppGrid({ apps }: AppGridProps) {
  if (!apps || apps.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">لا توجد تطبيقات متاحة حالياً</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {apps.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  )
}
