'use client';

import { useState, useCallback, useMemo } from 'react';
import { SkiMap } from './ski-map';
import { ResortDetailPanel } from './resort-detail-panel';
import { PrioritySettingsPanel } from './priority-settings-panel';
import { MapCommandBar } from './map-command-bar';
import { LocationModal } from './location-modal';
import type { ResortWithConditions } from '@/lib/types/database';
import { getDistanceInfo } from '@/lib/utils/distance';
import { calculatePerfectDayScore } from '@/lib/utils/score';
import { PrioritiesProvider, usePriorities } from '@/lib/contexts/priorities-context';
import { ForecastDayProvider, useForecastDay } from '@/lib/contexts/forecast-day-context';
import { ResortSearchProvider, useResortSearch } from '@/lib/contexts/resort-search-context';
import { LocationProvider, useLocation } from '@/lib/contexts/location-context';

interface SkiMapWrapperProps {
  resorts: ResortWithConditions[];
}

export function SkiMapWrapper({ resorts }: SkiMapWrapperProps) {
  return (
    <LocationProvider>
      <PrioritiesProvider>
        <ForecastDayProvider>
          <ResortSearchProvider>
            <SkiMapContent resorts={resorts} />
          </ResortSearchProvider>
        </ForecastDayProvider>
      </PrioritiesProvider>
    </LocationProvider>
  );
}

function SkiMapContent({ resorts }: SkiMapWrapperProps) {
  const { weights } = usePriorities();
  const { selectedDate } = useForecastDay();
  const { searchQuery } = useResortSearch();
  const { location, setGeolocation } = useLocation();
  const [selectedResort, setSelectedResort] = useState<ResortWithConditions | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [snowLayerVisible, setSnowLayerVisible] = useState(true);
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  // Derive userLocation coordinates for distance calculations
  const userLocation = useMemo(() => {
    if (!location) return null;
    return { latitude: location.latitude, longitude: location.longitude };
  }, [location]);

  const handleResortClick = useCallback((resort: ResortWithConditions) => {
    setSelectedResort(resort);
  }, []);

  const handleUserLocationChange = useCallback((coords: { latitude: number; longitude: number } | null) => {
    if (coords) {
      setGeolocation(coords.latitude, coords.longitude);
    }
  }, [setGeolocation]);

  const handleGeolocationDenied = useCallback(() => {
    // Only open modal if user hasn't already set a location
    if (!location) {
      setLocationModalOpen(true);
    }
  }, [location]);

  const handlePanelClose = useCallback(() => {
    setSelectedResort(null);
  }, []);

  // Compute highlighted slugs from search query
  const highlightedSlugs = useMemo<Set<string> | null>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    const slugs = new Set<string>();
    for (const resort of resorts) {
      const haystack = [resort.name, resort.region, resort.country]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (haystack.includes(q)) {
        slugs.add(resort.slug);
      }
    }
    return slugs;
  }, [searchQuery, resorts]);

  // Calculate distance for selected resort
  const distanceInfo = useMemo(() => {
    if (!selectedResort) return null;
    return getDistanceInfo(userLocation, selectedResort.latitude, selectedResort.longitude, location?.name);
  }, [selectedResort, userLocation, location?.name]);

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
        selectedDate={selectedDate}
        highlightedSlugs={highlightedSlugs}
        snowLayerVisible={snowLayerVisible}
        onResortClick={handleResortClick}
        onUserLocationChange={handleUserLocationChange}
        onGeolocationDenied={handleGeolocationDenied}
      />

      <MapCommandBar
        onSettingsOpen={() => setSettingsOpen(true)}
        snowLayerVisible={snowLayerVisible}
        onSnowLayerToggle={() => setSnowLayerVisible((v) => !v)}
        locationName={location?.name ?? null}
        isGeolocation={location?.isFromGeolocation ?? false}
        onLocationClick={() => setLocationModalOpen(true)}
      />

      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />

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
