'use client';

/**
 * @fileOverview Social media posts queue management
 * 
 * Displays and manages scheduled and draft posts
 */

import {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useContentScheduler, SocialMediaPost} from '@/context/content-scheduler-context';
import {Calendar, Clock, ExternalLink, Trash2} from 'lucide-react';
import {format} from 'date-fns';
import {ar} from 'date-fns/locale';

const platformColors: Record<string, string> = {
  facebook: 'bg-blue-500',
  instagram: 'bg-pink-500',
  linkedin: 'bg-blue-700',
  tiktok: 'bg-black',
  snapchat: 'bg-yellow-400',
  twitter: 'bg-blue-400',
  whatsapp: 'bg-green-500',
};

const platformIcons: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
  snapchat: 'Snapchat',
  twitter: 'Twitter',
  whatsapp: 'WhatsApp',
};

function PostCard({post, onDelete, onPublish}: {
  post: SocialMediaPost;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
}) {
  const platformColor = platformColors[post.platform] || 'bg-gray-500';

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={`${platformColor} text-white`}>
              {platformIcons[post.platform]}
            </Badge>
            <Badge variant={
              post.status === 'published' ? 'default' :
              post.status === 'scheduled' ? 'secondary' :
              post.status === 'draft' ? 'outline' : 'destructive'
            }>
              {post.status === 'published' ? 'منشور' :
               post.status === 'scheduled' ? 'مجدول' :
               post.status === 'draft' ? 'مسودة' : 'فشل'}
            </Badge>
          </div>
          <div className="flex gap-2">
            {post.status === 'draft' && (
              <Button size="sm" onClick={() => onPublish(post.id)}>
                نشر الآن
              </Button>
            )}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(post.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm whitespace-pre-wrap">{post.content}</p>
        
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.hashtags.map((tag, index) => (
              <span key={index} className="text-xs text-primary">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {post.scheduledTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {format(post.scheduledTime, 'PPp', {locale: ar})}
            </div>
          )}
          {post.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(post.publishedAt, 'PPp', {locale: ar})}
            </div>
          )}
        </div>

        {post.analytics && (
          <div className="flex gap-4 text-xs">
            {post.analytics.views && <span>👁️ {post.analytics.views}</span>}
            {post.analytics.likes && <span>❤️ {post.analytics.likes}</span>}
            {post.analytics.shares && <span>🔄 {post.analytics.shares}</span>}
            {post.analytics.comments && <span>💬 {post.analytics.comments}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function SocialMediaQueue() {
  const {posts, deletePost, publishPost, getDraftPosts, getScheduledPosts} = useContentScheduler();
  const [activeTab, setActiveTab] = useState('draft');

  const draftPosts = getDraftPosts();
  const scheduledPosts = getScheduledPosts();
  const publishedPosts = posts.filter(p => p.status === 'published');

  return (
    <Card>
      <CardHeader>
        <CardTitle>قائمة المنشورات</CardTitle>
        <CardDescription>
          إدارة المنشورات المجدولة والمسودات
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="draft">
              المسودات ({draftPosts.length})
            </TabsTrigger>
            <TabsTrigger value="scheduled">
              المجدولة ({scheduledPosts.length})
            </TabsTrigger>
            <TabsTrigger value="published">
              المنشورة ({publishedPosts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="draft" className="mt-4">
            {draftPosts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                لا توجد مسودات
              </p>
            ) : (
              draftPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={deletePost}
                  onPublish={publishPost}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="scheduled" className="mt-4">
            {scheduledPosts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                لا توجد منشورات مجدولة
              </p>
            ) : (
              scheduledPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={deletePost}
                  onPublish={publishPost}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="published" className="mt-4">
            {publishedPosts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                لا توجد منشورات
              </p>
            ) : (
              publishedPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={deletePost}
                  onPublish={publishPost}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
