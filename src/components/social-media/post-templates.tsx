'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Image, Video, PlayCircle, LayoutGrid } from 'lucide-react';
import { useState } from 'react';

const postTemplates = [
  {
    id: '1',
    type: 'reel',
    title: 'ريلز - قبل وبعد التنظيف',
    description: 'فيديو قصير يظهر التحول المذهل',
    content: `✨ تحول مذهل من Royal Cleaning UAE! ✨

قبل وبعد التنظيف العميق 🧼
📍 دبي، الإمارات

خدماتنا:
🏠 تنظيف الفلل والشقق
🛋️ تنظيف الكنب والسجاد
🪟 تنظيف النوافذ
🧹 تنظيف عميق شامل

📞 احجز الآن واحصل على خصم 20%!

#RoyalCleaningUAE #تنظيف_دبي #قبل_وبعد`,
    hashtags: [
      '#CleaningTransformation',
      '#BeforeAndAfter',
      '#DubaiCleaning',
      '#UAECleaning',
      '#تنظيف_منازل',
      '#CleaningReels',
      '#SatisfyingCleaning',
      '#DeepCleaning',
      '#HomeCleaning',
      '#CleanTok'
    ],
  },
  {
    id: '2',
    type: 'carousel',
    title: 'كاروسيل - دليل التنظيف الموسمي',
    description: 'سلسلة صور تعليمية (5-10 صور)',
    content: `🌟 دليلك الشامل للتنظيف الموسمي 🌟

اسحب لتتعرف على أفضل النصائح 👈

1️⃣ تنظيف الستائر والمفروشات
2️⃣ تنظيف المكيفات
3️⃣ تلميع الأرضيات
4️⃣ تنظيف المطبخ العميق
5️⃣ تنظيف الحمامات

💼 نحن في Royal Cleaning نقدم جميع هذه الخدمات!

📱 اتصل بنا الآن للحجز`,
    hashtags: [
      '#CleaningTips',
      '#نصائح_التنظيف',
      '#SeasonalCleaning',
      '#UAE',
      '#Dubai',
      '#HomeMaintenance',
      '#CleaningHacks',
      '#تنظيف_احترافي',
      '#RoyalCleaningUAE'
    ],
  },
  {
    id: '3',
    type: 'post',
    title: 'منشور - عرض خاص',
    description: 'عرض ترويجي للخدمات',
    content: `🎉 عرض خاص لفترة محدودة! 🎉

خصم 30% على باقة التنظيف الشامل ✨

الباقة تشمل:
✅ تنظيف جميع الغرف
✅ تنظيف المطبخ والحمامات
✅ تنظيف النوافذ
✅ تنظيف الكنب
✅ تلميع الأرضيات

🏠 مثالي للفلل والشقق
⏰ العرض ساري حتى نهاية الشهر

📞 احجز الآن: [رقم الهاتف]
📍 نخدم جميع مناطق دبي وأبوظبي والشارقة

#عرض_خاص #تنظيف_دبي #RoyalCleaningUAE`,
    hashtags: [
      '#SpecialOffer',
      '#CleaningService',
      '#Dubai',
      '#UAE',
      '#تنظيف_منازل',
      '#عروض',
      '#HomeCleaning',
      '#DeepCleaning',
      '#AbuDhabi',
      '#Sharjah'
    ],
  },
  {
    id: '4',
    type: 'story',
    title: 'ستوري - سؤال وجواب',
    description: 'محتوى تفاعلي للستوري',
    content: `❓ سؤال اليوم ❓

ما هي أكثر مشكلة تواجهك في التنظيف؟

أ) نقص الوقت ⏰
ب) الأدوات المناسبة 🧹
ج) البقع الصعبة 🧼
د) كل ما سبق 😅

شاركنا رأيك في التعليقات! 👇

#RoyalCleaningUAE #تنظيف_دبي`,
    hashtags: [
      '#InteractiveStory',
      '#CleaningPoll',
      '#UAE',
      '#تنظيف'
    ],
  },
  {
    id: '5',
    type: 'reel',
    title: 'ريلز - نصيحة سريعة',
    description: 'نصيحة تنظيف في 15-30 ثانية',
    content: `⚡ نصيحة تنظيف سريعة! ⚡

هل تعلم؟ 🤔

استخدام الخل الأبيض + الماء الدافئ
= أفضل طريقة لتنظيف النوافذ بدون خطوط! 

جربها الآن! 🪟✨

تابعنا للمزيد من النصائح 📲
@royal_cleaning_uae

#CleaningHack #نصيحة_تنظيف #تنظيف_النوافذ`,
    hashtags: [
      '#CleaningTips',
      '#LifeHack',
      '#CleanTok',
      '#UAE',
      '#تنظيف',
      '#نصائح',
      '#Viral',
      '#Trending',
      '#QuickTip',
      '#HomeCleaning'
    ],
  },
  {
    id: '6',
    type: 'carousel',
    title: 'كاروسيل - معرض أعمالنا',
    description: 'عرض مشاريع التنظيف المنجزة',
    content: `📸 معرض أعمالنا - Royal Cleaning UAE 📸

اسحب لترى جودة عملنا 👈

✨ نفخر بخدماتنا الاحترافية
✨ فريق مدرب ومحترف
✨ استخدام أفضل المواد والمعدات
✨ رضا العملاء أولويتنا

🏆 أكثر من 1000 عميل راضٍ
⭐ تقييم 5 نجوم

احجز خدمتك اليوم! 📞

#RoyalCleaningUAE #أعمالنا #تنظيف_احترافي`,
    hashtags: [
      '#Portfolio',
      '#OurWork',
      '#CleaningService',
      '#UAE',
      '#Dubai',
      '#تنظيف_دبي',
      '#ProfessionalCleaning',
      '#BeforeAfter',
      '#CleaningCompany'
    ],
  },
  {
    id: '7',
    type: 'post',
    title: 'منشور - شهادة عميل',
    description: 'مراجعة إيجابية من عميل',
    content: `⭐⭐⭐⭐⭐ شهادة عميل ⭐⭐⭐⭐⭐

"خدمة ممتازة واحترافية! الفريق كان منظم ومحترف جداً. منزلي أصبح نظيف بشكل لا يصدق. شكراً Royal Cleaning!" 

- أم عبدالله، دبي

💙 نحن سعداء بثقتكم
💙 رضاكم هو نجاحنا

جرب خدماتنا الآن واحصل على خصم 15% 🎁

#RoyalCleaningUAE #شهادات_العملاء #تنظيف_دبي`,
    hashtags: [
      '#CustomerReview',
      '#Testimonial',
      '#5Stars',
      '#UAE',
      '#Dubai',
      '#تنظيف',
      '#عملاء_سعداء',
      '#CleaningService',
      '#TrustedService'
    ],
  },
];

