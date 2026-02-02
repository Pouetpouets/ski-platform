'use client';

import { useState, useCallback, useMemo } from 'react';
import { SkiMap } from './ski-map';
import { ResortDetailPanel } from './resort-detail-panel';
import { PrioritySettingsPanel } from './priority-settings-panel';
import { DayPicker } from './day-picker';
import type { ResortWithConditions } from '@/lib/types/database';
import { getDistanceInfo } from '@/lib/utils/distance';
import { calculatePerfectDayScore } from '@/lib/utils/score';
import { PrioritiesProvider, usePriorities } from '@/lib/contexts/priorities-context';
import { ForecastDayProvider, useForecastDay } from '@/lib/contexts/forecast-day-context';
import { useTranslations } from 'next-intl';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SkiMapWrapperProps {
  resorts: ResortWithConditions[];
}

export function SkiMapWrapper({ resorts }: SkiMapWrapperProps) {
  return (
    <PrioritiesProvider>
      <ForecastDayProvider>
        <SkiMapContent resorts={resorts} />
      </ForecastDayProvider>
    </PrioritiesProvider>
  );
}

function SkiMapContent({ resorts }: SkiMapWrapperProps) {
  const t = useTranslations('priorities');
  const { weights } = usePriorities();
  const { selectedDate } = useForecastDay();
  const [selectedResort, setSelectedResort] = useState<ResortWithConditions | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleResortClick = useCallback((resort: ResortWithConditions) => {
    setSelectedResort(resort);
  }, []);

  const handleUserLocationChange = useCallback((coords: { latitude: number; longitude: number } | null) => {
    setUserLocation(coords);
  }, []);

  const handlePanelClose = useCallback(() => {
    setSelectedResort(null);
  }, []);

  // Calculate distance for selected resort
  const distanceInfo = useMemo(() => {
    if (!selectedResort) return null;
    return getDistanceInfo(userLocation, selectedResort.latitude, selectedResort.longitude);
  }, [selectedResort, userLocation]);

  // Derive weather override from selected day's forecast
  const weatherOverride = useMemo(() => {
    if (!selectedResort) return undefined;
    const forecast = selectedResort.forecasts?.find((f) => f.forecast_date === selectedDate);
    if (!forecast) return undefined;
    return { weatherCondition: forecast.weather_condition };
  }, [selectedResort, selectedDate]);

  // Calculate score and factors for selected resort (reactive to weight and day changes)
  const scoreResult = useMemo(() => {
    if (!selectedResort) return null;
    const distanceKm = distanceInfo?.distance ?? null;
    return calculatePerfectDayScore(selectedResort.conditions, distanceKm, weights, weatherOverride);
  }, [selectedResort, distanceInfo, weights, weatherOverride]);

  return (
    <>
      <SkiMap
        className="h-full w-full"
        resorts={resorts}
        weights={weights}
        onResortClick={handleResortClick}
        onUserLocationChange={handleUserLocationChange}
      />

      {/* Day picker overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-background/90 backdrop-blur-sm shadow-md rounded-lg px-2 py-1.5">
        <DayPicker />
      </div>

      {/* Settings trigger button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-6 left-4 z-20 bg-background/90 backdrop-blur-sm shadow-md"
        onClick={() => setSettingsOpen(true)}
        aria-label={t('openSettings')}
      >
        <Settings className="size-4" />
      </Button>

      <PrioritySettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <ResortDetailPanel
        resort={selectedResort}
        isOpen={selectedResort !== null}
        onClose={handlePanelClose}
        score={scoreResult?.score ?? null}
        factors={scoreResult?.factors ?? null}
        weights={weights}
        distanceInfo={distanceInfo}
      />
    </>
  );
}
