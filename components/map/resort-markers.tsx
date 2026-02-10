'use client';

import { useEffect, useRef } from 'react';
import type mapboxgl from 'mapbox-gl';
import type { ResortWithConditions } from '@/lib/types/database';
import { calculatePerfectDayScore, getScoreColorHex } from '@/lib/utils/score';
import type { FactorName } from '@/lib/utils/score';

interface ResortMarkersProps {
  map: mapboxgl.Map | null;
  resorts: ResortWithConditions[];
  weights?: Record<FactorName, number>;
  selectedDate?: string;
  highlightedSlugs?: Set<string> | null;
  onResortClick?: (resort: ResortWithConditions) => void;
  onResortHover?: (resort: ResortWithConditions | null) => void;
}

/** Zoom thresholds for progressive detail */
const ZOOM_SHOW_LABELS = 7;
const ZOOM_SHOW_NUMBERS = 5;

// Get score-based gradient colors (matching landing page style)
function getScoreGradient(score: number): { bg: string; border: string } {
  if (score >= 80) {
    return { bg: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', border: '#15803d' }; // Green
  } else if (score >= 60) {
    return { bg: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', border: '#6d28d9' }; // Indigo-purple
  } else if (score >= 40) {
    return { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: '#b45309' }; // Amber
  } else {
    return { bg: 'linear-gradient(135deg, #64748b 0%, #475569 100%)', border: '#334155' }; // Slate
  }
}

// Detect mobile device (evaluated lazily to avoid SSR issues)
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Create marker HTML element with score and optional name label
function createMarkerElement(
  score: number,
  resortName: string,
  showLabel: boolean,
  showNumber: boolean
): HTMLElement {
  const { bg, border } = getScoreGradient(score);
  // Larger minimum size on mobile for better touch targets
  const size = showNumber ? 48 : (isMobileDevice() ? 32 : 24);

  const el = document.createElement('div');
  el.className = 'resort-marker';
  el.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    z-index: ${score};
  `;

  // Main marker circle
  const markerHtml = `
    <div class="marker-container" style="
      width: ${size}px;
      height: ${size}px;
      background: ${bg};
      border-radius: 50%;
      border: 3px solid ${border};
      box-shadow: 0 4px 12px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      transform-origin: center center;
    ">
      <span class="marker-score" style="
        color: white;
        font-size: ${showNumber ? '16px' : '0'};
        font-weight: 700;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        line-height: 1;
        font-family: system-ui, -apple-system, sans-serif;
        display: ${showNumber ? 'block' : 'none'};
      ">${score}</span>
    </div>
    <div class="marker-label" style="
      margin-top: 4px;
      padding: 3px 8px;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(8px);
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      max-width: 120px;
      display: ${showLabel ? 'block' : 'none'};
    ">
      <span style="
        font-size: 11px;
        font-weight: 600;
        color: #1e293b;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        font-family: system-ui, -apple-system, sans-serif;
      ">${resortName}</span>
    </div>
  `;

  el.innerHTML = markerHtml;

  // Hover effects - scale only the marker circle, not the whole element
  el.addEventListener('mouseenter', () => {
    const container = el.querySelector('.marker-container') as HTMLElement;
    if (container) container.style.transform = 'scale(1.15)';
    el.style.zIndex = '9999';
  });

  el.addEventListener('mouseleave', () => {
    const container = el.querySelector('.marker-container') as HTMLElement;
    if (container) container.style.transform = 'scale(1)';
    el.style.zIndex = String(score);
  });

  return el;
}

/** Update marker visibility based on zoom level */
function updateMarkersForZoom(markers: HTMLElement[], zoom: number): void {
  const showLabels = zoom >= ZOOM_SHOW_LABELS;
  const showNumbers = zoom >= ZOOM_SHOW_NUMBERS;

  for (const el of markers) {
    const container = el.querySelector('.marker-container') as HTMLElement;
    const scoreSpan = el.querySelector('.marker-score') as HTMLElement;
    const label = el.querySelector('.marker-label') as HTMLElement;

    if (container) {
      container.style.width = showNumbers ? '48px' : '24px';
      container.style.height = showNumbers ? '48px' : '24px';
    }
    if (scoreSpan) {
      scoreSpan.style.display = showNumbers ? 'block' : 'none';
      scoreSpan.style.fontSize = showNumbers ? '16px' : '0';
    }
    if (label) {
      label.style.display = showLabels ? 'block' : 'none';
    }
  }
}

// Weather condition icons (using SVG for consistency)
function getWeatherSvg(condition: string | null): string {
  const iconColor = '#6366f1';
  switch (condition?.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
    case 'cloudy':
    case 'overcast':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`;
    case 'snowing':
    case 'snow':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M8 15v2m0 4v2m4-8v2m0 4v2m4-6v2m0 4v2"/></svg>`;
    case 'rainy':
    case 'rain':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M16 14v6M8 14v6M12 16v6"/></svg>`;
    default:
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`;
  }
}

// Create popup HTML content (matching landing page card style)
function createPopupContent(resort: ResortWithConditions, score: number): string {
  const conditions = resort.conditions;
  const { bg } = getScoreGradient(score);

  const snowDepth = conditions?.snow_depth_base ?? '—';
  const slopesOpen = conditions?.slopes_open_km ?? 0;
  const slopesTotal = conditions?.slopes_total_km ?? 0;
  const freshSnow = conditions?.fresh_snow_24h ?? 0;
  const weatherCondition = conditions?.weather_condition ?? null;

  return `
    <div style="
      padding: 12px;
      min-width: 180px;
      font-family: system-ui, -apple-system, sans-serif;
    ">
      <div style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      ">
        <h3 style="
          margin: 0;
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
        ">${resort.name}</h3>
        ${getWeatherSvg(weatherCondition)}
      </div>
      
      <div style="
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
        padding: 8px 12px;
        background: ${bg};
        border-radius: 10px;
      ">
        <span style="
          font-size: 24px;
          font-weight: 800;
          color: white;
        ">${score}</span>
        <span style="
          font-size: 11px;
          color: rgba(255,255,255,0.9);
          line-height: 1.3;
        ">Perfect Day<br/>Score</span>
      </div>
      
      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        font-size: 12px;
      ">
        <div style="
          display: flex;
          align-items: center;
          gap: 6px;
          color: #475569;
        ">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2"><path d="M2 12h4l3-9 4 18 3-9h4"/></svg>
          <span><strong style="color:#1e293b">${snowDepth}cm</strong> base</span>
        </div>
        <div style="
          display: flex;
          align-items: center;
          gap: 6px;
          color: #475569;
        ">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M22 12h-4l-3 9L11 3l-3 9H4"/></svg>
          <span><strong style="color:#1e293b">${slopesOpen}</strong>/${slopesTotal}km</span>
        </div>
        ${freshSnow > 0 ? `
        <div style="
          grid-column: span 2;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background: #ecfdf5;
          border-radius: 6px;
          color: #047857;
          font-weight: 600;
        ">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>
          +${freshSnow}cm fresh snow!
        </div>
        ` : ''}
      </div>
    </div>
  `;
}

export function ResortMarkers({
  map,
  resorts,
  weights,
  selectedDate,
  highlightedSlugs,
  onResortClick,
  onResortHover,
}: ResortMarkersProps) {
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const resortSlugsByMarkerIndex = useRef<string[]>([]);
  const zoomListenerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!map) return;

    // Dynamically import mapbox-gl for popup creation
    import('mapbox-gl')
      .then((mapboxglModule) => {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      resortSlugsByMarkerIndex.current = [];

      const currentZoom = map.getZoom();
      const showLabels = currentZoom >= ZOOM_SHOW_LABELS;
      const showNumbers = currentZoom >= ZOOM_SHOW_NUMBERS;

      // Create markers for each resort
      resorts.forEach((resort) => {
        // Get weather override from forecast if selectedDate is set
        const forecast = selectedDate 
          ? resort.forecasts?.find((f) => f.forecast_date === selectedDate)
          : null;
        const weatherOverride = forecast 
          ? { weatherCondition: forecast.weather_condition }
          : undefined;
        
        const { score } = calculatePerfectDayScore(resort.conditions, null, weights, weatherOverride);

        const el = createMarkerElement(score, resort.name, showLabels, showNumbers);

        const marker = new mapboxglModule.Marker({ element: el })
          .setLngLat([resort.longitude, resort.latitude])
          .addTo(map);

        // Ensure marker container has proper z-index and visibility for mobile
        const markerEl = marker.getElement();
        markerEl.style.zIndex = String(score);
        // Force visibility on mobile Safari (prevents disappearing markers)
        markerEl.style.visibility = 'visible';
        markerEl.style.opacity = '1';

        // Force mobile marker visibility with inline styles as ultimate fallback
        if (isMobileDevice()) {
          markerEl.setAttribute('style',
            markerEl.getAttribute('style') +
            '; visibility: visible !important; opacity: 1 !important; display: flex !important;'
          );
        }

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
            offset: [0, -60],
            className: 'resort-preview-popup',
            maxWidth: '240px',
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
        resortSlugsByMarkerIndex.current.push(resort.slug);
      });

      // Listen for zoom changes
      const onZoom = () => {
        const elements = markersRef.current.map((m) => m.getElement());
        updateMarkersForZoom(elements, map.getZoom());
      };

      map.on('zoom', onZoom);
      zoomListenerRef.current = onZoom;

      // Force repaint on mobile Safari after markers are created
      // This fixes a known issue where markers may not appear until interaction
      if (isMobileDevice()) {
        requestAnimationFrame(() => {
          markersRef.current.forEach((marker) => {
            const el = marker.getElement();
            // Trigger a reflow by reading offsetHeight
            void el.offsetHeight;
          });
        });
      }
    })
      .catch((err) => {
        console.error('[ResortMarkers] Failed to load mapbox-gl:', err);
      });

    return () => {
      // Cleanup markers on unmount
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
      if (zoomListenerRef.current && map) {
        map.off('zoom', zoomListenerRef.current);
      }
    };
  }, [map, resorts, weights, selectedDate, onResortClick, onResortHover]);

  // Highlight/dim markers based on search
  useEffect(() => {
    const markers = markersRef.current;
    const slugs = resortSlugsByMarkerIndex.current;

    markers.forEach((marker, i) => {
      const el = marker.getElement();
      const container = el.querySelector('.marker-container') as HTMLElement;
      const label = el.querySelector('.marker-label') as HTMLElement;
      if (!container) return;

      if (highlightedSlugs === null || highlightedSlugs === undefined) {
        // No search — reset all
        container.style.opacity = '1';
        container.style.filter = '';
        if (label) label.style.opacity = '1';
      } else if (highlightedSlugs.has(slugs[i])) {
        // Matching
        container.style.opacity = '1';
        container.style.filter = '';
        if (label) label.style.opacity = '1';
      } else {
        // Non-matching — dim
        container.style.opacity = '0.25';
        container.style.filter = 'grayscale(0.5)';
        if (label) label.style.opacity = '0.25';
      }
    });
  }, [highlightedSlugs]);

  return null; // Markers are added directly to the map
}
