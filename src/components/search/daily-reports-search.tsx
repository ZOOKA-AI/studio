'use client';

import { useState, useMemo } from 'react';
import { useFirebase } from '@/firebase';
import { useSearch } from '@/hooks/use-search';
import { buildDailyReportsQuery, DailyReportSearchParams } from '@/lib/search-utils';
import { SearchBar } from '@/components/ui/search-bar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, Loader2 } from 'lucide-react';
import { DailyReport } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';

export interface DailyReportsSearchProps {
  /** Callback when a report is selected */
  onSelectReport?: (report: DailyReport) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Comprehensive search component for daily reports
 * 
 * Features:
 * - Text search
 * - Filter by site, supervisor, status
 * - Date range filtering
 * - Pagination
 */
export function DailyReportsSearch({ onSelectReport, className }: DailyReportsSearchProps) {
  const { firestore } = useFirebase();
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [status, setStatus] = useState<string>('');
  const [siteId, setSiteId] = useState<string>('');
  const [supervisorId, setSupervisorId] = useState<string>('');

  // Build the query based on current filters
  const buildQuery = useMemo(() => {
    if (!firestore) return null;

    return () => {
      const params: DailyReportSearchParams = {
        limit: 20,
      };

      if (status) params.status = status;
      if (siteId) params.siteId = siteId;
      if (supervisorId) params.supervisorId = supervisorId;

      return buildDailyReportsQuery(firestore, params);
    };
  }, [firestore, status, siteId, supervisorId]);

  const { results, isSearching, executeSearch, clearResults, hasMore, loadMore } = useSearch<
    Omit<DailyReport, 'date'> & { date: Timestamp }
  >(buildQuery, true);

  // Convert Firestore Timestamps to Date objects
  const reports: DailyReport[] = useMemo(
    () =>
      results.map((report) => ({
        ...report,
        date: report.date.toDate(),
      })),
    [results]
  );

  // Client-side filtering by search text
  const filteredReports = useMemo(() => {
    if (!searchText) return reports;
    
    const lowerSearch = searchText.toLowerCase();
    return reports.filter(
      (report) =>
        report.clientName?.toLowerCase().includes(lowerSearch) ||
        report.siteName?.toLowerCase().includes(lowerSearch) ||
        report.id.toLowerCase().includes(lowerSearch)
    );
  }, [reports, searchText]);

  const handleClearFilters = () => {
    setStatus('');
    setSiteId('');
    setSupervisorId('');
    setSearchText('');
    clearResults();
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>بحث التقارير اليومية</CardTitle>
          <CardDescription>ابحث عن التقارير حسب العميل أو الموقع أو الحالة</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search bar */}
          <SearchBar
            placeholder="ابحث عن تقرير حسب اسم العميل أو الموقع..."
            value={searchText}
            onChange={setSearchText}
            isSearching={isSearching}
            showSearchButton={false}
            debounceDelay={300}
          />

          {/* Filter toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="ml-2 h-4 w-4" />
              {showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}
            </Button>

            {(status || siteId || supervisorId) && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                مسح الفلاتر
              </Button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>الحالة</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">الكل</SelectItem>
                    <SelectItem value="draft">مسودة</SelectItem>
                    <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                    <SelectItem value="completed">مكتمل</SelectItem>
                    <SelectItem value="approved">معتمد</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Note: In production, these would be populated from actual data */}
              <div className="space-y-2">
                <Label>الموقع</Label>
                <Select value={siteId} onValueChange={setSiteId}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الموقع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">الكل</SelectItem>
                    {/* Add site options from context */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>المشرف</Label>
                <Select value={supervisorId} onValueChange={setSupervisorId}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المشرف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">الكل</SelectItem>
                    {/* Add supervisor options from context */}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="space-y-2">
            {isSearching && filteredReports.length === 0 && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin ml-2" />
                <span>جاري البحث...</span>
              </div>
            )}

            {!isSearching && filteredReports.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                لا توجد نتائج
              </div>
            )}

            {filteredReports.map((report) => (
              <Card
                key={report.id}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => onSelectReport?.(report)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{report.clientName}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {report.date.toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  {report.siteName && (
                    <CardDescription>{report.siteName}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span>الحالة: {report.status}</span>
                    {report.totalCost && (
                      <span>{report.totalCost} ريال</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Load more button */}
            {hasMore && !isSearching && (
              <div className="flex justify-center pt-4">
                <Button onClick={loadMore} variant="outline">
                  تحميل المزيد
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
