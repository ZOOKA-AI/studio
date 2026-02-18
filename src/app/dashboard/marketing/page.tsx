'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Building2, 
  Home, 
  Hotel,
  MapPin,
  Percent,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

type ServiceType = 'deep-cleaning' | 'regular-cleaning' | 'move-in-out' | 'post-construction';
type Emirate = 'dubai' | 'abu-dhabi' | 'sharjah' | 'ajman' | 'ras-al-khaimah' | 'fujairah' | 'umm-al-quwain';
type CampaignTone = 'professional' | 'friendly' | 'luxurious' | 'eco-friendly';
type PropertyType = 'studio' | 'apartment' | 'villa';

interface PricingTier {
  type: PropertyType;
  icon: typeof Building2;
  label: string;
  labelAr: string;
  basePrice: number;
  currency: string;
}

interface GeneratedContent {
  english: {
    headline: string;
    description: string;
    cta: string;
  };
  arabic: {
    headline: string;
    description: string;
    cta: string;
  };
}

const pricingTiers: PricingTier[] = [
  {
    type: 'studio',
    icon: Building2,
    label: 'Studio',
    labelAr: 'استوديو',
    basePrice: 299,
    currency: 'AED',
  },
  {
    type: 'apartment',
    icon: Home,
    label: 'Apartment',
    labelAr: 'شقة',
    basePrice: 449,
    currency: 'AED',
  },
  {
    type: 'villa',
    icon: Hotel,
    label: 'Villa',
    labelAr: 'فيلا',
    basePrice: 899,
    currency: 'AED',
  },
];

const serviceTypes = [
  { value: 'deep-cleaning', label: 'Deep Cleaning', labelAr: 'تنظيف عميق' },
  { value: 'regular-cleaning', label: 'Regular Cleaning', labelAr: 'تنظيف منتظم' },
  { value: 'move-in-out', label: 'Move In/Out Cleaning', labelAr: 'تنظيف انتقال' },
  { value: 'post-construction', label: 'Post Construction', labelAr: 'تنظيف بعد البناء' },
];

const emirates = [
  { value: 'dubai', label: 'Dubai', labelAr: 'دبي' },
  { value: 'abu-dhabi', label: 'Abu Dhabi', labelAr: 'أبوظبي' },
  { value: 'sharjah', label: 'Sharjah', labelAr: 'الشارقة' },
  { value: 'ajman', label: 'Ajman', labelAr: 'عجمان' },
  { value: 'ras-al-khaimah', label: 'Ras Al Khaimah', labelAr: 'رأس الخيمة' },
  { value: 'fujairah', label: 'Fujairah', labelAr: 'الفجيرة' },
  { value: 'umm-al-quwain', label: 'Umm Al Quwain', labelAr: 'أم القيوين' },
];

const campaignTones = [
  { value: 'professional', label: 'Professional', labelAr: 'احترافي', description: 'Corporate and trustworthy' },
  { value: 'friendly', label: 'Friendly', labelAr: 'ودود', description: 'Warm and approachable' },
  { value: 'luxurious', label: 'Luxurious', labelAr: 'فاخر', description: 'Premium and elegant' },
  { value: 'eco-friendly', label: 'Eco-Friendly', labelAr: 'صديق للبيئة', description: 'Green and sustainable' },
];

