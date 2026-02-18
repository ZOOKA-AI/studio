'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { CampaignScheduler } from '@/components/CampaignScheduler';
import { previewCampaignAction, createCampaignAction, type CampaignInput } from '@/app/actions/marketing';
import { getAllServices, formatPrice, type ServiceType, type PropertyType } from '@/lib/pricing/royal-clean-pricing';
import {
  Sparkles,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  MessageCircle,
  Video,
  Copy,
  Send,
  TrendingUp,
  MapPin,
  Hash,
  Globe,
} from 'lucide-react';

interface CampaignPreview {
  englishCaption: string;
  arabicCaption: string;
  hashtags: {
    primary: string[];
    location: string[];
    trending: string[];
    arabic: string[];
  };
  pricing: {
    basePrice: number;
    discountAmount: number;
    finalPrice: number;
    currency: string;
  };
}

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'facebook', name: 'Facebook', icon: Facebook },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
  { id: 'twitter', name: 'Twitter', icon: Twitter },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle },
  { id: 'tiktok', name: 'TikTok', icon: Video },
];

const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'studio', label: 'Studio' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
];

const TONES = ['Professional', 'Friendly', 'Luxury', 'Value'];

export default function MarketingDashboardPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<CampaignPreview | null>(null);
  
  // Form state
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'facebook']);
  const [serviceType, setServiceType] = useState<ServiceType>('deep-cleaning');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [emirate, setEmirate] = useState('Dubai');
  const [tone, setTone] = useState('Professional');
  const [discount, setDiscount] = useState<number>(0);

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]
    );
  };

  const handleGenerateContent = async () => {
    if (selectedPlatforms.length === 0) {
      toast({
        title: 'Platform Required',
        description: 'Please select at least one platform',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const input: CampaignInput = {
        serviceType,
        propertyType,
        emirate,
        discount: discount > 0 ? discount : undefined,
        tone,
        platforms: selectedPlatforms,
      };

      const result = await previewCampaignAction(input);
      setPreview(result);
      
      toast({
        title: 'Content Generated!',
        description: 'Review your campaign content below',
      });
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate content. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublishNow = async () => {
    if (!preview) return;

    setLoading(true);
    try {
      const input: CampaignInput = {
        serviceType,
        propertyType,
        emirate,
        discount: discount > 0 ? discount : undefined,
        tone,
        platforms: selectedPlatforms,
      };

      const result = await createCampaignAction(input);
      
      if (result.success) {
        toast({
          title: 'Campaign Published!',
          description: result.message,
        });
        setPreview(null);
      } else {
        toast({
          title: 'Publish Failed',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to publish campaign',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async (scheduledDate: Date) => {
    if (!preview) return;

    setLoading(true);
    try {
      const input: CampaignInput = {
        serviceType,
        propertyType,
        emirate,
        discount: discount > 0 ? discount : undefined,
        tone,
        platforms: selectedPlatforms,
      };

      const result = await createCampaignAction(input, scheduledDate);
      
      if (result.success) {
        toast({
          title: 'Campaign Scheduled!',
          description: result.message,
        });
        setPreview(null);
      } else {
        toast({
          title: 'Scheduling Failed',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to schedule campaign',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Content copied to clipboard',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Marketing Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered content generation for Royal Clean UAE
          </p>
        </div>
        <Sparkles className="h-8 w-8 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Platform Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Platforms</CardTitle>
              <CardDescription>Choose where to publish your campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {PLATFORMS.map((platform) => {
                  const Icon = platform.icon;
                  const isSelected = selectedPlatforms.includes(platform.id);
                  return (
                    <button
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50 text-purple-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{platform.name}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Service Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
              <CardDescription>Configure your campaign parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Service Type</Label>
                <Select value={serviceType} onValueChange={(value) => setServiceType(value as ServiceType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getAllServices().map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Property Type</Label>
                <Select value={propertyType} onValueChange={(value) => setPropertyType(value as PropertyType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Emirate</Label>
                <Select value={emirate} onValueChange={setEmirate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EMIRATES.map((em) => (
                      <SelectItem key={em} value={em}>
                        {em}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Campaign Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TONES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Discount % (Optional)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                  placeholder="Enter discount percentage"
                />
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            onClick={handleGenerateContent}
            disabled={loading || selectedPlatforms.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {loading ? 'Generating...' : 'Generate Content'}
          </Button>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          {preview ? (
            <>
              {/* Pricing Display */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <TrendingUp className="h-5 w-5" />
                    Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {preview.pricing.discountAmount > 0 && (
                    <>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Base Price:</span>
                        <span className="line-through">{formatPrice(preview.pricing.basePrice)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount:</span>
                        <span>-{formatPrice(preview.pricing.discountAmount)}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between text-xl font-bold text-green-700">
                    <span>Final Price:</span>
                    <span>{formatPrice(preview.pricing.finalPrice)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* English Caption */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      English Caption
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(preview.englishCaption)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{preview.englishCaption}</p>
                </CardContent>
              </Card>

              {/* Arabic Caption */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Arabic Caption
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(preview.arabicCaption)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-right" dir="rtl">
                    {preview.arabicCaption}
                  </p>
                </CardContent>
              </Card>

              {/* Hashtags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Hashtags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {preview.hashtags.primary.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">Primary</div>
                      <div className="flex flex-wrap gap-2">
                        {preview.hashtags.primary.map((tag, i) => (
                          <span key={i} className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {preview.hashtags.location.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Location
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {preview.hashtags.location.map((tag, i) => (
                          <span key={i} className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {preview.hashtags.trending.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {preview.hashtags.trending.map((tag, i) => (
                          <span key={i} className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {preview.hashtags.arabic.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">Arabic</div>
                      <div className="flex flex-wrap gap-2" dir="rtl">
                        {preview.hashtags.arabic.map((tag, i) => (
                          <span key={i} className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handlePublishNow}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  size="lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Publish Now
                </Button>
                <CampaignScheduler onSchedule={handleSchedule} disabled={loading} />
              </div>
            </>
          ) : (
            <Card className="h-full min-h-[400px] flex items-center justify-center">
              <CardContent className="text-center text-muted-foreground">
                <Sparkles className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No content generated yet</p>
                <p className="text-sm">
                  Configure your campaign settings and click &quot;Generate Content&quot; to get started
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
