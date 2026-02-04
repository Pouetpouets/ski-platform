import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RunsLiftsStatus } from '@/components/resort/runs-lifts-status';
import { getRunsLiftsQualityLevel } from '@/lib/utils/conditions';

// --- Unit tests for getRunsLiftsQualityLevel ---

describe('getRunsLiftsQualityLevel', () => {
  it('returns "good" when combined open > 80%', () => {
    // 90/100 + 20/22 = 110/122 = 90.2%
    expect(getRunsLiftsQualityLevel(90, 100, 20, 22)).toBe('good');
  });

  it('returns "moderate" when combined open 50-80%', () => {
    // 30/50 + 10/20 = 40/70 = 57.1%
    expect(getRunsLiftsQualityLevel(30, 50, 10, 20)).toBe('moderate');
  });

  it('returns "poor" when combined open < 50%', () => {
    // 10/50 + 5/20 = 15/70 = 21.4%
    expect(getRunsLiftsQualityLevel(10, 50, 5, 20)).toBe('poor');
  });

  it('returns "poor" when total is 0 (division by zero)', () => {
    expect(getRunsLiftsQualityLevel(0, 0, 0, 0)).toBe('poor');
  });

  it('returns "moderate" at exactly 50%', () => {
    expect(getRunsLiftsQualityLevel(25, 50, 0, 0)).toBe('moderate');
  });

  it('returns "moderate" at exactly 80%', () => {
    // 80/100 = exactly 80%, threshold is > 80 for good
    expect(getRunsLiftsQualityLevel(80, 100, 0, 0)).toBe('moderate');
  });

  it('returns "good" at 81%', () => {
    // 81/100 = 81%
    expect(getRunsLiftsQualityLevel(81, 100, 0, 0)).toBe('good');
  });
});

// --- Component tests for RunsLiftsStatus ---

describe('RunsLiftsStatus', () => {
  it('renders slopes and lifts counts', () => {
    render(
      <RunsLiftsStatus slopesOpenKm={45} slopesTotalKm={52} liftsOpen={18} liftsTotal={22} />
    );

    expect(screen.getByText('45km / 52km')).toBeInTheDocument();
    expect(screen.getByText('18/22')).toBeInTheDocument();
    expect(screen.getByText('Runs')).toBeInTheDocument();
    expect(screen.getByText('Lifts')).toBeInTheDocument();
  });

  it('shows open percentages', () => {
    render(
      <RunsLiftsStatus slopesOpenKm={45} slopesTotalKm={52} liftsOpen={18} liftsTotal={22} />
    );

    // 45/52 = 86.5% → 87%
    expect(screen.getByText('87%')).toBeInTheDocument();
    // 18/22 = 81.8% → 82%
    expect(screen.getByText('82%')).toBeInTheDocument();
  });

  it('displays section header with Runs & Lifts title', () => {
    render(
      <RunsLiftsStatus slopesOpenKm={45} slopesTotalKm={52} liftsOpen={18} liftsTotal={22} />
    );

    expect(screen.getByText('Runs & Lifts')).toBeInTheDocument();
  });

  it('shows green indicator when > 80% open', () => {
    const { container } = render(
      <RunsLiftsStatus slopesOpenKm={90} slopesTotalKm={100} liftsOpen={20} liftsTotal={22} />
    );

    expect(container.querySelector('.bg-green-500')).toBeInTheDocument();
    expect(screen.getByText('Runs and lifts availability: good')).toBeInTheDocument();
  });

  it('shows yellow indicator when 50-80% open', () => {
    const { container } = render(
      <RunsLiftsStatus slopesOpenKm={30} slopesTotalKm={50} liftsOpen={10} liftsTotal={20} />
    );

    expect(container.querySelector('.bg-yellow-500')).toBeInTheDocument();
    expect(screen.getByText('Runs and lifts availability: moderate')).toBeInTheDocument();
  });

  it('shows red indicator when < 50% open', () => {
    const { container } = render(
      <RunsLiftsStatus slopesOpenKm={10} slopesTotalKm={50} liftsOpen={5} liftsTotal={20} />
    );

    expect(container.querySelector('.bg-red-500')).toBeInTheDocument();
    expect(screen.getByText('Runs and lifts availability: poor')).toBeInTheDocument();
  });

  it('handles division by zero gracefully (total = 0)', () => {
    render(
      <RunsLiftsStatus slopesOpenKm={0} slopesTotalKm={0} liftsOpen={0} liftsTotal={0} />
    );

    expect(screen.getByText('0km / 0km')).toBeInTheDocument();
    expect(screen.getByText('0/0')).toBeInTheDocument();
    expect(screen.getAllByText('0%')).toHaveLength(2);
    expect(screen.getByText('Runs and lifts availability: poor')).toBeInTheDocument();
  });

  it('shows factor indicator with sr-only accessible label', () => {
    render(
      <RunsLiftsStatus slopesOpenKm={45} slopesTotalKm={52} liftsOpen={18} liftsTotal={22} />
    );

    const srText = screen.getByText(/Runs and lifts availability:/);
    expect(srText).toHaveClass('sr-only');
  });
});
