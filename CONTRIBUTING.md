# دليل المساهمة | Contributing Guide

شكراً لاهتمامك بالمساهمة في Royal Clean Studio! نرحب بجميع المساهمات.

Thank you for your interest in contributing to Royal Clean Studio! We welcome all contributions.

## 📋 جدول المحتويات | Table of Contents

- [قواعد السلوك](#code-of-conduct)
- [كيفية المساهمة](#how-to-contribute)
- [إرشادات التطوير](#development-guidelines)
- [عملية المراجعة](#review-process)

## 📜 قواعد السلوك | Code of Conduct

نتوقع من جميع المساهمين الالتزام بالاحترام والمهنية في جميع التفاعلات.

We expect all contributors to maintain respect and professionalism in all interactions.

## 🤝 كيفية المساهمة | How to Contribute

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/studio.git
cd studio
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Changes

- Write clean, readable code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 4. Run Tests

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Tests
npm test
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat: add amazing feature"
# or
git commit -m "fix: resolve issue with..."
```

**Commit Message Format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 💻 إرشادات التطوير | Development Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type
- Enable strict mode checks

### React Components

- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use proper prop typing

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure RTL (Arabic) support
- Test responsive design

### Testing

- Write tests for new features
- Aim for good test coverage
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### Code Quality

```bash
# Before committing, ensure:
npm run typecheck  # No TypeScript errors
npm run lint       # No linting errors
npm test           # All tests pass
```

### File Structure

```
src/
├── app/           # Pages (Next.js App Router)
├── components/    # Reusable components
├── context/       # React Context providers
├── hooks/         # Custom hooks
├── lib/           # Utilities and types
├── firebase/      # Firebase integration
├── ai/            # AI features
└── test/          # Test files
```

## 🔍 عملية المراجعة | Review Process

### What We Look For

1. **Code Quality**
   - Clean, readable code
   - Proper TypeScript usage
   - Following project conventions

2. **Testing**
   - New features have tests
   - Existing tests still pass
   - Good test coverage

3. **Documentation**
   - README updated if needed
   - Code comments for complex logic
   - JSDoc for functions/components

4. **Performance**
   - No unnecessary re-renders
   - Efficient algorithms
   - Optimized assets

### Review Timeline

- Initial review: Within 2-3 days
- Follow-up reviews: Within 1-2 days
- Merge: After approval and passing CI

## 🐛 تبليغ عن الأخطاء | Reporting Bugs

When reporting bugs, please include:

1. **Description** - Clear description of the issue
2. **Steps to Reproduce** - How to reproduce the bug
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Screenshots** - If applicable
6. **Environment** - Browser, OS, Node version

## 💡 اقتراح ميزات جديدة | Suggesting Features

When suggesting features:

1. **Use Case** - Why is this feature needed?
2. **Description** - Detailed description of the feature
3. **Examples** - How would it work?
4. **Alternatives** - Other solutions you considered

## 📞 الحصول على المساعدة | Getting Help

- 💬 Discord: [Join our community](https://discord.gg/zooka-ai)
- 📧 Email: support@zooka-ai.com
- 🐛 Issues: [GitHub Issues](https://github.com/ZOOKA-AI/studio/issues)

## 🎯 مجالات المساهمة | Areas for Contribution

نرحب بالمساهمات في المجالات التالية:

We welcome contributions in the following areas:

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🧪 Adding tests
- 🎨 UI/UX enhancements
- 🌍 Translations
- ♿ Accessibility improvements
- ⚡ Performance optimizations

## 📄 الترخيص | License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**شكراً لمساهمتك! | Thank you for your contribution!** ❤️
