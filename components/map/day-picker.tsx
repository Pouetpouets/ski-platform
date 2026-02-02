'use client';

import { useTranslations } from 'next-intl';
import { useForecastDay } from '@/lib/contexts/forecast-day-context';
import { Button } from '@/components/ui/button';

/**
 * Format a date string for the pill button label.
 * Today shows "Today"/"Aujourd'hui", tomorrow shows day name abbreviation.
 */
function formatDayLabel(dateStr: string, index: number, t: (key: string) => string): string {
  if (index === 0) return t('today');
  if (index === 1) return t('tomorrow');
  const date = new Date(dateStr + 'T12:00:00'); // noon to avoid timezone issues
  return date.toLocaleDateString(undefined, { weekday: 'short' });
}

export function DayPicker() {
  const t = useTranslations('forecast');
  const { selectedDate, setSelectedDate, availableDates } = useForecastDay();

  return (
    <div className="flex gap-1.5 overflow-x-auto py-1 px-1">
      {availableDates.map((date, index) => (
        <Button
          key={date}
          variant={date === selectedDate ? 'default' : 'outline'}
          size="sm"
          className="shrink-0 text-xs h-8 px-3"
          onClick={() => setSelectedDate(date)}
          aria-label={t('selectDay')}
        >
          {formatDayLabel(date, index, t)}
        </Button>
      ))}
    </div>
  );
}
