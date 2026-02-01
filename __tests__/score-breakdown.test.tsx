import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScoreBreakdown } from '@/components/resort/score-breakdown';
import type { FactorScores } from '@/lib/utils/score';

const mockFactors: FactorScores = {
  snow: 85,
  crowd: 70,
  weather: 100,
  price: 50,
  distance: 75,
  parking: 60,
};

describe('ScoreBreakdown', () => {
  it('renders "Score Breakdown" heading', () => {
    render(<ScoreBreakdown factors={mockFactors} />);

    expect(screen.getByText('Score Breakdown')).toBeInTheDocument();
  });

  it('displays all 6 factor names', () => {
    render(<ScoreBreakdown factors={mockFactors} />);

    expect(screen.getByText(/Snow/)).toBeInTheDocument();
    expect(screen.getByText(/Crowd/)).toBeInTheDocument();
    expect(screen.getByText(/Weather/)).toBeInTheDocument();
    expect(screen.getByText(/Price/)).toBeInTheDocument();
    expect(screen.getByText(/Distance/)).toBeInTheDocument();
    expect(screen.getByText(/Parking/)).toBeInTheDocument();
  });

  it('displays individual scores as X/100', () => {
    render(<ScoreBreakdown factors={mockFactors} />);

    expect(screen.getByText('85/100')).toBeInTheDocument();
    expect(screen.getByText('100/100')).toBeInTheDocument();
    expect(screen.getByText('50/100')).toBeInTheDocument();
  });

  it('renders progress bars for each factor', () => {
    const { container } = render(<ScoreBreakdown factors={mockFactors} />);

    const progressBars = container.querySelectorAll('[role="progressbar"]');
    expect(progressBars).toHaveLength(6);
  });

  it('progress bars have correct aria values', () => {
    const { container } = render(<ScoreBreakdown factors={{ ...mockFactors, snow: 85 }} />);

    const snowBar = container.querySelector('[aria-label="Snow score"]');
    expect(snowBar).toBeInTheDocument();
    expect(snowBar).toHaveAttribute('aria-valuenow', '85');
    expect(snowBar).toHaveAttribute('aria-valuemin', '0');
    expect(snowBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('sorts factors by contribution (highest first)', () => {
    const factors: FactorScores = {
      snow: 10,
      crowd: 90,
      weather: 50,
      price: 30,
      distance: 70,
      parking: 20,
    };

    const { container } = render(<ScoreBreakdown factors={factors} />);

    const labels = container.querySelectorAll('[role="progressbar"]');
    // With priority weights, contribution = score * weight, sorted desc:
    // crowd(90*0.25=22.5), weather(50*0.20=10), distance(70*0.08=5.6), price(30*0.12=3.6), snow(10*0.30=3), parking(20*0.05=1)
    const ariaValues = Array.from(labels).map((el) => Number(el.getAttribute('aria-valuenow')));
    expect(ariaValues).toEqual([90, 50, 70, 30, 10, 20]);
  });

  it('applies green color for scores >= 80', () => {
    const factors: FactorScores = { snow: 85, crowd: 0, weather: 0, price: 0, distance: 0, parking: 0 };
    const { container } = render(<ScoreBreakdown factors={factors} />);

    const snowBar = container.querySelector('[aria-label="Snow score"]');
    expect(snowBar).toHaveClass('bg-green-500');
  });

  it('applies red color for scores < 40', () => {
    const factors: FactorScores = { snow: 20, crowd: 100, weather: 100, price: 100, distance: 100, parking: 100 };
    const { container } = render(<ScoreBreakdown factors={factors} />);

    const snowBar = container.querySelector('[aria-label="Snow score"]');
    expect(snowBar).toHaveClass('bg-red-500');
  });
});
