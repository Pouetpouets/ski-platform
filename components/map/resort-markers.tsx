'use client';

import { useEffect, useRef } from 'react';
import type mapboxgl from 'mapbox-gl';
import type { ResortWithConditions } from '@/lib/types/database';
import { calculatePerfectDayScore, getScoreColorHex } from '@/lib/utils/score';

interface ResortMarkersProps {
  map: mapboxgl.Map | null;
  resorts: ResortWithConditions[];
  onResortClick?: (resort: ResortWithConditions) => void;
  onResortHover?: (resort: ResortWithConditions | null) => void;
}

// Create marker HTML element
function createMarkerElement(score: number, color: string): HTMLElement {
  const el = document.createElement('div');
  el.className = 'resort-marker';
  el.innerHTML = `
    <div class="marker-container" style="
      width: 36px;
      height: 36px;
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
      <span style="
        color: white;
        font-size: 12px;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
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

// Create popup HTML content
function createPopupContent(resort: ResortWithConditions, score: number): string {
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
        ">Perfect Day Score</span>
      </div>
      ${conditions ? `
        <div style="
          font-size: 11px;
          color: #64748b;
          display: flex;
          flex-direction: column;
          gap: 2px;
        ">
          <span>❄️ ${conditions.snow_depth_base ?? '?'}cm base</span>
          <span>🎿 ${conditions.runs_open}/${conditions.runs_total} runs open</span>
        </div>
      ` : '<span style="font-size: 11px; color: #94a3b8;">No conditions data</span>'}
    </div>
  `;
}

export function ResortMarkers({
  map,
  resorts,
  onResortClick,
  onResortHover,
}: ResortMarkersProps) {
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  useEffect(() => {
    if (!map) return;

    // Dynamically import mapbox-gl for popup creation
    import('mapbox-gl').then((mapboxglModule) => {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Create markers for each resort
      resorts.forEach((resort) => {
        const { score } = calculatePerfectDayScore(resort.conditions);
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
            .setHTML(createPopupContent(resort, score))
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
      });
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
  }, [map, resorts, onResortClick, onResortHover]);

  return null; // Markers are added directly to the map
}
