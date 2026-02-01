import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ParkingDisplay } from '@/components/resort/parking-display';
import { getParkingQualityLevel, formatParkingStatus } from '@/lib/utils/conditions';

// --- Unit tests for getParkingQualityLevel ---

describe('getParkingQualityLevel', () => {
  it('returns "good" for available and free', () => {
    expect(getParkingQualityLevel('available', 0)).toBe('good');
  });

  it('returns "good" for available with null price', () => {
    expect(getParkingQualityLevel('available', null)).toBe('good');
  });

  it('returns "moderate" for available and paid', () => {
    expect(getParkingQualityLevel('available', 15)).toBe('moderate');
  });

  it('returns "moderate" for limited status', () => {
    expect(getParkingQualityLevel('limited', 20)).toBe('moderate');
  });

  it('returns "moderate" for limited with null price', () => {
    expect(getParkingQualityLevel('limited', null)).toBe('moderate');
  });

  it('returns "poor" for full status', () => {
    expect(getParkingQualityLevel('full', 25)).toBe('poor');
  });

  it('returns "poor" for full even if free', () => {
    expect(getParkingQualityLevel('full', 0)).toBe('poor');
  });
});

// --- Unit tests for formatParkingStatus ---

describe('formatParkingStatus', () => {
  it('capitalizes "available"', () => {
    expect(formatParkingStatus('available')).toBe('Available');
  });

  it('capitalizes "limited"', () => {
    expect(formatParkingStatus('limited')).toBe('Limited');
  });

  it('capitalizes "full"', () => {
    expect(formatParkingStatus('full')).toBe('Full');
  });
});

// --- Component tests for ParkingDisplay ---

describe('ParkingDisplay', () => {
  it('renders section header with "Parking" title', () => {
    render(<ParkingDisplay parkingStatus="available" parkingPrice={10} />);

    expect(screen.getByText('Parking')).toBeInTheDocument();
  });

  it('displays formatted parking status', () => {
    render(<ParkingDisplay parkingStatus="available" parkingPrice={10} />);

    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('displays parking price with euro sign', () => {
    render(<ParkingDisplay parkingStatus="available" parkingPrice={15} />);

    expect(screen.getByText('€15/day')).toBeInTheDocument();
  });

  it('displays "Free" when price is 0', () => {
    render(<ParkingDisplay parkingStatus="available" parkingPrice={0} />);

    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('hides price when null', () => {
    render(<ParkingDisplay parkingStatus="available" parkingPrice={null} />);

    expect(screen.queryByText(/€/)).not.toBeInTheDocument();
    expect(screen.queryByText('Free')).not.toBeInTheDocument();
  });

  it('shows green indicator for available + free', () => {
    const { container } = render(
      <ParkingDisplay parkingStatus="available" parkingPrice={0} />
    );

    expect(container.querySelector('.bg-green-500')).toBeInTheDocument();
    expect(screen.getByText('Parking: good')).toBeInTheDocument();
  });

  it('shows yellow indicator for limited', () => {
    const { container } = render(
      <ParkingDisplay parkingStatus="limited" parkingPrice={20} />
    );

    expect(container.querySelector('.bg-yellow-500')).toBeInTheDocument();
    expect(screen.getByText('Parking: moderate')).toBeInTheDocument();
  });

  it('shows red indicator for full', () => {
    const { container } = render(
      <ParkingDisplay parkingStatus="full" parkingPrice={25} />
    );

    expect(container.querySelector('.bg-red-500')).toBeInTheDocument();
    expect(screen.getByText('Parking: poor')).toBeInTheDocument();
  });

  it('shows factor indicator with sr-only accessible label', () => {
    render(<ParkingDisplay parkingStatus="available" parkingPrice={10} />);

    const srText = screen.getByText(/Parking:/);
    expect(srText).toHaveClass('sr-only');
  });
});
