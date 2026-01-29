/**
 * Score calculation utilities
 * Temporary implementation until Epic 4 (Perfect Day Score System)
 */

import type { ResortConditions } from '@/lib/types/database';

/**
 * Score thresholds for color coding
 */
export const SCORE_THRESHOLDS = {
  EXCELLENT: 80, // >= 80: green
  GOOD: 60,      // >= 60: amber
  FAIR: 40,      // >= 40: orange
  // < 40: red (poor)
} as const;

/**
 * Get score color class based on score value
 */
export function getScoreColor(score: number): string {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'bg-score-excellent';
  if (score >= SCORE_THRESHOLDS.GOOD) return 'bg-score-good';
  if (score >= SCORE_THRESHOLDS.FAIR) return 'bg-score-fair';
  return 'bg-score-poor';
}

/**
 * Get score color as hex value (for Mapbox markers)
 */
export function getScoreColorHex(score: number): string {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return '#22C55E'; // green
  if (score >= SCORE_THRESHOLDS.GOOD) return '#F59E0B'; // amber
  if (score >= SCORE_THRESHOLDS.FAIR) return '#F97316'; // orange
  return '#EF4444'; // red
}

/**
 * Calculate a simple score based on conditions data
 * This is a placeholder until the full scoring algorithm is implemented
 */
export function calculateSimpleScore(conditions: ResortConditions | null): number {
  if (!conditions) return 50; // Default middle score if no data

  let score = 50; // Base score

  // Snow factor (up to +20 points)
  if (conditions.snow_depth_base !== null) {
    if (conditions.snow_depth_base >= 100) score += 20;
    else if (conditions.snow_depth_base >= 70) score += 15;
    else if (conditions.snow_depth_base >= 50) score += 10;
    else if (conditions.snow_depth_base >= 30) score += 5;
  }

  // Fresh snow bonus (up to +15 points)
  if (conditions.fresh_snow_24h >= 20) score += 15;
  else if (conditions.fresh_snow_24h >= 10) score += 10;
  else if (conditions.fresh_snow_24h >= 5) score += 5;

  // Crowd factor (up to +15 points)
  switch (conditions.crowd_level) {
    case 'low': score += 15; break;
    case 'moderate': score += 10; break;
    case 'high': score += 5; break;
    case 'very_high': score += 0; break;
  }

  // Open runs/lifts factor (up to +10 points)
  const runsRatio = conditions.runs_open / conditions.runs_total;
  const liftsRatio = conditions.lifts_open / conditions.lifts_total;
  const openRatio = (runsRatio + liftsRatio) / 2;
  score += Math.round(openRatio * 10);

  // Weather factor (up to +10 points)
  switch (conditions.weather_condition) {
    case 'sunny': score += 10; break;
    case 'partly_cloudy': score += 8; break;
    case 'cloudy': score += 5; break;
    case 'snowing': score += 6; break; // Good for powder!
    default: score += 3;
  }

  // Price factor (up to -10 points for expensive)
  if (conditions.adult_ticket_price !== null) {
    if (conditions.adult_ticket_price >= 65) score -= 10;
    else if (conditions.adult_ticket_price >= 55) score -= 5;
  }

  // Parking factor (up to -5 points)
  switch (conditions.parking_status) {
    case 'full': score -= 5; break;
    case 'limited': score -= 2; break;
  }

  // Clamp to 0-100
  return Math.max(0, Math.min(100, score));
}
