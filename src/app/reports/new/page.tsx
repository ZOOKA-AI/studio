"use client";

import { NewReportForm } from '@/components/reports/new-report-form';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function NewReportPageContent() {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  
  return <NewReportForm date={date} />;
}

export default function NewReportPage() {
  return (
    <Suspense fallback={<div>تحميل...</div>}>
      <NewReportPageContent />
    </Suspense>
  );
}
