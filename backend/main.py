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
    description="Python backend with AI integrations for Studio application",
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
