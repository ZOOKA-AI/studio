'use client';

import { useState } from 'react';
import { Loader2, Send, Instagram, DollarSign, Tag, Sparkles, Copy, CheckCircle2 } from 'lucide-react';

// Types
interface CampaignConfig {
  serviceType: string;
  emirate: string;
  tone: string;
  discount: number;
}

interface GeneratedContent {
  english: {
    caption: string;
    hashtags: {
      primary: string[];
      location: string[];
      trending: string[];
    };
  };
  arabic: {
    caption: string;
    hashtags: string[];
  };
}

interface PricingTier {
  type: string;
  price: number;
}

// Constants
const SERVICES = [
  'Deep Cleaning',
  'Regular Cleaning',
  'Move In/Out',
  'Post-Construction',
  'Carpet Cleaning',
  'Window Cleaning',
  'Disinfection',
];

const EMIRATES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
];

const TONES = [
  { value: 'Professional', label: 'Professional', emoji: '💼' },
  { value: 'Friendly', label: 'Friendly', emoji: '😊' },
  { value: 'Luxury', label: 'Luxury', emoji: '✨' },
  { value: 'Value', label: 'Value', emoji: '💰' },
];

const PRICING: PricingTier[] = [
  { type: 'Studio', price: 150 },
  { type: 'Apartment', price: 250 },
  { type: 'Villa', price: 500 },
];

