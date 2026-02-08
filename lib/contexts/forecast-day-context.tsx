'use client';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface ForecastDayContextValue {
  selectedDate: string; // YYYY-MM-DD
  setSelectedDate: (date: string) => void;
  availableDates: string[]; // 5 dates starting from today
}

const ForecastDayContext = createContext<ForecastDayContextValue | null>(null);

/**
 * Generate an array of 5 date strings (YYYY-MM-DD) starting from today.
 */
function generateDates(): string[] {
  const dates: string[] = [];
  const now = new Date();
  for (let i = 0; i < 5; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

export function ForecastDayProvider({ children }: { children: React.ReactNode }) {
  const availableDates = useMemo(() => generateDates(), []);
  const [selectedDate, setSelectedDateState] = useState<string>(availableDates[0]);

  const setSelectedDate = useCallback((date: string) => {
    setSelectedDateState(date);
  }, []);

  const value = useMemo(
    () => ({ selectedDate, setSelectedDate, availableDates }),
    [selectedDate, setSelectedDate, availableDates]
  );

  return (
    <ForecastDayContext.Provider value={value}>
      {children}
    </ForecastDayContext.Provider>
  );
}

export function useForecastDay(): ForecastDayContextValue {
  const context = useContext(ForecastDayContext);
  if (!context) {
    throw new Error('useForecastDay must be used within a ForecastDayProvider');
  }
  return context;
}
