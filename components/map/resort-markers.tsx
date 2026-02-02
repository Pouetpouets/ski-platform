'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import type mapboxgl from 'mapbox-gl';
import type { ResortWithConditions } from '@/lib/types/database';
import { calculatePerfectDayScore, getScoreColorHex } from '@/lib/utils/score';
import type { FactorName } from '@/lib/utils/score';

interface ResortMarkersProps {
  map: mapboxgl.Map | null;
  resorts: ResortWithConditions[];
  weights?: Record<FactorName, number>;
  highlightedSlugs?: Set<string> | null;
  onResortClick?: (resort: ResortWithConditions) => void;
  onResortHover?: (resort: ResortWithConditions | null) => void;
}

/** Zoom threshold: below this, markers show only color (no number) */
const ZOOM_HIDE_NUMBERS = 8;

// Create marker HTML element with score display
function createMarkerElement(score: number, color: string): HTMLElement {
  const el = document.createElement('div');
  el.className = 'resort-marker';
  el.innerHTML = `
    <div class="marker-container" style="
      width: 44px;
      height: 44px;
      background: ${color};
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s ease;
    ">
      <span class="marker-score" style="
        color: white;
        font-size: 14px;
        font-weight: 700;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        line-height: 1;
      ">${score}</span>
    </div>
  `;

  // Add hover effect
  el.addEventListener('mouseenter', () => {
    const container = el.querySelector('.marker-container') as HTMLElement;
    if (container) container.style.transform = 'scale(1.15)';
  });

  el.addEventListener('mouseleave', () => {
    const container = el.querySelector('.marker-container') as HTMLElement;
    if (container) container.style.transform = 'scale(1)';
  });

  return el;
}

/** Update marker score visibility based on zoom level */
function updateMarkersForZoom(markers: HTMLElement[], zoom: number): void {
  const showNumbers = zoom >= ZOOM_HIDE_NUMBERS;
  for (const el of markers) {
    const scoreSpan = el.querySelector('.marker-score') as HTMLElement;
    if (scoreSpan) {
      scoreSpan.style.display = showNumbers ? '' : 'none';
    }
    const container = el.querySelector('.marker-container') as HTMLElement;
    if (container) {
      container.style.width = showNumbers ? '44px' : '20px';
      container.style.height = showNumbers ? '44px' : '20px';
    }
  }
}

interface PopupLabels {
  perfectDayScore: string;
  base: string;
  noConditions: string;
}

// Create popup HTML content
function createPopupContent(resort: ResortWithConditions, score: number, labels: PopupLabels): string {
  const conditions = resort.conditions;
  return `
    <div class="resort-popup" style="
      padding: 8px;
      min-width: 150px;
    ">
      <h3 style="
        margin: 0 0 4px 0;
        font-size: 14px;
        font-weight: 600;
        color: #1e293b;
      ">${resort.name}</h3>
      <div style="
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
      ">
        <span style="
          font-size: 20px;
          font-weight: 700;
          color: ${getScoreColorHex(score)};
        ">${score}%</span>
        <span style="
          font-size: 11px;
          color: #64748b;
        ">${labels.perfectDayScore}</span>
      </div>
      ${conditions ? `
        <div style="
          font-size: 11px;
          color: #64748b;
          display: flex;
          flex-direction: column;
          gap: 2px;
        ">
          <span>❄️ ${conditions.snow_depth_base ?? '?'}cm ${labels.base}</span>
          <span>🎿 ${conditions.slopes_open_km}km / ${conditions.slopes_total_km}km open</span>
        </div>
      ` : `<span style="font-size: 11px; color: #94a3b8;">${labels.noConditions}</span>`}
    </div>
  `;
}

export function ResortMarkers({
  map,
  resorts,
  weights,
  highlightedSlugs,
  onResortClick,
  onResortHover,
}: ResortMarkersProps) {
  const t = useTranslations('map');
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const resortSlugsByMarkerIndex = useRef<string[]>([]);

  useEffect(() => {
    if (!map) return;

    // Dynamically import mapbox-gl for popup creation
    import('mapbox-gl').then((mapboxglModule) => {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      resortSlugsByMarkerIndex.current = [];

      // Create markers for each resort
      resorts.forEach((resort) => {
        const { score } = calculatePerfectDayScore(resort.conditions, null, weights);
        const color = getScoreColorHex(score);

        const el = createMarkerElement(score, color);

        const marker = new mapboxglModule.Marker({ element: el })
          .setLngLat([resort.longitude, resort.latitude])
          .addTo(map);

        // Click handler
        el.addEventListener('click', () => {
          onResortClick?.(resort);
        });

        // Hover handlers for popup
        el.addEventListener('mouseenter', () => {
          onResortHover?.(resort);

          // Create and show popup
          if (popupRef.current) {
            popupRef.current.remove();
          }

          popupRef.current = new mapboxglModule.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 25,
            className: 'resort-preview-popup',
          })
            .setLngLat([resort.longitude, resort.latitude])
            .setHTML(createPopupContent(resort, score, {
              perfectDayScore: t('perfectDayScore'),
              base: t('base'),
              noConditions: t('noConditions'),
            }))
            .addTo(map);
        });

        el.addEventListener('mouseleave', () => {
          onResortHover?.(null);

          // Remove popup with small delay
          setTimeout(() => {
            if (popupRef.current) {
              popupRef.current.remove();
              popupRef.current = null;
            }
          }, 100);
        });

        markersRef.current.push(marker);
        resortSlugsByMarkerIndex.current.push(resort.slug);
      });

      // Apply initial zoom state
      const markerElements = markersRef.current.map((m) => m.getElement());
      updateMarkersForZoom(markerElements, map.getZoom());

      // Listen for zoom changes
      const onZoom = () => {
        const elements = markersRef.current.map((m) => m.getElement());
        updateMarkersForZoom(elements, map.getZoom());
      };
      map.on('zoom', onZoom);

      // Store cleanup for zoom listener
      return () => {
        map.off('zoom', onZoom);
      };
    });

    return () => {
      // Cleanup markers on unmount
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
    };
  }, [map, resorts, weights, onResortClick, onResortHover]);

  // Highlight/dim markers based on search
  useEffect(() => {
    const markers = markersRef.current;
    const slugs = resortSlugsByMarkerIndex.current;

    markers.forEach((marker, i) => {
      const el = marker.getElement();
      const container = el.querySelector('.marker-container') as HTMLElement;
      if (!container) return;

      if (highlightedSlugs === null || highlightedSlugs === undefined) {
        // No search — reset all
        container.style.opacity = '1';
        container.style.filter = '';
      } else if (highlightedSlugs.has(slugs[i])) {
        // Matching
        container.style.opacity = '1';
        container.style.filter = '';
      } else {
        // Non-matching — dim
        container.style.opacity = '0.25';
        container.style.filter = 'grayscale(0.5)';
      }
    });
  }, [highlightedSlugs]);

  return null; // Markers are added directly to the map
}
