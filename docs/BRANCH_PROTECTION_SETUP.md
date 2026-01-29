# إعداد قواعد حماية الفرع / Branch Protection Setup Guide

## نظرة عامة / Overview

هذا الدليل يشرح كيفية إعداد قواعد حماية الفرع `main` لضمان جودة الكود وأمان المشروع.

This guide explains how to set up branch protection rules for the `main` branch to ensure code quality and project security.

## الخطوات / Steps

### 1. الوصول إلى إعدادات المستودع / Access Repository Settings

1. انتقل إلى صفحة المستودع على GitHub
2. انقر على "Settings" (الإعدادات)
3. في القائمة الجانبية، انقر على "Branches" (الفروع)

---

1. Go to the repository page on GitHub
2. Click on "Settings"
3. In the sidebar, click on "Branches"

### 2. إضافة قاعدة حماية جديدة / Add New Protection Rule

1. انقر على "Add branch protection rule" (إضافة قاعدة حماية فرع)
2. في حقل "Branch name pattern"، أدخل `main`

---

1. Click on "Add branch protection rule"
2. In the "Branch name pattern" field, enter `main`

### 3. تكوين القواعد الموصى بها / Configure Recommended Rules

حدد الخيارات التالية لضمان أفضل ممارسات الحماية:

Select the following options to ensure best protection practices:

#### ✅ Require a pull request before merging
- طلب مراجعة pull request قبل الدمج
- **Require approvals**: 1 (على الأقل / at least)
- ✅ Dismiss stale pull request approvals when new commits are pushed
  - إلغاء الموافقات القديمة عند إضافة commits جديدة

#### ✅ Require status checks to pass before merging
- طلب نجاح فحوصات الحالة قبل الدمج
- ✅ Require branches to be up to date before merging
  - طلب تحديث الفروع قبل الدمج
- **Status checks to require:**
  - `Lint and Type Check` (من CI workflow)
  - `Build` (من CI workflow)

#### ✅ Require conversation resolution before merging
- طلب حل جميع المحادثات قبل الدمج

#### ✅ Require linear history (اختياري / Optional)
- الحفاظ على تاريخ خطي للـ commits

#### ✅ Do not allow bypassing the above settings
- عدم السماح بتجاوز الإعدادات أعلاه
- **Note**: قد ترغب في السماح للمسؤولين بالتجاوز في حالات الطوارئ
- **Note**: You may want to allow administrators to bypass in emergency cases

### 4. حفظ التغييرات / Save Changes

انقر على "Create" أو "Save changes" لتطبيق القواعد.

Click on "Create" or "Save changes" to apply the rules.

## التحقق من الإعداد / Verifying Setup

بعد تطبيق القواعد، تأكد من:

After applying the rules, ensure that:

1. ✅ CI workflow يعمل بنجاح على الـ pull requests
2. ✅ لا يمكن الدمج مباشرة إلى `main` بدون pull request
3. ✅ يجب نجاح جميع الفحوصات قبل الدمج
4. ✅ مطلوب موافقة واحدة على الأقل من مراجع

---

1. ✅ CI workflow runs successfully on pull requests
2. ✅ Direct pushes to `main` are not allowed without a pull request
3. ✅ All checks must pass before merging
4. ✅ At least one approval from a reviewer is required

## إعدادات إضافية اختيارية / Additional Optional Settings

### حماية من الحذف / Protect from Deletion
- ✅ **Include administrators**: تطبيق القواعد حتى على المسؤولين

### حماية الـ Tags / Tag Protection
يمكنك أيضاً حماية الـ tags باستخدام نفس المبادئ من خلال "Settings" > "Tags"

You can also protect tags using the same principles through "Settings" > "Tags"

## استكشاف الأخطاء / Troubleshooting

### المشكلة: CI workflow لا يعمل
**الحل**: تأكد من أن ملف `.github/workflows/ci.yml` موجود ومُعَد بشكل صحيح

### Problem: CI workflow is not running
**Solution**: Ensure that the `.github/workflows/ci.yml` file exists and is configured correctly

### المشكلة: لا يمكن دمج PR رغم نجاح الفحوصات
**الحل**: تأكد من:
- وجود موافقة واحدة على الأقل
- حل جميع المحادثات
- تحديث الفرع مع `main`

### Problem: Cannot merge PR despite passing checks
**Solution**: Ensure:
- At least one approval exists
- All conversations are resolved
- Branch is up to date with `main`

## الموارد / Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
