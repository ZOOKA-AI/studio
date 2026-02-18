'use client'

import { useState, useTransition } from 'react'
import { createCampaignAction } from '@/app/actions/marketing'
import { Loader2, Send, Copy, Instagram, TrendingUp } from 'lucide-react'
import { usePostHog } from 'posthog-js/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CampaignFormData {
  serviceType: string
  emirate: string
  tone: string
  discountPercent: number
}

interface CampaignResult {
  content: {
    en: string
    ar: string
  }
  hashtags: {
    primary?: string[]
    location?: string[]
    trending?: string[]
    arabic?: string[]
  }
  callToAction?: {
    en: string
    ar: string
  }
  estimatedReach: number
}

const SERVICES = [
  { value: 'studio_cleaning', label: 'Studio Cleaning' },
  { value: 'apartment_cleaning', label: 'Apartment Cleaning' },
  { value: 'villa_cleaning', label: 'Villa Cleaning' },
  { value: 'office_cleaning', label: 'Office Cleaning' },
  { value: 'deep_cleaning', label: 'Deep Cleaning' },
  { value: 'move_in_out', label: 'Move-in/Move-out' },
  { value: 'sofa_cleaning', label: 'Sofa Cleaning' },
]

const EMIRATES = [
  { value: 'dubai', label: 'Dubai' },
  { value: 'abu_dhabi', label: 'Abu Dhabi' },
  { value: 'sharjah', label: 'Sharjah' },
  { value: 'ajman', label: 'Ajman' },
  { value: 'ras_al_khaimah', label: 'Ras Al Khaimah' },
  { value: 'fujairah', label: 'Fujairah' },
  { value: 'umm_al_quwain', label: 'Umm Al Quwain' },
]

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'promotional', label: 'Promotional' },
]

const PRICING = {
  studio_cleaning: 150,
  apartment_cleaning: 250,
  villa_cleaning: 500,
  office_cleaning: 400,
  deep_cleaning: 350,
  move_in_out: 450,
  sofa_cleaning: 200,
}

export default function MarketingDashboard() {
  const posthog = usePostHog()
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState<CampaignFormData>({
    serviceType: '',
    emirate: '',
    tone: '',
    discountPercent: 0,
  })
  const [result, setResult] = useState<CampaignResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)

    posthog?.capture('campaign_generation_started', {
      serviceType: formData.serviceType,
      emirate: formData.emirate,
      tone: formData.tone,
    })

    startTransition(async () => {
      const formDataObj = new FormData()
      formDataObj.append('serviceType', formData.serviceType)
      formDataObj.append('emirate', formData.emirate)
      formDataObj.append('tone', formData.tone)
      formDataObj.append('discountPercent', formData.discountPercent.toString())

      const response = await createCampaignAction(formDataObj)

      if (response.success && response.data) {
        setResult(response.data)
        posthog?.capture('campaign_generated_success', {
          serviceType: formData.serviceType,
          estimatedReach: response.data.estimatedReach,
        })
      } else {
        setError(response.error || 'Failed to generate campaign')
        posthog?.capture('campaign_generation_failed', {
          error: response.error,
        })
      }
    })
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    posthog?.capture('content_copied', { type })
  }

  const basePrice = formData.serviceType ? PRICING[formData.serviceType as keyof typeof PRICING] : 0
  const discountedPrice = basePrice - (basePrice * formData.discountPercent) / 100

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Marketing Campaign Generator</h1>
        <p className="text-muted-foreground">
          Generate AI-powered marketing content for Royal Clean UAE
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription>Configure your marketing campaign parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Type */}
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, serviceType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Emirate */}
                <div className="space-y-2">
                  <Label htmlFor="emirate">Emirate</Label>
                  <Select
                    value={formData.emirate}
                    onValueChange={(value) => setFormData({ ...formData, emirate: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an emirate" />
                    </SelectTrigger>
                    <SelectContent>
                      {EMIRATES.map((emirate) => (
                        <SelectItem key={emirate.value} value={emirate.value}>
                          {emirate.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tone */}
                <div className="space-y-2">
                  <Label>Campaign Tone</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {TONES.map((tone) => (
                      <Button
                        key={tone.value}
                        type="button"
                        variant={formData.tone === tone.value ? 'default' : 'outline'}
                        onClick={() => setFormData({ ...formData, tone: tone.value })}
                        className="w-full"
                      >
                        {tone.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Discount */}
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount Percentage (Optional)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discountPercent}
                    onChange={(e) =>
                      setFormData({ ...formData, discountPercent: Number(e.target.value) })
                    }
                    placeholder="0"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    isPending ||
                    !formData.serviceType ||
                    !formData.emirate ||
                    !formData.tone
                  }
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Generate Campaign
                    </>
                  )}
                </Button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg">
                  {error}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Pricing Section */}
        <div>
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
              <CardDescription>Live pricing for selected service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Price</span>
                  <span className="font-medium">{basePrice} AED</span>
                </div>
                {formData.discountPercent > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-green-600 font-medium">
                      -{formData.discountPercent}%
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t">
                  <div className="flex justify-between">
                    <span className="font-semibold">Final Price</span>
                    <span className="text-2xl font-bold text-primary">
                      {discountedPrice} AED
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold">Generated Content</h2>
            <Badge variant="secondary" className="ml-auto">
              <Instagram className="mr-1 h-3 w-3" />
              Est. Reach: {result.estimatedReach.toLocaleString()}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Caption */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🇬🇧</span>
                    English Caption
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(result.content.en, 'english')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{result.content.en}</p>
              </CardContent>
            </Card>

            {/* Arabic Caption */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🇦🇪</span>
                    Arabic Caption
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(result.content.ar, 'arabic')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent dir="rtl">
                <p className="whitespace-pre-wrap text-right">{result.content.ar}</p>
              </CardContent>
            </Card>
          </div>

          {/* Hashtags */}
          <Card>
            <CardHeader>
              <CardTitle>Hashtags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.hashtags.primary && result.hashtags.primary.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                    Primary
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.hashtags.primary.map((tag, i) => (
                      <Badge key={i} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {result.hashtags.location && result.hashtags.location.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                    Location
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.hashtags.location.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {result.hashtags.trending && result.hashtags.trending.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                    Trending
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.hashtags.trending.map((tag, i) => (
                      <Badge key={i} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {result.hashtags.arabic && result.hashtags.arabic.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                    Arabic
                  </h4>
                  <div className="flex flex-wrap gap-2" dir="rtl">
                    {result.hashtags.arabic.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
