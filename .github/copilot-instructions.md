# Royal Clean Dashboard - GitHub Copilot Instructions

## Project Overview
This project is a comprehensive management dashboard for Royal Clean UAE, a cleaning and pest control service company. The application provides role-based access for admins, supervisors, and workers to manage appointments, daily reports, tasks, workers, and inventory.

**Key Features:**
- Role-based dashboards with supervisor, admin, and worker interfaces
- Daily report wizard with step-by-step data entry
- Task scheduling and assignment system
- Material tracking and inventory management
- Image uploads for before/after documentation
- Report archiving with advanced search capabilities
- Calendar-based appointment management
- Arabic language support (RTL interface)

## Technology Stack

### Core Technologies
- **Next.js 15.3.3** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5** - Primary language with strict mode enabled
- **Firebase 11.9.1** - Backend services (Firestore, Authentication, Storage)
- **Genkit 1.20.0** - AI flows and integrations
- **Tailwind CSS 3.4.1** - Utility-first CSS framework

### UI Components
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Pre-built component library
- **Lucide React** - Icon library
- **Recharts** - Data visualization
- **React Hook Form** - Form management with Zod validation

### Development Tools
- **Turbopack** - Fast bundler (dev mode)
- **ESLint** - Code linting
- **TypeScript** - Type checking

## Coding Standards and Conventions

### TypeScript
- Use strict TypeScript mode (enabled in `tsconfig.json`)
- Always define explicit types for function parameters and return values
- Use interfaces for object shapes, types for unions/intersections
- Leverage path aliases: `@/*` maps to `./src/*`
- Use ES2017 target for modern JavaScript features

### React/Next.js Patterns
- Use `'use client'` directive for client components that use hooks, state, or browser APIs
- Prefer Server Components by default (no directive needed)
- Use the App Router structure (`src/app/`)
- Store reusable components in `src/components/`
- Follow the component organization:
  - `src/components/ui/` - Base UI components (shadcn/ui)
  - `src/components/dashboard/` - Dashboard-specific components
  - `src/components/reports/` - Report-related components
  - `src/components/tasks/` - Task management components

### Context and State Management
- Use React Context for global state (see `src/context/`)
- Create custom hooks for context consumption
- Store contexts in `src/context/` with naming pattern: `*-context.tsx`
- Example contexts: `appointments-context`, `reports-context`, `tasks-context`, `workers-context`

### Styling
- Use Tailwind CSS utility classes exclusively
- Follow RTL (Right-to-Left) layout for Arabic language support
- Primary colors:
  - Royal blue: `#4169E1` (trust and professionalism)
  - Light blue background: `#E6EBF5` (clean backdrop)
  - Vibrant orange: `#FF7F50` (accents and CTAs)
- Use `class-variance-authority` (cva) for component variants
- Combine classes with `clsx` and `tailwind-merge`

### File and Folder Naming
- Use kebab-case for files: `appointments-calendar.tsx`, `recent-reports.tsx`
- Use PascalCase for component names: `AppointmentsCalendar`, `RecentReports`
- Context files: `*-context.tsx`
- Hook files: `use-*.ts` or `use-*.tsx`

### Firebase Integration
- Use Firebase v9+ modular SDK syntax
- Store Firebase config in `src/firebase/`
- Firestore rules defined in `firestore.rules`
- Use Firebase App Hosting (configured in `apphosting.yaml`)

### AI/Genkit Integration
- Store AI flows in `src/ai/flows/`
- Configure Genkit in `src/ai/genkit.ts`
- Use Google Genai provider: `@genkit-ai/google-genai`
- Development server: `npm run genkit:dev` or `npm run genkit:watch`

## Architecture Patterns

### Component Structure
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use composition over inheritance
- Prefer functional components with hooks

### Data Flow
1. Context providers wrap the app for global state
2. Components consume context via custom hooks
3. Firebase operations in dedicated service files
4. AI flows for intelligent features (Genkit)

### Form Handling
- Use `react-hook-form` for form state management
- Validate with Zod schemas
- Integrate with `@hookform/resolvers` for Zod validation

### Code Organization
```
src/
├── app/           # Next.js App Router pages and layouts
├── components/    # Reusable React components
├── context/       # React Context providers
├── firebase/      # Firebase configuration and utilities
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and helpers
└── ai/            # Genkit AI flows and configuration
```

## Testing Practices

### Running Tests
- Linting: `npm run lint`
- Type checking: `npm run typecheck`
- Build validation: `npm run build`

### Code Quality
- Ensure all code passes TypeScript strict checks
- Fix all ESLint warnings before committing
- Test locally with `npm run dev` before pushing

## Security Guidelines

### Authentication
- Use Firebase Authentication for user management
- Implement role-based access control (admin, supervisor, worker)
- Protect routes based on user roles

### Data Validation
- Always validate user input with Zod schemas
- Sanitize data before storing in Firestore
- Use Firestore security rules for backend validation

### Firestore Rules
- Review and update `firestore.rules` when adding new collections
- Follow principle of least privilege
- Test rules before deploying to production

### Environment Variables
- Never commit API keys or secrets to the repository
- Use environment variables for sensitive configuration
- Document required environment variables in documentation

## Arabic Language Support

### RTL (Right-to-Left) Layout
- Ensure all UI components support RTL layout
- Test interface with Arabic text
- Use logical properties in CSS (e.g., `margin-inline-start` instead of `margin-left`)

### Text and Labels
- All user-facing text should support Arabic
- Use Arabic labels in the UI: "المواعيد" (Appointments), "العمال" (Workers), "اليوميات" (Daily Reports)
- Currency: Use "د.إ" for UAE Dirhams

### Font Selection
- Body text: 'PT Sans' (modern sans-serif)
- Headlines: 'Space Grotesk' (clear, professional)

## Build and Development Scripts

- `npm run dev` - Start development server on port 9002 with Turbopack
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript compiler checks
- `npm run genkit:dev` - Start Genkit development server
- `npm run genkit:watch` - Start Genkit with file watching

## Anti-Patterns to Avoid

### Don't:
- ❌ Use inline styles instead of Tailwind classes
- ❌ Create global state outside of React Context
- ❌ Ignore TypeScript errors (use `@ts-ignore` sparingly)
- ❌ Mix Firebase v8 and v9 SDK syntax
- ❌ Hardcode sensitive data or API keys
- ❌ Create components without considering RTL layout
- ❌ Bypass form validation
- ❌ Ignore accessibility best practices

### Do:
- ✅ Use Tailwind utility classes for all styling
- ✅ Leverage existing UI components from `src/components/ui/`
- ✅ Create reusable custom hooks for shared logic
- ✅ Follow existing patterns in the codebase
- ✅ Test with Arabic content and RTL layout
- ✅ Add proper TypeScript types
- ✅ Use semantic HTML and ARIA attributes
- ✅ Validate all user inputs

## Additional Resources

- [Blueprint Documentation](../docs/blueprint.md) - Detailed feature specifications
- [Backend Configuration](../docs/backend.json) - Backend service configuration
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

## Contributing

When contributing to this project:
1. Follow all coding standards outlined above
2. Test thoroughly in development mode
3. Run linting and type checking before committing
4. Ensure RTL layout works correctly
5. Update documentation if adding new features
6. Keep commits focused and descriptive
7. Consider Arabic language support in all UI changes
