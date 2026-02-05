'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Download, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface AppCardProps {
  app: {
    id: string
    title: string
    slug: string
    short_description?: string
    icon_url?: string
    category?: string
    tags?: string[]
    downloads_count: number
    views_count: number
    rating_avg: number
    rating_count: number
    profiles: {
      username: string
      avatar_url?: string
    }
  }
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-4">
          {app.icon_url && (
            <Image
              src={app.icon_url}
              alt={app.title}
              width={64}
              height={64}
              className="rounded-lg"
            />
          )}
          <div className="flex-1">
            <CardTitle className="text-xl">{app.title}</CardTitle>
            <CardDescription className="text-sm mt-1">
              by {app.profiles.username}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {app.short_description}
        </p>
        {app.category && (
          <Badge variant="secondary" className="mt-3">
            {app.category}
          </Badge>
        )}
        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{app.rating_avg.toFixed(1)}</span>
            <span>({app.rating_count})</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>{app.downloads_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{app.views_count}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/gallery/${app.slug}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
