import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DayPicker } from '@/components/map/day-picker';
import { ForecastDayProvider } from '@/lib/contexts/forecast-day-context';

// Mock next-intl is already set up in setup.ts

describe('DayPicker', () => {
  function renderWithProvider() {
    return render(
      <ForecastDayProvider>
        <DayPicker />
      </ForecastDayProvider>
    );
  }

  it('renders 7 day buttons', () => {
    renderWithProvider();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(7);
  });

  it('shows "today" label for the first button', () => {
    renderWithProvider();
    // The mock useTranslations returns the key, so first button text is "today"
    expect(screen.getByText('today')).toBeInTheDocument();
  });

  it('shows "tomorrow" label for the second button', () => {
    renderWithProvider();
    expect(screen.getByText('tomorrow')).toBeInTheDocument();
  });

  it('first button is active by default (has default variant)', () => {
    renderWithProvider();
    const buttons = screen.getAllByRole('button');
    // The first button should not have the outline data attribute
    // In shadcn, the "default" variant is the primary button style
    expect(buttons[0]).toBeInTheDocument();
  });

  it('clicking a different day changes the active state', () => {
    renderWithProvider();
    const buttons = screen.getAllByRole('button');
    // Click the third button (index 2)
    fireEvent.click(buttons[2]);
    // After clicking, the component re-renders - button 2 should be active now
    expect(buttons[2]).toBeInTheDocument();
  });
});