export default function MarketingDashboard() {
  const [config, setConfig] = useState<CampaignConfig>({
    serviceType: SERVICES[0],
    emirate: EMIRATES[0],
    tone: TONES[0].value,
    discount: 15,
  });

  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with real API later
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockContent: GeneratedContent = {
        english: {
          caption: `Transform your ${config.serviceType.toLowerCase()} experience in ${config.emirate}! ✨\n\nRoyal Clean UAE brings professional excellence to every corner. Our expert team delivers spotless results that exceed expectations.\n\n${config.discount > 0 ? `🎉 Special Offer: ${config.discount}% OFF this month!\n\n` : ''}Book now and experience the Royal Clean difference!\n\n📞 Contact us today\n🏆 Certified professionals\n✅ 100% satisfaction guaranteed`,
          hashtags: {
            primary: [
              '#RoyalCleanUAE',
              '#CleaningServices',
              `#${config.serviceType.replace(/\s+/g, '')}`,
            ],
            location: [`#${config.emirate}`, '#UAE', '#CleaningDubai'],
            trending: ['#CleanHome', '#ProfessionalCleaning', '#HomeServices'],
          },
        },
        arabic: {
          caption: `حوّل تجربة ${config.serviceType.toLowerCase()} في ${config.emirate}! ✨\n\nرويال كلين الإمارات تقدم التميز المهني في كل زاوية. فريقنا الخبير يحقق نتائج نظيفة تفوق التوقعات.\n\n${config.discount > 0 ? `🎉 عرض خاص: خصم ${config.discount}٪ هذا الشهر!\n\n` : ''}احجز الآن واختبر فرق رويال كلين!\n\n📞 اتصل بنا اليوم\n🏆 محترفون معتمدون\n✅ ضمان الرضا ١٠٠٪`,
          hashtags: [
            '#رويال_كلين_الإمارات',
            '#خدمات_التنظيف',
            '#الإمارات',
            `#${config.emirate}`,
          ],
        },
      };

      setContent(mockContent);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(id);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const calculateDiscountedPrice = (price: number) => {
    return price - (price * config.discount) / 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Zooka-AI Studio
          </h1>
          <p className="text-gray-600 text-lg">AI-Powered Marketing Automation</p>
          <p className="text-sm text-gray-500 mt-1" dir="rtl">
            محرك التسويق الذكي المدعوم بالذكاء الاصطناعي
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Campaign Configuration</h2>
              </div>

              {/* Service Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Type
                </label>
                <select
                  value={config.serviceType}
                  onChange={(e) => setConfig({ ...config, serviceType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {SERVICES.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Emirate */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Emirate
                </label>
                <select
                  value={config.emirate}
                  onChange={(e) => setConfig({ ...config, emirate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {EMIRATES.map((emirate) => (
                    <option key={emirate} value={emirate}>
                      {emirate}
                    </option>
                  ))}
                </select>
              </div>

              {/* Campaign Tone */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Campaign Tone
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {TONES.map((tone) => (
                    <button
                      key={tone.value}
                      onClick={() => setConfig({ ...config, tone: tone.value })}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        config.tone === tone.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="text-2xl mr-2">{tone.emoji}</span>
                      {tone.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Percentage: {config.discount}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={config.discount}
                  onChange={(e) =>
                    setConfig({ ...config, discount: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Generate Campaign
                  </>
                )}
              </button>
            </div>

            {/* Pricing Display */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Live Pricing</h3>
              </div>
              <div className="space-y-3">
                {PRICING.map((tier) => (
                  <div
                    key={tier.type}
                    className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl"
                  >
                    <span className="font-semibold text-gray-700">{tier.type}</span>
                    <div className="text-right">
                      {config.discount > 0 ? (
                        <>
                          <div className="text-sm text-gray-400 line-through">
                            {tier.price} AED
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            {calculateDiscountedPrice(tier.price).toFixed(0)} AED
                          </div>
                        </>
                      ) : (
                        <div className="text-lg font-bold text-gray-800">
                          {tier.price} AED
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Content Panel */}
          <div className="space-y-6">
            {content ? (
              <>
                {/* English Content */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg">
                        <Instagram className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">English Content</h3>
                    </div>
                    <button
                      onClick={() => copyToClipboard(content.english.caption, 'en-caption')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Copy English caption"
                    >
                      {copiedItem === 'en-caption' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-gray-700 whitespace-pre-line">{content.english.caption}</p>
                  </div>

                  {/* Hashtags */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-700">
                          Primary Hashtags
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              content.english.hashtags.primary.join(' '),
                              'en-primary'
                            )
                          }
                          className="ml-auto p-1 hover:bg-gray-100 rounded transition-colors"
                          aria-label="Copy primary hashtags"
                        >
                          {copiedItem === 'en-primary' ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {content.english.hashtags.primary.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-gray-700">
                          Location Hashtags
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              content.english.hashtags.location.join(' '),
                              'en-location'
                            )
                          }
                          className="ml-auto p-1 hover:bg-gray-100 rounded transition-colors"
                          aria-label="Copy location hashtags"
                        >
                          {copiedItem === 'en-location' ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {content.english.hashtags.location.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-gray-700">
                          Trending Hashtags
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              content.english.hashtags.trending.join(' '),
                              'en-trending'
                            )
                          }
                          className="ml-auto p-1 hover:bg-gray-100 rounded transition-colors"
                          aria-label="Copy trending hashtags"
                        >
                          {copiedItem === 'en-trending' ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {content.english.hashtags.trending.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arabic Content */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100" dir="rtl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg">
                        <Instagram className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">المحتوى العربي</h3>
                    </div>
                    <button
                      onClick={() => copyToClipboard(content.arabic.caption, 'ar-caption')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="نسخ النص العربي"
                    >
                      {copiedItem === 'ar-caption' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-gray-700 whitespace-pre-line">{content.arabic.caption}</p>
                  </div>

                  {/* Arabic Hashtags */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-semibold text-gray-700">
                        الهاشتاجات العربية
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(content.arabic.hashtags.join(' '), 'ar-hashtags')
                        }
                        className="mr-auto p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label="نسخ الهاشتاجات"
                      >
                        {copiedItem === 'ar-hashtags' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.arabic.hashtags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Ready to Generate
                  </h3>
                  <p className="text-gray-600">
                    Configure your campaign settings and click "Generate Campaign" to create AI-powered
                    marketing content for Royal Clean UAE.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
