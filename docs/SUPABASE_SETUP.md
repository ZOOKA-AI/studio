# Supabase Configuration Guide

## Project Information

- **Project ID**: `bylfizytgayoefuyliix`
- **Dashboard URL**: [https://supabase.com/dashboard/project/bylfizytgayoefuyliix](https://supabase.com/dashboard/project/bylfizytgayoefuyliix)
- **SQL Editor**: [https://supabase.com/dashboard/project/bylfizytgayoefuyliix/sql/new](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/sql/new)

## Directory Structure

```
supabase/
├── config.toml                              # Supabase project configuration
└── migrations/                              # Database migration files
    ├── 20260204000000_initial_schema.sql    # Initial schema based on backend.json
    └── 20260204000001_rls_policies.sql      # Row Level Security policies
```

## Setup Instructions

### 1. Environment Variables

Copy the `.env.example` file to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for server-side operations)

You can find these values in the [Supabase Dashboard](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/settings/api).

### 2. Install Supabase CLI (Optional)

For local development and migrations, install the Supabase CLI:

```bash
npm install -g supabase
# or
brew install supabase/tap/supabase
```

### 3. Link to Your Project

Link your local project to the Supabase project:

```bash
supabase link --project-ref bylfizytgayoefuyliix
```

### 4. Run Migrations

You have two options to set up the database schema:

#### Option A: Using Supabase CLI (Recommended)

```bash
supabase db push
```

#### Option B: Using SQL Editor

1. Go to the [SQL Editor](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/sql/new)
2. Copy and paste the contents of each migration file in order:
   - First: `supabase/migrations/20260204000000_initial_schema.sql`
   - Second: `supabase/migrations/20260204000001_rls_policies.sql`
3. Execute each script

### 5. Verify Setup

After running migrations, verify that all tables are created:

1. Navigate to [Table Editor](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/editor)
2. Check that the following tables exist:
   - users
   - clients
   - sites
   - tasks
   - materials
   - equipment
   - schedules
   - daily_reports
   - worker_tasks
   - audit_logs
   - roles_admin

## Schema Overview

The database schema is based on the entities defined in `docs/backend.json`:

### Core Tables

- **users**: User profiles with roles (admin, supervisor, worker)
- **clients**: Client information
- **sites**: Cleaning sites linked to clients
- **tasks**: Available cleaning tasks
- **materials**: Cleaning materials
- **equipment**: Equipment inventory with condition tracking

### Operational Tables

- **schedules**: Scheduled visits to sites
- **daily_reports**: Daily cleaning reports created by supervisors
- **worker_tasks**: Tasks assigned to workers within daily reports
- **audit_logs**: Audit trail for all modifications

### Security

- **roles_admin**: Admin role management table
- **Row Level Security (RLS)**: Enabled on all tables with appropriate policies

## Row Level Security Policies

The database uses Row Level Security to ensure:

1. **Users** can only view/edit their own profiles (admins can view all)
2. **Supervisors** can manage clients, sites, and equipment
3. **Daily Reports** are only visible to involved supervisors, workers, and admins
4. **Schedules** are only visible to assigned users
5. **Audit Logs** are only accessible to admins

## Local Development

To run Supabase locally:

```bash
supabase start
```

This will start:
- PostgreSQL database on `localhost:54322`
- Supabase Studio on `http://localhost:54323`
- API on `http://localhost:54321`

Update your `.env.local` to use local URLs:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local-anon-key>
```

## Integration with Next.js

To integrate Supabase with your Next.js application, you'll need to:

1. Install the Supabase client library:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Create a Supabase client utility (e.g., `src/lib/supabase.ts`):
   ```typescript
   import { createClient } from '@supabase/supabase-js'
   
   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   
   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

3. Use the client in your components and API routes

## Useful Links

- [Supabase Dashboard](https://supabase.com/dashboard/project/bylfizytgayoefuyliix)
- [SQL Editor](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/sql/new)
- [Table Editor](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/editor)
- [API Documentation](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/api)
- [Authentication Settings](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/auth/users)
- [Supabase Documentation](https://supabase.com/docs)

## Troubleshooting

### Migration Issues

If migrations fail:
1. Check the [database logs](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/logs/postgres-logs)
2. Verify you have the correct permissions
3. Try running migrations manually in the SQL Editor

### Connection Issues

If you can't connect:
1. Verify your environment variables are correct
2. Check that your IP is allowed in [database settings](https://supabase.com/dashboard/project/bylfizytgayoefuyliix/settings/database)
3. Ensure you're using the correct project URL and keys

## Support

For Supabase-specific issues, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com/)
- [GitHub Issues](https://github.com/supabase/supabase/issues)
