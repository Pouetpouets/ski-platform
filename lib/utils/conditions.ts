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
