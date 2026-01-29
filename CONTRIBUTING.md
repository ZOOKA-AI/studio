# المساهمة في Firebase Studio / Contributing to Firebase Studio

نرحب بمساهماتكم في تطوير Firebase Studio! هذا المستند يوضح كيفية المساهمة في المشروع.

We welcome your contributions to Firebase Studio! This document explains how to contribute to the project.

---

## 🌟 كيفية المساهمة / How to Contribute

### 1. الإبلاغ عن المشاكل / Reporting Issues

إذا وجدت مشكلة أو خلل في المشروع:
- تأكد من أن المشكلة لم يتم الإبلاغ عنها مسبقاً
- افتح issue جديد مع وصف واضح للمشكلة
- أضف خطوات إعادة إنتاج المشكلة إذا أمكن
- أرفق لقطات شاشة إذا كانت المشكلة بصرية

If you find a bug or issue:
- Check if the issue has already been reported
- Open a new issue with a clear description
- Include steps to reproduce if possible
- Attach screenshots if it's a visual issue

### 2. اقتراح ميزات جديدة / Suggesting Features

لاقتراح ميزة جديدة:
- افتح issue مع عنوان يبدأ بـ "Feature Request:"
- اشرح الميزة المقترحة وفائدتها
- ناقش كيفية التنفيذ إذا كان لديك فكرة

To suggest a new feature:
- Open an issue with title starting with "Feature Request:"
- Explain the proposed feature and its benefits
- Discuss implementation approach if you have ideas

### 3. المساهمة بالكود / Contributing Code

#### خطوات المساهمة / Contribution Steps

1. **Fork المستودع / Fork the Repository**
   ```bash
   # انقر على زر Fork في GitHub
   # Click the Fork button on GitHub
   ```

2. **استنساخ المستودع / Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/studio.git
   cd studio
   ```

3. **إنشاء فرع جديد / Create a New Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # أو / or
   git checkout -b fix/your-bug-fix
   ```

4. **إعداد البيئة / Set Up Environment**
   ```bash
   npm install
   npm run dev
   ```

5. **إجراء التغييرات / Make Your Changes**
   - اتبع معايير الكود الموجودة
   - أضف تعليقات واضحة باللغة الإنجليزية
   - اختبر تغييراتك جيداً
   
   - Follow existing code standards
   - Add clear comments in English
   - Test your changes thoroughly

6. **فحص الكود / Check Your Code**
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```

7. **Commit التغييرات / Commit Your Changes**
   ```bash
   git add .
   git commit -m "وصف واضح للتغييرات / Clear description of changes"
   ```

8. **Push ورفع Pull Request / Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```
   ثم افتح Pull Request على GitHub
   
   Then open a Pull Request on GitHub

---

## 📝 معايير الكود / Code Standards

- استخدم TypeScript لجميع الملفات الجديدة
- اتبع معايير ESLint المحددة في المشروع
- استخدم أسماء متغيرات واضحة ومفهومة
- أضف تعليقات للأجزاء المعقدة من الكود

- Use TypeScript for all new files
- Follow the ESLint standards defined in the project
- Use clear and meaningful variable names
- Add comments for complex code sections

---

## 🧪 الاختبارات / Testing

قبل إرسال Pull Request:
- تأكد من أن جميع الاختبارات تعمل
- اختبر التغييرات على متصفحات مختلفة
- تأكد من عمل المشروع على الأجهزة المحمولة

Before submitting a Pull Request:
- Ensure all tests pass
- Test changes on different browsers
- Verify mobile responsiveness

---

## 💬 التواصل / Communication

- استخدم اللغة الإنجليزية أو العربية في Issues و Pull Requests
- كن محترماً ومهنياً في جميع التعليقات
- اطلب المساعدة إذا كنت بحاجة إليها

- Use English or Arabic in Issues and Pull Requests
- Be respectful and professional in all comments
- Ask for help if you need it

---

## 📄 الترخيص / License

بمساهمتك في هذا المشروع، فإنك توافق على أن تكون مساهمتك مرخصة بموجب ترخيص MIT.

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 شكراً / Thank You

شكراً لمساهمتك في جعل Firebase Studio أفضل!

Thank you for making Firebase Studio better!
