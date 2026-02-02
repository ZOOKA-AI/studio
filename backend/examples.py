#!/usr/bin/env python3
"""
Example usage of Studio Backend API
Demonstrates all major features including AI, Quran, and Islamic content
"""
import asyncio
import httpx


BASE_URL = "http://localhost:8000"


async def example_health_check():
    """Example: Check if backend is running"""
    print("\n" + "="*60)
    print("1. Health Check")
    print("="*60)
    
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/health")
        print(f"Status: {response.json()}")


async def example_quran_surahs():
    """Example: Get list of Quran Surahs"""
    print("\n" + "="*60)
    print("2. List Quran Surahs")
    print("="*60)
    
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/api/quran/surahs")
        data = response.json()
        
        surahs = data.get('surahs', [])
        print(f"\nTotal Surahs: {len(surahs)}")
        print("\nFirst 3 Surahs:")
        for surah in surahs[:3]:
            print(f"  {surah['number']}. {surah['name']} ({surah['englishName']})")
            print(f"     Verses: {surah['numberOfAyahs']}, Type: {surah['revelationType']}")


async def example_read_surah():
    """Example: Read a specific Surah"""
    print("\n" + "="*60)
    print("3. Read Surah Al-Fatiha (Chapter 1)")
    print("="*60)
    
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/api/quran/surah/1")
        data = response.json()
        
        surah = data.get('surah', {})
        print(f"\nSurah: {surah.get('name')} ({surah.get('englishName')})")
        print(f"Verses: {surah.get('numberOfAyahs')}")
        
        if surah.get('ayahs'):
            print("\nFirst verse:")
            print(f"  {surah['ayahs'][0].get('text')}")


async def example_search_quran():
    """Example: Search in the Quran"""
    print("\n" + "="*60)
    print("4. Search Quran for 'الرحمن' (Ar-Rahman)")
    print("="*60)
    
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/api/quran/search/الرحمن")
        data = response.json()
        
        results = data.get('results', [])
        count = data.get('count', 0)
        
        print(f"\nFound {count} results")
        print("\nFirst result:")
        if results:
            result = results[0]
            print(f"  {result.get('surah', {}).get('name')} - Verse {result.get('numberInSurah')}")
            print(f"  {result.get('text')[:100]}...")


async def example_azkar():
    """Example: Get Azkar (Islamic remembrances)"""
    print("\n" + "="*60)
    print("5. Get Morning Azkar")
    print("="*60)
    
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/api/azkar/morning")
        data = response.json()
        
        azkar = data.get('azkar', [])
        print(f"\nTotal Azkar: {len(azkar)}")
        print("\nFirst Zikr:")
        if azkar:
            zikr = azkar[0]
            print(f"  Arabic: {zikr['arabic']}")
            print(f"  Transliteration: {zikr['transliteration']}")
            print(f"  Translation: {zikr['translation']}")
            print(f"  Count: {zikr['count']}")


async def example_prayer_times():
    """Example: Get prayer times"""
    print("\n" + "="*60)
    print("6. Get Prayer Times for Dubai, UAE")
    print("="*60)
    
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/api/prayer-times/Dubai/UAE")
        data = response.json()
        
        times = data.get('times', {}).get('timings', {})
        print("\nPrayer Times:")
        for prayer in ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']:
            if prayer in times:
                print(f"  {prayer}: {times[prayer]}")


async def example_qibla():
    """Example: Get Qibla direction"""
    print("\n" + "="*60)
    print("7. Get Qibla Direction (Dubai coordinates)")
    print("="*60)
    
    async with httpx.AsyncClient() as client:
        # Dubai coordinates: 25.2048°N, 55.2708°E
        response = await client.get(f"{BASE_URL}/api/qibla/25.2048/55.2708")
        data = response.json()
        
        qibla = data.get('qibla', {})
        print(f"\nQibla Direction: {qibla.get('direction')}°")


async def example_ai_models():
    """Example: List available AI models"""
    print("\n" + "="*60)
    print("8. List Available AI Models")
    print("="*60)
    
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/api/ai/models")
        data = response.json()
        
        models = data.get('models', [])
        print("\nAvailable Models:")
        for model in models:
            print(f"  - {model['name']}: {model['description']}")


async def example_ai_summary():
    """Example: Generate AI summary for a report"""
    print("\n" + "="*60)
    print("9. Generate AI Report Summary")
    print("="*60)
    
    report_data = {
        "title": "تقرير تنظيف يومي",
        "content": "تم تنظيف المبنى بالكامل. العمل تم بجودة عالية وتم إزالة جميع القمامة.",
        "date": "2026-02-02",
        "location": "المبنى أ",
        "workers": ["أحمد", "محمد"]
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{BASE_URL}/api/ai/summarize",
            json=report_data,
            timeout=30.0
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"\nSummary: {data.get('summary')}")
            print("\nKey Points:")
            for point in data.get('key_points', []):
                print(f"  - {point}")
        else:
            print(f"\nNote: AI summarization requires GOOGLE_API_KEY in backend/.env")


async def main():
    """Run all examples"""
    print("\n" + "="*60)
    print("Studio Backend API - Usage Examples")
    print("="*60)
    print("\nMake sure the backend is running:")
    print("  cd backend && python main.py")
    print("\nOr:")
    print("  cd backend && uvicorn main:app --reload")
    
    try:
        await example_health_check()
        
        print("\n\n" + "="*60)
        print("Quran & Islamic Features Examples")
        print("="*60)
        
        await example_quran_surahs()
        await example_read_surah()
        await example_search_quran()
        await example_azkar()
        await example_prayer_times()
        await example_qibla()
        
        print("\n\n" + "="*60)
        print("AI Features Examples")
        print("="*60)
        
        await example_ai_models()
        await example_ai_summary()
        
        print("\n\n" + "="*60)
        print("✅ All examples completed!")
        print("="*60)
        print("\nNote: Some examples may fail if:")
        print("  - Backend is not running")
        print("  - No internet connection (for external APIs)")
        print("  - GOOGLE_API_KEY not set (for AI features)")
        print("\n")
        
    except httpx.ConnectError:
        print("\n❌ Error: Cannot connect to backend")
        print("Make sure the backend is running on http://localhost:8000")
        print("\nStart the backend with:")
        print("  cd backend && python main.py")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    asyncio.run(main())
