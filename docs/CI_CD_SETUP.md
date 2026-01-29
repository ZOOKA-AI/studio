# إعداد CI/CD والأمان / CI/CD and Security Setup

## نظرة عامة / Overview

تم إعداد البنية التحتية الكاملة للتكامل المستمر (CI/CD) والأمان لمشروع Firebase Studio.

A complete CI/CD and security infrastructure has been set up for the Firebase Studio project.

## 📁 الملفات المضافة / Added Files

### 1. GitHub Actions Workflows (`.github/workflows/`)

#### `ci.yml` - سير عمل التكامل المستمر / Continuous Integration Workflow
- **متى يعمل / When it runs**: عند كل push أو pull request إلى فروع `main` أو `develop`
- **ماذا يفعل / What it does**:
  - ✅ فحص الكود (Linting) - `npm run lint`
  - ✅ فحص الأنواع (Type checking) - `npm run typecheck`
  - ✅ بناء المشروع (Build) - `npm run build`
- **الأمان / Security**: استخدام أذونات صريحة محدودة للـ GITHUB_TOKEN

#### `codeql.yml` - تحليل CodeQL الأمني / CodeQL Security Analysis
- **متى يعمل / When it runs**: 
  - عند كل push أو pull request إلى فروع `main` أو `develop`
  - أسبوعياً كل يوم اثنين منتصف الليل UTC (جدولة تلقائية)
- **ماذا يفعل / What it does**:
  - 🔍 تحليل أمني للكود بحثاً عن الثغرات
  - 🛡️ فحص جودة الكود
  - 📊 إنشاء تقارير أمنية في GitHub Security

### 2. قوالب المشكلات / Issue Templates (`.github/ISSUE_TEMPLATE/`)

#### `bug_report.yml` - قالب تقرير الأخطاء
نموذج منظم للإبلاغ عن الأخطاء يتضمن:
- وصف المشكلة
- خطوات إعادة الإنتاج
- السلوك المتوقع
- معلومات البيئة (نظام التشغيل، المتصفح، إصدار Node.js)
- لقطات شاشة اختيارية

Structured form for bug reports including:
- Problem description
- Reproduction steps
- Expected behavior
- Environment information (OS, browser, Node.js version)
- Optional screenshots

#### `feature_request.yml` - قالب طلب الميزات
نموذج منظم لاقتراح ميزات جديدة يتضمن:
- وصف الميزة المقترحة
- المشكلة أو الحاجة
- الحل المقترح
- البدائل المحتملة
- فوائد الميزة

Structured form for feature requests including:
- Proposed feature description
- Problem or need
- Proposed solution
- Alternative considerations
- Feature benefits

#### `config.yml` - إعدادات القوالب
- توجيه المستخدمين إلى مناقشات GitHub
- روابط للتوثيق
- تمكين إنشاء مشكلات فارغة عند الحاجة

### 3. قالب Pull Request

#### `PULL_REQUEST_TEMPLATE.md`
قالب شامل لطلبات السحب يتضمن:
- وصف التغييرات
- رقم المشكلة المرتبطة
- نوع التغيير (إصلاح خطأ، ميزة جديدة، إلخ)
- قائمة تحقق للمساهمين
- معلومات الاختبار
- مكان للقطات الشاشة

Comprehensive pull request template including:
- Change description
- Related issue number
- Type of change (bug fix, feature, etc.)
- Contributor checklist
- Testing information
- Screenshot section

### 4. Dependabot Configuration

#### `dependabot.yml`
إعداد تحديثات التبعيات التلقائية:
- **npm packages**: فحص أسبوعي يوم الاثنين 06:00 UTC
- **GitHub Actions**: فحص أسبوعي يوم الاثنين 06:00 UTC
- حد أقصى 10 PRs مفتوحة لـ npm
- حد أقصى 5 PRs مفتوحة لـ GitHub Actions
- تسميات تلقائية: `dependencies`, `automated`, `github-actions`

