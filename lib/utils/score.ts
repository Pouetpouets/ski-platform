/**
 * Perfect Day Score calculation utilities
 * Each factor scores 0-100, combined via weighted average into final 0-100% score
 */

import type { ResortConditions } from '@/lib/types/database';

// =============================================================================
// SCORE COLOR THRESHOLDS
// =============================================================================

export const SCORE_THRESHOLDS = {
  EXCELLENT: 80, // >= 80: green
  GOOD: 60,      // >= 60: amber
  FAIR: 40,      // >= 40: orange
  // < 40: red (poor)
} as const;

export function getScoreColor(score: number): string {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'bg-score-excellent';
  if (score >= SCORE_THRESHOLDS.GOOD) return 'bg-score-good';
  if (score >= SCORE_THRESHOLDS.FAIR) return 'bg-score-fair';
  return 'bg-score-poor';
}

export function getScoreColorHex(score: number): string {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return '#22C55E';
  if (score >= SCORE_THRESHOLDS.GOOD) return '#F59E0B';
  if (score >= SCORE_THRESHOLDS.FAIR) return '#F97316';
  return '#EF4444';
}

// =============================================================================
// SCORING FACTOR NAMES
// =============================================================================

// Note: crowd and parking removed - no reliable data source (always defaults to 'moderate'/'available')
export const FACTOR_NAMES = ['snow', 'weather', 'price', 'distance'] as const;
export type FactorName = (typeof FACTOR_NAMES)[number];

// =============================================================================
// PRIORITY-BASED WEIGHT DISTRIBUTION
// =============================================================================

/** Weight distribution by priority rank (1st to 4th) */
export const PRIORITY_WEIGHT_DISTRIBUTION = [0.35, 0.30, 0.20, 0.15] as const;

/** Default priority order */
export const DEFAULT_PRIORITY_ORDER: FactorName[] = ['snow', 'weather', 'price', 'distance'];

/**
 * Convert a priority order into weights.
 * First factor in the array gets 0.30, second 0.25, etc.
 */
export function priorityOrderToWeights(priorityOrder: FactorName[]): Record<FactorName, number> {
  const weights = {} as Record<FactorName, number>;
  for (let i = 0; i < FACTOR_NAMES.length; i++) {
    weights[priorityOrder[i]] = PRIORITY_WEIGHT_DISTRIBUTION[i];
  }
  return weights;
}

/** Default weights based on default priority order */
export const DEFAULT_WEIGHTS: Record<FactorName, number> = priorityOrderToWeights(DEFAULT_PRIORITY_ORDER);

// =============================================================================
// FACTOR DISPLAY LABELS & EMOJI
// =============================================================================

export const FACTOR_LABELS: Record<FactorName, string> = {
  snow: 'Snow',
  weather: 'Weather',
  price: 'Price',
  distance: 'Distance',
};

export const FACTOR_EMOJI: Record<FactorName, string> = {
  snow: '❄️',
  weather: '☀️',
  price: '🎟️',
  distance: '📍',
};

export const FACTOR_DESCRIPTIONS: Record<FactorName, string> = {
  snow: 'Base depth & fresh snow',
  weather: 'Weather conditions',
  price: 'Lift ticket pricing',
  distance: 'Distance from you',
};

// =============================================================================
// INDIVIDUAL FACTOR SCORING FUNCTIONS (each returns 0-100)
// =============================================================================

/**
 * Snow quality score based on base depth and fresh snow.
 * Base depth contributes 70%, fresh snow contributes 30%.
 * Returns neutral score (50) if no data available.
 */
export function scoreSnow(snowDepthBase: number | null, freshSnow24h: number | null): number {
  // If no snow data at all, return neutral score
  if (snowDepthBase === null && (freshSnow24h === null || freshSnow24h === 0)) {
    return 50; // neutral - don't penalize missing data
  }

  // Base depth score (0-100): linear scale, 150cm+ = max
  let depthScore = 50; // neutral default if missing
  if (snowDepthBase !== null) {
    depthScore = Math.min(100, (snowDepthBase / 150) * 100);
  }

  // Fresh snow score (0-100): 30cm+ = max
  const freshScore = freshSnow24h !== null ? Math.min(100, (freshSnow24h / 30) * 100) : 0;

  return Math.round(depthScore * 0.7 + freshScore * 0.3);
}

/**
 * Crowd score - lower crowds = higher score.
 * Per epic: low=100, moderate=70, high=40, very_high=20
 */
