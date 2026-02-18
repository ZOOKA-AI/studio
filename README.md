# 🚀 ZOOKA-AI Studio

> Autonomous Marketing System with AI-Powered Content Generation

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

### ✨ دعم تطوير أدوات الذكاء الاصطناعي للجميع ✨

مشروع `ZOOKA-AI Studio` هو أداة مجانية ومفتوحة المصدر تهدف إلى تسهيل الوصول لتقنيات الذكاء الاصطناعي وتطويرها. دعمكم عبر GitHub Sponsors سيساعدنا على إضافة ميزات جديدة، صيانة المشروع، وتوفير المزيد من الأدوات المبتكرة للمجتمع العربي.

**[ادعم المشروع على GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)**

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Database Setup](#-database-setup)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features
- **AI-Powered Content Generation**: Generate marketing content using Claude 3.5 Sonnet
- **Bilingual Support**: Automatic content generation in English and Arabic
- **Multi-Platform Publishing**: Support for Instagram, Facebook, LinkedIn, Twitter, TikTok, WhatsApp
- **Smart Hashtag Generation**: AI-generated hashtags categorized by type (primary, location, trending, Arabic)
- **Campaign Management**: Full CRUD operations for marketing campaigns
- **Analytics Dashboard**: Track campaign performance and engagement metrics
- **Real-time Pricing Display**: Dynamic pricing for different service tiers

### 🌍 UAE-Specific Features
- **7 Emirates Support**: Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, UAQ
- **7 Cleaning Services**: Studio, Apartment, Villa, Office, Deep Cleaning, Move-in/out, Sofa Cleaning
- **Localized Content**: Culturally appropriate content for UAE market
- **RTL Support**: Full right-to-left layout support for Arabic content

### 🔒 Security & Performance
- **Row Level Security (RLS)**: Supabase RLS policies for data protection
- **Type Safety**: Full TypeScript implementation with strict mode
- **Input Validation**: Zod schemas for all user inputs
- **Health Monitoring**: Built-in health check endpoint
- **Error Tracking**: Comprehensive error handling and logging

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Analytics**: PostHog (optional)

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI Services**: 
  - Anthropic Claude 3.5 Sonnet
  - Google Genkit (optional)
- **Deployment**: Vercel

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript Compiler

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or later
- npm or yarn
- Supabase account
- Anthropic API key

### Installation

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
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your actual values (see [Environment Setup](#-environment-setup))

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

---

## 🔐 Environment Setup

Create a `.env.local` file with the following variables:

### Required Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# AI Services
ANTHROPIC_API_KEY=sk-ant-api03-...

# Security
AUTONOMOUS_PUBLISHER_API_KEY=your-secure-key-here
```

### Optional Variables
```env
# Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Configuration
NEXT_PUBLIC_APP_URL=http://localhost:9002
NODE_ENV=development
TZ=Asia/Dubai
```

See `.env.example` for complete list of environment variables.

---

## 🗄 Database Setup

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Create a new project
- Note your project URL and API keys

### 2. Run Migrations
Execute the SQL migration script in Supabase SQL Editor:

```bash
# Copy the contents of docs/supabase-migration.sql
# Paste into Supabase SQL Editor
# Run the script
```

The migration creates:
- ✅ `marketing_campaigns` table
- ✅ `autonomous_publications` table
- ✅ `platform_performance` table
- ✅ `hashtag_performance` table
- ✅ `platform_tokens` table
- ✅ RLS policies for all tables
- ✅ Indexes for performance
- ✅ Analytics functions

### 3. Verify Setup
Check that all tables are created:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

---

## 🚢 Deployment

### Deploy to Vercel

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `studio` project

2. **Configure Environment Variables**
   - Add all required environment variables from `.env.example`
   - Set `NODE_ENV=production`
   - Set `TZ=Asia/Dubai`

3. **Configure Build Settings**
   - Framework: Next.js
   - Node Version: 24.0.0
   - Build Command: `next build`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Verify deployment at your Vercel URL

### Post-Deployment Checklist
See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment checklist.

---

## 📚 API Documentation

### Health Check
```http
GET /api/health
```

**Response**:
```json
{
  "timestamp": "2026-02-18T09:57:54.463Z",
  "status": "healthy",
  "services": {
    "supabase": "configured",
    "anthropic": "configured",
    "openai": "configured"
  }
}
```

### Marketing Actions
Server actions for campaign management:

#### Create Campaign
```typescript
import { createCampaignAction } from '@/app/actions/marketing'

const formData = new FormData()
formData.append('serviceType', 'apartment_cleaning')
formData.append('emirate', 'dubai')
formData.append('tone', 'professional')
formData.append('discountPercent', '0')

const result = await createCampaignAction(formData)
```

**Response**:
```json
{
  "success": true,
  "data": {
    "campaignId": "uuid",
    "content": {
      "en": "English caption...",
      "ar": "Arabic caption..."
    },
    "hashtags": {
      "primary": ["#CleaningDubai"],
      "location": ["#Dubai"],
      "trending": ["#CleanHome"],
      "arabic": ["#تنظيف_دبي"]
    },
    "estimatedReach": 5000
  }
}
```

---

## 📁 Project Structure

```
studio/
├── src/
│   ├── app/
│   │   ├── actions/           # Server actions
│   │   │   └── marketing.ts   # Campaign management
│   │   ├── api/               # API routes
│   │   │   └── health/        # Health check endpoint
│   │   ├── dashboard/         # Dashboard pages
│   │   │   └── marketing/     # Marketing dashboard
│   │   ├── providers.tsx      # App providers (PostHog)
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   └── ui/                # UI components (Radix)
│   ├── lib/                   # Utility libraries
│   │   ├── data.ts            # Static data
│   │   ├── types.ts           # Type definitions
│   │   └── utils.ts           # Helper functions
│   └── middleware.ts          # Auth middleware
├── docs/
│   ├── supabase-migration.sql # Database schema
│   └── blueprint.md           # Project blueprint
├── .env.example               # Environment template
├── DEPLOYMENT.md              # Deployment guide
├── MAINTENANCE.md             # Maintenance guide
├── vercel.json                # Vercel configuration
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use existing UI components from `components/ui`
- Add proper error handling
- Include loading states
- Write meaningful commit messages
- Update documentation as needed

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Support

If you find this project helpful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 💰 [Sponsoring on GitHub](https://github.com/sponsors/ZOOKA-AI)

---

## 📞 Contact

- **Website**: [zooka-ai.com](https://www.zooka-ai.com/)
- **GitHub**: [@ZOOKA-AI](https://github.com/ZOOKA-AI)
- **Email**: helmyharoon8@gmail.com

---

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Deployment Guide](DEPLOYMENT.md)
- [Maintenance Guide](MAINTENANCE.md)

---

**Built with ❤️ by the ZOOKA-AI Team**