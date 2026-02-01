import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FactorSummary } from '@/components/resort/factor-summary';
import { getAllFactorLevels, countQualityLevels } from '@/lib/utils/conditions';
import type { QualityLevel } from '@/lib/utils/conditions';

// --- Unit tests for countQualityLevels ---

describe('countQualityLevels', () => {
  it('counts all good', () => {
    const levels: QualityLevel[] = ['good', 'good', 'good'];
    expect(countQualityLevels(levels)).toEqual({ good: 3, moderate: 0, poor: 0 });
  });

  it('counts mixed levels', () => {
    const levels: QualityLevel[] = ['good', 'moderate', 'poor', 'good', 'moderate', 'poor'];
    expect(countQualityLevels(levels)).toEqual({ good: 2, moderate: 2, poor: 2 });
  });

  it('counts empty array', () => {
    expect(countQualityLevels([])).toEqual({ good: 0, moderate: 0, poor: 0 });
  });
});

// --- Unit tests for getAllFactorLevels ---

describe('getAllFactorLevels', () => {
  it('returns 6 factor levels', () => {
    const levels = getAllFactorLevels({
      snow_depth_base: 120,
      fresh_snow_24h: 15,
      runs_open: 90,
      runs_total: 100,
      lifts_open: 20,
      lifts_total: 22,
      crowd_level: 'low',
      weather_condition: 'sunny',
      adult_ticket_price: 42,
      parking_status: 'available',
      parking_price: 0,
    });

    expect(levels).toHaveLength(6);
  });

  it('returns correct levels for excellent conditions', () => {
    const levels = getAllFactorLevels({
      snow_depth_base: 120,
      fresh_snow_24h: 15,
      runs_open: 90,
      runs_total: 100,
      lifts_open: 20,
      lifts_total: 22,
      crowd_level: 'low',
      weather_condition: 'sunny',
      adult_ticket_price: 42,
      parking_status: 'available',
      parking_price: 0,
    });

    // snow: 120cm base + fresh > 0 = good
    // runs/lifts: 110/122 = 90% > 80 = good
    // crowd: low = good
    // weather: sunny = good
    // price: 42 < 45 = good
    // parking: available + free = good
    expect(levels).toEqual(['good', 'good', 'good', 'good', 'good', 'good']);
  });

  it('returns correct levels for poor conditions', () => {
    const levels = getAllFactorLevels({
      snow_depth_base: 20,
      fresh_snow_24h: 0,
      runs_open: 10,
      runs_total: 100,
      lifts_open: 5,
      lifts_total: 50,
      crowd_level: 'very_high',
      weather_condition: 'storm',
      adult_ticket_price: 70,
      parking_status: 'full',
      parking_price: 25,
    });

    expect(levels).toEqual(['poor', 'poor', 'poor', 'poor', 'poor', 'poor']);
  });
});

// --- Component tests for FactorSummary ---

describe('FactorSummary', () => {
  it('displays count for each quality level', () => {
    const levels: QualityLevel[] = ['good', 'good', 'good', 'moderate', 'moderate', 'poor'];
    render(<FactorSummary levels={levels} />);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows green dot for good count', () => {
    const levels: QualityLevel[] = ['good'];
    const { container } = render(<FactorSummary levels={levels} />);

    expect(container.querySelector('.bg-green-500')).toBeInTheDocument();
  });

  it('shows yellow dot for moderate count', () => {
    const levels: QualityLevel[] = ['moderate'];
    const { container } = render(<FactorSummary levels={levels} />);

    expect(container.querySelector('.bg-yellow-500')).toBeInTheDocument();
  });

  it('shows red dot for poor count', () => {
    const levels: QualityLevel[] = ['poor'];
    const { container } = render(<FactorSummary levels={levels} />);

    expect(container.querySelector('.bg-red-500')).toBeInTheDocument();
  });

  it('hides zero-count levels', () => {
    const levels: QualityLevel[] = ['good', 'good', 'good'];
    const { container } = render(<FactorSummary levels={levels} />);

    expect(container.querySelector('.bg-green-500')).toBeInTheDocument();
    expect(container.querySelector('.bg-yellow-500')).not.toBeInTheDocument();
    expect(container.querySelector('.bg-red-500')).not.toBeInTheDocument();
  });

  it('has sr-only accessible text summary', () => {
    const levels: QualityLevel[] = ['good', 'good', 'moderate', 'poor', 'poor', 'poor'];
    render(<FactorSummary levels={levels} />);

    expect(screen.getByText('2 good, 1 moderate, 3 poor')).toHaveClass('sr-only');
  });

  it('has aria-label on container', () => {
    const levels: QualityLevel[] = ['good'];
    render(<FactorSummary levels={levels} />);

    expect(screen.getByLabelText('Factor summary')).toBeInTheDocument();
  });
});
