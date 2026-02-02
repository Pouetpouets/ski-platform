import { describe, it, expect } from 'vitest';
import {
  calculateFactorScores,
  calculatePerfectDayScore,
  scoreWeather,
} from '@/lib/utils/score';
import type { ResortConditions } from '@/lib/types/database';

const baseConditions: ResortConditions = {
  id: 'test-id',
  resort_id: 'resort-id',
  snow_depth_base: 120,
  snow_depth_summit: 180,
  fresh_snow_24h: 15,
  slopes_open_km: 90,
  slopes_total_km: 100,
  lifts_open: 45,
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

describe('calculateFactorScores with weatherOverride', () => {
  it('uses conditions weather when no override', () => {
    const factors = calculateFactorScores(baseConditions, null);
    expect(factors.weather).toBe(scoreWeather('sunny'));
  });

  it('uses override weather when provided', () => {
    const factors = calculateFactorScores(baseConditions, null, {
      weatherCondition: 'storm',
    });
    expect(factors.weather).toBe(scoreWeather('storm'));
  });

  it('handles null override weather condition', () => {
    const factors = calculateFactorScores(baseConditions, null, {
      weatherCondition: null,
    });
    expect(factors.weather).toBe(scoreWeather(null));
  });

  it('does not affect other factor scores', () => {
    const withoutOverride = calculateFactorScores(baseConditions, 100);
    const withOverride = calculateFactorScores(baseConditions, 100, {
      weatherCondition: 'storm',
    });

    expect(withOverride.snow).toBe(withoutOverride.snow);
    expect(withOverride.crowd).toBe(withoutOverride.crowd);
    expect(withOverride.price).toBe(withoutOverride.price);
    expect(withOverride.distance).toBe(withoutOverride.distance);
    expect(withOverride.parking).toBe(withoutOverride.parking);
    // Only weather differs
    expect(withOverride.weather).not.toBe(withoutOverride.weather);
  });
});

describe('calculatePerfectDayScore with weatherOverride', () => {
  it('produces different score when weather override changes condition', () => {
    const sunnyScore = calculatePerfectDayScore(baseConditions, null, undefined, undefined).score;
    const stormScore = calculatePerfectDayScore(baseConditions, null, undefined, {
      weatherCondition: 'storm',
    }).score;

    expect(sunnyScore).toBeGreaterThan(stormScore);
  });

  it('still works with null conditions', () => {
    const result = calculatePerfectDayScore(null, null, undefined, {
      weatherCondition: 'sunny',
    });
    expect(result.score).toBe(50);
    expect(result.factors).toBeNull();
  });
});
