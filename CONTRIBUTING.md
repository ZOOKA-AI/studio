# Contributing to Firebase Studio

شكراً لاهتمامك بالمساهمة في Firebase Studio! نحن نقدر مشاركتك ونرحب بجميع أنواع المساهمات.

Thank you for your interest in contributing to Firebase Studio! We appreciate your participation and welcome all types of contributions.

## 📋 جدول المحتويات / Table of Contents

- [كيفية المساهمة / How to Contribute](#how-to-contribute)
- [الإبلاغ عن المشكلات / Reporting Issues](#reporting-issues)
- [طلبات السحب / Pull Requests](#pull-requests)
- [معايير الكود / Code Standards](#code-standards)
- [سير العمل / Workflow](#workflow)

## 🤝 كيفية المساهمة / How to Contribute

هناك عدة طرق للمساهمة في المشروع:

There are several ways to contribute to the project:

1. **الإبلاغ عن الأخطاء** / **Report bugs**
2. **اقتراح ميزات جديدة** / **Suggest new features**
3. **تحسين التوثيق** / **Improve documentation**
4. **كتابة كود** / **Write code**
5. **مراجعة Pull Requests** / **Review Pull Requests**

## 🐛 الإبلاغ عن المشكلات / Reporting Issues

عند الإبلاغ عن مشكلة، يرجى استخدام قوالب المشكلات المتوفرة:

When reporting an issue, please use the available issue templates:

- **تقرير خطأ / Bug Report**: للإبلاغ عن أخطاء في الكود / For reporting code bugs
- **طلب ميزة / Feature Request**: لاقتراح ميزات جديدة / For suggesting new features

يرجى التأكد من:
- البحث في المشكلات المفتوحة والمغلقة قبل فتح مشكلة جديدة
- تقديم معلومات كافية لإعادة إنتاج المشكلة
- تضمين لقطات شاشة إذا كان ذلك مناسباً

Please make sure to:
- Search open and closed issues before opening a new one
- Provide sufficient information to reproduce the issue
- Include screenshots if applicable

## 🔄 طلبات السحب / Pull Requests

### قبل تقديم PR / Before Submitting a PR

1. تأكد من أن الكود الخاص بك يتبع معايير المشروع
2. قم بتشغيل الاختبارات محلياً
3. قم بتحديث التوثيق إذا لزم الأمر

1. Make sure your code follows project standards
2. Run tests locally
3. Update documentation if needed

### عملية المراجعة / Review Process

- سيتم مراجعة جميع PRs من قبل المشرفين
- قد نطلب تغييرات أو تحسينات
- بمجرد الموافقة، سيتم دمج PR الخاص بك

- All PRs will be reviewed by maintainers
- We may request changes or improvements
- Once approved, your PR will be merged

## 💻 معايير الكود / Code Standards

### TypeScript

```typescript
// استخدم TypeScript الصارم / Use strict TypeScript
// أضف تعليقات للكود المعقد / Add comments for complex code
// اتبع نمط الكود الحالي / Follow existing code style
```

### التنسيق / Formatting

- استخدم `npm run lint` للتحقق من الكود / Use `npm run lint` to check code
- استخدم `npm run typecheck` للتحقق من الأنواع / Use `npm run typecheck` to check types
- استخدم `npm run build` للتأكد من بناء المشروع / Use `npm run build` to ensure project builds

## 🔄 سير العمل / Workflow

### الإعداد المحلي / Local Setup

```bash
# استنساخ المستودع / Clone repository
git clone https://github.com/ZOOKA-AI/studio.git
cd studio

# تثبيت التبعيات / Install dependencies
npm install

# تشغيل خادم التطوير / Run development server
npm run dev
```

### التكامل المستمر / Continuous Integration

يستخدم المشروع GitHub Actions للتكامل المستمر:

The project uses GitHub Actions for continuous integration:

- **CI Workflow**: يتم تشغيله تلقائياً عند كل push أو PR / Runs automatically on every push or PR
  - فحص الكود (Lint) / Code linting
  - فحص الأنواع (Type Check) / Type checking
  - البناء (Build) / Building

- **CodeQL**: تحليل أمني أسبوعي / Weekly security analysis
  - فحص الثغرات الأمنية / Vulnerability scanning
  - تحليل جودة الكود / Code quality analysis

- **Dependabot**: تحديثات التبعيات الأسبوعية / Weekly dependency updates
  - تحديث npm packages
  - تحديث GitHub Actions

### فروع Git / Git Branches

- `main`: الفرع الرئيسي المستقر / Main stable branch
- `develop`: فرع التطوير / Development branch
- `feature/*`: فروع الميزات الجديدة / New feature branches
- `fix/*`: فروع إصلاح الأخطاء / Bug fix branches

## 📞 التواصل / Contact

- **GitHub Discussions**: للأسئلة والمناقشات / For questions and discussions
- **GitHub Issues**: للمشكلات وطلبات الميزات / For issues and feature requests

---

شكراً لمساهمتك! 🎉

Thank you for contributing! 🎉
