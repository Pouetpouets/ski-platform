import { describe, expect, it } from 'vitest';
import {
  calculatePerfectDayScore,
  calculateFactorScores,
  combinedScore,
  scoreSnow,
  scoreCrowd,
  scoreWeather,
  scorePrice,
  scoreDistance,
  scoreParking,
  getScoreColor,
  getScoreColorHex,
  SCORE_THRESHOLDS,
  DEFAULT_WEIGHTS,
  FACTOR_NAMES,
  PRIORITY_WEIGHT_DISTRIBUTION,
  DEFAULT_PRIORITY_ORDER,
  priorityOrderToWeights,
} from '@/lib/utils/score';
import type { FactorName } from '@/lib/utils/score';
import type { ResortConditions } from '@/lib/types/database';

// =============================================================================
// SCORE COLOR TESTS (unchanged)
// =============================================================================

describe('SCORE_THRESHOLDS', () => {
  it('should have correct threshold values', () => {
    expect(SCORE_THRESHOLDS.EXCELLENT).toBe(80);
    expect(SCORE_THRESHOLDS.GOOD).toBe(60);
    expect(SCORE_THRESHOLDS.FAIR).toBe(40);
  });
});

describe('getScoreColor', () => {
  it('returns excellent color for scores >= 80', () => {
    expect(getScoreColor(80)).toBe('bg-score-excellent');
    expect(getScoreColor(100)).toBe('bg-score-excellent');
  });

  it('returns good color for scores 60-79', () => {
    expect(getScoreColor(60)).toBe('bg-score-good');
    expect(getScoreColor(79)).toBe('bg-score-good');
  });

  it('returns fair color for scores 40-59', () => {
    expect(getScoreColor(40)).toBe('bg-score-fair');
    expect(getScoreColor(59)).toBe('bg-score-fair');
  });

  it('returns poor color for scores < 40', () => {
    expect(getScoreColor(0)).toBe('bg-score-poor');
    expect(getScoreColor(39)).toBe('bg-score-poor');
  });
});

describe('getScoreColorHex', () => {
  it('returns correct hex values', () => {
    expect(getScoreColorHex(80)).toBe('#22C55E');
    expect(getScoreColorHex(60)).toBe('#F59E0B');
    expect(getScoreColorHex(40)).toBe('#F97316');
    expect(getScoreColorHex(20)).toBe('#EF4444');
  });
});

// =============================================================================
// INDIVIDUAL FACTOR SCORING TESTS
// =============================================================================

describe('scoreSnow', () => {
  it('returns max score for 150cm+ base with 30cm+ fresh', () => {
    expect(scoreSnow(150, 30)).toBe(100);
  });

  it('returns 0 for null base depth and 0 fresh', () => {
    expect(scoreSnow(null, 0)).toBe(0);
  });

  it('scales linearly with base depth', () => {
    // 75cm / 150 * 100 * 0.7 = 35
    expect(scoreSnow(75, 0)).toBe(35);
  });

  it('includes fresh snow contribution', () => {
    // 0 depth + 15cm fresh: 0 * 0.7 + (15/30 * 100) * 0.3 = 15
    expect(scoreSnow(null, 15)).toBe(15);
  });

  it('caps at 100', () => {
    expect(scoreSnow(200, 50)).toBe(100);
  });
});

describe('scoreCrowd', () => {
  it('returns 100 for low', () => { expect(scoreCrowd('low')).toBe(100); });
  it('returns 70 for moderate', () => { expect(scoreCrowd('moderate')).toBe(70); });
  it('returns 40 for high', () => { expect(scoreCrowd('high')).toBe(40); });
  it('returns 20 for very_high', () => { expect(scoreCrowd('very_high')).toBe(20); });
});

describe('scoreWeather', () => {
  it('returns 100 for sunny', () => { expect(scoreWeather('sunny')).toBe(100); });
  it('returns 90 for partly_cloudy', () => { expect(scoreWeather('partly_cloudy')).toBe(90); });
  it('returns 80 for cloudy', () => { expect(scoreWeather('cloudy')).toBe(80); });
  it('returns 70 for snowing', () => { expect(scoreWeather('snowing')).toBe(70); });
  it('returns 30 for rain', () => { expect(scoreWeather('rain')).toBe(30); });
  it('returns 10 for storm', () => { expect(scoreWeather('storm')).toBe(10); });
  it('returns 60 for null', () => { expect(scoreWeather(null)).toBe(60); });
  it('returns 60 for unknown', () => { expect(scoreWeather('foggy')).toBe(60); });
});

describe('scorePrice', () => {
  it('returns 100 for €30 or less', () => {
    expect(scorePrice(30)).toBe(100);
    expect(scorePrice(0)).toBe(100);
  });

  it('returns 0 for €70 or more', () => {
    expect(scorePrice(70)).toBe(0);
    expect(scorePrice(100)).toBe(0);
  });

  it('returns 50 for €50 (midpoint)', () => {
    expect(scorePrice(50)).toBe(50);
  });

  it('returns 60 for null', () => {
    expect(scorePrice(null)).toBe(60);
  });
});