export default function MarketingDashboard() {
  const [serviceType, setServiceType] = useState<ServiceType>('deep-cleaning');
  const [emirate, setEmirate] = useState<Emirate>('dubai');
  const [campaignTone, setCampaignTone] = useState<CampaignTone>('professional');
  const [discount, setDiscount] = useState<number>(15);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const calculateDiscountedPrice = (basePrice: number): number => {
    return basePrice - (basePrice * discount) / 100;
  };

  const generateContent = async () => {
    setIsGenerating(true);
    
    // Simulate API call for content generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const serviceLabel = serviceTypes.find(s => s.value === serviceType)?.label || '';
    const serviceLabelAr = serviceTypes.find(s => s.value === serviceType)?.labelAr || '';
    const emirateLabel = emirates.find(e => e.value === emirate)?.label || '';
    const emirateLabelAr = emirates.find(e => e.value === emirate)?.labelAr || '';
    
    const content: GeneratedContent = {
      english: {
        headline: generateHeadline(serviceLabel, emirateLabel, campaignTone, 'en'),
        description: generateDescription(serviceLabel, emirateLabel, campaignTone, discount, 'en'),
        cta: generateCTA(campaignTone, 'en'),
      },
      arabic: {
        headline: generateHeadline(serviceLabelAr, emirateLabelAr, campaignTone, 'ar'),
        description: generateDescription(serviceLabelAr, emirateLabelAr, campaignTone, discount, 'ar'),
        cta: generateCTA(campaignTone, 'ar'),
      },
    };
    
    setGeneratedContent(content);
    setIsGenerating(false);
  };

  const generateHeadline = (service: string, location: string, tone: CampaignTone, lang: 'en' | 'ar'): string => {
    if (lang === 'ar') {
      const headlines = {
        professional: `خدمات ${service} الاحترافية في ${location}`,
        friendly: `${service} مع لمسة من الحب في ${location}`,
        luxurious: `تجربة ${service} الفاخرة في ${location}`,
        'eco-friendly': `${service} الصديق للبيئة في ${location}`,
      };
      return headlines[tone];
    }
    
    const headlines = {
      professional: `Professional ${service} Services in ${location}`,
      friendly: `Your Trusted ${service} Partner in ${location}`,
      luxurious: `Luxury ${service} Experience in ${location}`,
      'eco-friendly': `Eco-Conscious ${service} in ${location}`,
    };
    return headlines[tone];
  };

  const generateDescription = (
    service: string, 
    location: string, 
    tone: CampaignTone, 
    discountValue: number,
    lang: 'en' | 'ar'
  ): string => {
    if (lang === 'ar') {
      const descriptions = {
        professional: `احصل على خدمات ${service} عالية الجودة في ${location}. فريقنا المحترف يضمن نتائج لا تشوبها شائبة. احجز الآن واستمتع بخصم ${discountValue}٪!`,
        friendly: `مرحباً! نحن هنا لجعل منزلك نظيفاً ومنعشاً مع خدمات ${service} في ${location}. خصم خاص ${discountValue}٪ للعملاء الجدد!`,
        luxurious: `ارتقِ بتجربة التنظيف مع خدمات ${service} الفاخرة في ${location}. عرض حصري: خصم ${discountValue}٪ على أول حجز.`,
        'eco-friendly': `احمِ البيئة مع خدمات ${service} الصديقة للبيئة في ${location}. منتجات طبيعية وخصم ${discountValue}٪ لفترة محدودة.`,
      };
      return descriptions[tone];
    }
    
    const descriptions = {
      professional: `Get professional ${service} services in ${location}. Our expert team ensures spotless results every time. Book now and save ${discountValue}%!`,
      friendly: `Hey there! We're here to make your home sparkle with our ${service} in ${location}. Special ${discountValue}% off for new customers!`,
      luxurious: `Elevate your cleaning experience with premium ${service} in ${location}. Exclusive offer: ${discountValue}% off your first booking.`,
      'eco-friendly': `Go green with eco-friendly ${service} in ${location}. Natural products, exceptional results. Limited time: ${discountValue}% discount!`,
    };
    return descriptions[tone];
  };

  const generateCTA = (tone: CampaignTone, lang: 'en' | 'ar'): string => {
    if (lang === 'ar') {
      const ctas = {
        professional: 'احجز الآن',
        friendly: 'هيا بنا نبدأ!',
        luxurious: 'اطلب الخدمة',
        'eco-friendly': 'احجز بطريقة صديقة للبيئة',
      };
      return ctas[tone];
    }
    
    const ctas = {
      professional: 'Book Now',
      friendly: 'Let\'s Get Started!',
      luxurious: 'Request Service',
      'eco-friendly': 'Book Green',
    };
    return ctas[tone];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
            <Megaphone className="h-8 w-8 text-primary" />
            Marketing Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Create targeted marketing campaigns with AI-powered content generation
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          <Sparkles className="h-3 w-3 mr-1" />
          AI-Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Service Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Service Type</CardTitle>
              <CardDescription>Select the cleaning service to promote</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={serviceType} onValueChange={(value) => setServiceType(value as ServiceType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      <div className="flex items-center gap-2">
                        <span>{service.label}</span>
                        <span className="text-muted-foreground text-xs">({service.labelAr})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Emirate Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Target Location
              </CardTitle>
              <CardDescription>Choose the emirate to target</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={emirate} onValueChange={(value) => setEmirate(value as Emirate)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {emirates.map((em) => (
                    <SelectItem key={em.value} value={em.value}>
                      <div className="flex items-center gap-2">
                        <span>{em.label}</span>
                        <span className="text-muted-foreground text-xs">({em.labelAr})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Campaign Tone */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Campaign Tone</CardTitle>
              <CardDescription>Set the voice and style of your campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={campaignTone} onValueChange={(value) => setCampaignTone(value as CampaignTone)}>
                <div className="space-y-3">
                  {campaignTones.map((tone) => (
                    <div key={tone.value} className="flex items-start space-x-2">
                      <RadioGroupItem value={tone.value} id={tone.value} className="mt-1" />
                      <Label htmlFor={tone.value} className="cursor-pointer flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{tone.label}</div>
                            <div className="text-xs text-muted-foreground">{tone.description}</div>
                          </div>
                          <span className="text-xs text-muted-foreground">{tone.labelAr}</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Discount Percentage */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Percent className="h-4 w-4" />
                Discount Offer
              </CardTitle>
              <CardDescription>Set the promotional discount percentage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Discount Amount</Label>
                <Badge variant="outline" className="text-lg font-bold">
                  {discount}%
                </Badge>
              </div>
              <Slider
                value={[discount]}
                onValueChange={(value) => setDiscount(value[0])}
                min={0}
                max={50}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button 
            onClick={generateContent} 
            disabled={isGenerating}
            size="lg"
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Marketing Content
              </>
            )}
          </Button>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          {/* Pricing Tiers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pricing Tiers</CardTitle>
              <CardDescription>Preview pricing with {discount}% discount applied</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {pricingTiers.map((tier) => {
                  const Icon = tier.icon;
                  const originalPrice = tier.basePrice;
                  const discountedPrice = calculateDiscountedPrice(originalPrice);
                  
                  return (
                    <div
                      key={tier.type}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{tier.label}</div>
                          <div className="text-xs text-muted-foreground">{tier.labelAr}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        {discount > 0 ? (
                          <>
                            <div className="text-lg font-bold text-primary">
                              {tier.currency} {discountedPrice.toFixed(0)}
                            </div>
                            <div className="text-xs text-muted-foreground line-through">
                              {tier.currency} {originalPrice}
                            </div>
                          </>
                        ) : (
                          <div className="text-lg font-bold">
                            {tier.currency} {originalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Generated Content */}
          {generatedContent && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Generated Content
                </CardTitle>
                <CardDescription>Bilingual marketing copy ready to use</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="english" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="english">English</TabsTrigger>
                    <TabsTrigger value="arabic">العربية</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="english" className="space-y-4 mt-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Headline</Label>
                      <p className="text-xl font-bold mt-1">{generatedContent.english.headline}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Description</Label>
                      <p className="text-sm mt-1 leading-relaxed">{generatedContent.english.description}</p>
                    </div>
                    <div>
                      <Button className="w-full">
                        {generatedContent.english.cta}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="arabic" className="space-y-4 mt-4" dir="rtl">
                    <div>
                      <Label className="text-xs text-muted-foreground">العنوان</Label>
                      <p className="text-xl font-bold mt-1">{generatedContent.arabic.headline}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">الوصف</Label>
                      <p className="text-sm mt-1 leading-relaxed">{generatedContent.arabic.description}</p>
                    </div>
                    <div>
                      <Button className="w-full">
                        <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                        {generatedContent.arabic.cta}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {!generatedContent && !isGenerating && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Sparkles className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  Configure your campaign settings and click<br />
                  "Generate Marketing Content" to see results
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
