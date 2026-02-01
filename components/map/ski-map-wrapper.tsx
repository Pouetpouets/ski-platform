'use client';

import { useState, useCallback, useMemo } from 'react';
import { SkiMap } from './ski-map';
import { ResortDetailPanel } from './resort-detail-panel';
import { PrioritySettingsPanel } from './priority-settings-panel';
import type { ResortWithConditions } from '@/lib/types/database';
import { getDistanceInfo } from '@/lib/utils/distance';
import { calculatePerfectDayScore } from '@/lib/utils/score';
import { PrioritiesProvider, usePriorities } from '@/lib/contexts/priorities-context';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SkiMapWrapperProps {
  resorts: ResortWithConditions[];
}

export function SkiMapWrapper({ resorts }: SkiMapWrapperProps) {
  return (
    <PrioritiesProvider>
      <SkiMapContent resorts={resorts} />
    </PrioritiesProvider>
  );
}

function SkiMapContent({ resorts }: SkiMapWrapperProps) {
  const { weights } = usePriorities();
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

  // Calculate score and factors for selected resort (reactive to weight changes)
  const scoreResult = useMemo(() => {
    if (!selectedResort) return null;
    const distanceKm = distanceInfo?.distance ?? null;
    return calculatePerfectDayScore(selectedResort.conditions, distanceKm, weights);
  }, [selectedResort, distanceInfo, weights]);

  return (
    <>
      <SkiMap
        className="h-full w-full"
        resorts={resorts}
        weights={weights}
        onResortClick={handleResortClick}
        onUserLocationChange={handleUserLocationChange}
      />

      {/* Settings trigger button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 z-20 bg-background/90 backdrop-blur-sm shadow-md"
        onClick={() => setSettingsOpen(true)}
        aria-label="Open priority settings"
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
