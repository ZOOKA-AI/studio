# Zooka AI Studio - Application Gallery

منصة معرض تطبيقات متكاملة مع تكاملات عالمية قوية وقاعدة بيانات Supabase.

## 🎯 الميزات

- **معرض التطبيقات**: عرض وتصفح التطبيقات المتاحة
- **لوحة تحكم المطورين**: إدارة التطبيقات والتكاملات
- **لوحة الإدارة**: مراجعة وإدارة التطبيقات والمستخدمين
- **التكاملات**: GitHub, YouTube, Vercel, Firebase, Stripe
- **نظام التقييمات**: تقييمات ومراجعات للتطبيقات
- **الإشعارات**: نظام إشعارات فوري
- **التحليلات**: تتبع المشاهدات والتحميلات

## 🚀 البدء السريع

### المتطلبات الأساسية

- Node.js 20+
- npm أو yarn
- حساب Supabase
- حساب Vercel (للنشر)

### التثبيت

1. استنساخ المستودع:
```bash
git clone https://github.com/ZOOKA-AI/studio.git
cd studio
```

2. تثبيت الحزم:
```bash
npm install
```

3. إعداد المتغيرات البيئية:
```bash
cp .env.example .env.local
```

عدّل `.env.local` بمفاتيحك الخاصة من Supabase.

4. إعداد قاعدة البيانات:
```bash
# تثبيت Supabase CLI
npm install -g supabase

# ربط المشروع
supabase link --project-ref bylfizytgayoefuyliix

# تطبيق المايجريشن
supabase db push

# نشر Edge Functions
supabase functions deploy
```

5. تشغيل المشروع محلياً:
```bash
npm run dev
```

افتح [http://localhost:9002](http://localhost:9002) في المتصفح.

## 📁 هيكل المشروع

```
.
├── src/
│   ├── app/
│   │   ├── gallery/         # صفحات معرض التطبيقات
│   │   ├── dashboard/       # لوحة تحكم المطورين
│   │   ├── admin/           # لوحة الإدارة
│   │   └── api/            # API Routes
│   ├── components/
│   │   ├── gallery/        # مكونات المعرض
│   │   └── ui/            # مكونات واجهة المستخدم
│   └── lib/
│       ├── supabase/      # عملاء Supabase
│       └── integrations/  # تكاملات OAuth
├── supabase/
│   ├── migrations/        # مايجريشن قاعدة البيانات
│   └── functions/        # Edge Functions
└── .github/
    └── workflows/        # GitHub Actions
```

## 🗄️ قاعدة البيانات

الجداول الرئيسية:
- `profiles`: ملفات المستخدمين
- `apps`: التطبيقات
- `integrations`: التكاملات (GitHub, YouTube, etc.)
- `reviews`: التقييمات والمراجعات
- `notifications`: الإشعارات
- `analytics`: التحليلات

## 🔗 التكاملات

### GitHub
- OAuth للمصادقة
- Webhooks لتتبع تحديثات المستودعات
- عرض Stars و Forks

### YouTube
- OAuth للمصادقة
- عرض قوائم التشغيل
- تضمين الفيديوهات التوضيحية

### Vercel
- نشر تلقائي من GitHub
- عرض حالة النشر

## 🚢 النشر

### Vercel

1. ربط المستودع بـ Vercel
2. إضافة المتغيرات البيئية في Vercel Dashboard
3. إعداد Custom Domain: `www.zooka-ai.com`
4. يتم النشر تلقائياً عند Push إلى `main`

### Supabase

يتم نشر قاعدة البيانات و Edge Functions تلقائياً عبر GitHub Actions.

## 🔒 الأمان

- Row Level Security (RLS) مفعّل على جميع الجداول
- مصادقة آمنة عبر Supabase Auth
- التحقق من Webhooks
- تشفير Tokens

## 📝 الترخيص

MIT License - انظر ملف LICENSE للتفاصيل

## 🤝 المساهمة

المساهمات مرحب بها! يرجى فتح Issue أو Pull Request.

## 📞 الدعم

للدعم، يرجى فتح Issue في GitHub أو التواصل عبر:
- GitHub: [@ZOOKA-AI](https://github.com/ZOOKA-AI)
- Website: [zooka-ai.com](https://www.zooka-ai.com)

---

صُنع بـ ❤️ بواسطة ZOOKA AI
