# دليل النشر / Deployment Guide

## نظرة عامة / Overview

يدعم هذا المشروع النشر على منصات متعددة. هذا الدليل يوضح كيفية نشر التطبيق على كل منصة.

This project supports deployment to multiple platforms. This guide explains how to deploy the application to each platform.

---

## Vercel (موصى به / Recommended)

Vercel هي منصة النشر الموصى بها لتطبيقات Next.js.

Vercel is the recommended deployment platform for Next.js applications.

### خطوات النشر / Deployment Steps:

1. **تثبيت Vercel CLI** / **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **تسجيل الدخول** / **Login**:
   ```bash
   vercel login
   ```

3. **نشر التطبيق** / **Deploy the Application**:
   ```bash
   vercel
   ```

4. **للنشر إلى الإنتاج** / **For Production Deployment**:
   ```bash
   vercel --prod
   ```

### النشر عبر GitHub

يمكنك أيضاً ربط المستودع مباشرة بـ Vercel:

You can also connect the repository directly to Vercel:

1. اذهب إلى [vercel.com](https://vercel.com)
2. انقر على "New Project"
3. استورد مستودع GitHub الخاص بك
4. سيتم النشر تلقائياً عند كل دفعة (push)

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Automatic deployments will happen on every push

### متغيرات البيئة / Environment Variables

تأكد من إضافة متغيرات البيئة المطلوبة في لوحة تحكم Vercel:
- Firebase configuration
- أي مفاتيح API أخرى

Make sure to add required environment variables in the Vercel dashboard:
- Firebase configuration
- Any other API keys

---

## Firebase App Hosting (الحالي / Current)

التطبيق مُكوَّن حالياً للنشر على Firebase App Hosting.

The application is currently configured for Firebase App Hosting.

### ملف التكوين / Configuration File:
- `apphosting.yaml` - تكوين Firebase App Hosting

### النشر / Deployment:

Firebase App Hosting deployments are managed through:
1. **Firebase Console**: Connect your GitHub repository and deployments happen automatically
2. **GitHub Actions**: Set up CI/CD pipeline for automatic deployments
3. **Firebase CLI** (if configured):
   ```bash
   firebase apphosting:backends:create
   ```

For more details, see [Firebase App Hosting documentation](https://firebase.google.com/docs/app-hosting).

---

## منصات أخرى / Other Platforms

### Netlify
يمكن نشر التطبيق على Netlify باستخدام الإعدادات التالية:

The application can be deployed to Netlify using the following settings:

- **Build Command**: `npm run build`
- **Framework**: Next.js (uses Next.js Runtime plugin)

For static export, add `output: 'export'` to `next.config.ts` and use:
- **Publish Directory**: `out`

### Docker
لنشر التطبيق باستخدام Docker:

To deploy using Docker:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
```

Note: This requires setting `output: 'standalone'` in `next.config.ts`.

---

## ملاحظات مهمة / Important Notes

### Base44
Base44 هي منصة بناء تطبيقات بالذكاء الاصطناعي. لا يتم "نشر" التطبيقات الموجودة على Base44، بل يتم بناء التطبيقات من الصفر داخل المنصة باستخدام الذكاء الاصطناعي.

Base44 is an AI-powered app building platform. You don't "deploy" existing applications TO Base44; instead, applications are built from scratch within the platform using AI.

### Apex Up
Apex Up هي أداة قديمة للنشر على AWS Lambda ولم تعد مدعومة بشكل نشط. نوصي باستخدام Vercel أو AWS Amplify بدلاً منها.

Apex Up is a legacy tool for deploying to AWS Lambda and is no longer actively maintained. We recommend using Vercel or AWS Amplify instead.

---

## الدعم / Support

للمزيد من المساعدة، راجع:
- [وثائق Next.js](https://nextjs.org/docs/deployment)
- [وثائق Vercel](https://vercel.com/docs)
- [وثائق Firebase](https://firebase.google.com/docs/app-hosting)

For more help, see:
- [Next.js Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs/app-hosting)
