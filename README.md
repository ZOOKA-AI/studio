# Royal Clean Dashboard | لوحة رويال كلين

<div dir="rtl">

## نظرة عامة

**Royal Clean Dashboard** هو نظام إدارة شامل لخدمات النظافة، مصمم خصيصاً لتسهيل إدارة العمليات اليومية للمشرفين والعمال في شركات النظافة. يوفر النظام لوحة تحكم متكاملة لإدارة المواعيد، المهام، التقارير اليومية، والموارد.

### الميزات الرئيسية

- **إدارة الأدوار**: واجهات مخصصة للمدراء والمشرفين والعمال
- **لوحة تحكم المشرف**: لوحة شاملة مع مؤشرات الأداء والإجراءات السريعة
- **معالج التقارير اليومية**: نظام خطوة بخطوة لتسجيل الأنشطة اليومية
- **جدولة المهام**: جدولة وتعيين المهام للعمال مع الإشعارات
- **تتبع المواد**: تتبع المواد المستخدمة في كل تقرير
- **رفع الصور**: رفع صور قبل وبعد لكل مهمة
- **أرشفة وبحث التقارير**: أرشفة التقارير مع إمكانيات بحث متقدمة
- **سجل التدقيق**: تتبع جميع التعديلات للشفافية والمساءلة

</div>

---

## Overview

**Royal Clean Dashboard** is a comprehensive cleaning service management system, specifically designed to facilitate daily operations management for supervisors and workers in cleaning companies. The system provides an integrated control panel for managing appointments, tasks, daily reports, and resources.

### Key Features

- **Role-Based Access**: Custom interfaces for admins, supervisors, and workers
- **Supervisor Dashboard**: Comprehensive dashboard with KPIs and quick actions
- **Daily Report Wizard**: Step-by-step system for logging daily activities
- **Task Scheduling**: Schedule and assign tasks to workers with notifications
- **Material Tracking**: Track materials used in each report with inventory deduction
- **Image Uploads**: Upload before and after images for each task
- **Report Archive & Search**: Archive daily reports with advanced search capabilities
- **Audit Trail**: Track all modifications for transparency and accountability

---

### ✨ دعم تطوير أدوات الذكاء الاصطناعي للجميع ✨

مشروع `studio` هو أداة مجانية ومفتوحة المصدر تهدف إلى تسهيل الوصول لتقنيات الذكاء الاصطناعي وتطويرها. دعمكم عبر GitHub Sponsors سيساعدنا على إضافة ميزات جديدة، صيانة المشروع، وتوفير المزيد من الأدوات المبتكرة للمجتمع العربي.

**[ادعم المشروع على GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)**

---

## Technology Stack

This application is built with modern web technologies:

- **Frontend Framework**: Next.js 15.3.3 with React 18
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: Radix UI primitives
- **Backend Options**: 
  - Firebase (Firestore, Authentication, Storage)
  - Supabase (PostgreSQL with Row Level Security)
- **AI Integration**: Google Genkit for AI-powered features
- **Form Management**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Icons**: Lucide React
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager
- Firebase or Supabase account (depending on chosen backend)

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
   ```bash
   cp .env.example .env.local
   ```
   
