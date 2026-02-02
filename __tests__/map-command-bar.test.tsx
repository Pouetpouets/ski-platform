import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MapCommandBar } from '@/components/map/map-command-bar';
import { ForecastDayProvider } from '@/lib/contexts/forecast-day-context';
import { ResortSearchProvider } from '@/lib/contexts/resort-search-context';

describe('MapCommandBar', () => {
  function renderBar(onSettingsOpen = vi.fn()) {
    return render(
      <ForecastDayProvider>
        <ResortSearchProvider>
          <MapCommandBar onSettingsOpen={onSettingsOpen} />
        </ResortSearchProvider>
      </ForecastDayProvider>
    );
  }

  it('renders 7 day pill buttons', () => {
    renderBar();
    // 7 day buttons + 1 settings button = 8
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(8);
  });

  it('renders a search input', () => {
    renderBar();
    const input = screen.getByPlaceholderText('map.searchResorts');
    expect(input).toBeInTheDocument();
  });

  it('renders a settings button', () => {
    renderBar();
    const settingsBtn = screen.getByLabelText('priorities.openSettings');
    expect(settingsBtn).toBeInTheDocument();
  });

  it('calls onSettingsOpen when settings button is clicked', () => {
    const onSettingsOpen = vi.fn();
    renderBar(onSettingsOpen);
    const settingsBtn = screen.getByLabelText('priorities.openSettings');
    fireEvent.click(settingsBtn);
    expect(onSettingsOpen).toHaveBeenCalledOnce();
  });

  it('allows typing in the search input', () => {
    renderBar();
    const input = screen.getByPlaceholderText('map.searchResorts') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Chamonix' } });
    expect(input.value).toBe('Chamonix');
  });
});
