'use client';

import { useRef, useState, useEffect } from 'react';
import type mapboxgl from 'mapbox-gl';
import type { ResortWithConditions } from '@/lib/types/database';
import { ResortMarkers } from './resort-markers';

// Fallback: Europe overview when no resorts loaded
const FALLBACK_CENTER = {
  latitude: 46,
  longitude: 10,
} as const;

const FALLBACK_ZOOM = 3;

// Zoom level when centered on user location
const USER_LOCATION_ZOOM = 9;

// Mapbox style - outdoors style works well for ski areas
const MAP_STYLE = 'mapbox://styles/mapbox/outdoors-v12';

interface SkiMapProps {
  className?: string;
  resorts?: ResortWithConditions[];
  weights?: Record<string, number>;
  selectedDate?: string;
  highlightedSlugs?: Set<string> | null;
  snowLayerVisible?: boolean;
  onMapLoad?: () => void;
  onUserLocationChange?: (coords: { latitude: number; longitude: number } | null) => void;
  onResortClick?: (resort: ResortWithConditions) => void;
}

/**
 * Compute a bounding box from an array of resorts for fitBounds
 */
function computeBounds(resorts: ResortWithConditions[]): [[number, number], [number, number]] | null {
  if (resorts.length === 0) return null;

  let minLng = Infinity, maxLng = -Infinity;
  let minLat = Infinity, maxLat = -Infinity;

  for (const r of resorts) {
    if (r.longitude < minLng) minLng = r.longitude;
    if (r.longitude > maxLng) maxLng = r.longitude;
    if (r.latitude < minLat) minLat = r.latitude;
    if (r.latitude > maxLat) maxLat = r.latitude;
  }

  return [[minLng, minLat], [maxLng, maxLat]];
}

function buildSnowGeoJSON(resorts: ResortWithConditions[]): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: resorts.map((r) => ({
      type: 'Feature' as const,
      geometry: { type: 'Point' as const, coordinates: [r.longitude, r.latitude] },
      properties: { freshSnow: r.conditions?.fresh_snow_24h ?? 0 },
    })),
  };
}

const SNOW_HEATMAP_LAYER_ID = 'snow-heatmap';
const SNOW_SOURCE_ID = 'snow-conditions';

export function SkiMap({
  className,
  resorts = [],
  weights,
  selectedDate,
  highlightedSlugs,
  snowLayerVisible = false,
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

  // Store callbacks in refs to avoid re-initializing the map when they change
  const onMapLoadRef = useRef(onMapLoad);
  const onUserLocationChangeRef = useRef(onUserLocationChange);
  onMapLoadRef.current = onMapLoad;
  onUserLocationChangeRef.current = onUserLocationChange;

  // Store resorts in ref for use in map load callback
  const resortsRef = useRef(resorts);
  resortsRef.current = resorts;

  // Get token from environment
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!mapboxToken || !mapContainerRef.current || mapRef.current) return;

    // Dynamically import mapbox-gl to avoid SSR issues
    import('mapbox-gl').then((mapboxglModule) => {
      // Re-check ref after async import — component may have unmounted
      if (!mapContainerRef.current) return;

      const mapboxgl = mapboxglModule.default;
      mapboxgl.accessToken = mapboxToken;

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: MAP_STYLE,
        center: [FALLBACK_CENTER.longitude, FALLBACK_CENTER.latitude],
        zoom: FALLBACK_ZOOM,
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
        onUserLocationChangeRef.current?.(coords);

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
        onUserLocationChangeRef.current?.(null);
      });

      map.on('load', () => {
        setIsLoaded(true);
        onMapLoadRef.current?.();

        // Add snow-conditions heatmap source & layer
        map.addSource(SNOW_SOURCE_ID, {
          type: 'geojson',
          data: buildSnowGeoJSON(resortsRef.current),
        });

        map.addLayer({
          id: SNOW_HEATMAP_LAYER_ID,
          type: 'heatmap',
          source: SNOW_SOURCE_ID,
          layout: {
            visibility: 'visible',
          },
          paint: {
            // Weight each point by freshSnow (0–60 cm range), minimum 0.15 so low-snow resorts still appear
            'heatmap-weight': [
              'interpolate', ['linear'], ['get', 'freshSnow'],
              0, 0.15,
              10, 0.4,
              30, 0.7,
              60, 1,
            ],
            // Higher intensity so sparse points are visible
            'heatmap-intensity': [
              'interpolate', ['linear'], ['zoom'],
              0, 2,
              8, 4,
              14, 6,
            ],
            // Snow-themed color ramp: start showing color at very low density
            'heatmap-color': [
              'interpolate', ['linear'], ['heatmap-density'],
              0, 'rgba(0,0,0,0)',
              0.05, 'rgba(186,225,255,0.4)',
              0.15, 'rgba(135,206,250,0.6)',
              0.3, 'rgba(100,149,237,0.7)',
              0.5, 'rgba(65,105,225,0.8)',
              0.7, 'rgba(106,90,205,0.85)',
              1, 'rgba(128,0,128,0.9)',
            ],
            // Much larger radius so isolated points form visible blobs
            'heatmap-radius': [
              'interpolate', ['linear'], ['zoom'],
              4, 40,
              8, 70,
              12, 100,
              14, 130,
            ],
            'heatmap-opacity': 0.6,
          },
        });

        // Auto-fit bounds to loaded resorts
        const bounds = computeBounds(resortsRef.current);
        if (bounds) {
          map.fitBounds(bounds, { padding: 60, maxZoom: 10, duration: 0 });
        }

        // Set map instance after layers are added so visibility effects can run
        setMapInstance(map);

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
  }, [mapboxToken]);

  // Toggle heatmap layer visibility
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    try {
      map.setLayoutProperty(
        SNOW_HEATMAP_LAYER_ID,
        'visibility',
        snowLayerVisible ? 'visible' : 'none'
      );
    } catch {
      // Layer may not exist yet
    }
  }, [snowLayerVisible, mapInstance]);

  // Keep heatmap source data in sync with resorts
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    try {
      const source = map.getSource(SNOW_SOURCE_ID) as mapboxgl.GeoJSONSource | undefined;
      if (source) {
        source.setData(buildSnowGeoJSON(resorts));
      }
    } catch {
      // Source may not exist yet
    }
  }, [resorts, mapInstance]);

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
          weights={weights}
          selectedDate={selectedDate}
          highlightedSlugs={highlightedSlugs}
          onResortClick={onResortClick}
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

export { FALLBACK_CENTER, FALLBACK_ZOOM, USER_LOCATION_ZOOM };