4. Fill in your credentials in `.env.local`

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:9002](http://localhost:9002) in your browser

### Project Structure

```
studio/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── reports/      # Report management components
│   │   ├── tasks/        # Task management components
│   │   └── ui/           # Reusable UI components
│   ├── context/          # React context providers
│   ├── firebase/         # Firebase configuration
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
├── docs/
│   ├── backend.json      # Database schema definition
│   ├── blueprint.md      # Project blueprint and design
│   └── SUPABASE_SETUP.md # Supabase configuration guide
├── supabase/             # Supabase migrations and config
└── public/               # Static assets
```

## Backend Configuration

This project supports both Firebase and Supabase as backend options:

### Supabase Setup

The project is configured with Supabase for SQL database operations.

- **Project ID**: `bylfizytgayoefuyliix`
- **Dashboard**: [https://supabase.com/dashboard/project/bylfizytgayoefuyliix](https://supabase.com/dashboard/project/bylfizytgayoefuyliix)
- **SQL Editor**: [https://supabase.com/dashboard/project/bylfizytgayoefuyliix/sql/new](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/sql/new)

For detailed setup instructions, see [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md).

#### Quick Setup

1. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Supabase credentials in `.env.local`

3. Run migrations (see [SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md) for details)

### Firebase Setup

Firebase configuration is located in the project root. See the existing Firebase configuration files for setup details.

## Data Model

The application manages the following key entities:

- **Users**: Admin, Supervisor, and Worker roles with different permissions
- **Clients**: Companies or individuals requesting cleaning services
- **Sites**: Physical locations where cleaning services are performed
- **Schedules**: Appointments for cleaning sessions
- **Daily Reports**: Detailed logs of completed work with signatures
- **Tasks**: Specific cleaning activities (floor cleaning, window cleaning, etc.)
- **Materials**: Cleaning supplies and inventory tracking
- **Equipment**: Tools and machines with condition monitoring
- **Worker Tasks**: Assignment of specific tasks to workers with time tracking
- **Audit Logs**: Complete history of all system modifications

For detailed schema information, see [docs/backend.json](docs/backend.json).

## Design System

The application follows a consistent design language:

- **Primary Color**: Deep royal blue (#4169E1) - trust and professionalism
- **Background**: Light blue (#E6EBF5) - clean and calming
- **Accent Color**: Vibrant orange (#FF7F50) - key actions and notifications
- **Body Font**: 'PT Sans' - modern, readable
- **Headline Font**: 'Space Grotesk' - clear, professional
- **Layout**: Dashboard-style with mobile-first responsive design
- **Icons**: Clean, modern Lucide icons
- **Animations**: Subtle transitions for enhanced UX

See [docs/blueprint.md](docs/blueprint.md) for complete design guidelines.

## Available Scripts

```bash
# Development
npm run dev              # Start dev server on port 9002
npm run genkit:dev       # Start Genkit AI development server
npm run genkit:watch     # Start Genkit with hot reload

# Production
npm run build           # Build for production
npm start               # Start production server

# Quality
npm run lint            # Run ESLint
npm run typecheck       # Run TypeScript compiler check
```

## Database Migrations

### Supabase Migrations

Migrations are located in `supabase/migrations/`:
- `20260204000000_initial_schema.sql` - Initial database schema
- `20260204000001_rls_policies.sql` - Row Level Security policies

Run migrations:
```bash
supabase db push
```

Or manually execute SQL files in the [Supabase SQL Editor](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/sql/new).

## Features Deep Dive

### Supervisor Dashboard
- Real-time statistics (appointments, workers, reports, revenue)
- Quick actions for common tasks
- Appointment calendar with drag-and-drop
- Recent reports overview

### Daily Report Wizard
Multi-step form for comprehensive report creation:
1. Site and date selection
2. Worker assignment
3. Task completion tracking
4. Material usage logging
5. Before/after photo uploads
6. Client and supervisor signatures
7. Financial details

### Task Management
- Create and categorize cleaning tasks
- Assign tasks to workers
- Track time spent on each task
- Monitor task completion status

### Material Tracking
- Inventory management
- Usage tracking per report
- Automatic deduction from stock
- Low stock alerts

## Security

- **Row Level Security (RLS)**: Supabase policies ensure users can only access their data
- **Role-Based Access Control**: Different permissions for admin, supervisor, worker
- **Audit Trail**: All modifications are logged
- **Secure Authentication**: Firebase/Supabase auth integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is part of the ZOOKA-AI open-source initiative.

## Support

For questions or issues:
- Open an issue on GitHub
- Contact: [GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)

---

<div dir="rtl">

## الدعم والمساهمة

نرحب بمساهماتكم! يمكنكم المساهمة من خلال:
- فتح Pull Request
- الإبلاغ عن المشاكل عبر Issues
- دعم المشروع عبر GitHub Sponsors

للأسئلة أو المشاكل:
- افتح Issue على GitHub
- تواصل معنا عبر [GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)

</div>