export function scoreCrowd(crowdLevel: 'low' | 'moderate' | 'high' | 'very_high'): number {
  switch (crowdLevel) {
    case 'low': return 100;
    case 'moderate': return 70;
    case 'high': return 40;
    case 'very_high': return 20;
  }
}

/**
 * Weather score based on condition.
 * Per epic: sunny=100, partly_cloudy=90, cloudy=80, snowing=70, rain=30, storm=10
 */
export function scoreWeather(weatherCondition: string | null): number {
  switch (weatherCondition) {
    case 'sunny': return 100;
    case 'partly_cloudy': return 90;
    case 'cloudy': return 80;
    case 'overcast': return 75;
    case 'snowing': return 70;
    case 'rain': return 30;
    case 'storm': return 10;
    case 'high_winds': return 20;
    default: return 60; // unknown or null
  }
}

/**
 * Price score - cheaper = higher score.
 * Normalized: €30 or less = 100, €70+ = 0, linear between.
 */
const PRICE_MIN = 30;
const PRICE_MAX = 70;

export function scorePrice(adultTicketPrice: number | null): number {
  if (adultTicketPrice === null) return 60; // neutral if unknown
  if (adultTicketPrice <= PRICE_MIN) return 100;
  if (adultTicketPrice >= PRICE_MAX) return 0;
  return Math.round(((PRICE_MAX - adultTicketPrice) / (PRICE_MAX - PRICE_MIN)) * 100);
}

/**
 * Distance score - closer = higher score.
 * Decay function: 0km = 100, 50km = 75, 100km = 50, 200km = 25, 400km+ = 0
 */
const DISTANCE_MAX_KM = 400;

export function scoreDistance(distanceKm: number | null): number {
  if (distanceKm === null) return 50; // neutral if unknown
  if (distanceKm <= 0) return 100;
  if (distanceKm >= DISTANCE_MAX_KM) return 0;
  // Inverse linear decay
  return Math.round(((DISTANCE_MAX_KM - distanceKm) / DISTANCE_MAX_KM) * 100);
}

/**
 * Parking score.
 * Per epic: available+free=100, available+paid=80, limited=60, full=20
 */
export function scoreParking(
  parkingStatus: 'available' | 'limited' | 'full',
  parkingPrice: number | null
): number {
  if (parkingStatus === 'full') return 20;
  if (parkingStatus === 'limited') return 60;
  // available
  if (parkingPrice === null || parkingPrice === 0) return 100;
  return 80; // available but paid
}

// =============================================================================
// FACTOR SCORES INTERFACE
// =============================================================================

export interface FactorScores {
  snow: number;
  weather: number;
  price: number;
  distance: number;
}

// =============================================================================
// PERFECT DAY SCORE CALCULATION
// =============================================================================

/**
 * Calculate all individual factor scores for a resort.
 * Note: crowd and parking removed due to lack of reliable data sources.
 */
export function calculateFactorScores(
  conditions: ResortConditions,
  distanceKm: number | null,
  weatherOverride?: { weatherCondition: string | null }
): FactorScores {
  return {
    snow: scoreSnow(conditions.snow_depth_base, conditions.fresh_snow_24h),
    weather: scoreWeather(weatherOverride ? weatherOverride.weatherCondition : conditions.weather_condition),
    price: scorePrice(conditions.adult_ticket_price),
    distance: scoreDistance(distanceKm),
  };
}

/**
 * Combine factor scores into a single Perfect Day Score using weights.
 */
export function combinedScore(
  factors: FactorScores,
  weights: Record<FactorName, number> = DEFAULT_WEIGHTS
): number {
  let total = 0;
  let weightSum = 0;

  for (const name of FACTOR_NAMES) {
    total += factors[name] * weights[name];
    weightSum += weights[name];
  }

  // Normalize in case weights don't sum to 1
  const score = weightSum > 0 ? total / weightSum : 0;
  return Math.round(Math.max(0, Math.min(100, score)));
}

/**
 * Calculate the Perfect Day Score for a resort.
 * Returns score (0-100) and individual factor scores.
 */
export function calculatePerfectDayScore(
  conditions: ResortConditions | null,
  distanceKm: number | null = null,
  weights: Record<FactorName, number> = DEFAULT_WEIGHTS,
  weatherOverride?: { weatherCondition: string | null }
): { score: number; factors: FactorScores | null } {
  if (!conditions) return { score: 50, factors: null };

  const factors = calculateFactorScores(conditions, distanceKm, weatherOverride);
  const score = combinedScore(factors, weights);

  return { score, factors };
}
