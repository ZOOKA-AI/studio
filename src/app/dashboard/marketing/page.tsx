'use client';

import { useState, useTransition } from 'react';
import { Loader2, Send, Instagram, DollarSign, Tag, Sparkles, Copy, CheckCircle2 } from 'lucide-react';

type ServiceType = 'deep_cleaning' | 'regular_cleaning' | 'move_in_out' | 'post_construction' | 'carpet_cleaning' | 'window_cleaning' | 'disinfection';
type Emirate = 'dubai' | 'abu_dhabi' | 'sharjah' | 'ajman' | 'ras_al_khaimah' | 'fujairah' | 'umm_al_quwain';
type ToneType = 'professional' | 'friendly' | 'luxury' | 'value';

interface ContentGenerationRequest {
  serviceType: ServiceType;
  emirate: Emirate;
  tone: ToneType;
  discountPercent: number;
}

interface GeneratedContent {
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
}

interface ContentGenerationResponse {
  success: boolean;
  data: {
    content: GeneratedContent;
  };
}

// Mock data - replace with actual API calls
const mockGenerateContent = async (data: ContentGenerationRequest): Promise<ContentGenerationResponse> => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
  
  return {
    success: true,
    data: {
      content: {
        caption: {
          en: `✨ Professional ${data.serviceType.replace('_', ' ')} in ${data.emirate}!\n\n🏠 Starting from just 150 AED\n✅ Licensed & insured\n✅ Same-day booking\n\n📱 Book now via WhatsApp!`,
          ar: `✨ ${data.serviceType} احترافي في ${data.emirate}!\n\n🏠 تبدأ الأسعار من 150 درهم فقط\n✅ مرخص ومؤمن\n✅ حجز في نفس اليوم\n\n📱 احجز الآن عبر واتساب!`,
        },
        hashtags: {
          primary: ['RoyalCleanUAE', 'CleaningServices', 'ProfessionalCleaning'],
          location: [data.emirate, 'UAE', 'CleaningDubai'],
          trending: ['UAELife', 'CleanHome', 'HomeServices'],
          arabic: ['تنظيف_منازل', 'خدمات_التنظيف', 'الإمارات'],
        },
        callToAction: {
          en: 'Book now via WhatsApp!',
          ar: 'احجز الآن عبر واتساب!',
        },
      },
    },
  };
};

export default function MarketingDashboard() {
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType>('deep_cleaning');
  const [selectedEmirate, setSelectedEmirate] = useState<Emirate>('dubai');
  const [selectedTone, setSelectedTone] = useState<ToneType>('professional');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [result, setResult] = useState<ContentGenerationResponse | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Pricing data
  const pricingTiers = {
    studio: 150,
    apartment: 250,
    villa: 500,
  };

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    
    startTransition(async () => {
      const data = await mockGenerateContent({
        serviceType: selectedServiceType,
        emirate: selectedEmirate,
        tone: selectedTone,
        discountPercent,
      });
      setResult(data);
    });
  }

  function copyToClipboard(text: string, field: string) {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-blue-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
              <Sparkles className="text-white" size={32} />
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

          <div className="flex gap-4 mt-4 text-sm flex-wrap">
            <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
              <span className="font-semibold text-blue-700">✓</span> Bilingual Content (EN/AR)
            </div>
            <div className="bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
              <span className="font-semibold text-purple-700">✓</span> UAE-Optimized Hashtags
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-200">
              <span className="font-semibold text-green-700">✓</span> AI-Powered
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <Instagram className="text-pink-600" size={24} />
            Campaign Configuration
          </h2>

          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Service Type & Emirate */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">
                  Service Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedServiceType}
                  onChange={(e) => setSelectedServiceType(e.target.value as ServiceType)}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  <option value="deep_cleaning">🧹 تنظيف عميق (Deep Cleaning)</option>
                  <option value="regular_cleaning">🏠 تنظيف منتظم (Regular Cleaning)</option>
                  <option value="move_in_out">📦 تنظيف نقل منازل (Move In/Out)</option>
                  <option value="post_construction">🏗️ تنظيف ما بعد البناء (Post-Construction)</option>
                  <option value="carpet_cleaning">🛋️ تنظيف سجاد (Carpet Cleaning)</option>
                  <option value="window_cleaning">🪟 تنظيف نوافذ (Window Cleaning)</option>
                  <option value="disinfection">🦠 تعقيم (Disinfection)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">
                  Target Emirate <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedEmirate}
                  onChange={(e) => setSelectedEmirate(e.target.value as Emirate)}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  <option value="dubai">🏙️ دبي (Dubai)</option>
                  <option value="abu_dhabi">🕌 أبوظبي (Abu Dhabi)</option>
                  <option value="sharjah">🌆 الشارقة (Sharjah)</option>
                  <option value="ajman">🏖️ عجمان (Ajman)</option>
                  <option value="ras_al_khaimah">🏔️ رأس الخيمة (Ras Al Khaimah)</option>
                  <option value="fujairah">🌊 الفجيرة (Fujairah)</option>
                  <option value="umm_al_quwain">🏝️ أم القيوين (Umm Al Quwain)</option>
                </select>
              </div>
            </div>

            {/* Live Pricing Display */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="text-green-600" size={24} />
                <h3 className="font-bold text-lg text-gray-800">Current Pricing - {selectedEmirate.replace('_', ' ')}</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(pricingTiers).map(([type, price]) => (
                  <div
                    key={type}
                    className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition-shadow"
                  >
                    <p className="text-xs text-gray-500 mb-1 capitalize">{type}</p>
                    <p className="text-2xl font-bold text-green-600">{price} AED</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tone Selection */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                Campaign Tone
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['professional', 'friendly', 'luxury', 'value'] as ToneType[]).map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => setSelectedTone(tone)}
                    className={`p-4 rounded-xl border-2 transition-all font-medium capitalize ${
                      selectedTone === tone
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {tone === 'professional' && '👔'}
                    {tone === 'friendly' && '😊'}
                    {tone === 'luxury' && '✨'}
                    {tone === 'value' && '💰'}
                    <span className="ml-2">{tone}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700 flex items-center gap-2">
                <Tag size={18} />
                Discount % (Optional)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                placeholder="e.g., 20 for 20% off"
                className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Generating...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Generate AI Content
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && result.success && (
          <div className="space-y-6">
            {/* English Caption */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  🇬🇧 English Caption
                </h3>
                <button
                  onClick={() => copyToClipboard(result.data.content.caption.en, 'en')}
                  className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition-all"
                >
                  {copiedField === 'en' ? (
                    <>
                      <CheckCircle2 size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {result.data.content.caption.en}
              </p>
            </div>

            {/* Arabic Caption */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-blue-200" dir="rtl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  🇦🇪 المحتوى العربي
                </h3>
                <button
                  onClick={() => copyToClipboard(result.data.content.caption.ar, 'ar')}
                  className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition-all"
                >
                  {copiedField === 'ar' ? (
                    <>
                      <CheckCircle2 size={16} />
                      تم النسخ!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      نسخ
                    </>
                  )}
                </button>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {result.data.content.caption.ar}
              </p>
            </div>

            {/* Hashtags */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-4">📌 Hashtags</h3>
              <div className="space-y-4">
                {Object.entries(result.data.content.hashtags).map(([category, tags]) => (
                  <div key={category}>
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">{category}</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
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
