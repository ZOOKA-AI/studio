"""
Main FastAPI backend for Studio application with AI integrations
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Studio AI Backend",
    description="Python backend with AI integrations and Quran features for Studio application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ReportData(BaseModel):
    """Model for report data"""
    title: str
    content: str
    date: Optional[str] = None
    location: Optional[str] = None
    workers: Optional[List[str]] = None
    materials: Optional[List[dict]] = None

class SummaryResponse(BaseModel):
    """Model for summary response"""
    summary: str
    key_points: List[str]

class MaterialSuggestion(BaseModel):
    """Model for material suggestions"""
    item: str
    quantity: str
    reason: str

# Routes
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Studio AI Backend API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.post("/api/ai/summarize", response_model=SummaryResponse)
async def generate_summary(data: ReportData):
    """
    Generate AI summary for report data
    """
    try:
        # Import here to avoid loading if not needed
        from services.ai_service import generate_report_summary
        
        summary, key_points = await generate_report_summary(data.dict())
        
        return SummaryResponse(
            summary=summary,
            key_points=key_points
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating summary: {str(e)}")

@app.post("/api/ai/material-suggestions", response_model=List[MaterialSuggestion])
async def get_material_suggestions(data: ReportData):
    """
    Get AI-powered material suggestions based on report data
    """
    try:
        from services.ai_service import suggest_materials
        
        suggestions = await suggest_materials(data.dict())
        
        return [MaterialSuggestion(**s) for s in suggestions]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting material suggestions: {str(e)}")

@app.get("/api/ai/models")
async def list_available_models():
    """
    List available AI models
    """
    return {
        "models": [
            {
                "id": "gemini-pro",
                "name": "Google Gemini Pro",
                "description": "Advanced AI model for text generation and analysis"
            },
            {
                "id": "gemini-flash",
                "name": "Google Gemini Flash",
                "description": "Fast AI model for quick responses"
            }
        ]
    }

@app.get("/api/reports")
async def get_reports(limit: int = 10):
    """
    Get reports from database
    """
    try:
        from services.db_service import get_reports as fetch_reports
        reports = await fetch_reports(limit)
        return {"reports": reports}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching reports: {str(e)}")

@app.get("/api/workers")
async def get_workers():
    """
    Get workers from database
    """
    try:
        from services.db_service import get_workers as fetch_workers
        workers = await fetch_workers()
        return {"workers": workers}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching workers: {str(e)}")

@app.get("/api/tasks")
async def get_tasks(status: Optional[str] = None):
    """
    Get tasks from database
    """
    try:
        from services.db_service import get_tasks as fetch_tasks
        tasks = await fetch_tasks(status)
        return {"tasks": tasks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching tasks: {str(e)}")

# Quran API Endpoints
@app.get("/api/quran/surahs")
async def list_surahs():
    """
    Get list of all Quran Surahs
    """
    try:
        from services.quran_service import QuranService
        surahs = await QuranService.get_surah_list()
        return {"surahs": surahs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching surahs: {str(e)}")

@app.get("/api/quran/surah/{surah_number}")
async def get_surah(surah_number: int, edition: str = "ar.alafasy"):
    """
    Get a specific Surah from the Quran
    """
    try:
        if surah_number < 1 or surah_number > 114:
            raise HTTPException(status_code=400, detail="Surah number must be between 1 and 114")
        
        from services.quran_service import QuranService
        surah = await QuranService.get_surah(surah_number, edition)
        return {"surah": surah}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching surah: {str(e)}")

@app.get("/api/quran/ayah/{reference}")
async def get_ayah(reference: str, edition: str = "ar.alafasy"):
    """
    Get a specific Ayah from the Quran
    Example reference: "2:255" for Ayat Al-Kursi
    """
    try:
        from services.quran_service import QuranService
        ayah = await QuranService.get_ayah(reference, edition)
        return {"ayah": ayah}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching ayah: {str(e)}")

@app.get("/api/quran/search/{query}")
async def search_quran(query: str, edition: str = "ar.alafasy"):
    """
    Search for text in the Quran
    """
    try:
        from services.quran_service import QuranService
        results = await QuranService.search_quran(query, edition)
        return {"results": results, "count": len(results)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching Quran: {str(e)}")

@app.get("/api/quran/juz/{juz_number}")
async def get_juz(juz_number: int, edition: str = "ar.alafasy"):
    """
    Get a specific Juz (part) from the Quran
    """
    try:
        if juz_number < 1 or juz_number > 30:
            raise HTTPException(status_code=400, detail="Juz number must be between 1 and 30")
        
        from services.quran_service import QuranService
        juz = await QuranService.get_juz(juz_number, edition)
        return {"juz": juz}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching juz: {str(e)}")

# Azkar API Endpoints
@app.get("/api/azkar/categories")
async def get_azkar_categories():
    """
    Get all available Azkar categories
    """
    try:
        from services.quran_service import AzkarService
        categories = await AzkarService.get_all_categories()
        return {"categories": categories}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching categories: {str(e)}")

@app.get("/api/azkar/{category}")
async def get_azkar(category: str):
    """
    Get Azkar for a specific category (morning, evening, after_prayer)
    """
    try:
        from services.quran_service import AzkarService
        azkar = await AzkarService.get_azkar(category)
        if not azkar:
            raise HTTPException(status_code=404, detail=f"Category '{category}' not found")
        return {"category": category, "azkar": azkar}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching azkar: {str(e)}")

# Prayer Times API Endpoints
@app.get("/api/prayer-times/{city}/{country}")
async def get_prayer_times(city: str, country: str, date: Optional[str] = None):
    """
    Get prayer times for a specific location
    Date format: DD-MM-YYYY (optional, defaults to today)
    """
    try:
        from services.quran_service import PrayerTimesService
        times = await PrayerTimesService.get_prayer_times(city, country, date)
        return {"city": city, "country": country, "times": times}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching prayer times: {str(e)}")

@app.get("/api/qibla/{latitude}/{longitude}")
async def get_qibla_direction(latitude: float, longitude: float):
    """
    Get Qibla direction for given coordinates
    """
    try:
        from services.quran_service import PrayerTimesService
        qibla = await PrayerTimesService.get_qibla_direction(latitude, longitude)
        return {"latitude": latitude, "longitude": longitude, "qibla": qibla}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching qibla direction: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
