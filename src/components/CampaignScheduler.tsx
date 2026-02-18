'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface CampaignSchedulerProps {
  onSchedule: (date: Date) => void;
  disabled?: boolean;
}

export function CampaignScheduler({ onSchedule, disabled }: CampaignSchedulerProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('12:00');
  const [isOpen, setIsOpen] = useState(false);

  const handleSchedule = () => {
    if (date) {
      const [hours, minutes] = time.split(':');
      const scheduledDate = new Date(date);
      scheduledDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      onSchedule(scheduledDate);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : 'Schedule for later'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4 space-y-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date < new Date()}
            initialFocus
          />
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md"
            />
          </div>
          <Button
            onClick={handleSchedule}
            disabled={!date}
            className="w-full"
          >
            Schedule Campaign
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
