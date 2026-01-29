# Setup Guide

This guide will help you set up the Firebase Studio project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.x or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

You'll also need accounts for:

- **Firebase** - [Create account](https://firebase.google.com/)
- **Google AI Studio** - [Get API key](https://makersuite.google.com/app/apikey)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ZOOKA-AI/studio.git
cd studio
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js and React
- Firebase SDK
- Google Genkit AI
- UI components (shadcn/ui with Radix UI)
- Development tools (ESLint, Prettier, TypeScript)

### 3. Firebase Setup

#### 3.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Follow the wizard to create your project
4. Enable Firebase Authentication and Firestore Database

#### 3.2 Get Firebase Configuration

1. In Firebase Console, go to Project Settings
2. Scroll down to "Your apps"
3. Click the web app icon (`</>`)
4. Copy the Firebase configuration object

#### 3.3 Update Configuration Files

Update `src/firebase/config.ts` with your Firebase configuration:

```typescript
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

Update `.firebaserc` with your project ID:

```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### 4. Environment Variables Setup

Create a `.env.local` file from the example:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Google Generative AI (Genkit)
GOOGLE_GENAI_API_KEY=your-google-genai-api-key

# Development Settings
NODE_ENV=development
```

### 5. Get Google AI API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` file as `GOOGLE_GENAI_API_KEY`

### 6. Deploy Firestore Rules

Deploy the Firestore security rules to your Firebase project:

```bash
firebase deploy --only firestore:rules
```

### 7. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:9002`

## Optional: Firebase Emulators

For local development without using production Firebase resources:

```bash
npm run firebase:emulators
```

This starts:
- **Auth Emulator** on port 9099
- **Firestore Emulator** on port 8080
- **Hosting Emulator** on port 5000
- **Emulator UI** on port 4000

## Genkit AI Development

To develop and test AI flows with Genkit:

```bash
npm run genkit:dev
```

Or with auto-reload:

```bash
npm run genkit:watch
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run genkit:dev` | Start Genkit development server |
| `npm run genkit:watch` | Start Genkit with watch mode |
| `npm run firebase:emulators` | Start Firebase emulators |
| `npm run firebase:deploy` | Deploy to Firebase |

## Troubleshooting

### Port Already in Use

If port 9002 is already in use, you can change it in `package.json`:

```json
"dev": "next dev --turbopack -p YOUR_PORT"
```

### Firebase Authentication Issues

Make sure you've enabled the authentication methods you want to use in Firebase Console:
1. Go to Authentication > Sign-in method
2. Enable your preferred providers (Email/Password, Google, etc.)

### Genkit API Key Issues

Ensure your `GOOGLE_GENAI_API_KEY` is:
- Properly set in `.env.local`
- Valid and active
- Has the necessary permissions

### Build Errors

If you encounter TypeScript errors during build:
1. Run `npm run typecheck` to see detailed errors
2. The build is currently configured to ignore errors (see `next.config.ts`)
3. Fix the errors for production deployment

## Next Steps

1. Read the [CONTRIBUTING.md](CONTRIBUTING.md) guide
2. Explore the [project documentation](docs/)
3. Review the Firebase security rules in `firestore.rules`
4. Check out the AI flows in `src/ai/flows/`

## Getting Help

- [Open an issue](https://github.com/ZOOKA-AI/studio/issues)
- Check the [Firebase documentation](https://firebase.google.com/docs)
- Review [Next.js documentation](https://nextjs.org/docs)
- Read [Genkit documentation](https://firebase.google.com/docs/genkit)

---

Happy coding! 🚀
