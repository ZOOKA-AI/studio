# Firebase Studio

---

### ✨ دعم تطوير أدوات الذكاء الاصطناعي للجميع ✨

مشروع `studio` هو أداة مجانية ومفتوحة المصدر تهدف إلى تسهيل الوصول لتقنيات الذكاء الاصطناعي وتطويرها. دعمكم عبر GitHub Sponsors سيساعدنا على إضافة ميزات جديدة، صيانة المشروع، وتوفير المزيد من الأدوات المبتكرة للمجتمع العربي.

**[ادعم المشروع على GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)**

---

## Tech Stack

This project is built with:

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **React Router 6** - Client-side routing
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Firebase** - Backend and database
- **Genkit** - AI tooling (server-side, requires backend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:9002](http://localhost:9002).

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and types
├── firebase/      # Firebase configuration and utilities
├── ai-client/     # Client-side AI stubs
├── App.tsx        # Main app component with routing
└── main.tsx       # Entry point
```

## Migration Notes

This project has been migrated from Next.js to React + Vite for Base44 compatibility.

### Key Changes:

- **Routing**: Next.js App Router → React Router 6
- **Build Tool**: Next.js → Vite
- **AI Features**: Server-side Genkit AI features have been stubbed out and require a backend API for full functionality

### AI Features

The AI features (material suggestions and report summaries) are currently stubbed for client-side compatibility. To enable these features:

1. Set up a backend API server
2. Implement the AI flows using Genkit (see `src/ai/` directory for reference)
3. Update the client stubs in `src/ai-client/` to call your backend API

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available for everyone to use and contribute to.