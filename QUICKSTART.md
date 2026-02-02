# Quick Start Guide - Studio with Quran Features

This guide will help you get started with the Studio application featuring Quran and Islamic content.

## Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- (Optional) Google AI API key for AI features

## Quick Start

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 2. Configure Environment Variables

```bash
# Backend configuration (optional for basic Quran features)
cp backend/.env.example backend/.env
# Edit backend/.env if you want AI features (add GOOGLE_API_KEY)
```

### 3. Start the Application

**Option A: Start everything together (recommended)**
```bash
./start.sh
```

**Option B: Start separately**

Terminal 1 (Backend):
```bash
cd backend
source venv/bin/activate
python main.py
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:9002
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Quran Page**: http://localhost:9002/quran

## Features Overview

### Quran Features (No API key required)

1. **Read Quran** - Access all 114 Surahs
2. **Search** - Search for verses in Arabic
3. **Azkar** - Morning, evening, and after-prayer remembrances
4. **Prayer Times** - Get times for any location
5. **Qibla** - Find direction to Mecca

### AI Features (Requires GOOGLE_API_KEY)

1. **Report Summarization** - AI-powered summaries
2. **Material Suggestions** - Smart recommendations
3. **Text Analysis** - Sentiment and entity extraction

## Testing

### Test Backend

```bash
cd backend
source venv/bin/activate

# Test Quran services
python test_quran.py

# Test AI services (requires GOOGLE_API_KEY)
python test_ai.py

# View examples
python examples.py
```

### Test Frontend

```bash
# Type checking
npm run typecheck

# Linting
npm run lint
```

## API Examples

### Get Surah Al-Fatiha
```bash
curl http://localhost:8000/api/quran/surah/1
```

### Search Quran
```bash
curl http://localhost:8000/api/quran/search/الله
```

### Get Morning Azkar
```bash
curl http://localhost:8000/api/azkar/morning
```

### Get Prayer Times
```bash
curl http://localhost:8000/api/prayer-times/Dubai/UAE
```

## Project Structure

```
studio/
├── src/                     # Next.js frontend
│   └── app/
│       ├── quran/          # Quran page
│       └── ...             # Other pages
├── backend/                 # Python backend
│   ├── main.py             # FastAPI app
│   ├── services/           # Service modules
│   │   ├── ai_service.py
│   │   ├── quran_service.py
│   │   └── db_service.py
│   ├── test_*.py           # Test scripts
│   └── examples.py         # Usage examples
├── docs/                    # Documentation
│   └── quran-features.md
└── start.sh                # Startup script
```

## Common Tasks

### Add Your API Key

Edit `backend/.env`:
```env
GOOGLE_API_KEY=your_actual_api_key_here
```

### Change Default Location for Prayer Times

Edit `src/app/quran/page.tsx`, line ~118:
```typescript
const response = await fetch(`${BACKEND_URL}/api/prayer-times/YourCity/YourCountry`);
```

### Run Backend Only

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Run Frontend Only

```bash
npm run dev
```

## Troubleshooting

### Backend won't start
- Check Python version: `python3 --version` (needs 3.9+)
- Activate venv: `source backend/venv/bin/activate`
- Install dependencies: `pip install -r backend/requirements.txt`

### Frontend won't start
- Check Node version: `node --version` (needs 18+)
- Install dependencies: `npm install`
- Clear cache: `rm -rf .next node_modules && npm install`

### API calls fail
- Ensure backend is running: http://localhost:8000/health
- Check network/firewall settings
- For AI features, verify GOOGLE_API_KEY is set

### Quran data not loading
- Check internet connection (uses external API)
- Try the Azkar tab (works offline)
- Check browser console for errors

## Next Steps

1. Explore the Quran page at `/quran`
2. Try the API documentation at http://localhost:8000/docs
3. Read the full documentation in `docs/quran-features.md`
4. Customize the application for your needs
5. Deploy to production (see deployment guide)

## Support

For issues or questions:
- Check documentation in `docs/`
- Review example code in `backend/examples.py`
- Open an issue on GitHub

## License

MIT License - See LICENSE file for details