describe('scoreDistance', () => {
  it('returns 100 for 0km', () => {
    expect(scoreDistance(0)).toBe(100);
  });

  it('returns 0 for 400km+', () => {
    expect(scoreDistance(400)).toBe(0);
    expect(scoreDistance(500)).toBe(0);
  });

  it('returns 50 for 200km', () => {
    expect(scoreDistance(200)).toBe(50);
  });

  it('returns 75 for 100km', () => {
    expect(scoreDistance(100)).toBe(75);
  });

  it('returns 50 for null', () => {
    expect(scoreDistance(null)).toBe(50);
  });
});

describe('scoreParking', () => {
  it('returns 100 for available + free', () => {
    expect(scoreParking('available', 0)).toBe(100);
    expect(scoreParking('available', null)).toBe(100);
  });

  it('returns 80 for available + paid', () => {
    expect(scoreParking('available', 15)).toBe(80);
  });

  it('returns 60 for limited', () => {
    expect(scoreParking('limited', 20)).toBe(60);
  });

  it('returns 20 for full', () => {
    expect(scoreParking('full', 25)).toBe(20);
  });
});

// =============================================================================
// COMBINED SCORE TESTS
// =============================================================================

describe('combinedScore', () => {
  it('returns average of all factors with equal weights', () => {
    const factors = { snow: 100, crowd: 100, weather: 100, price: 100, distance: 100, parking: 100 };
    expect(combinedScore(factors)).toBe(100);
  });

  it('returns 0 when all factors are 0', () => {
    const factors = { snow: 0, crowd: 0, weather: 0, price: 0, distance: 0, parking: 0 };
    expect(combinedScore(factors)).toBe(0);
  });

  it('computes weighted average correctly with equal weights', () => {
    const factors = { snow: 100, crowd: 0, weather: 100, price: 0, distance: 100, parking: 0 };
    const equalWeights = { snow: 1/6, crowd: 1/6, weather: 1/6, price: 1/6, distance: 1/6, parking: 1/6 } as Record<FactorName, number>;
    expect(combinedScore(factors, equalWeights)).toBe(50);
  });

  it('computes weighted average with priority weights', () => {
    const factors = { snow: 100, crowd: 0, weather: 100, price: 0, distance: 100, parking: 0 };
    // Default priority weights: snow=0.30, crowd=0.25, weather=0.20, price=0.12, distance=0.08, parking=0.05
    // 100*0.30 + 0 + 100*0.20 + 0 + 100*0.08 + 0 = 58
    expect(combinedScore(factors)).toBe(58);
  });

  it('clamps to 0-100', () => {
    const factors = { snow: 100, crowd: 100, weather: 100, price: 100, distance: 100, parking: 100 };
    expect(combinedScore(factors)).toBeLessThanOrEqual(100);
    expect(combinedScore(factors)).toBeGreaterThanOrEqual(0);
  });
});

// =============================================================================
// PERFECT DAY SCORE TESTS
// =============================================================================

