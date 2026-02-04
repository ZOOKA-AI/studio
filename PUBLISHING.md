# 📦 دليل النشر - ZOOKA-AI Studio

دليل شامل لنشر المشروع على منصات مختلفة

---

## 📋 جدول المحتويات

- [النشر على NPM](#npm)
- [النشر على Docker Hub](#docker)
- [النشر على Vercel](#vercel)
- [النشر على Netlify](#netlify)
- [النشر على Railway](#railway)
- [إصدارات GitHub](#github-releases)
- [دورة الإصدار](#release-cycle)

---

## 📦 النشر على NPM {#npm}

### المتطلبات
- حساب NPM
- تسجيل الدخول محلياً

### الخطوات

```bash
# 1. تسجيل الدخول
npm login

# 2. تحديث الإصدار
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

# 3. بناء المشروع
npm run build

# 4. النشر
npm publish --access public
```

### التثبيت للمستخدمين

```bash
npm install @zooka-ai/studio
# أو
yarn add @zooka-ai/studio
```

---

## 🐳 النشر على Docker Hub {#docker}

### بناء الصورة

```bash
# بناء
docker build -t zooka-ai/studio:latest .
docker build -t zooka-ai/studio:v1.0.0 .

# تسجيل الدخول
docker login

# رفع الصورة
docker push zooka-ai/studio:latest
docker push zooka-ai/studio:v1.0.0
```

### الاستخدام

```bash
docker pull zooka-ai/studio:latest
docker run -p 3000:3000 zooka-ai/studio:latest
```

---

## ▲ النشر على Vercel {#vercel}

### طريقة 1: من خلال Dashboard

1. اذهب إلى [vercel.com](https://vercel.com)
2. Import Git Repository
3. اختر `ZOOKA-AI/studio`
4. اضغط Deploy

### طريقة 2: من خلال CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel --prod
```

### التكوين: vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

## 🎯 النشر على Netlify {#netlify}

### طريقة 1: Git Integration

1. اذهب إلى [netlify.com](https://netlify.com)
2. New site from Git
3. اختر GitHub → `ZOOKA-AI/studio`
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `out`

### طريقة 2: CLI

```bash
# تثبيت
npm install -g netlify-cli

# تسجيل دخول
netlify login

# نشر
netlify deploy --prod
```

---

## 🚂 النشر على Railway {#railway}

### الخطوات

1. اذهب إلى [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. اختر `ZOOKA-AI/studio`
4. أضف متغيرات البيئة
5. Deploy

### التكوين: railway.json

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

---

## 🏷️ إصدارات GitHub {#github-releases}

### إنشاء Release

```bash
# إنشاء Tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# رفع Tag
git push origin v1.0.0
```

### على GitHub

1. اذهب إلى Releases
2. Draft a new release
3. اختر Tag: v1.0.0
4. أضف وصف التحديثات
5. أرفق ملفات (optional)
6. Publish release

---

## 🔄 دورة الإصدار {#release-cycle}

نتبع **Semantic Versioning (SemVer)**:

### التنسيق: MAJOR.MINOR.PATCH

- **MAJOR**: تغييرات غير متوافقة (1.0.0 → 2.0.0)
- **MINOR**: ميزات جديدة متوافقة (1.0.0 → 1.1.0)
- **PATCH**: إصلاحات أخطاء (1.0.0 → 1.0.1)

### جدول الإصدارات

| النوع | التكرار | مثال |
|------|----------|------|
| Patch | أسبوعياً | Bug fixes |
| Minor | شهرياً | New features |
| Major | كل 6 أشهر | Breaking changes |

---

## ✅ Checklist قبل النشر

- [ ] تشغيل الاختبارات: `npm test`
- [ ] بناء المشروع: `npm run build`
- [ ] تحديث CHANGELOG.md
- [ ] تحديث رقم الإصدار في package.json
- [ ] إنشاء Git Tag
- [ ] كتابة Release Notes
- [ ] اختبار النشر في بيئة staging
- [ ] النشر للإنتاج
- [ ] التحقق من النشر
- [ ] إعلان الإصدار

---

## 🤖 أتمتة النشر

لدينا GitHub Actions تقوم بـ:

- ✅ اختبار تلقائي
- ✅ بناء تلقائي
- ✅ نشر تلقائي على NPM
- ✅ نشر تلقائي على Docker Hub
- ✅ نشر تلقائي على Vercel

يتم تفعيلها عند إنشاء Tag جديد.

---

<div align="center">

**للأسئلة:** [devops@zooka-ai.com](mailto:devops@zooka-ai.com)

</div>
