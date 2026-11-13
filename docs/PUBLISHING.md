# دليل النشر / Publishing Guide

## تتبع المستودعات المنشورة / Tracking Published Repositories

هذا المستند يوضح كيفية تتبع حالة نشر المستودعات في منظمة ZOOKA-AI.

### الحالة الحالية / Current Status

حالياً، المستودع `studio` معلم كـ `private: true` في ملف `package.json`، مما يعني أنه لا يمكن نشره على npm.

### خطوات النشر / Publishing Steps

إذا كنت تريد نشر المستودع على npm:

1. **تحديث package.json**
   ```bash
   # إزالة أو تغيير "private": true إلى "private": false
   ```

2. **التأكد من اكتمال المعلومات**
   - التأكد من وجود `name` فريد
   - إضافة `description`
   - إضافة `license`
   - إضافة `repository` URL

3. **تحديث جدول حالة النشر في README.md**
   - إضافة تاريخ النشر
   - تحديث رقم الإصدار
   - تغيير الحالة من "خاص" إلى "منشور"

4. **إنشاء Release على GitHub**
   - سيؤدي ذلك إلى تشغيل workflow النشر تلقائياً

### تحديث جدول التتبع / Updating the Tracking Table

عند نشر إصدار جديد، قم بتحديث الجدول في README.md:

```markdown
| المستودع / Repository | الحالة / Status | الإصدار / Version | تاريخ النشر / Published Date |
|----------------------|-----------------|-------------------|----------------------------|
| studio               | منشور          | 0.2.0             | 2026-02-04 |
```

### معلومات إضافية / Additional Information

- يتم استخدام GitHub Actions للنشر التلقائي (انظر `.github/workflows/npm-publish.yml`)
- يجب أن يكون لديك `NPM_TOKEN` مضاف في secrets المستودع
- تأكد من اجتياز جميع الاختبارات قبل النشر
