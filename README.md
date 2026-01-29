# Royal Clean Studio 🧹✨

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black.svg)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.8-orange.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

### ✨ دعم تطوير أدوات الذكاء الاصطناعي للجميع ✨

مشروع `studio` هو أداة مجانية ومفتوحة المصدر تهدف إلى تسهيل الوصول لتقنيات الذكاء الاصطناعي وتطويرها. دعمكم عبر GitHub Sponsors سيساعدنا على إضافة ميزات جديدة، صيانة المشروع، وتوفير المزيد من الأدوات المبتكرة للمجتمع العربي.

**[ادعم المشروع على GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)**

---

## 📋 نظرة عامة | Overview

**Royal Clean Studio** is a comprehensive cleaning company management platform built with modern web technologies. It provides a complete solution for managing cleaning operations, workers, appointments, inventory, and daily reports with AI-powered features.

**استوديو رويال كلين** هو منصة شاملة لإدارة شركات النظافة مبنية بأحدث تقنيات الويب. توفر حلًا كاملاً لإدارة عمليات التنظيف والعمال والمواعيد والمخزون والتقارير اليومية مع ميزات مدعومة بالذكاء الاصطناعي.

## ✨ الميزات الرئيسية | Key Features

### 🎯 Core Features

- **📊 لوحة التحكم الشاملة | Comprehensive Dashboard**
  - Real-time statistics and analytics
  - Quick actions for common tasks
  - Visual charts and reports

- **📝 إدارة التقارير اليومية | Daily Report Management**
  - Create and track daily work reports
  - AI-powered report summarization
  - Worker and material tracking
  - Client information management

- **📅 إدارة المواعيد | Appointment Management**
  - Calendar-based appointment scheduling
  - Status tracking (scheduled, in-progress, completed, delayed)
  - Site location and address management

- **👷 إدارة العمال | Worker Management**
  - Company and external worker tracking
  - Status monitoring (active, on leave)
  - Contact information and roles
  - National ID management

- **📦 إدارة المخزون | Inventory Management**
  - Cleaning materials tracking
  - Quantity monitoring and alerts
  - Unit-based inventory system

- **🔧 إدارة المعدات | Equipment Management**
  - Equipment condition tracking
  - Maintenance status monitoring
  - Supervisor assignment

- **✅ إدارة المهام | Task Management**
  - Priority-based task system
  - Status tracking (new, in-progress, completed)
  - Due date management

### 🤖 AI Features

- **🧠 AI Report Summarization** - Automatic report summaries using Google Gemini
- **💡 Smart Material Suggestions** - AI-powered material recommendations for tasks

## 🛠️ التقنيات المستخدمة | Technology Stack

### Frontend
- **Next.js 16.1** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Lucide React** - Icon library

### Backend & Services
- **Firebase 12.8** - Authentication and Firestore database
- **Google Genkit 1.28** - AI framework
- **Google Gemini 2.5 Flash** - AI model

### Development Tools
- **Vitest** - Fast unit testing framework
- **Testing Library** - Component testing
- **ESLint 9** - Code linting
- **PostCSS** - CSS processing

## 📦 المتطلبات الأساسية | Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm**
- **Git**
- **Firebase Account** (for backend services)
- **Google Cloud Account** (for AI features)

## 🚀 التثبيت والإعداد | Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ZOOKA-AI/studio.git
cd studio
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google AI Configuration
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
```

### 4. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Copy your configuration to `.env.local`
5. Deploy Firestore rules:

```bash
firebase deploy --only firestore:rules
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

### 6. Run AI Development Server (Optional)

```bash
npm run genkit:dev
```

## 📜 السكريبتات المتاحة | Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 9002 |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run genkit:dev` | Start Genkit AI development server |
| `npm run genkit:watch` | Start Genkit with watch mode |

## 🏗️ هيكل المشروع | Project Structure

```
studio/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx        # Dashboard
│   │   ├── calendar/       # Appointments
│   │   ├── reports/        # Daily reports
│   │   ├── inventory/      # Materials management
│   │   ├── equipment/      # Equipment management
│   │   ├── settings/       # Settings
│   │   └── profile/        # User profile
│   ├── components/         # React components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── reports/        # Report components
│   │   ├── tasks/          # Task components
│   │   └── ui/            # Reusable UI components
│   ├── context/           # React Context providers
│   │   ├── AppointmentsContext.tsx
│   │   ├── DailyReportsContext.tsx
│   │   ├── InventoryContext.tsx
│   │   ├── EquipmentContext.tsx
│   │   └── WorkersContext.tsx
│   ├── firebase/          # Firebase configuration
│   │   ├── config.ts      # Firebase setup
│   │   ├── auth.ts        # Authentication
│   │   └── hooks/         # Firestore hooks
│   ├── ai/                # AI features (Genkit)
│   │   ├── genkit.ts      # Genkit configuration
│   │   └── flows/         # AI flows
│   ├── lib/               # Utilities and types
│   │   ├── utils.ts       # Utility functions
│   │   ├── types.ts       # TypeScript types
│   │   └── data.ts        # Mock data
│   ├── hooks/             # Custom React hooks
│   └── test/              # Test files
├── docs/                  # Documentation
├── public/                # Static files
├── firestore.rules        # Firestore security rules
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vitest.config.ts       # Vitest configuration
└── package.json           # Dependencies and scripts
```

## 🧪 الاختبارات | Testing

The project uses Vitest for testing with React Testing Library.

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

- ✅ Utility functions
- ✅ Mock data validation
- ✅ Type checking
- 🔄 Component tests (in progress)

## 🔒 الأمان | Security

- ✅ **All dependencies up to date** with zero vulnerabilities
- ✅ **TypeScript strict mode** enabled
- ✅ **Firebase security rules** configured
- ✅ **Environment variables** for sensitive data
- ✅ **Regular security audits** with npm audit

## 🌐 الدعم العربي | Arabic Support

The application is fully optimized for Arabic language with:

- **RTL (Right-to-Left)** layout support
- **Arabic UI** throughout the application
- **Arabic date formatting**
- **Arabic number formatting**

## 📝 المساهمة | Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Ensure all tests pass before submitting PR
- Follow the existing code style
- Update documentation as needed

## 📄 الترخيص | License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 الدعم والمساعدة | Support

- 📧 Email: support@zooka-ai.com
- 💬 Discord: [Join our community](https://discord.gg/zooka-ai)
- 🐛 Issues: [GitHub Issues](https://github.com/ZOOKA-AI/studio/issues)

## 🙏 شكر وتقدير | Acknowledgments

- Built with ❤️ by [ZOOKA-AI](https://github.com/ZOOKA-AI)
- Powered by [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- AI powered by [Google Gemini](https://ai.google.dev/)

---

**Made with ❤️ for the Arabic community | صنع بحب للمجتمع العربي**