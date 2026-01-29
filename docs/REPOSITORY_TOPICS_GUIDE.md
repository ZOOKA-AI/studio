# إضافة المواضيع للمستودع / Adding Repository Topics

## نظرة عامة / Overview

المواضيع (Topics) تساعد في تحسين قابلية اكتشاف المستودع على GitHub وتسهيل العثور عليه من قبل المطورين المهتمين.

Topics help improve repository discoverability on GitHub and make it easier for interested developers to find it.

## كيفية إضافة المواضيع / How to Add Topics

### من واجهة GitHub الويب / From GitHub Web Interface

1. انتقل إلى الصفحة الرئيسية للمستودع
2. في الجزء العلوي من الصفحة، ابحث عن قسم "About" على الجانب الأيمن
3. انقر على أيقونة الإعدادات (⚙️) بجوار "About"
4. في حقل "Topics"، أضف المواضيع ذات الصلة
5. انقر على "Save changes"

---

1. Go to the repository home page
2. At the top of the page, look for the "About" section on the right side
3. Click on the settings icon (⚙️) next to "About"
4. In the "Topics" field, add relevant topics
5. Click on "Save changes"

## المواضيع الموصى بها لهذا المستودع / Recommended Topics for This Repository

بناءً على محتوى وطبيعة المشروع، إليك المواضيع المقترحة:

Based on the project's content and nature, here are suggested topics:

### تقنيات رئيسية / Core Technologies
- `nextjs`
- `react`
- `typescript`
- `firebase`
- `tailwindcss`

### الذكاء الاصطناعي / Artificial Intelligence
- `ai`
- `genkit`
- `google-ai`
- `artificial-intelligence`
- `generative-ai`

### نوع المشروع / Project Type
- `studio`
- `starter-template`
- `web-development`
- `fullstack`

### اللغة والمجتمع / Language & Community
- `arabic`
- `arabic-support`
- `open-source`
- `community`

### إضافية / Additional
- `ui-components`
- `radix-ui`
- `shadcn-ui`

## أمثلة على استخدام المواضيع / Topic Usage Examples

### مثال 1: مشروع Next.js مع AI
```
nextjs, react, typescript, ai, firebase, genkit, tailwindcss
```

### مثال 2: تطبيق ويب كامل
```
fullstack, nextjs, firebase, typescript, web-development, open-source
```

### مثال 3: أداة للمطورين العرب
```
arabic, nextjs, ai, developer-tools, open-source, community
```

## أفضل الممارسات / Best Practices

### ✅ افعل / Do:
- استخدم مواضيع دقيقة وذات صلة
- أضف 5-10 مواضيع (الحد الأقصى 20)
- استخدم الكلمات الشائعة والمعروفة
- استخدم الأحرف الصغيرة والشرطات بدلاً من المسافات
- فكر في ما يبحث عنه المستخدمون

### ❌ لا تفعل / Don't:
- لا تضف مواضيع غير ذات صلة
- لا تستخدم كلمات عامة جداً
- لا تكرر نفس المعنى
- لا تستخدم مواضيع شخصية أو خاصة

## التحقق من فعالية المواضيع / Checking Topic Effectiveness

بعد إضافة المواضيع، يمكنك:

After adding topics, you can:

1. البحث عن كل موضوع على GitHub لرؤية المستودعات المشابهة
2. التحقق من ظهور مستودعك في نتائج البحث
3. مراقبة زيادة عدد المشاهدات والنجوم (Stars)

---

1. Search for each topic on GitHub to see similar repositories
2. Verify that your repository appears in search results
3. Monitor increase in views and stars

## باستخدام GitHub CLI / Using GitHub CLI

يمكنك أيضاً إضافة المواضيع باستخدام GitHub CLI:

You can also add topics using GitHub CLI:

```bash
# تثبيت GitHub CLI إذا لم يكن مثبتاً / Install GitHub CLI if not installed
# https://cli.github.com/

# إضافة مواضيع / Add topics
gh repo edit --add-topic nextjs,react,typescript,firebase,ai,genkit

# حذف موضوع / Remove a topic
gh repo edit --remove-topic old-topic

# عرض المواضيع الحالية / View current topics
gh repo view --json repositoryTopics
```

## باستخدام GitHub API / Using GitHub API

للإضافة برمجياً:

For programmatic addition:

```bash
curl -X PUT \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.github.com/repos/ZOOKA-AI/studio/topics \
  -d '{"names":["nextjs","react","typescript","firebase","ai","genkit","tailwindcss","arabic","open-source"]}'
```

## الموارد / Resources

- [GitHub Topics Documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [GitHub REST API - Topics](https://docs.github.com/en/rest/repos/repos#replace-all-repository-topics)
