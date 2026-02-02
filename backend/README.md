# Python Backend - Studio AI

This directory contains the Python backend for the Studio application, providing AI-powered services and integrations.

## Features

- **AI Integration**: Google Gemini AI for text generation and analysis
- **Report Summarization**: Automatic summarization of daily reports
- **Material Suggestions**: AI-powered material recommendations
- **Text Analysis**: Sentiment analysis and entity extraction
- **RESTful API**: FastAPI-based REST API

## Setup

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and add your API keys
   ```

### Running the Server

Start the development server:

```bash
python main.py
```

Or using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Health Check
- `GET /health` - Health check endpoint

### AI Services
- `POST /api/ai/summarize` - Generate summary for report data
- `POST /api/ai/material-suggestions` - Get material suggestions
- `GET /api/ai/models` - List available AI models

### Quran Services
- `GET /api/quran/surahs` - Get list of all Quran Surahs
- `GET /api/quran/surah/{surah_number}` - Get a specific Surah (1-114)
- `GET /api/quran/ayah/{reference}` - Get a specific Ayah (e.g., "2:255")
- `GET /api/quran/search/{query}` - Search for text in the Quran
- `GET /api/quran/juz/{juz_number}` - Get a specific Juz (1-30)

### Azkar (Islamic Remembrances)
- `GET /api/azkar/categories` - Get all available Azkar categories
- `GET /api/azkar/{category}` - Get Azkar for a category (morning, evening, after_prayer)

### Prayer Times
- `GET /api/prayer-times/{city}/{country}` - Get prayer times for a location
- `GET /api/qibla/{latitude}/{longitude}` - Get Qibla direction for coordinates

## Project Structure

```
backend/
├── main.py              # Main FastAPI application
├── services/            # Service modules
│   ├── __init__.py
│   └── ai_service.py    # AI integration service
├── requirements.txt     # Python dependencies
├── .env.example        # Environment variables template
└── README.md           # This file
```

## Integration with Next.js Frontend

The Python backend runs on port 8000 while the Next.js frontend runs on port 9002. You can make API calls from the frontend to the backend:

```typescript
const response = await fetch('http://localhost:8000/api/ai/summarize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(reportData)
});
```

## Development

### Testing

Run tests:
```bash
pytest
```

### Code Style

The code follows PEP 8 style guidelines. Use black for formatting:
```bash
pip install black
black .
```

## License

Same as the main Studio project.
