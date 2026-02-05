# دليل النشر - Zooka AI Studio Application Gallery

هذا الدليل يشرح كيفية نشر منصة معرض التطبيقات على zooka-ai.com

## 📋 المتطلبات الأساسية

1. **حساب Supabase**
   - مشروع Supabase بالمعرف: `bylfizytgayoefuyliix`
   - Supabase Access Token
   - ANON Key و Service Role Key

2. **حساب Vercel**
   - Vercel Token
   - Organization ID
   - Project ID

3. **OAuth Apps**
   - GitHub OAuth App
   - YouTube OAuth App (Google Cloud Console)

## 🔧 الإعداد الأولي

### 1. إعداد قاعدة البيانات Supabase

```bash
# تثبيت Supabase CLI
npm install -g supabase

# ربط المشروع
supabase link --project-ref bylfizytgayoefuyliix

# تطبيق المايجريشن
supabase db push

# نشر Edge Functions
supabase functions deploy github-webhook
supabase functions deploy process-app-submission
```

### 2. إعداد GitHub OAuth

1. اذهب إلى GitHub Settings > Developer Settings > OAuth Apps
2. أنشئ OAuth App جديد:
   - Application name: `Zooka AI Studio`
   - Homepage URL: `https://www.zooka-ai.com`
   - Authorization callback URL: `https://www.zooka-ai.com/api/auth/callback/github`
3. احصل على Client ID و Client Secret

### 3. إعداد YouTube OAuth

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com)
2. أنشئ مشروع جديد أو استخدم موجود
3. فعّل YouTube Data API v3
4. أنشئ OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `https://www.zooka-ai.com/api/auth/callback/youtube`
5. احصل على Client ID و Client Secret

### 4. إعداد متغيرات البيئة

أنشئ ملف `.env.local` في جذر المشروع:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://bylfizytgayoefuyliix.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=https://www.zooka-ai.com/api/auth/callback/github

# YouTube OAuth
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
YOUTUBE_REDIRECT_URI=https://www.zooka-ai.com/api/auth/callback/youtube

# Vercel (للنشر التلقائي)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Supabase CLI
SUPABASE_ACCESS_TOKEN=your_supabase_access_token
```

## 🚀 النشر على Vercel

### الطريقة 1: عبر Vercel Dashboard (موصى بها)

1. **استيراد المشروع**
   - اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
   - انقر على "New Project"
   - استورد مستودع `ZOOKA-AI/studio` من GitHub

2. **إعداد Environment Variables**
   في إعدادات المشروع، أضف جميع المتغيرات من `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `GITHUB_REDIRECT_URI`
   - `YOUTUBE_CLIENT_ID`
   - `YOUTUBE_CLIENT_SECRET`
   - `YOUTUBE_REDIRECT_URI`

3. **إعداد Custom Domain**
   - في إعدادات المشروع، اذهب إلى "Domains"
   - أضف `www.zooka-ai.com`
   - اتبع التعليمات لتحديث DNS records

4. **نشر المشروع**
   - انقر على "Deploy"
   - انتظر حتى يكتمل البناء والنشر

### الطريقة 2: عبر Vercel CLI

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# ربط المشروع
vercel link

# نشر للإنتاج
vercel --prod
```

## 🔗 إعداد DNS للنطاق

في لوحة تحكم مزود النطاق (مثل Namecheap, GoDaddy, etc.):

1. **إضافة A Record**
   - Type: `A`
   - Host: `@`
   - Value: `76.76.21.21` (Vercel IP)

2. **إضافة CNAME Record**
   - Type: `CNAME`
   - Host: `www`
   - Value: `cname.vercel-dns.com`

3. **انتظر انتشار DNS** (قد يستغرق حتى 48 ساعة)

## 🤖 إعداد GitHub Actions

المتغيرات المطلوبة في GitHub Secrets:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_ACCESS_TOKEN
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

لإضافة Secrets:
1. اذهب إلى Settings > Secrets and variables > Actions
2. انقر "New repository secret"
3. أضف كل متغير باسمه وقيمته

## ✅ التحقق من النشر

بعد النشر، تحقق من:

1. **الصفحة الرئيسية**: `https://www.zooka-ai.com`
2. **معرض التطبيقات**: `https://www.zooka-ai.com/gallery`
3. **لوحة التحكم**: `https://www.zooka-ai.com/dashboard`
4. **لوحة الإدارة**: `https://www.zooka-ai.com/admin`

## 🔍 استكشاف الأخطاء

### خطأ في الاتصال بـ Supabase
- تحقق من صحة `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- تأكد من تفعيل RLS policies في Supabase

### خطأ في OAuth
- تحقق من redirect URIs في إعدادات GitHub/YouTube OAuth
- تأكد من صحة Client IDs و Secrets

### خطأ في البناء
- راجع سجلات البناء في Vercel Dashboard
- تحقق من عدم وجود أخطاء في TypeScript

### مشكلة في DNS
- استخدم أداة مثل [DNS Checker](https://dnschecker.org) للتحقق من انتشار DNS
- تأكد من صحة DNS records

## 📊 المراقبة والصيانة

### Vercel Analytics
- فعّل Vercel Analytics لمراقبة الأداء
- راقب Core Web Vitals

### Supabase Monitoring
- راجع Database logs في Supabase Dashboard
- راقب استخدام API و Storage

### GitHub Actions
- راقب سجلات Workflows
- تحقق من نجاح النشر التلقائي

## 🔄 التحديثات المستقبلية

لتحديث الموقع:

1. **Push to main branch**:
   ```bash
   git push origin main
   ```

2. **GitHub Actions سيقوم تلقائياً بـ**:
   - تشغيل الاختبارات
   - بناء المشروع
   - نشر Edge Functions إلى Supabase
   - نشر الموقع إلى Vercel

## 📞 الدعم

للمساعدة:
- افتح Issue في GitHub
- راجع [Supabase Docs](https://supabase.com/docs)
- راجع [Vercel Docs](https://vercel.com/docs)

---

تم الإنشاء بواسطة ZOOKA AI Team
