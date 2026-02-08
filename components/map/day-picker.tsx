'use client';

import { useForecastDay } from '@/lib/contexts/forecast-day-context';
import { Button } from '@/components/ui/button';

/**
 * Format a date string for the pill button label.
 * Today shows "Today", tomorrow shows "Tomorrow", rest show day name abbreviation.
 */
function formatDayLabel(dateStr: string, index: number): string {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  const date = new Date(dateStr + 'T12:00:00'); // noon to avoid timezone issues
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

export function DayPicker() {
  const { selectedDate, setSelectedDate, availableDates } = useForecastDay();

  return (
    <div className="flex gap-1.5 overflow-x-auto py-1 px-1">
      {availableDates.map((date, index) => (
        <Button
          key={date}
          variant={date === selectedDate ? 'default' : 'ghost'}
          size="sm"
          className="shrink-0 text-xs h-8 px-3"
          onClick={() => setSelectedDate(date)}
          aria-label="Select forecast day"
        >
          {formatDayLabel(date, index)}
        </Button>
      ))}
    </div>
  );
}
