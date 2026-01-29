# Developer Guide - Royal Clean Dashboard

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
4. [Development Workflow](#development-workflow)
5. [Code Quality](#code-quality)
6. [Project Structure](#project-structure)
7. [Key Technologies](#key-technologies)
8. [Contributing Guidelines](#contributing-guidelines)
9. [Common Tasks](#common-tasks)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**Royal Clean Dashboard** is a comprehensive business management application for professional cleaning companies. It provides a bilingual (Arabic/English) interface for supervisors to manage tasks, workers, appointments, daily reports, materials, and equipment.

### Key Features

- 📊 **Dashboard Analytics**: Real-time statistics and insights
- 📅 **Appointment Management**: Schedule and track client appointments
- 📝 **Daily Reports**: Detailed work reports with AI-powered summaries
- ✅ **Task Management**: Assign and track tasks
- 👥 **Worker Management**: Team member profiles and assignments
- 📦 **Inventory Tracking**: Material and equipment management
- 🤖 **AI Integration**: Google Genkit for intelligent suggestions

---

## 🏗️ Architecture

This application is built using modern web technologies with a serverless architecture:

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **UI Library**: React 18.3 with Radix UI components
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation

### Backend & Services
- **Database**: Firebase Firestore (NoSQL)
- **AI**: Google Genkit with Gemini models
- **Hosting**: Firebase App Hosting
- **Authentication**: Firebase Auth (if configured)

### Development Tools
- **Build Tool**: Turbopack (Next.js 15)
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript Compiler
- **CI/CD**: GitHub Actions

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.x or higher
- **npm**: Version 10.x or higher (comes with Node.js)
- **Git**: For version control

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZOOKA-AI/studio.git
   cd studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # Google AI (Genkit)
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:9002](http://localhost:9002)

### First-Time Setup

For first-time contributors, also run:

```bash
# Install pre-commit hooks (if available)
npm run prepare

# Verify your setup
npm run typecheck
npm run format:check
```

---

## 💻 Development Workflow

### Daily Development

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Make your changes** following the code style guidelines

5. **Test your changes**
   ```bash
   npm run typecheck  # Check TypeScript types
   npm run format     # Format code
   ```

6. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: description of your changes"
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request** on GitHub

### Development Server Options

- **Standard development**: `npm run dev`
- **Genkit AI development**: `npm run genkit:dev`
- **Genkit with watch mode**: `npm run genkit:watch`

---

## ✅ Code Quality

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 9002 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check if code is formatted |
| `npm run typecheck` | Run TypeScript type checking |

### Code Quality Standards

1. **TypeScript**: Use strict typing, avoid `any` when possible
2. **Prettier**: All code must be formatted consistently
3. **Naming Conventions**:
   - Components: PascalCase (`UserProfile.tsx`)
   - Hooks: camelCase with `use` prefix (`useAuth.ts`)
   - Utilities: camelCase (`formatDate.ts`)
   - Types: PascalCase (`User`, `AppointmentStatus`)

### Pre-Commit Checklist

Before committing, ensure:

- ✅ Code is properly formatted (`npm run format`)
- ✅ TypeScript types are correct (`npm run typecheck`)
- ✅ TypeScript types are correct (`npm run typecheck`)
- ✅ All imports are organized
- ✅ No console.logs in production code
- ✅ Documentation is updated if needed

---

## 📁 Project Structure

```
studio/
├── .github/
│   └── workflows/        # GitHub Actions CI/CD
├── docs/                 # Documentation
│   ├── blueprint.md      # Project blueprint and design
│   └── backend.json      # Backend configuration reference
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── calendar/    # Appointments page
│   │   ├── equipment/   # Equipment management
│   │   ├── inventory/   # Material inventory
│   │   ├── reports/     # Daily reports
│   │   ├── tasks/       # Task management
│   │   ├── workers/     # Worker management
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Dashboard home
│   ├── components/      # React components
│   │   ├── dashboard/   # Dashboard-specific components
│   │   ├── layout/      # Sidebar, Header
│   │   ├── ui/          # Reusable UI components (shadcn/ui)
│   │   └── ...          # Feature-specific components
│   ├── context/         # React Context providers
│   │   ├── tasks-context.tsx
│   │   ├── workers-context.tsx
│   │   └── ...
│   ├── ai/              # AI/Genkit configuration
│   │   ├── flows/       # AI workflows
│   │   ├── genkit.ts    # AI model configuration
│   │   └── dev.ts       # Development setup
│   ├── firebase/        # Firebase integration
│   │   ├── config.ts    # Firebase configuration
│   │   └── firestore/   # Firestore operations
│   └── lib/             # Utilities and types
│       ├── types.ts     # TypeScript type definitions
│       ├── utils.ts     # Utility functions
│       └── data.ts      # Mock data (for development)
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

### Key Directories

- **`/src/app`**: Next.js 15 App Router pages and routes
- **`/src/components`**: Reusable React components
- **`/src/context`**: Global state management with Context API
- **`/src/ai`**: AI-related code and Genkit flows
- **`/src/firebase`**: Firebase integration and Firestore operations
- **`/src/lib`**: Shared utilities, types, and helper functions

---

## 🛠️ Key Technologies

### Next.js 15 App Router

This project uses Next.js 15's App Router with React Server Components.

**Key concepts:**
- `'use client'`: Mark components that use client-side features
- `'use server'`: Mark server-side functions (AI flows)
- File-based routing in `/src/app`
- Layouts and nested routes

**Resources:**
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

### Firebase Firestore

NoSQL database for real-time data synchronization.

**Collections:**
- `tasks`: Task management
- `workers`: Worker profiles
- `appointments`: Client appointments
- `reports`: Daily cleaning reports
- `materials`: Inventory items
- `equipment`: Equipment tracking

**Usage example:**
```typescript
import { collection, addDoc } from 'firebase/firestore';
import { useFirebase } from '@/firebase';

const { firestore } = useFirebase();
const tasksCollection = collection(firestore, 'tasks');
await addDoc(tasksCollection, newTask);
```

### Google Genkit (AI)

AI integration for intelligent features.

**Available flows:**
- `generateReportSummary`: Summarize daily reports
- `getMaterialSuggestions`: Suggest materials for tasks

**Usage example:**
```typescript
import { generateReportSummary } from '@/ai/flows/generate-report-summary';

const result = await generateReportSummary({
  reportDetails: 'Report content...'
});
```

### TailwindCSS & shadcn/ui

Utility-first CSS framework with pre-built components.

**Using components:**
```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

**Resources:**
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

## 🤝 Contributing Guidelines

### Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat: add worker profile editing functionality
fix: resolve date formatting issue in reports
docs: update installation instructions
refactor: simplify task context provider
```

### Pull Request Process

1. **Create a descriptive PR title** following commit conventions
2. **Fill out the PR template** with:
   - Description of changes
   - Related issues
   - Testing done
   - Screenshots (for UI changes)
3. **Ensure CI checks pass** (linting, type checking, build)
4. **Request review** from maintainers
5. **Address feedback** if requested
6. **Squash and merge** when approved

### Code Review Checklist

When reviewing code, check for:

- ✅ Code follows style guidelines
- ✅ TypeScript types are properly defined
- ✅ Components are properly documented
- ✅ No unnecessary dependencies added
- ✅ Responsive design works on mobile
- ✅ Arabic RTL support is maintained
- ✅ No console errors or warnings
- ✅ Performance is not negatively impacted

---

## 📝 Common Tasks

### Adding a New Page

1. Create a new directory in `/src/app`
2. Add a `page.tsx` file
3. Export a default React component

```typescript
// src/app/settings/page.tsx
export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}
```

### Creating a New Component

1. Create a file in `/src/components/[category]`
2. Define TypeScript types
3. Add JSDoc comments
4. Export the component

```typescript
// src/components/dashboard/custom-card.tsx
/**
 * CustomCard component for displaying statistics
 * @param title - Card title
 * @param value - Card value
 */
type CustomCardProps = {
  title: string;
  value: string;
};

export function CustomCard({ title, value }: CustomCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
```

### Adding a New Context Provider

1. Create a file in `/src/context`
2. Define context type and default value
3. Create provider component
4. Export custom hook

```typescript
// src/context/example-context.tsx
'use client';

import { createContext, useContext } from 'react';

type ExampleContextType = {
  data: any[];
  addItem: (item: any) => void;
};

const ExampleContext = createContext<ExampleContextType | undefined>(undefined);

export function ExampleProvider({ children }) {
  // Implementation
  return (
    <ExampleContext.Provider value={{ data, addItem }}>
      {children}
    </ExampleContext.Provider>
  );
}

export function useExample() {
  const context = useContext(ExampleContext);
  if (!context) {
    throw new Error('useExample must be used within ExampleProvider');
  }
  return context;
}
```

### Adding a New AI Flow

1. Create a file in `/src/ai/flows`
2. Define input and output schemas using Zod
3. Create the Genkit flow
4. Export the flow function

```typescript
// src/ai/flows/example-flow.ts
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InputSchema = z.object({
  input: z.string(),
});

const OutputSchema = z.object({
  result: z.string(),
});

const examplePrompt = ai.definePrompt({
  name: 'examplePrompt',
  input: { schema: InputSchema },
  output: { schema: OutputSchema },
  prompt: `Process this input: {{{input}}}`,
});

const exampleFlow = ai.defineFlow(
  {
    name: 'exampleFlow',
    inputSchema: InputSchema,
    outputSchema: OutputSchema,
  },
  async (input) => {
    const { output } = await examplePrompt(input);
    return output!;
  }
);

export async function processExample(input: z.infer<typeof InputSchema>) {
  return exampleFlow(input);
}
```

### Working with Firestore

**Reading data:**
```typescript
import { useCollection } from '@/firebase/firestore/use-collection';

const { data: tasks } = useCollection(tasksRef);
```

**Writing data:**
```typescript
import { addDoc, collection } from 'firebase/firestore';

const tasksCollection = collection(firestore, 'tasks');
await addDoc(tasksCollection, newTaskData);
```

**Updating data:**
```typescript
import { updateDoc, doc } from 'firebase/firestore';

const taskDoc = doc(firestore, 'tasks', taskId);
await updateDoc(taskDoc, updatedData);
```

**Deleting data:**
```typescript
import { deleteDoc, doc } from 'firebase/firestore';

const taskDoc = doc(firestore, 'tasks', taskId);
await deleteDoc(taskDoc);
```

---

## 🔧 Troubleshooting

### Common Issues

#### Build Errors

**Problem**: TypeScript errors during build
```
Solution: 
1. Check tsconfig.json configuration
2. Run `npm run typecheck` to see detailed errors
3. Ensure all imports are correct
```

**Problem**: ESLint errors blocking build
```
Solution:
1. Run `npm run lint:fix` to auto-fix issues
2. Manually fix remaining errors
3. Temporarily disable in next.config.ts only if necessary
```

#### Development Server Issues

**Problem**: Port 9002 already in use
```bash
# Find and kill the process
lsof -ti:9002 | xargs kill -9

# Or use a different port
npm run dev -- -p 3000
```

**Problem**: Firebase connection errors
```
Solution:
1. Verify .env.local exists with correct Firebase config
2. Check Firebase project settings
3. Ensure Firestore security rules allow access
```

#### Styling Issues

**Problem**: Tailwind classes not working
```
Solution:
1. Restart dev server
2. Check tailwind.config.ts includes your file paths
3. Verify PostCSS is configured properly
```

**Problem**: RTL (Arabic) layout issues
```
Solution:
1. Ensure `dir="rtl"` is set in layout.tsx
2. Use Tailwind RTL utilities (e.g., `ltr:`, `rtl:`)
3. Test with Arabic content
```

#### AI/Genkit Issues

**Problem**: Genkit flows not working
```
Solution:
1. Verify GOOGLE_GENAI_API_KEY is set
2. Check API quota and billing
3. Review error messages in console
```

### Getting Help

- **Documentation**: Check `/docs` folder
- **Issues**: Search [GitHub Issues](https://github.com/ZOOKA-AI/studio/issues)
- **Discussions**: Use GitHub Discussions
- **Discord**: Join the ZOOKA-AI community (if available)

---

## 📚 Additional Resources

### Learning Resources

- [Next.js Learn](https://nextjs.org/learn) - Interactive Next.js tutorial
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Documentation](https://react.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### Related Documentation

- [Blueprint](./docs/blueprint.md) - Detailed project specifications
- [README](./README.md) - Project overview
- [Firebase Rules](./firestore.rules) - Security rules

---

## 🎉 Happy Coding!

Thank you for contributing to the Royal Clean Dashboard project. Your efforts help make this tool better for the community!

For questions or support, please open an issue on GitHub.

---

**Last Updated**: January 2026
**Maintainer**: ZOOKA-AI Team
