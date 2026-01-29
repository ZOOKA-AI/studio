# دليل المراقبة والتحليلات / Monitoring and Analytics Guide

هذا الدليل يشرح كيفية استخدام ميزات المراقبة والتحليلات في مشروع ZOOKA-AI Studio.

This guide explains how to use the monitoring and analytics features in the ZOOKA-AI Studio project.

---

## 📊 تحليلات الويب / Web Analytics

### نظرة عامة / Overview

يستخدم المشروع [Plausible Analytics](https://plausible.io/)، وهو حل تحليلات متوافق مع الخصوصية وGDPR:

The project uses [Plausible Analytics](https://plausible.io/), a privacy-friendly and GDPR-compliant analytics solution:

- ✅ لا يستخدم ملفات تعريف الارتباط / No cookies
- ✅ متوافق مع GDPR / GDPR compliant
- ✅ خفيف الوزن (< 1KB) / Lightweight (< 1KB)
- ✅ مفتوح المصدر / Open source

### الإعداد / Setup

1. **إنشاء حساب Plausible / Create a Plausible account**:
   - للاستضافة السحابية: [plausible.io](https://plausible.io)
   - للاستضافة الذاتية: [GitHub - plausible/analytics](https://github.com/plausible/analytics)

2. **إضافة النطاق / Add your domain**:
   - أضف نطاق موقعك في لوحة تحكم Plausible
   - Add your website domain in the Plausible dashboard

3. **تكوين متغيرات البيئة / Configure environment variables**:

```bash
# في ملف .env أو .env.local / In .env or .env.local file
NEXT_PUBLIC_ANALYTICS_DOMAIN=yourdomain.com

# للاستضافة الذاتية (اختياري) / For self-hosted (optional)
NEXT_PUBLIC_PLAUSIBLE_HOST=https://analytics.yourdomain.com
```

4. **النشر / Deploy**:
   - انشر التطبيق مع متغيرات البيئة المحدثة
   - Deploy the application with updated environment variables

### التحقق / Verification

لاختبار أن التحليلات تعمل:

To test that analytics is working:

1. افتح موقعك في بيئة الإنتاج / Open your site in production
2. افتح أدوات المطور (F12) / Open developer tools (F12)
3. تحقق من علامة التبويب Network / Check the Network tab
4. ابحث عن طلب إلى `script.js` / Look for a request to `script.js`
5. تحقق من لوحة Plausible الخاصة بك / Check your Plausible dashboard

---

## 🔍 مراقبة وقت التشغيل / Uptime Monitoring

### نظرة عامة / Overview

تستخدم مراقبة وقت التشغيل GitHub Actions للتحقق من توفر الموقع كل ساعة.

Uptime monitoring uses GitHub Actions to check site availability every hour.

### الميزات / Features

- ✅ فحص تلقائي كل ساعة / Automatic hourly checks
- ✅ إنشاء Issue تلقائي عند الفشل / Automatic issue creation on failure
- ✅ دعم التشغيل اليدوي / Manual trigger support
- ✅ قابل للتخصيص / Customizable

### تكوين URL للمراقبة / Configure Monitoring URL

يمكنك تكوين URL الذي سيتم مراقبته بطريقتين:

You can configure the URL to monitor in two ways:

**الطريقة 1: متغيرات Repository / Method 1: Repository Variables**

1. اذهب إلى `Settings` → `Secrets and variables` → `Actions` → `Variables`
2. أنشئ متغير جديد باسم `MONITORING_URL`
3. أدخل URL موقعك (مثال: `https://zooka-ai.github.io/studio`)

**الطريقة 2: تعديل الـ Workflow / Method 2: Edit the Workflow**

عدّل الملف `.github/workflows/uptime-monitor.yml`:

Edit the file `.github/workflows/uptime-monitor.yml`:

```yaml
URL="${{ vars.MONITORING_URL || 'https://your-domain.com' }}"
```

### التشغيل اليدوي / Manual Trigger

لتشغيل الفحص يدوياً:

To manually trigger the check:

1. اذهب إلى `Actions` → `Uptime Monitoring`
2. انقر على `Run workflow`
3. اختر الفرع وانقر `Run workflow`

### التنبيهات / Alerts

عند اكتشاف توقف الموقع:

When downtime is detected:

1. يتم إنشاء Issue تلقائياً مع تسمية `uptime-alert`
2. إذا كان هناك Issue مفتوح بالفعل، يتم إضافة تعليق
3. يمكنك إعداد إشعارات GitHub لتلقي تنبيهات

---

## 📝 قوالب المساهمة / Contribution Templates

### قوالب المشكلات / Issue Templates

يوفر المشروع ثلاثة قوالب:

The project provides three templates:

1. **🐛 تقرير خطأ / Bug Report**: للإبلاغ عن الأخطاء
2. **✨ طلب ميزة / Feature Request**: لاقتراح ميزات جديدة
3. **📚 تحسين التوثيق / Documentation**: لتحسين التوثيق

### قالب Pull Request

يتضمن قالب PR أقساماً لـ:

The PR template includes sections for:

- وصف التغييرات / Change description
- نوع التغيير / Change type
- المشكلة المرتبطة / Related issue
- خطوات الاختبار / Testing steps
- لقطات الشاشة / Screenshots
- قائمة التحقق / Checklist

### أفضل الممارسات / Best Practices

- استخدم القوالب المناسبة عند إنشاء Issues
- املأ جميع الأقسام المطلوبة
- أضف لقطات شاشة عند الإمكان
- اربط Issues ذات الصلة في PRs
- راجع قائمة التحقق قبل تقديم PR

---

## 🛠️ استكشاف الأخطاء / Troubleshooting

### لا تظهر بيانات التحليلات / Analytics data not showing

1. تحقق من أن `NODE_ENV=production`
2. تحقق من صحة `NEXT_PUBLIC_ANALYTICS_DOMAIN`
3. تحقق من وحدة التحكم بالمتصفح للأخطاء
4. تأكد من أن المحتوى يُقدّم عبر HTTPS

### فحص Uptime يفشل / Uptime check failing

1. تحقق من صحة URL في متغيرات الـ workflow
2. تأكد من أن الموقع متاح للوصول العام
3. تحقق من سجلات الـ workflow للأخطاء
4. تحقق من حالة خدمة الاستضافة

---

## 📞 الدعم / Support

إذا كنت بحاجة إلى مساعدة:

If you need help:

- افتح Issue باستخدام القوالب المناسبة / Open an issue using the appropriate templates
- انضم إلى المناقشات / Join the discussions
- راجع التوثيق / Review the documentation

---

## 🤝 المساهمة / Contributing

نرحب بمساهماتك! يرجى استخدام قوالب المساهمة المناسبة.

We welcome your contributions! Please use the appropriate contribution templates.

لمزيد من المعلومات، راجع [دليل المساهمة](../README.md).

For more information, see the [Contribution Guide](../README.md).
