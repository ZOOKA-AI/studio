"""
Quran API Service - Integration with Quran data and Islamic content
"""
import httpx
from typing import List, Dict, Optional
from datetime import datetime
import json


class QuranService:
    """Service for Quran-related operations"""
    
    # Using Al-Quran Cloud API as a reference
    BASE_URL = "https://api.alquran.cloud/v1"
    
    @staticmethod
    async def get_surah(surah_number: int, edition: str = "ar.alafasy") -> Dict:
        """
        Get a complete Surah (chapter) from the Quran
        
        Args:
            surah_number: Surah number (1-114)
            edition: Edition identifier (default: ar.alafasy for Arabic)
            
        Returns:
            Dictionary containing surah data
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{QuranService.BASE_URL}/surah/{surah_number}/{edition}")
                if response.status_code == 200:
                    data = response.json()
                    return data.get('data', {})
                return {}
        except Exception as e:
            print(f"Error fetching surah: {e}")
            return {}
    
    @staticmethod
    async def get_ayah(reference: str, edition: str = "ar.alafasy") -> Dict:
        """
        Get a specific Ayah (verse) from the Quran
        
        Args:
            reference: Ayah reference (e.g., "2:255" for Ayat Al-Kursi)
            edition: Edition identifier
            
        Returns:
            Dictionary containing ayah data
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{QuranService.BASE_URL}/ayah/{reference}/{edition}")
                if response.status_code == 200:
                    data = response.json()
                    return data.get('data', {})
                return {}
        except Exception as e:
            print(f"Error fetching ayah: {e}")
            return {}
    
    @staticmethod
    async def search_quran(query: str, edition: str = "ar.alafasy") -> List[Dict]:
        """
        Search for text in the Quran
        
        Args:
            query: Search query in Arabic
            edition: Edition identifier
            
        Returns:
            List of matching ayahs
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{QuranService.BASE_URL}/search/{query}/all/{edition}"
                )
                if response.status_code == 200:
                    data = response.json()
                    return data.get('data', {}).get('matches', [])
                return []
        except Exception as e:
            print(f"Error searching Quran: {e}")
            return []
    
    @staticmethod
    async def get_surah_list() -> List[Dict]:
        """
        Get list of all Surahs with metadata
        
        Returns:
            List of surah information
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{QuranService.BASE_URL}/surah")
                if response.status_code == 200:
                    data = response.json()
                    return data.get('data', [])
                return []
        except Exception as e:
            print(f"Error fetching surah list: {e}")
            return []
    
    @staticmethod
    async def get_juz(juz_number: int, edition: str = "ar.alafasy") -> Dict:
        """
        Get a Juz (part) of the Quran
        
        Args:
            juz_number: Juz number (1-30)
            edition: Edition identifier
            
        Returns:
            Dictionary containing juz data
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{QuranService.BASE_URL}/juz/{juz_number}/{edition}")
                if response.status_code == 200:
                    data = response.json()
                    return data.get('data', {})
                return {}
        except Exception as e:
            print(f"Error fetching juz: {e}")
            return {}


class AzkarService:
    """Service for Islamic Azkar (remembrances)"""
    
    AZKAR_DATA = {
        "morning": [
            {
                "arabic": "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
                "transliteration": "Asbahna wa-asbahal-mulku lillah",
                "translation": "We have entered morning and the kingdom of Allah has entered morning",
                "count": 1
            },
            {
                "arabic": "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
                "transliteration": "Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilayka-nnushur",
                "translation": "O Allah, by You we enter the morning and by You we enter the evening",
                "count": 1
            },
            {
                "arabic": "أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ",
                "transliteration": "Asbahna 'ala fitratul-Islam, wa 'ala kalimatul-ikhlas",
                "translation": "We have entered the morning upon the natural religion of Islam",
                "count": 1
            }
        ],
        "evening": [
            {
                "arabic": "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
                "transliteration": "Amsayna wa-amsal-mulku lillah",
                "translation": "We have entered evening and the kingdom of Allah has entered evening",
                "count": 1
            }
        ],
        "after_prayer": [
            {
                "arabic": "سُبْحَانَ اللَّهِ",
                "transliteration": "Subhan Allah",
                "translation": "Glory be to Allah",
                "count": 33
            },
            {
                "arabic": "الْحَمْدُ لِلَّهِ",
                "transliteration": "Alhamdulillah",
                "translation": "All praise is due to Allah",
                "count": 33
            },
            {
                "arabic": "اللَّهُ أَكْبَرُ",
                "transliteration": "Allahu Akbar",
                "translation": "Allah is the Greatest",
                "count": 34
            }
        ]
    }
    
    @staticmethod
    async def get_azkar(category: str = "morning") -> List[Dict]:
        """
        Get Azkar for a specific category
        
        Args:
            category: Category of azkar (morning, evening, after_prayer)
            
        Returns:
            List of azkar
        """
        return AzkarService.AZKAR_DATA.get(category, [])
    
    @staticmethod
    async def get_all_categories() -> List[str]:
        """Get all available azkar categories"""
        return list(AzkarService.AZKAR_DATA.keys())


class PrayerTimesService:
    """Service for Islamic prayer times"""
    
    @staticmethod
    async def get_prayer_times(city: str, country: str, date: Optional[str] = None) -> Dict:
        """
        Get prayer times for a specific location
        
        Args:
            city: City name
            country: Country name
            date: Date in DD-MM-YYYY format (optional, defaults to today)
            
        Returns:
            Dictionary containing prayer times
        """
        try:
            if not date:
                date = datetime.now().strftime("%d-%m-%Y")
            
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"http://api.aladhan.com/v1/timingsByCity/{date}",
                    params={"city": city, "country": country, "method": 4}
                )
                if response.status_code == 200:
                    data = response.json()
                    return data.get('data', {})
                return {}
        except Exception as e:
            print(f"Error fetching prayer times: {e}")
            return {}
    
    @staticmethod
    async def get_qibla_direction(latitude: float, longitude: float) -> Dict:
        """
        Get Qibla direction for given coordinates
        
        Args:
            latitude: Latitude
            longitude: Longitude
            
        Returns:
            Dictionary containing Qibla direction
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"http://api.aladhan.com/v1/qibla/{latitude}/{longitude}"
                )
                if response.status_code == 200:
                    data = response.json()
                    return data.get('data', {})
                return {}
        except Exception as e:
            print(f"Error fetching qibla direction: {e}")
            return {}