const baseConditions: ResortConditions = {
  id: 'test-id',
  resort_id: 'resort-id',
  snow_depth_base: 120,
  snow_depth_summit: 180,
  fresh_snow_24h: 15,
  runs_open: 90,
  runs_total: 100,
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

describe('calculateFactorScores', () => {
  it('returns all 6 factor scores', () => {
    const factors = calculateFactorScores(baseConditions, 100);
    expect(factors).toHaveProperty('snow');
    expect(factors).toHaveProperty('crowd');
    expect(factors).toHaveProperty('weather');
    expect(factors).toHaveProperty('price');
    expect(factors).toHaveProperty('distance');
    expect(factors).toHaveProperty('parking');
  });

  it('all scores are between 0 and 100', () => {
    const factors = calculateFactorScores(baseConditions, 100);
    for (const name of FACTOR_NAMES) {
      expect(factors[name]).toBeGreaterThanOrEqual(0);
      expect(factors[name]).toBeLessThanOrEqual(100);
    }
  });
});

describe('calculatePerfectDayScore', () => {
  it('returns score 50 for null conditions', () => {
    const result = calculatePerfectDayScore(null);
    expect(result.score).toBe(50);
    expect(result.factors).toBeNull();
  });

  it('returns score and factors for valid conditions', () => {
    const result = calculatePerfectDayScore(baseConditions, 100);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.factors).not.toBeNull();
  });

  it('returns high score for excellent conditions', () => {
    const excellent: ResortConditions = {
      ...baseConditions,
      snow_depth_base: 150,
      fresh_snow_24h: 30,
      crowd_level: 'low',
      weather_condition: 'sunny',
      adult_ticket_price: 30,
      parking_status: 'available',
      parking_price: 0,
    };

    const result = calculatePerfectDayScore(excellent, 0);
    expect(result.score).toBeGreaterThanOrEqual(90);
  });

  it('returns low score for poor conditions', () => {
    const poor: ResortConditions = {
      ...baseConditions,
      snow_depth_base: 10,
      fresh_snow_24h: 0,
      runs_open: 5,
      runs_total: 100,
      lifts_open: 2,
      lifts_total: 50,
      crowd_level: 'very_high',
      weather_condition: 'storm',
      adult_ticket_price: 70,
      parking_status: 'full',
      parking_price: 25,
    };

    const result = calculatePerfectDayScore(poor, 400);
    expect(result.score).toBeLessThan(25);
  });

  it('score varies with distance', () => {
    const nearScore = calculatePerfectDayScore(baseConditions, 50).score;
    const farScore = calculatePerfectDayScore(baseConditions, 350).score;
    expect(nearScore).toBeGreaterThan(farScore);
  });

  it('score varies with crowd level', () => {
    const lowCrowd = calculatePerfectDayScore({ ...baseConditions, crowd_level: 'low' }).score;
    const highCrowd = calculatePerfectDayScore({ ...baseConditions, crowd_level: 'very_high' }).score;
    expect(lowCrowd).toBeGreaterThan(highCrowd);
  });

  it('accepts custom weights', () => {
    const snowOnlyWeights = {
      snow: 1, crowd: 0, weather: 0, price: 0, distance: 0, parking: 0,
    };

    const result = calculatePerfectDayScore(baseConditions, null, snowOnlyWeights);
    // Score should equal the snow factor score
    const factors = calculateFactorScores(baseConditions, null);
    expect(result.score).toBe(factors.snow);
  });

  it('has 6 default factor names', () => {
    expect(FACTOR_NAMES).toHaveLength(6);
  });

  it('default weights sum to ~1', () => {
    const sum = Object.values(DEFAULT_WEIGHTS).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });
});

// =============================================================================
// PRIORITY WEIGHT SYSTEM TESTS
// =============================================================================

describe('PRIORITY_WEIGHT_DISTRIBUTION', () => {
  it('has 6 weight values', () => {
    expect(PRIORITY_WEIGHT_DISTRIBUTION).toHaveLength(6);
  });

  it('sums to 1', () => {
    const sum = PRIORITY_WEIGHT_DISTRIBUTION.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });

  it('is in descending order', () => {
    for (let i = 1; i < PRIORITY_WEIGHT_DISTRIBUTION.length; i++) {
      expect(PRIORITY_WEIGHT_DISTRIBUTION[i]).toBeLessThan(PRIORITY_WEIGHT_DISTRIBUTION[i - 1]);
    }
  });

  it('matches expected distribution', () => {
    expect(PRIORITY_WEIGHT_DISTRIBUTION[0]).toBe(0.30);
    expect(PRIORITY_WEIGHT_DISTRIBUTION[1]).toBe(0.25);
    expect(PRIORITY_WEIGHT_DISTRIBUTION[2]).toBe(0.20);
    expect(PRIORITY_WEIGHT_DISTRIBUTION[3]).toBe(0.12);
    expect(PRIORITY_WEIGHT_DISTRIBUTION[4]).toBe(0.08);
    expect(PRIORITY_WEIGHT_DISTRIBUTION[5]).toBe(0.05);
  });
});

describe('priorityOrderToWeights', () => {
  it('assigns highest weight to first priority', () => {
    const weights = priorityOrderToWeights(['price', 'distance', 'snow', 'crowd', 'weather', 'parking']);
    expect(weights.price).toBe(0.30);
    expect(weights.distance).toBe(0.25);
    expect(weights.snow).toBe(0.20);
  });

  it('default priority order gives snow the highest weight', () => {
    expect(DEFAULT_WEIGHTS.snow).toBe(0.30);
    expect(DEFAULT_WEIGHTS.crowd).toBe(0.25);
    expect(DEFAULT_WEIGHTS.weather).toBe(0.20);
    expect(DEFAULT_WEIGHTS.price).toBe(0.12);
    expect(DEFAULT_WEIGHTS.distance).toBe(0.08);
    expect(DEFAULT_WEIGHTS.parking).toBe(0.05);
  });

  it('reordering priorities changes score outcome', () => {
    const conditions = baseConditions;

    // Snow-first weights (default): snow gets 0.30
    const snowFirstWeights = priorityOrderToWeights(['snow', 'crowd', 'weather', 'price', 'distance', 'parking']);
    const snowFirstScore = calculatePerfectDayScore(conditions, null, snowFirstWeights).score;

    // Price-first weights: price gets 0.30
    const priceFirstWeights = priorityOrderToWeights(['price', 'distance', 'parking', 'crowd', 'weather', 'snow']);
    const priceFirstScore = calculatePerfectDayScore(conditions, null, priceFirstWeights).score;

    // Scores should differ when priorities change
    expect(snowFirstScore).not.toBe(priceFirstScore);
  });
});
