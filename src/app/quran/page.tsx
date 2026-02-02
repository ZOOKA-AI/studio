'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Search, Clock, Compass } from 'lucide-react';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  surah: {
    number: number;
    name: string;
  };
}

interface Zikr {
  arabic: string;
  transliteration: string;
  translation: string;
  count: number;
}

interface PrayerTimes {
  timings: {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [azkar, setAzkar] = useState<Zikr[]>([]);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSurahs();
    fetchAzkar('morning');
    fetchPrayerTimes();
  }, []);

  const fetchSurahs = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/quran/surahs`);
      const data = await response.json();
      setSurahs(data.surahs || []);
    } catch (error) {
      console.error('Error fetching surahs:', error);
    }
  };

  const fetchSurah = async (surahNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/quran/surah/${surahNumber}`);
      const data = await response.json();
      setSelectedSurah(data.surah);
    } catch (error) {
      console.error('Error fetching surah:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchQuran = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/quran/search/${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error searching Quran:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAzkar = async (category: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/azkar/${category}`);
      const data = await response.json();
      setAzkar(data.azkar || []);
    } catch (error) {
      console.error('Error fetching azkar:', error);
    }
  };

  const fetchPrayerTimes = async () => {
    try {
      // Default to Dubai, UAE - can be made dynamic based on user location
      const response = await fetch(`${BACKEND_URL}/api/prayer-times/Dubai/UAE`);
      const data = await response.json();
      setPrayerTimes(data.times || null);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">القرآن الكريم والأذكار</h1>
          <p className="text-muted-foreground">Quran, Azkar, and Prayer Times</p>
        </div>
      </div>

      <Tabs defaultValue="quran" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quran">
            <BookOpen className="w-4 h-4 mr-2" />
            القرآن
          </TabsTrigger>
          <TabsTrigger value="search">
            <Search className="w-4 h-4 mr-2" />
            البحث
          </TabsTrigger>
          <TabsTrigger value="azkar">
            <BookOpen className="w-4 h-4 mr-2" />
            الأذكار
          </TabsTrigger>
          <TabsTrigger value="prayer">
            <Clock className="w-4 h-4 mr-2" />
            أوقات الصلاة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quran" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>السور</CardTitle>
                <CardDescription>اختر سورة للقراءة</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {surahs.map((surah) => (
                      <Button
                        key={surah.number}
                        variant={selectedSurah?.number === surah.number ? "default" : "outline"}
                        className="w-full justify-start text-right"
                        onClick={() => fetchSurah(surah.number)}
                      >
                        <div className="flex justify-between w-full">
                          <span>{surah.englishName}</span>
                          <span>{surah.name}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedSurah ? selectedSurah.name : 'اختر سورة'}
                </CardTitle>
                <CardDescription>
                  {selectedSurah && `${selectedSurah.englishName} - ${selectedSurah.numberOfAyahs} آيات`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-center">جاري التحميل...</p>
                ) : selectedSurah ? (
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-4 text-right" dir="rtl">
                      {selectedSurah.ayahs?.map((ayah: any) => (
                        <div key={ayah.number} className="p-4 border rounded-lg">
                          <p className="text-2xl leading-loose">{ayah.text}</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            آية {ayah.numberInSurah}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <p className="text-center text-muted-foreground">
                    اختر سورة من القائمة لبدء القراءة
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>البحث في القرآن الكريم</CardTitle>
              <CardDescription>ابحث عن كلمة أو عبارة في القرآن</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="أدخل كلمة البحث بالعربية"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchQuran()}
                  className="text-right"
                  dir="rtl"
                />
                <Button onClick={searchQuran} disabled={loading}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>

              {searchResults.length > 0 && (
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {searchResults.length} نتيجة
                    </p>
                    {searchResults.map((result: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="pt-6 text-right" dir="rtl">
                          <p className="text-xl leading-loose">{result.text}</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            {result.surah?.name} - آية {result.numberInSurah}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="azkar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الأذكار</CardTitle>
              <CardDescription>أذكار الصباح والمساء</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={() => fetchAzkar('morning')} variant="outline">
                  أذكار الصباح
                </Button>
                <Button onClick={() => fetchAzkar('evening')} variant="outline">
                  أذكار المساء
                </Button>
                <Button onClick={() => fetchAzkar('after_prayer')} variant="outline">
                  أذكار بعد الصلاة
                </Button>
              </div>

              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {azkar.map((zikr, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6 space-y-2">
                        <p className="text-2xl text-right leading-loose" dir="rtl">
                          {zikr.arabic}
                        </p>
                        <p className="text-sm italic">{zikr.transliteration}</p>
                        <p className="text-sm text-muted-foreground">{zikr.translation}</p>
                        <p className="text-xs font-bold">العدد: {zikr.count}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prayer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>أوقات الصلاة</CardTitle>
              <CardDescription>دبي، الإمارات العربية المتحدة</CardDescription>
            </CardHeader>
            <CardContent>
              {prayerTimes && prayerTimes.timings && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(prayerTimes.timings).map(([name, time]) => (
                    <Card key={name}>
                      <CardContent className="pt-6 text-center">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <h3 className="font-bold text-lg">{name}</h3>
                        <p className="text-2xl font-mono">{time}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
