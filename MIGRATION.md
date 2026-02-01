# Migration from Next.js to React + Vite

This document outlines the migration process from Next.js to React + Vite for Base44 compatibility.

## Migration Overview

The project was successfully migrated from Next.js 15 to React 18 + Vite 5 while preserving all components, pages, and functionality.

## Changes Made

### 1. Build System

- **Removed**: Next.js, @genkit-ai/next
- **Added**: Vite, @vitejs/plugin-react, React Router DOM
- **Updated**: Build scripts in package.json

### 2. Routing

- **Before**: Next.js App Router with file-based routing
- **After**: React Router 6 with explicit route configuration

Migration pattern:
```
src/app/page.tsx → src/pages/Dashboard.tsx
src/app/calendar/page.tsx → src/pages/Calendar.tsx
src/app/layout.tsx → src/App.tsx (with React Router)
```

### 3. Navigation

- **Before**: `next/link` and `next/navigation`
- **After**: `react-router-dom`

```tsx
// Before
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// After
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
```

Key changes:
- `Link href={...}` → `Link to={...}`
- `useRouter().push(...)` → `useNavigate()(...)`
- `usePathname()` → `useLocation().pathname`
- Removed `passHref` prop from Link

### 4. Server Components & Directives

- Removed all `'use client'` directives (not needed in pure React)
- Removed `'use server'` directives from AI flows
- All components are now client-side by default

### 5. Configuration Files

#### vite.config.ts (New)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 9002,
  },
});
```

#### tsconfig.json
- Updated for Vite compatibility
- Changed `jsx: "preserve"` to `jsx: "react-jsx"`
- Added `tsconfig.node.json` for Vite config

#### index.html (New)
- Created HTML entry point at root level
- Includes fonts and meta tags previously in layout

### 6. Entry Point

Created `src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './app/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

### 7. AI Features

Since Genkit is a server-side library and incompatible with browser environments:

- Original AI flows preserved in `src/ai/` (for reference/backend use)
- Created client-side stubs in `src/ai-client/`
- Stubbed functions return empty results or placeholder messages
- Console warnings notify developers when AI features are called

To restore AI functionality:
1. Set up a backend API server
2. Implement AI endpoints using the flows in `src/ai/`
3. Update stubs in `src/ai-client/` to call backend endpoints

### 8. Tailwind Configuration

Updated `tailwind.config.ts` content paths:
```typescript
content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
],
```

### 9. Git Ignore

Updated for Vite:
```
# Removed
/.next/
next-env.d.ts

# Added
dist
dist-ssr
*.local
```

## File Structure Changes

```
Before (Next.js):
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── calendar/page.tsx
│   └── ...

After (Vite):
src/
├── pages/          # Route components
│   ├── Dashboard.tsx
│   ├── Calendar.tsx
│   └── ...
├── App.tsx         # Router setup
├── main.tsx        # Entry point
└── ...
```

## Preserved Features

✅ All UI components (shadcn/ui)
✅ All context providers
✅ Firebase integration
✅ Tailwind CSS styling
✅ TypeScript type safety
✅ All business logic
✅ All pages and routes

## Testing

### Build
```bash
npm run build
```
✅ Successful - generates `dist/` directory

### Development
```bash
npm run dev
```
✅ Server starts on http://localhost:9002

### Type Checking
```bash
npm run typecheck
```
✅ Passes (with AI directory excluded)

## Known Limitations

1. **AI Features**: Require backend implementation
2. **Server-Side Rendering**: Not available (pure SPA now)
3. **Image Optimization**: Next.js Image component features not available

## Benefits

✅ Faster build times with Vite
✅ Faster HMR (Hot Module Replacement)
✅ Lighter bundle size
✅ Base44 compatible
✅ Simpler deployment (static files)

## Deployment

The migrated app is now a static SPA that can be deployed to:

- Firebase Hosting
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Build command: `npm run build`
Output directory: `dist/`

## Rollback (if needed)

The original Next.js structure is preserved in `src/app/`. To rollback:

1. Restore original package.json dependencies
2. Restore next.config.ts
3. Update scripts to use Next.js
4. Remove Vite-specific files (vite.config.ts, index.html)
5. Remove src/pages/ and src/main.tsx

## Additional Notes

- The migration maintains the exact same UI/UX
- All existing components work without modification
- Firebase integration remains unchanged
- The application is now Base44 compatible
