# Quran & Islamic Features Documentation

This document describes the Quran and Islamic features integrated into the Studio application.

## Overview

The application now includes comprehensive Islamic content features powered by a Python backend with FastAPI. These features include:

1. **Quran Reading**: Browse and read all 114 Surahs of the Holy Quran
2. **Quran Search**: Search for specific verses or words in the Quran
3. **Azkar (Remembrances)**: Access daily Islamic remembrances
4. **Prayer Times**: View prayer times for any location
5. **Qibla Direction**: Find the direction of Qibla from any coordinates

## Features

### Quran Reader

Access the complete Quran with:
- All 114 Surahs with Arabic text
- Surah metadata (name, number of verses, revelation type)
- Easy navigation between Surahs
- Verse-by-verse display with proper formatting

**Frontend Route**: `/quran`

**API Endpoints**:
- `GET /api/quran/surahs` - List all Surahs
- `GET /api/quran/surah/{number}` - Get a specific Surah
- `GET /api/quran/ayah/{reference}` - Get a specific verse (e.g., "2:255")
- `GET /api/quran/juz/{number}` - Get a specific Juz

### Quran Search

Search capabilities include:
- Search by Arabic text
- Find specific verses
- Results show Surah name and verse number
- Context-aware search results

**API Endpoint**: `GET /api/quran/search/{query}`

### Azkar (Islamic Remembrances)

Pre-loaded Azkar collections:
- **Morning Azkar** (أذكار الصباح)
- **Evening Azkar** (أذكار المساء)
- **After Prayer Azkar** (أذكار بعد الصلاة)

Each Zikr includes:
- Arabic text
- Transliteration
- English translation
- Recommended count

**API Endpoints**:
- `GET /api/azkar/categories` - List all categories
- `GET /api/azkar/{category}` - Get Azkar for a specific category

### Prayer Times

Get accurate prayer times for any location:
- Fajr (Dawn)
- Dhuhr (Noon)
- Asr (Afternoon)
- Maghrib (Sunset)
- Isha (Night)

**API Endpoint**: `GET /api/prayer-times/{city}/{country}`

Optional date parameter: `?date=DD-MM-YYYY`

### Qibla Direction

Find the direction to face during prayer:
- Uses latitude and longitude coordinates
- Returns precise degree direction
- Works globally

**API Endpoint**: `GET /api/qibla/{latitude}/{longitude}`

## Technical Implementation

### Backend Architecture

The Python backend uses:
- **FastAPI**: Modern, fast web framework
- **httpx**: Async HTTP client for API calls
- **Al-Quran Cloud API**: External Quran data source
- **Aladhan API**: Prayer times and Qibla direction

**Key Files**:
- `backend/services/quran_service.py` - Quran, Azkar, and Prayer services
- `backend/main.py` - API route definitions
- `backend/test_quran.py` - Test suite

### Frontend Integration

The Next.js frontend includes:
- React components with TypeScript
- Tailwind CSS for styling
- Radix UI components
- Real-time API integration

**Key Files**:
- `src/app/quran/page.tsx` - Main Quran interface

### Data Sources

1. **Al-Quran Cloud API** (`api.alquran.cloud`)
   - Complete Quran text in multiple languages
   - Search capabilities
   - Multiple editions/translations

2. **Aladhan API** (`api.aladhan.com`)
   - Prayer times calculation
   - Qibla direction
   - Multiple calculation methods

3. **Local Data**
   - Azkar stored locally for offline access
   - Common remembrances pre-loaded

## Usage Examples

### Get a Surah

```bash
curl http://localhost:8000/api/quran/surah/1
```

### Search the Quran

```bash
curl http://localhost:8000/api/quran/search/الله
```

### Get Prayer Times

```bash
curl http://localhost:8000/api/prayer-times/Dubai/UAE
```

### Get Azkar

```bash
curl http://localhost:8000/api/azkar/morning
```

## Frontend Usage

Visit `/quran` in your browser to access:
1. **Quran Tab**: Browse and read Surahs
2. **Search Tab**: Search for verses
3. **Azkar Tab**: View Islamic remembrances
4. **Prayer Times Tab**: Check prayer times

## Configuration

### Environment Variables

Add to `backend/.env`:

```env
# No API key required for basic Quran features
# External APIs used are free and public

# Optional: Custom API endpoints
QURAN_API_URL=https://api.alquran.cloud/v1
PRAYER_API_URL=http://api.aladhan.com/v1
```

### Frontend Configuration

Add to `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## Offline Support

The following features work offline:
- ✅ Azkar (stored locally)

The following require internet:
- ❌ Quran reading (fetched from API)
- ❌ Quran search
- ❌ Prayer times
- ❌ Qibla direction

For offline Quran support, consider implementing local caching or using a local Quran database.

## Future Enhancements

Potential improvements:
1. Offline Quran database
2. Audio recitation integration
3. Multiple translations support
4. Tafsir (commentary) integration
5. Bookmark and notes functionality
6. Personalized prayer time notifications
7. Hijri calendar integration
8. Islamic event reminders

## API Rate Limits

The external APIs used are free but may have rate limits:
- Al-Quran Cloud: Generally unlimited for reasonable use
- Aladhan API: Rate limits apply, use caching for production

Implement caching strategies to minimize API calls:
- Cache Surah data locally
- Cache prayer times (valid for 24 hours)
- Cache Qibla direction (valid indefinitely for a location)

## Testing

Run the test suite:

```bash
cd backend
source venv/bin/activate
python test_quran.py
```

This will test:
- Surah retrieval
- Verse retrieval
- Search functionality
- Azkar access
- Prayer times
- Qibla direction

## Support

For issues or questions related to Islamic features:
1. Check API documentation
2. Review error logs
3. Ensure internet connectivity for external API calls
4. Verify API endpoints are accessible

## References

- [Al-Quran Cloud API Documentation](https://alquran.cloud/api)
- [Aladhan API Documentation](https://aladhan.com/prayer-times-api)
- [Islamic Calendar API](https://aladhan.com/islamic-calendar-api)
