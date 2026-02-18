'use client';

/**
 * @fileOverview Social media platforms configuration
 * 
 * Manage social media account settings and links
 */

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {useContentScheduler} from '@/context/content-scheduler-context';
import {ExternalLink} from 'lucide-react';

const platformInfo = {
  facebook: {
    name: 'Facebook',
    color: 'text-blue-600',
    icon: '📘',
  },
  instagram: {
    name: 'Instagram',
    color: 'text-pink-600',
    icon: '📷',
  },
  linkedin: {
    name: 'LinkedIn',
    color: 'text-blue-700',
    icon: '💼',
  },
  tiktok: {
    name: 'TikTok',
    color: 'text-black',
    icon: '🎵',
  },
  snapchat: {
    name: 'Snapchat',
    color: 'text-yellow-400',
    icon: '👻',
  },
  twitter: {
    name: 'Twitter',
    color: 'text-blue-400',
    icon: '🐦',
  },
  whatsapp: {
    name: 'WhatsApp',
    color: 'text-green-600',
    icon: '💬',
  },
};

export function SocialMediaConfig() {
  const {configs, updateConfig} = useContentScheduler();

  return (
    <Card>
      <CardHeader>
        <CardTitle>إعدادات وسائل التواصل الاجتماعي</CardTitle>
        <CardDescription>
          إدارة حسابات Royal Clean UAE على وسائل التواصل الاجتماعي
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {configs.map(config => {
          const info = platformInfo[config.platform as keyof typeof platformInfo];
          
          return (
            <div key={config.platform} className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="text-3xl">{info.icon}</div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold ${info.color}`}>
                    {info.name}
                  </h3>
                  <Switch
                    checked={config.enabled}
                    onCheckedChange={(checked) =>
                      updateConfig(config.platform, {enabled: checked})
                    }
                  />
                </div>

                {config.profileUrl && (
                  <div className="flex items-center gap-2">
                    <Input
                      value={config.profileUrl}
                      onChange={(e) =>
                        updateConfig(config.platform, {profileUrl: e.target.value})
                      }
                      className="text-sm"
                      dir="ltr"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(config.profileUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Switch
                    checked={config.autoPost}
                    onCheckedChange={(checked) =>
                      updateConfig(config.platform, {autoPost: checked})
                    }
                  />
                  <Label className="text-sm text-muted-foreground">
                    النشر التلقائي
                  </Label>
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2">معلومات الاتصال</h4>
          <div className="space-y-2 text-sm">
            <p>📞 الهاتف: <a href="tel:+971563177803" className="text-primary hover:underline" dir="ltr">+971 56 317 7803</a></p>
            <p>🌐 الموقع: <a href="https://royalcleanuae.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">royalcleanuae.com</a></p>
            <p>🔗 زوكا: <a href="https://zoka.royalcleanuae.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">zoka.royalcleanuae.com</a></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
