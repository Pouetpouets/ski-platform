import { describe, expect, it } from 'vitest';
import {
  calculateSimpleScore,
  getScoreColor,
  getScoreColorHex,
  SCORE_THRESHOLDS,
} from '@/lib/utils/score';
import type { ResortConditions } from '@/lib/types/database';

describe('Score Utilities', () => {
  describe('SCORE_THRESHOLDS', () => {
    it('should have correct threshold values', () => {
      expect(SCORE_THRESHOLDS.EXCELLENT).toBe(80);
      expect(SCORE_THRESHOLDS.GOOD).toBe(60);
      expect(SCORE_THRESHOLDS.FAIR).toBe(40);
    });
  });

  describe('getScoreColor', () => {
    it('should return excellent color for scores >= 80', () => {
      expect(getScoreColor(80)).toBe('bg-score-excellent');
      expect(getScoreColor(90)).toBe('bg-score-excellent');
      expect(getScoreColor(100)).toBe('bg-score-excellent');
    });

    it('should return good color for scores 60-79', () => {
      expect(getScoreColor(60)).toBe('bg-score-good');
      expect(getScoreColor(70)).toBe('bg-score-good');
      expect(getScoreColor(79)).toBe('bg-score-good');
    });

    it('should return fair color for scores 40-59', () => {
      expect(getScoreColor(40)).toBe('bg-score-fair');
      expect(getScoreColor(50)).toBe('bg-score-fair');
      expect(getScoreColor(59)).toBe('bg-score-fair');
    });

    it('should return poor color for scores < 40', () => {
      expect(getScoreColor(0)).toBe('bg-score-poor');
      expect(getScoreColor(20)).toBe('bg-score-poor');
      expect(getScoreColor(39)).toBe('bg-score-poor');
    });
  });

  describe('getScoreColorHex', () => {
    it('should return green hex for excellent scores', () => {
      expect(getScoreColorHex(80)).toBe('#22C55E');
    });

    it('should return amber hex for good scores', () => {
      expect(getScoreColorHex(60)).toBe('#F59E0B');
    });

    it('should return orange hex for fair scores', () => {
      expect(getScoreColorHex(40)).toBe('#F97316');
    });

    it('should return red hex for poor scores', () => {
      expect(getScoreColorHex(20)).toBe('#EF4444');
    });
  });

  describe('calculateSimpleScore', () => {
    it('should return 50 for null conditions', () => {
      expect(calculateSimpleScore(null)).toBe(50);
    });

    it('should calculate score based on conditions', () => {
      const excellentConditions: ResortConditions = {
        id: 'test-id',
        resort_id: 'resort-id',
        snow_depth_base: 120,
        snow_depth_summit: 180,
        fresh_snow_24h: 25,
        runs_open: 100,
        runs_total: 100,
        lifts_open: 50,
        lifts_total: 50,
        crowd_level: 'low',
        weather_condition: 'sunny',
        temperature_min: -10,
        temperature_max: -2,
        adult_ticket_price: 45,
        parking_status: 'available',
        parking_price: 10,
        updated_at: '2024-01-01T00:00:00Z',
      };

      const score = calculateSimpleScore(excellentConditions);
      // Should be high score due to good snow, low crowds, sunny, good price
      expect(score).toBeGreaterThanOrEqual(80);
    });

    it('should penalize poor conditions', () => {
      const poorConditions: ResortConditions = {
        id: 'test-id',
        resort_id: 'resort-id',
        snow_depth_base: 20,
        snow_depth_summit: 50,
        fresh_snow_24h: 0,
        runs_open: 20,
        runs_total: 100,
        lifts_open: 10,
        lifts_total: 50,
        crowd_level: 'very_high',
        weather_condition: 'foggy',
        temperature_min: 0,
        temperature_max: 5,
        adult_ticket_price: 70,
        parking_status: 'full',
        parking_price: 25,
        updated_at: '2024-01-01T00:00:00Z',
      };

      const score = calculateSimpleScore(poorConditions);
      // Should be lower score
      expect(score).toBeLessThan(60);
    });

    it('should clamp score to 0-100 range', () => {
      // Even with extreme values, score should be clamped
      const extremeGood: ResortConditions = {
        id: 'test-id',
        resort_id: 'resort-id',
        snow_depth_base: 200,
        snow_depth_summit: 300,
        fresh_snow_24h: 50,
        runs_open: 100,
        runs_total: 100,
        lifts_open: 100,
        lifts_total: 100,
        crowd_level: 'low',
        weather_condition: 'sunny',
        temperature_min: -15,
        temperature_max: -5,
        adult_ticket_price: 30,
        parking_status: 'available',
        parking_price: 0,
        updated_at: '2024-01-01T00:00:00Z',
      };

      const score = calculateSimpleScore(extremeGood);
      expect(score).toBeLessThanOrEqual(100);
      expect(score).toBeGreaterThanOrEqual(0);
    });

    it('should factor in fresh snow', () => {
      const baseConditions: ResortConditions = {
        id: 'test-id',
        resort_id: 'resort-id',
        snow_depth_base: 80,
        snow_depth_summit: 120,
        fresh_snow_24h: 0,
        runs_open: 80,
        runs_total: 100,
        lifts_open: 40,
        lifts_total: 50,
        crowd_level: 'moderate',
        weather_condition: 'cloudy',
        temperature_min: -5,
        temperature_max: 0,
        adult_ticket_price: 55,
        parking_status: 'available',
        parking_price: 10,
        updated_at: '2024-01-01T00:00:00Z',
      };

      const withFreshSnow = { ...baseConditions, fresh_snow_24h: 20 };

      const scoreNoFresh = calculateSimpleScore(baseConditions);
      const scoreWithFresh = calculateSimpleScore(withFreshSnow);

      expect(scoreWithFresh).toBeGreaterThan(scoreNoFresh);
    });

    it('should factor in crowd level', () => {
      const baseConditions: ResortConditions = {
        id: 'test-id',
        resort_id: 'resort-id',
        snow_depth_base: 80,
        snow_depth_summit: 120,
        fresh_snow_24h: 5,
        runs_open: 80,
        runs_total: 100,
        lifts_open: 40,
        lifts_total: 50,
        crowd_level: 'very_high',
        weather_condition: 'sunny',
        temperature_min: -5,
        temperature_max: 0,
        adult_ticket_price: 55,
        parking_status: 'available',
        parking_price: 10,
        updated_at: '2024-01-01T00:00:00Z',
      };

      const lowCrowd = { ...baseConditions, crowd_level: 'low' as const };

      const scoreHighCrowd = calculateSimpleScore(baseConditions);
      const scoreLowCrowd = calculateSimpleScore(lowCrowd);

      expect(scoreLowCrowd).toBeGreaterThan(scoreHighCrowd);
    });
  });
});
