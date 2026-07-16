# 🎨 Firebase Studio

> Next.js AI Studio - Open-source AI development platform with Genkit integration

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3+-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Firebase](https://img.shields.io/badge/Firebase-Cloud-orange)

### ✨ دعم تطوير أدوات الذكاء الاصطناعي للجميع ✨

مشروع `studio` هو أداة مجانية ومفتوحة المصدر تهدف إلى تسهيل الوصول لتقنيات الذكاء الاصطناعي وتطويرها.

**[ادعم المشروع على GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)**

---

## Overview

Firebase Studio is a powerful Next.js starter template integrated with Google Genkit for AI development. It provides a complete development environment with Firebase backend, Turbopack, and modern UI components.

## ✨ Features

- 🤖 **Genkit Integration** - Built-in AI/ML capabilities with Google Genkit
- ⚡ **Turbopack** - Ultra-fast development builds
- 🔥 **Firebase Ready** - Backend infrastructure included
- 🎨 **UI Components** - Radix UI + Tailwind CSS
- 📱 **Responsive** - Mobile-first design
- 🌙 **Dark Mode** - Built-in theme support
- 🧪 **Type Safe** - Full TypeScript support

## 🛠️ Prerequisites

- Node.js 18 or higher
- npm or yarn
- Firebase account (for deployment)

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/ZOOKA-AI/studio.git
cd studio

# Install dependencies
npm install
```

### Development

```bash
# Start development server with Turbopack
npm run dev

# Open browser and navigate to http://localhost:3000
```

### Genkit Development

```bash
# Start Genkit development server
npm run genkit:dev

# Watch mode
npm run genkit:watch
```

### Environment Setup

Create a `.env.local` file:

```env
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run typecheck

# Run linting
npm run lint
```

## 📁 Project Structure

```
studio/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Homepage
│   │   └── layout.tsx         # Root layout
│   ├── ai/                    # Genkit AI files
│   │   └── dev.ts             # Development config
│   ├── components/            # Reusable components
│   │   └── ui/               # Radix UI components
│   ├── lib/                   # Utilities
│   └── styles/               # Global styles
├── public/                    # Static assets
├── .env.local                # Environment variables
├── next.config.js            # Next.js config
├── tsconfig.json             # TypeScript config
└── README.md
```

## 📚 Technology Stack

| Tool | Version | Purpose |
|------|---------|----------|
| Next.js | 15.3.3 | React Framework |
| TypeScript | 5 | Type Safety |
| Firebase | 11.9.1 | Backend |
| Genkit | 1.20.0 | AI Integration |
| Radix UI | Latest | Component Library |
| Tailwind CSS | 3.4.1 | Styling |

## 🔐 Security

- Use `.env.local` for sensitive data
- Never commit environment files
- Enable Firebase security rules
- See [SECURITY.md](./SECURITY.md) for policies

## 🤝 Contributing

We welcome community contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📝 License

MIT License - see [LICENSE](./LICENSE) for details

## 📧 Support & Contact

- **Security Issues**: security@zooka-ai.com
- **GitHub Issues**: [Report a bug](https://github.com/ZOOKA-AI/studio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ZOOKA-AI/studio/discussions)
- **Sponsors**: [Support on GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ by [ZOOKA-AI](https://github.com/ZOOKA-AI)