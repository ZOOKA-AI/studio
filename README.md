# Firebase Studio

<div dir="rtl">

### ✨ دعم تطوير أدوات الذكاء الاصطناعي للجميع ✨

مشروع `studio` هو أداة مجانية ومفتوحة المصدر تهدف إلى تسهيل الوصول لتقنيات الذكاء الاصطناعي وتطويرها. دعمكم عبر GitHub Sponsors سيساعدنا على إضافة ميزات جديدة، صيانة المشروع، وتوفير المزيد من الأدوات المبتكرة للمجتمع العربي.

**[ادعم المشروع على GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)**

</div>

---

## 🚀 Overview

Firebase Studio is a modern Next.js application integrated with Firebase and Google's Genkit AI framework. This project serves as a foundation for building AI-powered applications with real-time database capabilities.

## ✨ Features

- **Next.js 15** - Latest React framework with App Router
- **Firebase Integration** - Authentication, Firestore, and Hosting
- **Google Genkit AI** - AI-powered features with Gemini models
- **TypeScript** - Full type safety
- **Tailwind CSS** - Modern styling with shadcn/ui components
- **Role-Based Access** - Admin, supervisor, and worker roles
- **Real-time Updates** - Firebase Firestore integration

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Firebase account
- Google AI API key (for Genkit)

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ZOOKA-AI/studio.git
   cd studio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your credentials:
   - Firebase configuration (from Firebase Console)
   - Google Generative AI API key (from [Google AI Studio](https://makersuite.google.com/app/apikey))

4. **Configure Firebase:**
   - Update `.firebaserc` with your Firebase project ID
   - Update `src/firebase/config.ts` with your Firebase configuration

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit development server
- `npm run genkit:watch` - Start Genkit with watch mode
- `npm run firebase:emulators` - Start Firebase emulators
- `npm run firebase:deploy` - Deploy to Firebase

## 🧪 Testing with Firebase Emulators

Start the Firebase emulators for local testing:

```bash
npm run firebase:emulators
```

This will start:

- Authentication emulator on port 9099
- Firestore emulator on port 8080
- Hosting emulator on port 5000
- Emulator UI on port 4000

## 📦 Project Structure

```
studio/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── ai/              # Genkit AI flows
│   │   └── flows/       # AI flow definitions
│   ├── firebase/        # Firebase configuration
│   ├── lib/             # Utility functions
│   ├── hooks/           # Custom React hooks
│   └── context/         # React context providers
├── docs/                # Documentation
├── .github/             # GitHub workflows
└── public/              # Static assets
```

## 🤖 AI Features

The project includes Genkit AI flows for:

- Material suggestions for cleaning tasks
- Report summary generation

See `src/ai/flows/` for implementation details.

## 🔒 Security

- Firestore security rules are defined in `firestore.rules`
- Environment variables are gitignored
- Use Firebase Authentication for user management

## 🚢 Deployment

### Deploy to Firebase Hosting

```bash
npm run build
npm run firebase:deploy
```

### Automatic Deployment

Push to the `main` branch to trigger automatic deployment via GitHub Actions.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Firebase](https://firebase.google.com/)
- AI features by [Google Genkit](https://firebase.google.com/docs/genkit)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

## 📞 Support

- [Open an issue](https://github.com/ZOOKA-AI/studio/issues)
- [Sponsor on GitHub](https://github.com/sponsors/ZOOKA-AI)

---

Made with ❤️ by [ZOOKA-AI](https://github.com/ZOOKA-AI)
