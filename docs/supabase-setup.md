# Supabase Setup Guide

This document provides instructions for setting up and using Supabase with the Royal Clean Dashboard project.

## Project Information

- **Project ID**: `bylfizytgayoefuyliix`
- **Dashboard URL**: [https://supabase.com/dashboard/project/bylfizytgayoefuyliix](https://supabase.com/dashboard/project/bylfizytgayoefuyliix)
- **SQL Editor**: [https://supabase.com/dashboard/project/bylfizytgayoefuyliix/sql/new](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/sql/new)

## Getting Started

### 1. Environment Setup

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Supabase credentials from the [API settings page](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/settings/api):
   - **Project URL**: Copy the URL and update `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key**: Copy the anon/public key and update `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key**: Copy the service role key and update `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

3. Update your `.env.local` file with the actual values.

### 2. Database Schema

The database schema is defined in SQL migration files located in the `supabase/migrations/` directory:

- **20260204000000_initial_schema.sql**: Creates all tables based on backend.json entities
- **20260204000001_rls_policies.sql**: Sets up Row Level Security policies

#### Running Migrations

You can run migrations in two ways:

##### Option 1: Using Supabase Dashboard SQL Editor

1. Go to the [SQL Editor](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/sql/new)
2. Copy the contents of each migration file
3. Paste and run them in order

##### Option 2: Using Supabase CLI (Recommended for Development)

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref bylfizytgayoefuyliix
   ```

3. Push migrations to your database:
   ```bash
   supabase db push
   ```

### 3. Database Schema Overview

The database includes the following tables:

#### Core Tables

- **users**: User profiles (admin, supervisor, worker)
- **clients**: Client information
- **sites**: Cleaning site/location information
- **tasks**: Cleaning task definitions
- **materials**: Cleaning material definitions
- **equipment**: Equipment inventory and condition tracking

#### Operational Tables

- **schedules**: Scheduled site visits with assignments
- **daily_reports**: Daily cleaning reports from supervisors
- **worker_tasks**: Task assignments to workers with hours tracking
- **audit_logs**: Audit trail for tracking all modifications

### 4. Row Level Security (RLS)

All tables have Row Level Security enabled to ensure data access is properly controlled:

- **Users** can view and update their own profiles
- **Admins** have full access to all data
- **Supervisors** can manage sites, equipment, schedules, and their own reports
- **Workers** can view their schedules, reports, and tasks

### 5. Local Development with Supabase

For local development, you can run Supabase locally:

1. Start Supabase locally:
   ```bash
   supabase start
   ```

2. This will start all Supabase services locally including:
   - PostgreSQL database (port 54322)
   - API server (port 54321)
   - Studio UI (port 54323)
   - Inbucket email testing (port 54324)

3. Update your `.env.local` to use local URLs:
   ```
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[local-anon-key-from-supabase-start-output]
   ```

4. Access the local Studio UI at: http://127.0.0.1:54323

### 6. Supabase Client Setup

To use Supabase in your Next.js application, you'll need to install the Supabase client:

```bash
npm install @supabase/supabase-js
```

Create a Supabase client utility file (example):

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 7. Using Supabase with Authentication

Supabase provides authentication out of the box. Configure auth providers in your [auth settings](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/auth/providers):

- Email/Password authentication is enabled by default
- You can enable additional providers (Google, GitHub, etc.)

### 8. Useful Supabase Dashboard Links

- **Table Editor**: [View and edit data](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/editor)
- **SQL Editor**: [Run SQL queries](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/sql/new)
- **Auth**: [Manage users](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/auth/users)
- **Storage**: [File storage](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/storage/buckets)
- **API Docs**: [Auto-generated API docs](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/api)
- **Logs**: [View logs](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/logs)

### 9. Migration Strategy from Firebase

If you're migrating from Firebase to Supabase:

1. Export your Firestore data
2. Transform the data to match the SQL schema
3. Import the data using SQL INSERT statements or the Supabase API
4. Update your application code to use Supabase client instead of Firebase

### 10. Best Practices

- **Never commit** your `.env.local` file to version control
- Use **environment variables** for all sensitive credentials
- Use **RLS policies** to secure your data at the database level
- Test your **policies thoroughly** before deploying to production
- Use **migrations** to track all schema changes
- **Backup** your database regularly (Supabase provides automatic backups)

## Support and Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com/)
- [Supabase GitHub](https://github.com/supabase/supabase)
- [Supabase Examples](https://github.com/supabase/supabase/tree/master/examples)

## Troubleshooting

### Common Issues

1. **Connection errors**: Check that your environment variables are correct
2. **Authentication errors**: Verify your anon key is correct
3. **RLS policy errors**: Check that your policies match your use case
4. **Migration errors**: Ensure migrations run in the correct order

### Getting Help

If you encounter issues:
1. Check the [Supabase logs](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/logs)
2. Review the [documentation](https://supabase.com/docs)
3. Search the [Supabase discussions](https://github.com/supabase/supabase/discussions)
4. Ask in the [Supabase Discord](https://discord.supabase.com/)
