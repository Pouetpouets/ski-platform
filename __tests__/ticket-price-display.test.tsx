import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TicketPriceDisplay } from '@/components/resort/ticket-price-display';
import { getPriceQualityLevel } from '@/lib/utils/conditions';

// --- Unit tests for getPriceQualityLevel ---

describe('getPriceQualityLevel', () => {
  it('returns "good" for price < €45', () => {
    expect(getPriceQualityLevel(42)).toBe('good');
  });

  it('returns "moderate" for price at €45', () => {
    expect(getPriceQualityLevel(45)).toBe('moderate');
  });

  it('returns "moderate" for price at €55', () => {
    expect(getPriceQualityLevel(55)).toBe('moderate');
  });

  it('returns "poor" for price > €55', () => {
    expect(getPriceQualityLevel(68)).toBe('poor');
  });

  it('returns "moderate" for null price', () => {
    expect(getPriceQualityLevel(null)).toBe('moderate');
  });

  it('returns "good" for free (€0)', () => {
    expect(getPriceQualityLevel(0)).toBe('good');
  });
});

// --- Component tests for TicketPriceDisplay ---

describe('TicketPriceDisplay', () => {
  it('renders section header with "Lift Ticket" title', () => {
    render(<TicketPriceDisplay adultTicketPrice={54} />);

    expect(screen.getByText('Lift Ticket')).toBeInTheDocument();
  });

  it('displays price with euro sign and label', () => {
    render(<TicketPriceDisplay adultTicketPrice={54} />);

    expect(screen.getByText('€54 adult day pass')).toBeInTheDocument();
  });

  it('shows green indicator for budget price (< €45)', () => {
    const { container } = render(<TicketPriceDisplay adultTicketPrice={42} />);

    expect(container.querySelector('.bg-green-500')).toBeInTheDocument();
    expect(screen.getByText('Lift ticket price: good')).toBeInTheDocument();
  });

  it('shows yellow indicator for average price (€45-€55)', () => {
    const { container } = render(<TicketPriceDisplay adultTicketPrice={50} />);

    expect(container.querySelector('.bg-yellow-500')).toBeInTheDocument();
    expect(screen.getByText('Lift ticket price: moderate')).toBeInTheDocument();
  });

  it('shows red indicator for premium price (> €55)', () => {
    const { container } = render(<TicketPriceDisplay adultTicketPrice={68} />);

    expect(container.querySelector('.bg-red-500')).toBeInTheDocument();
    expect(screen.getByText('Lift ticket price: poor')).toBeInTheDocument();
  });

  it('returns null when price is null', () => {
    const { container } = render(<TicketPriceDisplay adultTicketPrice={null} />);

    expect(container.firstChild).toBeNull();
  });

  it('shows factor indicator with sr-only accessible label', () => {
    render(<TicketPriceDisplay adultTicketPrice={54} />);

    const srText = screen.getByText(/Lift ticket price:/);
    expect(srText).toHaveClass('sr-only');
  });
});
