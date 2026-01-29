'use client';

import { useState, useCallback, useMemo } from 'react';
import { SkiMap } from './ski-map';
import type { ResortWithConditions } from '@/lib/types/database';
import { getDistanceInfo } from '@/lib/utils/distance';
import { calculateSimpleScore, getScoreColor } from '@/lib/utils/score';

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

  // Calculate distance for selected resort
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

      {/* Selected resort card */}
      {selectedResort && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-card border rounded-lg shadow-lg p-4 z-20">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="font-semibold text-lg text-foreground">{selectedResort.name}</h2>
              <p className="text-sm text-muted-foreground">
                {selectedResort.altitude_min}m - {selectedResort.altitude_max}m
              </p>
            </div>
            <div className="flex items-center gap-2">
              {score !== null && (
                <div className={`px-3 py-1 rounded-full ${getScoreColor(score)} text-white font-bold`}>
                  {score}%
                </div>
              )}
              <button
                onClick={() => setSelectedResort(null)}
                className="text-muted-foreground hover:text-foreground text-xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* Distance */}
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">📍</span>
            {distanceInfo ? (
              <span className="text-foreground">
                <strong>{distanceInfo.formattedDistance}</strong>
                <span className="text-muted-foreground">
                  {' '}from {distanceInfo.fromLocation} ({distanceInfo.drivingTime})
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">Grant location to see distance</span>
            )}
          </div>

          {/* Conditions */}
          {selectedResort.conditions ? (
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span>❄️</span>
                <span>{selectedResort.conditions.snow_depth_base ?? '?'}cm base</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎿</span>
                <span>{selectedResort.conditions.runs_open}/{selectedResort.conditions.runs_total} runs</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🚡</span>
                <span>{selectedResort.conditions.lifts_open}/{selectedResort.conditions.lifts_total} lifts</span>
              </div>
              <div className="flex items-center gap-2">
                <span>👥</span>
                <span className="capitalize">{selectedResort.conditions.crowd_level.replace('_', ' ')}</span>
              </div>
              {selectedResort.conditions.adult_ticket_price && (
                <div className="flex items-center gap-2">
                  <span>🎫</span>
                  <span>€{selectedResort.conditions.adult_ticket_price}</span>
                </div>
              )}
              {selectedResort.conditions.fresh_snow_24h > 0 && (
                <div className="flex items-center gap-2">
                  <span>🌨️</span>
                  <span>+{selectedResort.conditions.fresh_snow_24h}cm fresh</span>
                </div>
              )}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">No conditions data available</p>
          )}

          {/* Links */}
          <div className="mt-4 flex gap-2">
            {selectedResort.website_url && (
              <a
                href={selectedResort.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Website
              </a>
            )}
            {selectedResort.webcam_url && (
              <a
                href={selectedResort.webcam_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Webcams
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
