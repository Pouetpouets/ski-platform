/**
 * Condition quality assessment utilities
 * Used by factor indicator components to display green/yellow/red quality levels
 */

export type QualityLevel = 'good' | 'moderate' | 'poor';

/** Powder Alert triggers when fresh snow exceeds this threshold (cm) */
export const POWDER_ALERT_THRESHOLD_CM = 20;

/** Snow quality thresholds (base depth in cm) */
export const SNOW_DEPTH_THRESHOLDS = {
  GOOD: 80,
  MODERATE: 40,
} as const;

/**
 * Assess snow quality level based on base depth and fresh snow.
 * - Good: base >= 80cm AND fresh snow > 0
 * - Moderate: base >= 40cm
 * - Poor: base < 40cm or data unavailable
 */
export function getSnowQualityLevel(
  snowDepthBase: number | null,
  freshSnow24h: number
): QualityLevel {
  if (snowDepthBase === null) return 'poor';
  if (snowDepthBase >= SNOW_DEPTH_THRESHOLDS.GOOD && freshSnow24h > 0) return 'good';
  if (snowDepthBase >= SNOW_DEPTH_THRESHOLDS.MODERATE) return 'moderate';
  return 'poor';
}

/** Runs/Lifts open percentage thresholds */
export const OPEN_PERCENTAGE_THRESHOLDS = {
  GOOD: 80,
  MODERATE: 50,
} as const;

/**
 * Assess runs/lifts quality level based on combined open percentage.
 * - Good: > 80% open
 * - Moderate: 50-80% open
 * - Poor: < 50% open or no data (total = 0)
 */
export function getRunsLiftsQualityLevel(
  runsOpen: number,
  runsTotal: number,
  liftsOpen: number,
  liftsTotal: number
): QualityLevel {
  const total = runsTotal + liftsTotal;
  if (total === 0) return 'poor';
  const percentage = ((runsOpen + liftsOpen) / total) * 100;
  if (percentage > OPEN_PERCENTAGE_THRESHOLDS.GOOD) return 'good';
  if (percentage >= OPEN_PERCENTAGE_THRESHOLDS.MODERATE) return 'moderate';
  return 'poor';
}

/**
 * Assess crowd quality level. Lower crowds = better quality.
 * - Good: low
 * - Moderate: moderate
 * - Poor: high or very_high
 */
export function getCrowdQualityLevel(
  crowdLevel: 'low' | 'moderate' | 'high' | 'very_high'
): QualityLevel {
  switch (crowdLevel) {
    case 'low': return 'good';
    case 'moderate': return 'moderate';
    case 'high':
    case 'very_high': return 'poor';
  }
}

/** Format crowd level for display: replace underscores, capitalize each word */
export function formatCrowdLevel(crowdLevel: string): string {
  return crowdLevel
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Assess weather quality level for skiing.
 * - Good: sunny, partly_cloudy (best visibility and comfort)
 * - Moderate: cloudy, overcast (dry but reduced visibility)
 * - Poor: snowing, rain, storm, high_winds (challenging conditions)
 */
export function getWeatherQualityLevel(
  weatherCondition: string | null
): QualityLevel {
  if (!weatherCondition) return 'moderate';
  switch (weatherCondition) {
    case 'sunny':
    case 'partly_cloudy':
      return 'good';
    case 'cloudy':
    case 'overcast':
      return 'moderate';
    case 'snowing':
    case 'rain':
    case 'storm':
    case 'high_winds':
      return 'poor';
    default:
      return 'moderate';
  }
}

/** Format weather condition for display: replace underscores, capitalize each word */
export function formatWeatherCondition(condition: string): string {
  return condition
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Assess parking quality level.
 * - Good: available AND free (price === 0 or null)
 * - Moderate: available+paid OR limited
 * - Poor: full
 */
export function getParkingQualityLevel(
  parkingStatus: 'available' | 'limited' | 'full',
  parkingPrice: number | null
): QualityLevel {
  if (parkingStatus === 'full') return 'poor';
  if (parkingStatus === 'limited') return 'moderate';
  // available
  if (parkingPrice === null || parkingPrice === 0) return 'good';
  return 'moderate';
}

/** Format parking status for display: replace underscores, capitalize */
export function formatParkingStatus(status: string): string {
  return status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Price quality thresholds (adult day pass in EUR) */
export const PRICE_THRESHOLDS = {
  BUDGET: 45,
  AVERAGE: 55,
} as const;

/**
 * Assess lift ticket price quality level.
 * - Good: < €45 (budget-friendly)
 * - Moderate: €45-€55 (average)
 * - Poor: > €55 (premium)
 */
export function getPriceQualityLevel(
  adultTicketPrice: number | null
): QualityLevel {
  if (adultTicketPrice === null) return 'moderate';
  if (adultTicketPrice < PRICE_THRESHOLDS.BUDGET) return 'good';
  if (adultTicketPrice <= PRICE_THRESHOLDS.AVERAGE) return 'moderate';
  return 'poor';
}
