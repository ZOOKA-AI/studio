import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Download, Eye, Github, ExternalLink } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: app } = await supabase
    .from('apps')
    .select('title, short_description')
    .eq('slug', slug)
    .single()

  if (!app) {
    return {
      title: 'App Not Found',
    }
  }

  return {
    title: `${app.title} - Zooka AI Studio`,
    description: app.short_description,
  }
}

export default async function AppDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: app } = await supabase
    .from('apps')
    .select('*, profiles(username, avatar_url, full_name)')
    .eq('slug', slug)
    .eq('visibility', 'public')
    .eq('status', 'approved')
    .single()

  if (!app) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* App Header */}
          <div className="flex items-start gap-6">
            {app.icon_url && (
              <Image
                src={app.icon_url}
                alt={app.title}
                width={120}
                height={120}
                className="rounded-lg"
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{app.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                {app.short_description}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{app.rating_avg.toFixed(1)}</span>
                  <span className="text-muted-foreground">({app.rating_count} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-5 w-5" />
                  <span>{app.downloads_count} downloads</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-5 w-5" />
                  <span>{app.views_count} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>الوصف</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{app.description}</p>
            </CardContent>
          </Card>

          {/* Screenshots */}
          {app.screenshots && app.screenshots.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>لقطات الشاشة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {app.screenshots.map((screenshot: string, index: number) => (
                    <Image
                      key={index}
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      width={400}
                      height={300}
                      className="rounded-lg"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              {app.live_url && (
                <Button asChild className="w-full" size="lg">
                  <a href={app.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {app.download_url && (
                <Button asChild variant="secondary" className="w-full" size="lg">
                  <a href={app.download_url} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              )}
              {app.repo_url && (
                <Button asChild variant="outline" className="w-full">
                  <a href={app.repo_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Developer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Developer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                {app.profiles.avatar_url && (
                  <Image
                    src={app.profiles.avatar_url}
                    alt={app.profiles.username}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold">
                    {app.profiles.full_name || app.profiles.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    @{app.profiles.username}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {app.tags && app.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {app.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
