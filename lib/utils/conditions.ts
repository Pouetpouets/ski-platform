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
