#!/usr/bin/env python3
"""
Test script for Quran API services
"""
import asyncio
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.dirname(__file__))

from services.quran_service import QuranService, AzkarService, PrayerTimesService


async def test_surah_list():
    """Test getting list of surahs"""
    print("\n" + "="*50)
    print("Testing Surah List")
    print("="*50)
    
    surahs = await QuranService.get_surah_list()
    
    if surahs:
        print(f"\nTotal Surahs: {len(surahs)}")
        print("\nFirst 5 Surahs:")
        for surah in surahs[:5]:
            print(f"  {surah.get('number')}. {surah.get('name')} ({surah.get('englishName')})")
            print(f"     {surah.get('numberOfAyahs')} آيات - {surah.get('revelationType')}")
    else:
        print("❌ No surahs retrieved")


async def test_specific_surah():
    """Test getting a specific surah"""
    print("\n" + "="*50)
    print("Testing Specific Surah (Al-Fatiha)")
    print("="*50)
    
    surah = await QuranService.get_surah(1)
    
    if surah:
        print(f"\nSurah: {surah.get('name')} ({surah.get('englishName')})")
        print(f"Number: {surah.get('number')}")
        print(f"Ayahs: {surah.get('numberOfAyahs')}")
        
        if surah.get('ayahs'):
            print(f"\nFirst Ayah:")
            print(f"  {surah['ayahs'][0].get('text')}")
    else:
        print("❌ Surah not retrieved")


async def test_ayah():
    """Test getting a specific ayah"""
    print("\n" + "="*50)
    print("Testing Specific Ayah (Ayat Al-Kursi - 2:255)")
    print("="*50)
    
    ayah = await QuranService.get_ayah("2:255")
    
    if ayah:
        print(f"\nSurah: {ayah.get('surah', {}).get('name')}")
        print(f"Ayah Number: {ayah.get('numberInSurah')}")
        print(f"\nText:")
        print(f"  {ayah.get('text')}")
    else:
        print("❌ Ayah not retrieved")


async def test_search():
    """Test searching the Quran"""
    print("\n" + "="*50)
    print("Testing Quran Search (الرحمن)")
    print("="*50)
    
    results = await QuranService.search_quran("الرحمن")
    
    if results:
        print(f"\nFound {len(results)} results")
        print("\nFirst 3 results:")
        for i, result in enumerate(results[:3], 1):
            print(f"\n{i}. {result.get('surah', {}).get('name')} - آية {result.get('numberInSurah')}")
            print(f"   {result.get('text')[:100]}...")
    else:
        print("❌ No results found")


async def test_azkar():
    """Test getting azkar"""
    print("\n" + "="*50)
    print("Testing Azkar (Morning)")
    print("="*50)
    
    azkar = await AzkarService.get_azkar("morning")
    
    if azkar:
        print(f"\nTotal Azkar: {len(azkar)}")
        print("\nFirst 2 Azkar:")
        for i, zikr in enumerate(azkar[:2], 1):
            print(f"\n{i}. {zikr.get('arabic')}")
            print(f"   {zikr.get('transliteration')}")
            print(f"   Translation: {zikr.get('translation')}")
            print(f"   Count: {zikr.get('count')}")
    else:
        print("❌ No azkar retrieved")


async def test_prayer_times():
    """Test getting prayer times"""
    print("\n" + "="*50)
    print("Testing Prayer Times (Dubai, UAE)")
    print("="*50)
    
    times = await PrayerTimesService.get_prayer_times("Dubai", "UAE")
    
    if times and times.get('timings'):
        print("\nPrayer Times:")
        for prayer, time in times['timings'].items():
            if prayer in ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']:
                print(f"  {prayer}: {time}")
    else:
        print("❌ Prayer times not retrieved")


async def test_qibla():
    """Test getting qibla direction"""
    print("\n" + "="*50)
    print("Testing Qibla Direction (Dubai coordinates)")
    print("="*50)
    
    # Dubai coordinates
    qibla = await PrayerTimesService.get_qibla_direction(25.2048, 55.2708)
    
    if qibla:
        print(f"\nQibla Direction: {qibla.get('direction')}°")
        print(f"Latitude: {qibla.get('latitude')}")
        print(f"Longitude: {qibla.get('longitude')}")
    else:
        print("❌ Qibla direction not retrieved")


async def main():
    """Run all tests"""
    print("\n🧪 Running Quran API Service Tests...")
    print("Note: These tests require internet connection")
    
    try:
        await test_surah_list()
        await test_specific_surah()
        await test_ayah()
        await test_search()
        await test_azkar()
        await test_prayer_times()
        await test_qibla()
        
        print("\n" + "="*50)
        print("✅ All tests completed!")
        print("="*50 + "\n")
        
    except Exception as e:
        print(f"\n❌ Error during testing: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
