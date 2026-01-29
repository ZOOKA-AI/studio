# Firebase Studio

---

### ✨ دعم تطوير أدوات الذكاء الاصطناعي للجميع ✨

مشروع `studio` هو أداة مجانية ومفتوحة المصدر تهدف إلى تسهيل الوصول لتقنيات الذكاء الاصطناعي وتطويرها. دعمكم عبر GitHub Sponsors سيساعدنا على إضافة ميزات جديدة، صيانة المشروع، وتوفير المزيد من الأدوات المبتكرة للمجتمع العربي.

**[ادعم المشروع على GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)**

---

## Overview

Firebase Studio is a Next.js-based application integrated with Firebase and Google's Genkit AI framework. This starter template provides a complete setup for building AI-powered applications with Firebase backend services.

## Features

- ⚡ **Next.js 15** with Turbopack for fast development
- 🔥 **Firebase Integration** (Authentication, Firestore, Storage)
- 🤖 **Google Genkit AI** for AI-powered features
- 🎨 **Tailwind CSS** with shadcn/ui components
- 📝 **TypeScript** for type safety
- 🔒 **Security Rules** for Firestore and Storage

## Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Firebase CLI (optional, for emulators)
- Google AI API key (for Genkit features)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ZOOKA-AI/studio.git
cd studio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Update the `.env.local` file with your Firebase and Google AI credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Google AI API Key
GOOGLE_AI_API_KEY=your-google-ai-api-key
```

**Getting Firebase Credentials:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project or create a new one
3. Go to Project Settings > General
4. Scroll down to "Your apps" and select/create a web app
5. Copy the configuration values

**Getting Google AI API Key:**
1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Create or select an API key
3. Copy the key to your `.env.local` file

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

## Available Scripts

- `npm run dev` - Start development server on port 9002
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run genkit:dev` - Start Genkit development server
- `npm run genkit:watch` - Start Genkit with watch mode

## Firebase Setup (Optional)

### Using Firebase Emulators

For local development without affecting production data:

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init
```

4. Start emulators:
```bash
firebase emulators:start
```

The emulator UI will be available at http://localhost:4000

## Project Structure

```
studio/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components (shadcn/ui)
│   ├── firebase/         # Firebase configuration and utilities
│   ├── ai/              # Genkit AI flows and configurations
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
├── docs/                # Documentation
├── firestore.rules      # Firestore security rules
├── storage.rules        # Firebase Storage security rules
├── firebase.json        # Firebase configuration
└── next.config.ts       # Next.js configuration
```

## Security Rules

This project includes comprehensive security rules for:

- **Firestore**: Role-based access control (RBAC) with organization, project, and team permissions
- **Storage**: User-based file access with public/private directories

Make sure to review and customize these rules based on your application's requirements.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 💬 [GitHub Discussions](https://github.com/ZOOKA-AI/studio/discussions)
- 🐛 [Report Issues](https://github.com/ZOOKA-AI/studio/issues)
- 📧 Contact: [ZOOKA-AI](https://github.com/ZOOKA-AI)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Firebase](https://firebase.google.com/)
- AI features by [Google Genkit](https://github.com/firebase/genkit)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

---

Made with ❤️ by ZOOKA-AI
