'use client';

import { useState, useCallback } from 'react';
import { SkiMap } from './ski-map';
import type { ResortWithConditions } from '@/lib/types/database';

interface SkiMapWrapperProps {
  resorts: ResortWithConditions[];
}

export function SkiMapWrapper({ resorts }: SkiMapWrapperProps) {
  const [selectedResort, setSelectedResort] = useState<ResortWithConditions | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleResortClick = useCallback((resort: ResortWithConditions) => {
    setSelectedResort(resort);
    // TODO: Open resort detail panel (Epic 3)
    console.log('Selected resort:', resort.name);
  }, []);

  const handleUserLocationChange = useCallback((coords: { latitude: number; longitude: number } | null) => {
    setUserLocation(coords);
  }, []);

  return (
    <>
      <SkiMap
        className="h-full w-full"
        resorts={resorts}
        onResortClick={handleResortClick}
        onUserLocationChange={handleUserLocationChange}
      />

      {/* Selected resort indicator (temporary - will be replaced by detail panel) */}
      {selectedResort && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-card border rounded-lg shadow-lg p-4 z-20">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">{selectedResort.name}</h2>
            <button
              onClick={() => setSelectedResort(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedResort.conditions
              ? `${selectedResort.conditions.snow_depth_base ?? '?'}cm base • ${selectedResort.conditions.runs_open}/${selectedResort.conditions.runs_total} runs`
              : 'No conditions data'}
          </p>
          {userLocation && (
            <p className="text-xs text-muted-foreground mt-2">
              📍 Your location: {userLocation.latitude.toFixed(4)}°N, {userLocation.longitude.toFixed(4)}°E
            </p>
          )}
        </div>
      )}
    </>
  );
}
