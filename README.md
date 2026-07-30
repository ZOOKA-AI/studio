# Firebase Studio

---

### ✨ دعم تطوير أدوات الذكاء الاصطناعي للجميع ✨

مشروع `studio` هو أداة مجانية ومفتوحة المصدر تهدف إلى تسهيل الوصول لتقنيات الذكاء الاصطناعي وتطويرها. دعمكم عبر GitHub Sponsors سيساعدنا على إضافة ميزات جديدة، صيانة المشروع، وتوفير المزيد من الأدوات المبتكرة للمجتمع العربي.

**[ادعم المشروع على GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)**

---

## Getting Started

This is a Next.js starter template integrated with Firebase Studio, featuring AI capabilities through Google Genkit.

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- A Firebase project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ZOOKA-AI/studio.git
cd studio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase configuration values from the [Firebase Console](https://console.firebase.google.com/)

```bash
cp .env.example .env.local
```

4. Configure Firebase:
   - Create a new Firebase project or use an existing one
   - Enable Authentication (Email/Password provider)
   - Create a Firestore database
   - Copy your Firebase config values to `.env.local`

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack on port 9002
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit development server
- `npm run genkit:watch` - Start Genkit in watch mode

### Project Structure

- `src/app` - Next.js app router pages
- `src/components` - React components
- `src/firebase` - Firebase configuration and utilities
- `src/ai` - Google Genkit AI flows and configurations
- `src/lib` - Utility functions
- `firestore.rules` - Firestore security rules

### First Login

After setting up the project, you'll need to create your first admin user:

1. Run the development server
2. Navigate to the sign-up page
3. Create an account with your email and password
4. Manually promote your user to admin in the Firebase Console:
   - Go to Firestore Database
   - Navigate to the `roles_admin` collection
   - Click "Add document"
   - Set the Document ID to your user's UID (found in Authentication > Users)
   - Add any field (e.g., `role: "admin"`) - the document just needs to exist
   - The security rules check for document existence, not content

### Learn More

To get started with development, take a look at `src/app/page.tsx`.