export function PostTemplates() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyTemplate = (template: typeof postTemplates[0]) => {
    const fullContent = `${template.content}\n\n${template.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullContent).then(() => {
      setCopiedId(template.id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch((err) => {
      console.error('Failed to copy template:', err);
      alert('فشل نسخ القالب. يرجى المحاولة مرة أخرى.');
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reel':
        return <PlayCircle className="w-5 h-5" />;
      case 'carousel':
        return <LayoutGrid className="w-5 h-5" />;
      case 'story':
        return <Image className="w-5 h-5" />;
      default:
        return <Image className="w-5 h-5" />;
    }
  };

  const getTypeName = (type: string) => {
    const names = {
      reel: 'ريلز',
      carousel: 'كاروسيل',
      story: 'ستوري',
      post: 'منشور',
    };
    return names[type as keyof typeof names] || type;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>قوالب المحتوى الجاهزة</CardTitle>
          <CardDescription>
            قوالب محسّنة لانستقرام - ريلز، كاروسيل، ستوري، ومنشورات عادية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {postTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {getTypeIcon(template.type)}
                      </div>
                      <div>
                        <CardTitle className="text-base">{template.title}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {template.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">{getTypeName(template.type)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-muted rounded-md max-h-48 overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap">{template.content}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.hashtags.slice(0, 6).map((tag, index) => (
                      <span key={index} className="text-xs text-primary">
                        {tag}
                      </span>
                    ))}
                    {template.hashtags.length > 6 && (
                      <span className="text-xs text-muted-foreground">
                        +{template.hashtags.length - 6}
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={() => copyTemplate(template)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    {copiedId === template.id ? (
                      <>
                        <Copy className="w-4 h-4 ml-2 text-green-500" />
                        تم النسخ!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 ml-2" />
                        نسخ القالب مع الهاشتاجات
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>نصائح لإنشاء محتوى ناجح</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-primary" />
                ريلز (Reels)
              </h4>
              <ul className="space-y-1 text-muted-foreground mr-6">
                <li>• مدة 15-30 ثانية للأداء الأفضل</li>
                <li>• استخدم موسيقى ترندنج</li>
                <li>• قبل وبعد = محتوى مثالي</li>
                <li>• أضف نصوص على الفيديو</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-primary" />
                كاروسيل (Carousel)
              </h4>
              <ul className="space-y-1 text-muted-foreground mr-6">
                <li>• 5-10 صور أو فيديوهات</li>
                <li>• محتوى تعليمي يعمل بشكل رائع</li>
                <li>• الصورة الأولى الأهم</li>
                <li>• قصة متسلسلة تجذب المتابع</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Image className="w-4 h-4 text-primary" />
                ستوري (Story)
              </h4>
              <ul className="space-y-1 text-muted-foreground mr-6">
                <li>• انشر 5-7 مرات يومياً</li>
                <li>• استخدم الاستطلاعات والأسئلة</li>
                <li>• من وراء الكواليس محبوب جداً</li>
                <li>• أضف روابط للمنشورات</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Image className="w-4 h-4 text-primary" />
                منشور عادي (Post)
              </h4>
              <ul className="space-y-1 text-muted-foreground mr-6">
                <li>• صور عالية الجودة ضرورية</li>
                <li>• نص جذاب في أول 3 أسطر</li>
                <li>• استخدم الإيموجي بذكاء</li>
                <li>• دعوة للتفاعل في النهاية</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