Automated dependency updates configuration:
- **npm packages**: Weekly check on Monday 06:00 UTC
- **GitHub Actions**: Weekly check on Monday 06:00 UTC
- Max 10 open PRs for npm
- Max 5 open PRs for GitHub Actions
- Automatic labels: `dependencies`, `automated`, `github-actions`

### 5. Documentation

#### `CONTRIBUTING.md` - دليل المساهمة
دليل شامل للمساهمين يغطي:
- كيفية المساهمة في المشروع
- عملية الإبلاغ عن المشكلات
- عملية طلبات السحب
- معايير الكود
- الإعداد المحلي
- سير عمل CI/CD

Comprehensive contributor guide covering:
- How to contribute
- Issue reporting process
- Pull request process
- Code standards
- Local setup
- CI/CD workflow

#### `SECURITY.md` - سياسة الأمان
سياسة شاملة للأمان تتضمن:
- الإصدارات المدعومة
- كيفية الإبلاغ عن الثغرات الأمنية
- ما يمكن توقعه بعد الإبلاغ
- أفضل الممارسات الأمنية
- سجل الثغرات الأمنية

Comprehensive security policy including:
- Supported versions
- How to report vulnerabilities
- What to expect after reporting
- Security best practices
- Security vulnerability log

#### `README.md` - تحديثات
إضافة أقسام جديدة:
- 🚀 دليل البدء السريع
- 🤝 معلومات المساهمة
- 🛡️ الجودة والأمان

## 🔧 كيفية الاستخدام / How to Use

### للمطورين / For Developers

1. **الإعداد المحلي / Local Setup**:
   ```bash
   git clone https://github.com/ZOOKA-AI/studio.git
   cd studio
   npm install
   npm run dev
   ```

2. **قبل الـ Commit / Before Committing**:
   ```bash
   npm run lint        # فحص الكود / Lint code
   npm run typecheck   # فحص الأنواع / Type check
   npm run build       # بناء المشروع / Build project
   ```

3. **إنشاء Pull Request / Creating a Pull Request**:
   - استخدم قالب PR المتوفر / Use the provided PR template
   - تأكد من نجاح جميع فحوصات CI / Ensure all CI checks pass
   - اطلب مراجعة من المشرفين / Request review from maintainers

### للمساهمين / For Contributors

1. **الإبلاغ عن أخطاء / Reporting Bugs**:
   - استخدم قالب "Bug Report" / Use the "Bug Report" template
   - قدم أكبر قدر من التفاصيل / Provide as much detail as possible

2. **اقتراح ميزات / Suggesting Features**:
   - استخدم قالب "Feature Request" / Use the "Feature Request" template
   - اشرح الحاجة والفائدة / Explain the need and benefit

3. **الأمان / Security**:
   - اقرأ SECURITY.md للإبلاغ عن ثغرات / Read SECURITY.md for vulnerability reporting
   - لا تفصح عن الثغرات علناً / Don't disclose vulnerabilities publicly

## 📊 المزايا / Benefits

### ✅ جودة الكود / Code Quality
- فحص تلقائي للكود في كل PR
- ضمان التوافق مع معايير المشروع
- اكتشاف الأخطاء مبكراً

### 🔒 الأمان / Security
- مسح أمني أسبوعي بواسطة CodeQL
- تحديثات تلقائية للتبعيات عبر Dependabot
- سياسة واضحة للإبلاغ عن الثغرات

### 🤝 المساهمة / Contribution
- عملية مساهمة منظمة وواضحة
- قوالب موحدة للمشكلات والـ PRs
- تواصل أفضل مع المجتمع

### 🚀 التطوير / Development
- سير عمل تطوير فعال
- اختبار تلقائي للتغييرات
- ثقة أكبر في جودة الكود

## 🔄 التحديثات المستقبلية / Future Updates

يمكن إضافة المزيد من الميزات مستقبلاً:
- اختبارات تلقائية / Automated tests
- نشر تلقائي / Automated deployment
- تغطية الكود / Code coverage
- مراجعة كود تلقائية / Automated code review

Future enhancements can include:
- Automated testing
- Automated deployment
- Code coverage reports
- Automated code review

---

تم الإعداد بنجاح! 🎉
Setup completed successfully! 🎉
