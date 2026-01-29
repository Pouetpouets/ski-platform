'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import type mapboxgl from 'mapbox-gl';
import type { ResortWithConditions } from '@/lib/types/database';
import { ResortMarkers } from './resort-markers';

// French Alps center coordinates
const FRENCH_ALPS_CENTER = {
  latitude: 45.9,
  longitude: 6.9,
} as const;

// Default zoom level to show French Alps overview
const DEFAULT_ZOOM = 8;

// Zoom level when centered on user location
const USER_LOCATION_ZOOM = 9;

// Mapbox style - outdoors style works well for ski areas
const MAP_STYLE = 'mapbox://styles/mapbox/outdoors-v12';

interface SkiMapProps {
  className?: string;
  resorts?: ResortWithConditions[];
  onMapLoad?: () => void;
  onUserLocationChange?: (coords: { latitude: number; longitude: number } | null) => void;
  onResortClick?: (resort: ResortWithConditions) => void;
}

export function SkiMap({
  className,
  resorts = [],
  onMapLoad,
  onUserLocationChange,
  onResortClick,
}: SkiMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const geolocateControlRef = useRef<mapboxgl.GeolocateControl | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);

  // Get token from environment
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!mapboxToken || !mapContainerRef.current || mapRef.current) return;

    // Dynamically import mapbox-gl to avoid SSR issues
    import('mapbox-gl').then((mapboxglModule) => {
      const mapboxgl = mapboxglModule.default;
      mapboxgl.accessToken = mapboxToken;

      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: MAP_STYLE,
        center: [FRENCH_ALPS_CENTER.longitude, FRENCH_ALPS_CENTER.latitude],
        zoom: DEFAULT_ZOOM,
      });

      // Add navigation controls (zoom +/-)
      map.addControl(new mapboxglModule.NavigationControl({ showCompass: false }), 'top-right');

      // Create geolocation control with auto-trigger behavior
      const geolocateControl = new mapboxglModule.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: true,
      });

      // Add geolocation control
      map.addControl(geolocateControl, 'top-right');
      geolocateControlRef.current = geolocateControl;

      // Handle successful geolocation
      geolocateControl.on('geolocate', (e: GeolocationPosition) => {
        const coords = {
          latitude: e.coords.latitude,
          longitude: e.coords.longitude,
        };
        onUserLocationChange?.(coords);

        // Fly to user location with smooth animation
        map.flyTo({
          center: [coords.longitude, coords.latitude],
          zoom: USER_LOCATION_ZOOM,
          duration: 2000,
          essential: true,
        });
      });

      // Handle geolocation errors gracefully
      geolocateControl.on('error', () => {
        onUserLocationChange?.(null);
      });

      map.on('load', () => {
        setIsLoaded(true);
        setMapInstance(map);
        onMapLoad?.();

        // Auto-trigger geolocation request after map loads
        setTimeout(() => {
          geolocateControl.trigger();
        }, 500);
      });

      map.on('error', (e) => {
        console.error('Mapbox error:', e);
        setError('Failed to load map');
      });

      mapRef.current = map;
    }).catch((err) => {
      console.error('Failed to load mapbox-gl:', err);
      setError('Failed to load map library');
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      geolocateControlRef.current = null;
      setMapInstance(null);
    };
  }, [mapboxToken, onMapLoad, onUserLocationChange]);

  const handleResortHover = useCallback((resort: ResortWithConditions | null) => {
    // Can be extended to show additional UI feedback
  }, []);

  if (!mapboxToken) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`}>
        <p className="text-muted-foreground">
          Mapbox token not configured. Please set NEXT_PUBLIC_MAPBOX_TOKEN.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`}>
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainerRef} className="h-full w-full" />

      {/* Resort markers */}
      {mapInstance && resorts.length > 0 && (
        <ResortMarkers
          map={mapInstance}
          resorts={resorts}
          onResortClick={onResortClick}
          onResortHover={handleResortHover}
        />
      )}

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="animate-pulse text-muted-foreground">Loading map...</div>
        </div>
      )}
    </div>
  );
}

export { FRENCH_ALPS_CENTER, DEFAULT_ZOOM, USER_LOCATION_ZOOM };
