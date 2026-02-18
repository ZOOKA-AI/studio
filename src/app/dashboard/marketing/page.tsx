'use client';

import { useState, useTransition } from 'react';
import { createCampaignAction } from '@/app/actions/marketing';
import { Loader2, Send, Copy, Instagram, TrendingUp } from 'lucide-react';
import { z } from 'zod';
import { usePostHog } from 'posthog-js/react';

/* ================================
   Strict Types (No any)
================================ */

interface CampaignResult {
  caption: {
    en: string;
    ar: string;
  };
  hashtags: {
    primary: string[];
    location: string[];
    trending: string[];
    arabic: string[];
  };
  callToAction: {
    en: string;
    ar: string;
  };
  metadata: {
    serviceType: string;
    emirate: string;
    estimatedReach: number;
    campaignId: string;
  };
}

/* ================================
   Validation Schemas
================================ */

const CampaignResultSchema = z.object({
  caption: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  hashtags: z.object({
    primary: z.array(z.string()),
    location: z.array(z.string()),
    trending: z.array(z.string()),
    arabic: z.array(z.string()),
  }),
  callToAction: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  metadata: z.object({
    serviceType: z.string(),
    emirate: z.string(),
    estimatedReach: z.number(),
    campaignId: z.string(),
  }),
});

const CampaignSchema = z.object({
  serviceType: z.enum([
    'deep_cleaning',
    'regular_cleaning',
    'move_in_out',
    'post_construction',
    'carpet_cleaning',
    'window_cleaning',
    'disinfection'
  ]),
  emirate: z.enum([
    'dubai',
    'abu_dhabi',
    'sharjah',
    'ajman',
    'ras_al_khaimah',
    'fujairah',
    'umm_al_quwain'
  ]),
  tone: z.enum(['professional', 'friendly', 'luxury', 'value']),
  discountPercent: z.number().min(0).max(50).optional(),
  scheduledFor: z.string().optional(),
});

type CampaignFormData = z.infer<typeof CampaignSchema>;

/* ================================
   Main Component
================================ */

export default function MarketingDashboard() {
  const [result, setResult] = useState<CampaignResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const posthog = usePostHog();

  // Form state
  const [formData, setFormData] = useState<CampaignFormData>({
    serviceType: 'deep_cleaning',
    emirate: 'dubai',
    tone: 'professional',
    discountPercent: 0,
  });

  // Pricing data
  const pricingTiers = {
    studio: 150,
    apartment: 250,
    villa: 500,
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validate
    const parsed = CampaignSchema.safeParse(formData);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      setError(`يرجى التحقق من البيانات المدخلة: ${firstError.path.join('.')} - ${firstError.message}`);
      return;
    }

    // Track event in PostHog
    posthog?.capture('campaign_generation_started', {
      serviceType: formData.serviceType,
      emirate: formData.emirate,
      tone: formData.tone,
    });

    startTransition(async () => {
      try {
        const fd = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== undefined) {
            fd.append(key, String(value));
          }
        });
        const data = await createCampaignAction(fd);

        // Validate server response
        const validatedData = CampaignResultSchema.parse(data);
        setResult(validatedData);

        // Track success
        posthog?.capture('campaign_generated_success', {
          campaignId: data.metadata?.campaignId,
          serviceType: formData.serviceType,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'حدث خطأ أثناء إنشاء الحملة';
        setError(errorMessage);

        // Track error
        posthog?.capture('campaign_generation_failed', {
          error: errorMessage,
          serviceType: formData.serviceType,
        });
      }
    });
  }

  function copyToClipboard(text: string, field: string) {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
        // Track copy event
        posthog?.capture('content_copied', { field });
      })
      .catch(() => {
        setError('فشل نسخ المحتوى. يرجى المحاولة مرة أخرى.');
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
              <Instagram className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Royal Clean AI Marketing Studio
              </h1>
              <p className="text-gray-600 mt-1" dir="rtl">
                محرك التسويق الذكي المدعوم بالذكاء الاصطناعي
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">إعدادات الحملة</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Service Type */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                نوع الخدمة <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as CampaignFormData['serviceType'] })}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="deep_cleaning">🧹 تنظيف عميق (Deep Cleaning)</option>
                <option value="regular_cleaning">🏠 تنظيف منتظم (Regular)</option>
                <option value="move_in_out">📦 نقل منازل (Move In/Out)</option>
                <option value="post_construction">🏗️ ما بعد البناء (Post-Construction)</option>
                <option value="carpet_cleaning">🛋️ تنظيف سجاد (Carpet)</option>
                <option value="window_cleaning">🪟 نوافذ (Windows)</option>
                <option value="disinfection">🦠 تعقيم (Disinfection)</option>
              </select>
            </div>

            {/* Emirate */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                الإمارة المستهدفة <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.emirate}
                onChange={(e) => setFormData({ ...formData, emirate: e.target.value as CampaignFormData['emirate'] })}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="dubai">🏙️ دبي (Dubai)</option>
                <option value="abu_dhabi">🕌 أبوظبي (Abu Dhabi)</option>
                <option value="sharjah">🌆 الشارقة (Sharjah)</option>
                <option value="ajman">🏖️ عجمان (Ajman)</option>
                <option value="ras_al_khaimah">🏔️ رأس الخيمة (RAK)</option>
                <option value="fujairah">🌊 الفجيرة (Fujairah)</option>
                <option value="umm_al_quwain">🏝️ أم القيوين (UAQ)</option>
              </select>
            </div>
          </div>

          {/* Pricing Display */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-200 mb-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="text-green-600" size={20} />
              الأسعار الحالية - {formData.emirate}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(pricingTiers).map(([type, price]) => (
                <div key={type} className="bg-white p-4 rounded-lg text-center">
                  <p className="text-xs text-gray-500 mb-1 capitalize">{type}</p>
                  <p className="text-2xl font-bold text-green-600">{price} AED</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tone Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-gray-700">نبرة الحملة</label>
            <div className="grid grid-cols-4 gap-3">
              {(['professional', 'friendly', 'luxury', 'value'] as const).map((tone) => (
                <button
                  key={tone}
                  type="button"
                  onClick={() => setFormData({ ...formData, tone })}
                  className={`p-4 rounded-xl border-2 font-medium capitalize ${
                    formData.tone === tone
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-600'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                جاري الإنشاء...
              </>
            ) : (
              <>
                <Send size={20} />
                إنشاء حملة ذكية
              </>
            )}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* English Caption */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">🇬🇧 English Caption</h3>
                <button
                  onClick={() => copyToClipboard(result.caption.en, 'en')}
                  className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg"
                >
                  <Copy size={16} />
                  {copiedField === 'en' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{result.caption.en}</p>
            </div>

            {/* Arabic Caption */}
            <div className="bg-blue-50 rounded-2xl shadow-lg p-6 border" dir="rtl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">🇦🇪 المحتوى العربي</h3>
                <button
                  onClick={() => copyToClipboard(result.caption.ar, 'ar')}
                  className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg"
                >
                  <Copy size={16} />
                  {copiedField === 'ar' ? 'تم النسخ!' : 'نسخ'}
                </button>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{result.caption.ar}</p>
            </div>

            {/* Hashtags */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <h3 className="font-bold text-lg mb-4">📌 Hashtags Performance</h3>
              <div className="space-y-4">
                {Object.entries(result.hashtags).map(([category, tags]) => (
                  <div key={category}>
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">{category}</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
