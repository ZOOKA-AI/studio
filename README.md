# Firebase Studio

---

### ✨ دعم تطوير أدوات الذكاء الاصطناعي للجميع ✨

مشروع `studio` هو أداة مجانية ومفتوحة المصدر تهدف إلى تسهيل الوصول لتقنيات الذكاء الاصطناعي وتطويرها. دعمكم عبر GitHub Sponsors سيساعدنا على إضافة ميزات جديدة، صيانة المشروع، وتوفير المزيد من الأدوات المبتكرة للمجتمع العربي.

**[ادعم المشروع على GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)**

---

This is a NextJS starter in Firebase Studio with Supabase integration.

## Getting Started

To get started, take a look at src/app/page.tsx.

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