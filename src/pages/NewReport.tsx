
import { NewReportForm } from '@/components/reports/new-report-form';
import { useSearchParams } from 'react-router-dom';

export default function NewReport() {
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date');
  
  return <NewReportForm date={date} />;
}
