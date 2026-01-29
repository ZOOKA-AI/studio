# Firebase Studio

---

### ✨ دعم تطوير أدوات الذكاء الاصطناعي للجميع ✨

مشروع `studio` هو أداة مجانية ومفتوحة المصدر تهدف إلى تسهيل الوصول لتقنيات الذكاء الاصطناعي وتطويرها. دعمكم عبر GitHub Sponsors سيساعدنا على إضافة ميزات جديدة، صيانة المشروع، وتوفير المزيد من الأدوات المبتكرة للمجتمع العربي.

**[ادعم المشروع على GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)**

---

## Overview

This is a Next.js starter project integrated with Firebase and Google AI (Genkit) for building AI-powered applications.

## Features

- ⚡ **Next.js 15** with TypeScript
- 🔥 **Firebase** integration (Firestore, Authentication)
- 🤖 **Google AI (Genkit)** for AI features
- 🎨 **Tailwind CSS** with shadcn/ui components
- 📱 **Responsive Design** with modern UI components

## Prerequisites

- Node.js 18+ and npm/yarn
- Firebase account ([console.firebase.google.com](https://console.firebase.google.com))
- Google AI API key ([aistudio.google.com](https://aistudio.google.com/app/apikey))

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Google AI API key:

```env
GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
```

**Get your API key from:** https://aistudio.google.com/app/apikey

### 3. Firebase Setup

The project is pre-configured with a Firebase project. If you want to use your own Firebase project:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Update `src/firebase/config.ts` with your Firebase configuration
3. Update `.firebaserc` with your project ID

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

### 5. Run Genkit AI Development Tools

To work with AI flows and features:

```bash
npm run genkit:dev
```

For watch mode (auto-reload on changes):

```bash
npm run genkit:watch
```

## Available Scripts

- `npm run dev` - Start development server on port 9002
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit development UI
- `npm run genkit:watch` - Start Genkit in watch mode

## Project Structure

```
src/
├── app/           # Next.js app directory (pages and routes)
├── components/    # React components
│   ├── ui/       # shadcn/ui components
│   ├── dashboard/
│   ├── tasks/
│   └── reports/
├── ai/            # Genkit AI flows and configurations
├── firebase/      # Firebase configuration and utilities
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── context/       # React context providers
```

## Firebase Features

- **Firestore**: NoSQL database for storing data
- **Authentication**: User authentication (configured in the project)
- **Security Rules**: Defined in `firestore.rules`

## AI Features

The project uses Google Genkit for AI capabilities:

- **Model**: Gemini 2.5 Flash (configurable in `src/ai/genkit.ts`)
- **Flows**: Custom AI flows in `src/ai/flows/`
  - Report summary generation
  - Material suggestions

## Development

### Code Quality

- **ESLint**: Configured in `.eslintrc.json`
- **Prettier**: Configured in `.prettierrc.json`
- **EditorConfig**: Configured in `.editorconfig`

### Type Checking

Run type checking:

```bash
npm run typecheck
```

### Linting

Run linting:

```bash
npm run lint
```

## Building for Production

```bash
npm run build
```

The optimized production build will be generated in the `.next` directory.

## Deployment

This project is configured for Firebase App Hosting (see `apphosting.yaml`). To deploy:

```bash
firebase deploy
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google AI Genkit Documentation](https://firebase.google.com/docs/genkit)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For support and questions, please open an issue on GitHub or contact the maintainers.