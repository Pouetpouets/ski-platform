import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CrowdLevelDisplay } from '@/components/resort/crowd-level-display';
import { getCrowdQualityLevel, formatCrowdLevel } from '@/lib/utils/conditions';

// --- Unit tests for getCrowdQualityLevel ---

describe('getCrowdQualityLevel', () => {
  it('returns "good" for low crowd', () => {
    expect(getCrowdQualityLevel('low')).toBe('good');
  });

  it('returns "moderate" for moderate crowd', () => {
    expect(getCrowdQualityLevel('moderate')).toBe('moderate');
  });

  it('returns "poor" for high crowd', () => {
    expect(getCrowdQualityLevel('high')).toBe('poor');
  });

  it('returns "poor" for very_high crowd', () => {
    expect(getCrowdQualityLevel('very_high')).toBe('poor');
  });
});

// --- Unit tests for formatCrowdLevel ---

describe('formatCrowdLevel', () => {
  it('capitalizes single word', () => {
    expect(formatCrowdLevel('low')).toBe('Low');
  });

  it('replaces underscores and capitalizes each word', () => {
    expect(formatCrowdLevel('very_high')).toBe('Very High');
  });

  it('capitalizes "moderate"', () => {
    expect(formatCrowdLevel('moderate')).toBe('Moderate');
  });

  it('capitalizes "high"', () => {
    expect(formatCrowdLevel('high')).toBe('High');
  });
});

// --- Component tests for CrowdLevelDisplay ---

describe('CrowdLevelDisplay', () => {
  it('renders section header with "Crowd Level" title', () => {
    render(<CrowdLevelDisplay crowdLevel="low" />);

    expect(screen.getByText('Crowd Level')).toBeInTheDocument();
  });

  it('displays formatted crowd level text', () => {
    render(<CrowdLevelDisplay crowdLevel="very_high" />);

    expect(screen.getByText('Very High')).toBeInTheDocument();
  });

  it('displays "Low" for low crowd level', () => {
    render(<CrowdLevelDisplay crowdLevel="low" />);

    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  it('shows green indicator for low crowd', () => {
    const { container } = render(<CrowdLevelDisplay crowdLevel="low" />);

    expect(container.querySelector('.bg-green-500')).toBeInTheDocument();
    expect(screen.getByText('Crowd level: good')).toBeInTheDocument();
  });

  it('shows yellow indicator for moderate crowd', () => {
    const { container } = render(<CrowdLevelDisplay crowdLevel="moderate" />);

    expect(container.querySelector('.bg-yellow-500')).toBeInTheDocument();
    expect(screen.getByText('Crowd level: moderate')).toBeInTheDocument();
  });

  it('shows red indicator for high crowd', () => {
    const { container } = render(<CrowdLevelDisplay crowdLevel="high" />);

    expect(container.querySelector('.bg-red-500')).toBeInTheDocument();
    expect(screen.getByText('Crowd level: poor')).toBeInTheDocument();
  });

  it('shows red indicator for very_high crowd', () => {
    const { container } = render(<CrowdLevelDisplay crowdLevel="very_high" />);

    expect(container.querySelector('.bg-red-500')).toBeInTheDocument();
    expect(screen.getByText('Crowd level: poor')).toBeInTheDocument();
  });

  it('shows factor indicator with sr-only accessible label', () => {
    render(<CrowdLevelDisplay crowdLevel="low" />);

    const srText = screen.getByText(/Crowd level:/);
    expect(srText).toHaveClass('sr-only');
  });
});
