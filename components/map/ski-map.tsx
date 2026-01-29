'use client';

import { useRef, useCallback, useState, useEffect } from 'react';

// French Alps center coordinates
const FRENCH_ALPS_CENTER = {
  latitude: 45.9,
  longitude: 6.9,
} as const;

// Default zoom level to show French Alps overview
const DEFAULT_ZOOM = 8;

// Mapbox style - outdoors style works well for ski areas
const MAP_STYLE = 'mapbox://styles/mapbox/outdoors-v12';

interface SkiMapProps {
  className?: string;
  onMapLoad?: () => void;
}

export function SkiMap({ className, onMapLoad }: SkiMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      // Add geolocation control
      map.addControl(
        new mapboxglModule.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        'top-right'
      );

      map.on('load', () => {
        setIsLoaded(true);
        onMapLoad?.();
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
    };
  }, [mapboxToken, onMapLoad]);

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

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="animate-pulse text-muted-foreground">Loading map...</div>
        </div>
      )}
    </div>
  );
}

export { FRENCH_ALPS_CENTER, DEFAULT_ZOOM };
