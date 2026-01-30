'use client';

import { useState, useCallback, useMemo } from 'react';
import { SkiMap } from './ski-map';
import { ResortDetailPanel } from './resort-detail-panel';
import type { ResortWithConditions } from '@/lib/types/database';
import { getDistanceInfo } from '@/lib/utils/distance';
import { calculateSimpleScore } from '@/lib/utils/score';

interface SkiMapWrapperProps {
  resorts: ResortWithConditions[];
}

export function SkiMapWrapper({ resorts }: SkiMapWrapperProps) {
  const [selectedResort, setSelectedResort] = useState<ResortWithConditions | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleResortClick = useCallback((resort: ResortWithConditions) => {
    setSelectedResort(resort);
  }, []);

  const handleUserLocationChange = useCallback((coords: { latitude: number; longitude: number } | null) => {
    setUserLocation(coords);
  }, []);

  const handlePanelClose = useCallback(() => {
    setSelectedResort(null);
  }, []);

  // Calculate distance for selected resort (non-null when selectedResort is set)
  const distanceInfo = useMemo(() => {
    if (!selectedResort) return null;
    return getDistanceInfo(userLocation, selectedResort.latitude, selectedResort.longitude);
  }, [selectedResort, userLocation]);

  // Calculate score for selected resort
  const score = useMemo(() => {
    if (!selectedResort) return null;
    return calculateSimpleScore(selectedResort.conditions);
  }, [selectedResort]);

  return (
    <>
      <SkiMap
        className="h-full w-full"
        resorts={resorts}
        onResortClick={handleResortClick}
        onUserLocationChange={handleUserLocationChange}
      />

      <ResortDetailPanel
        resort={selectedResort}
        isOpen={selectedResort !== null}
        onClose={handlePanelClose}
        score={score}
        distanceInfo={distanceInfo}
      />
    </>
  );
}
