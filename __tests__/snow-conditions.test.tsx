import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SnowConditions } from '@/components/resort/snow-conditions';
import { FactorIndicator } from '@/components/resort/factor-indicator';
import { getSnowQualityLevel, POWDER_ALERT_THRESHOLD_CM } from '@/lib/utils/conditions';

// --- Unit tests for getSnowQualityLevel ---

describe('getSnowQualityLevel', () => {
  it('returns "good" when base >= 80 and fresh snow > 0', () => {
    expect(getSnowQualityLevel(100, 5)).toBe('good');
    expect(getSnowQualityLevel(80, 1)).toBe('good');
  });

  it('returns "moderate" when base >= 80 but no fresh snow', () => {
    expect(getSnowQualityLevel(80, 0)).toBe('moderate');
    expect(getSnowQualityLevel(120, 0)).toBe('moderate');
  });

  it('returns "moderate" when base >= 40 and < 80', () => {
    expect(getSnowQualityLevel(60, 10)).toBe('moderate');
    expect(getSnowQualityLevel(40, 0)).toBe('moderate');
  });

  it('returns "poor" when base < 40', () => {
    expect(getSnowQualityLevel(30, 15)).toBe('poor');
    expect(getSnowQualityLevel(0, 0)).toBe('poor');
  });

  it('returns "poor" when base is null', () => {
    expect(getSnowQualityLevel(null, 25)).toBe('poor');
  });
});

// --- Unit tests for FactorIndicator ---

describe('FactorIndicator', () => {
  it('renders green dot for good level', () => {
    const { container } = render(<FactorIndicator level="good" label="Snow quality" />);
    const dot = container.querySelector('.bg-green-500');
    expect(dot).toBeInTheDocument();
  });

  it('renders yellow dot for moderate level', () => {
    const { container } = render(<FactorIndicator level="moderate" label="Snow quality" />);
    const dot = container.querySelector('.bg-yellow-500');
    expect(dot).toBeInTheDocument();
  });

  it('renders red dot for poor level', () => {
    const { container } = render(<FactorIndicator level="poor" label="Snow quality" />);
    const dot = container.querySelector('.bg-red-500');
    expect(dot).toBeInTheDocument();
  });

  it('has sr-only accessible label', () => {
    render(<FactorIndicator level="good" label="Snow quality" />);
    expect(screen.getByText('Snow quality: good')).toBeInTheDocument();
    expect(screen.getByText('Snow quality: good')).toHaveClass('sr-only');
  });
});

// --- Component tests for SnowConditions ---

describe('SnowConditions', () => {
  it('renders base snow, summit snow values', () => {
    render(
      <SnowConditions snowDepthBase={120} snowDepthSummit={180} freshSnow24h={0} />
    );

    expect(screen.getByText('120cm')).toBeInTheDocument();
    expect(screen.getByText('180cm')).toBeInTheDocument();
    expect(screen.getByText('Base')).toBeInTheDocument();
    expect(screen.getByText('Summit')).toBeInTheDocument();
  });

  it('renders fresh snow when freshSnow24h > 0', () => {
    render(
      <SnowConditions snowDepthBase={100} snowDepthSummit={150} freshSnow24h={15} />
    );

    expect(screen.getByText('+15cm')).toBeInTheDocument();
    expect(screen.getByText('Fresh (24h)')).toBeInTheDocument();
  });

  it('hides fresh snow row when freshSnow24h is 0', () => {
    render(
      <SnowConditions snowDepthBase={100} snowDepthSummit={150} freshSnow24h={0} />
    );

    expect(screen.queryByText('Fresh (24h)')).not.toBeInTheDocument();
  });

  it('renders Powder Alert badge when fresh_snow_24h > 20', () => {
    render(
      <SnowConditions snowDepthBase={100} snowDepthSummit={150} freshSnow24h={25} />
    );

    expect(screen.getByText('Powder Alert')).toBeInTheDocument();
  });

  it('does NOT render Powder Alert badge when fresh_snow_24h <= 20', () => {
    render(
      <SnowConditions snowDepthBase={100} snowDepthSummit={150} freshSnow24h={20} />
    );

    expect(screen.queryByText('Powder Alert')).not.toBeInTheDocument();
  });

  it('highlights fresh snow value text when powder alert is active', () => {
    render(
      <SnowConditions snowDepthBase={100} snowDepthSummit={150} freshSnow24h={25} />
    );

    const freshValue = screen.getByText('+25cm');
    expect(freshValue).toHaveClass('text-blue-600');
  });

  it('shows "?" fallback when snowDepthBase is null', () => {
    render(
      <SnowConditions snowDepthBase={null} snowDepthSummit={150} freshSnow24h={5} />
    );

    expect(screen.getByText('?cm')).toBeInTheDocument();
  });

  it('shows "?" fallback when snowDepthSummit is null', () => {
    render(
      <SnowConditions snowDepthBase={100} snowDepthSummit={null} freshSnow24h={5} />
    );

    // Base should show 100cm, summit should show ?cm
    expect(screen.getByText('100cm')).toBeInTheDocument();
    expect(screen.getByText('?cm')).toBeInTheDocument();
  });

  it('displays section header with Snow Conditions title', () => {
    render(
      <SnowConditions snowDepthBase={80} snowDepthSummit={120} freshSnow24h={0} />
    );

    expect(screen.getByText('Snow Conditions')).toBeInTheDocument();
  });

  it('shows factor indicator with correct level based on snow quality', () => {
    // Good: base >= 80 and fresh > 0
    const { container } = render(
      <SnowConditions snowDepthBase={100} snowDepthSummit={150} freshSnow24h={10} />
    );

    const greenDot = container.querySelector('.bg-green-500');
    expect(greenDot).toBeInTheDocument();
    expect(screen.getByText('Snow quality: good')).toBeInTheDocument();
  });

  it('shows poor indicator when snow data is null', () => {
    const { container } = render(
      <SnowConditions snowDepthBase={null} snowDepthSummit={null} freshSnow24h={0} />
    );

    const redDot = container.querySelector('.bg-red-500');
    expect(redDot).toBeInTheDocument();
    expect(screen.getByText('Snow quality: poor')).toBeInTheDocument();
  });

  it('exports POWDER_ALERT_THRESHOLD_CM as 20', () => {
    expect(POWDER_ALERT_THRESHOLD_CM).toBe(20);
  });
});
