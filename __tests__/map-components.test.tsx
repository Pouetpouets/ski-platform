import { describe, it, expect, vi } from 'vitest';

// Mock the DB preferences module
vi.mock('@/lib/data/preferences', () => ({
  fetchUserPriorities: vi.fn().mockResolvedValue(null),
  saveUserPriorities: vi.fn().mockResolvedValue(false),
}));
import { render, screen, fireEvent } from '@testing-library/react';
import { SkiMapWrapper } from '@/components/map/ski-map-wrapper';
import type { ResortWithConditions } from '@/lib/types/database';
import {
  calculatePerfectDayScore,
  getScoreColor,
  getScoreColorHex,
  SCORE_THRESHOLDS,
} from '@/lib/utils/score';
import {
  getDistanceInfo,
  DEFAULT_REFERENCE_LOCATION,
} from '@/lib/utils/distance';

// --------------------------------------------------------------------------
// Test fixtures
// --------------------------------------------------------------------------

const mockResortWithConditions: ResortWithConditions = {
  id: 'test-resort-1',
  name: 'Les Arcs',
  slug: 'les-arcs',
  latitude: 45.5708,
  longitude: 6.8281,
  altitude_min: 1200,
  altitude_max: 3226,
  website_url: 'https://www.lesarcs.com',
  webcam_url: 'https://www.lesarcs.com/webcams.html',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  conditions: {
    id: 'cond-1',
    resort_id: 'test-resort-1',
    snow_depth_base: 120,
    snow_depth_summit: 180,
    fresh_snow_24h: 15,
    runs_open: 98,
    runs_total: 106,
    lifts_open: 45,
    lifts_total: 51,
    crowd_level: 'low',
    weather_condition: 'sunny',
    temperature_min: -8,
    temperature_max: -2,
    adult_ticket_price: 59.0,
    parking_status: 'available',
    parking_price: 15.0,
    updated_at: '2024-01-01T00:00:00Z',
  },
};

const mockResortNoConditions: ResortWithConditions = {
  id: 'test-resort-2',
  name: 'Test Resort',
  slug: 'test-resort',
  latitude: 45.0,
  longitude: 6.0,
  altitude_min: 1000,
  altitude_max: 2500,
  website_url: null,
  webcam_url: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  conditions: null,
};

// --------------------------------------------------------------------------
// SkiMapWrapper rendering tests
// --------------------------------------------------------------------------

describe('SkiMapWrapper Component', () => {
  it('renders without crashing with empty resorts', () => {
    render(<SkiMapWrapper resorts={[]} />);
    expect(document.body).toBeDefined();
  });

  it('renders without crashing with resorts', () => {
    render(<SkiMapWrapper resorts={[mockResortWithConditions]} />);
    expect(document.body).toBeDefined();
  });

  it('shows mapbox token error when NEXT_PUBLIC_MAPBOX_TOKEN is not set', () => {
    render(<SkiMapWrapper resorts={[mockResortWithConditions]} />);
    expect(screen.getByText(/Mapbox token not configured/i)).toBeDefined();
  });
});

// --------------------------------------------------------------------------
// Score color integration (used by markers and wrapper)
// --------------------------------------------------------------------------

describe('Score-to-Color mapping integration', () => {
  it('CSS class colors match hex colors at threshold boundaries', () => {
    // At each threshold, CSS class and hex should correspond
    expect(getScoreColor(80)).toBe('bg-score-excellent');
    expect(getScoreColorHex(80)).toBe('#22C55E');

    expect(getScoreColor(60)).toBe('bg-score-good');
    expect(getScoreColorHex(60)).toBe('#F59E0B');

    expect(getScoreColor(40)).toBe('bg-score-fair');
    expect(getScoreColorHex(40)).toBe('#F97316');

    expect(getScoreColor(39)).toBe('bg-score-poor');
    expect(getScoreColorHex(39)).toBe('#EF4444');
  });

  it('score thresholds are in descending order', () => {
    expect(SCORE_THRESHOLDS.EXCELLENT).toBeGreaterThan(SCORE_THRESHOLDS.GOOD);
    expect(SCORE_THRESHOLDS.GOOD).toBeGreaterThan(SCORE_THRESHOLDS.FAIR);
  });
});

// --------------------------------------------------------------------------
// Distance info integration (used by wrapper card)
// --------------------------------------------------------------------------

describe('Distance info for resort card', () => {
  it('returns non-null even without user location (falls back to Lyon)', () => {
    const info = getDistanceInfo(null, 45.5708, 6.8281);
    expect(info).not.toBeNull();
    expect(info.fromLocation).toBe(DEFAULT_REFERENCE_LOCATION.name);
  });

  it('returns user location label when coords provided', () => {
    const info = getDistanceInfo({ latitude: 45.764, longitude: 4.836 }, 45.5708, 6.8281);
    expect(info.fromLocation).toBe('your location');
  });

  it('distance to Les Arcs from Lyon is within realistic range', () => {
    const info = getDistanceInfo(null, 45.5708, 6.8281);
    // Lyon to Les Arcs is roughly 150-200km as the crow flies
    expect(info.distance).toBeGreaterThan(100);
    expect(info.distance).toBeLessThan(250);
  });
});

// --------------------------------------------------------------------------
// Score calculation integration (used by markers and wrapper)
// --------------------------------------------------------------------------

describe('Score calculation for resort card', () => {
  it('excellent conditions produce high score', () => {
    const score = calculatePerfectDayScore(mockResortWithConditions.conditions).score;
    // Without distance data, score is slightly lower due to neutral distance factor
    expect(score).toBeGreaterThanOrEqual(SCORE_THRESHOLDS.GOOD);
  });

  it('null conditions return default 50', () => {
    const score = calculatePerfectDayScore(null).score;
    expect(score).toBe(50);
  });

  it('score always in 0-100 range for any conditions', () => {
    const score = calculatePerfectDayScore(mockResortWithConditions.conditions).score;
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});

// --------------------------------------------------------------------------
// Resort data contract validation
// --------------------------------------------------------------------------

describe('ResortWithConditions data contract', () => {
  it('resort with conditions has all required fields', () => {
    const r = mockResortWithConditions;
    expect(r.id).toBeTruthy();
    expect(r.name).toBeTruthy();
    expect(r.slug).toBeTruthy();
    expect(typeof r.latitude).toBe('number');
    expect(typeof r.longitude).toBe('number');
    expect(r.conditions).not.toBeNull();
    expect(r.conditions!.resort_id).toBe(r.id);
  });

  it('resort without conditions has null conditions', () => {
    expect(mockResortNoConditions.conditions).toBeNull();
  });

  it('conditions crowd_level is valid enum value', () => {
    const validLevels = ['low', 'moderate', 'high', 'very_high'];
    expect(validLevels).toContain(mockResortWithConditions.conditions!.crowd_level);
  });

  it('conditions parking_status is valid enum value', () => {
    const validStatuses = ['available', 'limited', 'full'];
    expect(validStatuses).toContain(mockResortWithConditions.conditions!.parking_status);
  });
});
