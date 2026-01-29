# دليل النشر على GitHub Pages
# GitHub Pages Deployment Guide

## نظرة عامة | Overview

تم إعداد هذا المشروع للنشر التلقائي على GitHub Pages باستخدام GitHub Actions. عند كل تحديث لفرع `main`، سيتم بناء المشروع ونشره تلقائيًا.

This project is configured for automatic deployment to GitHub Pages using GitHub Actions. Every push to the `main` branch will automatically build and deploy the project.

---

## الخطوات المطلوبة لتفعيل النشر | Required Steps to Enable Deployment

### 1. تفعيل GitHub Pages | Enable GitHub Pages

1. انتقل إلى صفحة المستودع على GitHub | Go to your repository on GitHub
2. اذهب إلى **Settings** > **Pages** | Navigate to **Settings** > **Pages**
3. في قسم **Source** | Under **Source**:
   - اختر **GitHub Actions** | Select **GitHub Actions**
4. احفظ التغييرات | Save the changes

### 2. دمج التغييرات في فرع main | Merge Changes to main Branch

بعد دمج هذا الـ Pull Request في فرع `main`، سيتم تشغيل عملية النشر تلقائيًا.

After merging this Pull Request into the `main` branch, the deployment process will run automatically.

### 3. التحقق من النشر | Verify Deployment

1. انتقل إلى تبويب **Actions** في المستودع | Go to the **Actions** tab in your repository
2. تحقق من نجاح عملية النشر | Verify that the deployment workflow completed successfully
3. بعد اكتمال النشر، سيكون الموقع متاحًا على | After deployment completes, the site will be available at:
   ```
   https://zooka-ai.github.io/studio
   ```

---

## التغييرات التي تم إجراؤها | Changes Made

### 1. ملف الإعداد | Configuration File

**`next.config.ts`**
- تم إضافة `output: 'export'` لتفعيل التصدير الثابت | Added `output: 'export'` to enable static export
- تم إضافة `basePath: '/studio'` للعمل مع مسار GitHub Pages الفرعي | Added `basePath: '/studio'` for GitHub Pages subpath
- تم إضافة `images.unoptimized: true` لتحسين الصور في البيئة الثابتة | Added `images.unoptimized: true` for static image optimization

### 2. سير العمل | Workflow File

**`.github/workflows/deploy.yml`**
- يتم تشغيله تلقائيًا عند الدفع إلى فرع `main` | Runs automatically on push to `main` branch
- يبني المشروع باستخدام `npm run build` | Builds the project using `npm run build`
- ينشر الملفات الناتجة إلى GitHub Pages | Deploys the output files to GitHub Pages
- يضيف ملف `.nojekyll` لتعطيل معالجة Jekyll | Adds `.nojekyll` file to disable Jekyll processing

### 3. تعطيل ميزات الذكاء الاصطناعي | Disabled AI Features

نظرًا لأن التصدير الثابت لا يدعم Server Actions في Next.js، تم تعطيل الميزات التالية مؤقتًا:

Due to Next.js static export not supporting Server Actions, the following features were temporarily disabled:

- اقتراحات المواد بالذكاء الاصطناعي | AI material suggestions
- إنشاء ملخص التقرير تلقائيًا | Automatic report summary generation

**ملاحظة:** يمكن إعادة تفعيل هذه الميزات عند النشر على منصة تدعم Server Actions مثل Vercel أو Netlify.

**Note:** These features can be re-enabled when deploying to a platform that supports Server Actions like Vercel or Netlify.

---

## البناء المحلي | Local Build

لبناء المشروع محليًا للتأكد من نجاح التصدير:

To build the project locally to verify successful export:

```bash
# تثبيت الحزم
# Install dependencies
npm install

# بناء المشروع
# Build the project
npm run build
```

ستجد الملفات الثابتة في مجلد `out/`

The static files will be in the `out/` directory.

---

## استكشاف الأخطاء | Troubleshooting

### المشكلة: فشل عملية البناء | Issue: Build Fails

تحقق من سجلات GitHub Actions لمعرفة السبب. الأسباب الشائعة:

Check the GitHub Actions logs for details. Common causes:

1. أخطاء في التبعيات | Dependency errors
2. أخطاء في الكود TypeScript | TypeScript errors
3. استخدام ميزات غير متوافقة مع التصدير الثابت | Using features incompatible with static export

### المشكلة: الموقع لا يظهر بشكل صحيح | Issue: Site Doesn't Display Correctly

1. تأكد من تفعيل GitHub Pages بشكل صحيح | Ensure GitHub Pages is enabled correctly
2. تحقق من أن `basePath` في `next.config.ts` يطابق اسم المستودع | Verify that `basePath` in `next.config.ts` matches your repository name
3. انتظر بضع دقائق بعد النشر الأول | Wait a few minutes after the first deployment

---

## موارد إضافية | Additional Resources

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
