import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PrioritiesProvider, usePriorities, STORAGE_KEY } from '@/lib/contexts/priorities-context';
import { DEFAULT_PRIORITY_ORDER } from '@/lib/utils/score';
import type { FactorName } from '@/lib/utils/score';

// Mock the DB preferences module (not authenticated in tests)
vi.mock('@/lib/data/preferences', () => ({
  fetchUserPriorities: vi.fn().mockResolvedValue(null),
  saveUserPriorities: vi.fn().mockResolvedValue(false),
}));

// Helper component to display and interact with context
function PrioritiesDisplay() {
  const { priorityOrder, weights, setPriorityOrder } = usePriorities();
  return (
    <div>
      <div data-testid="order">{priorityOrder.join(',')}</div>
      <div data-testid="first-weight">{weights[priorityOrder[0]]}</div>
      <button
        data-testid="reorder"
        onClick={() => setPriorityOrder(['price', 'distance', 'snow', 'weather'])}
      >
        Reorder
      </button>
      <button
        data-testid="reset"
        onClick={() => setPriorityOrder([...DEFAULT_PRIORITY_ORDER])}
      >
        Reset
      </button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <PrioritiesProvider>
      <PrioritiesDisplay />
    </PrioritiesProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
});

describe('PrioritiesContext', () => {
  it('provides default priority order', () => {
    renderWithProvider();

    expect(screen.getByTestId('order').textContent).toBe(DEFAULT_PRIORITY_ORDER.join(','));
  });

  it('provides correct weight for first priority', () => {
    renderWithProvider();

    expect(screen.getByTestId('first-weight').textContent).toBe('0.35');
  });

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<PrioritiesDisplay />);
    }).toThrow('usePriorities must be used within a PrioritiesProvider');

    spy.mockRestore();
  });
});

describe('localStorage persistence', () => {
  it('saves to localStorage when priority order changes', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByTestId('reorder'));

    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).toBe(JSON.stringify(['price', 'distance', 'snow', 'weather']));
  });

  it('uses correct storage key', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByTestId('reorder'));

    expect(STORAGE_KEY).toBe('peakpick-priorities');
    expect(localStorage.getItem('peakpick-priorities')).not.toBeNull();
  });

  it('loads saved priorities from localStorage on mount', async () => {
    const customOrder: FactorName[] = ['distance', 'price', 'weather', 'snow'];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customOrder));

    renderWithProvider();

    // useEffect runs async, wait for it
    await act(async () => {});

    expect(screen.getByTestId('order').textContent).toBe(customOrder.join(','));
  });

  it('uses default when localStorage is empty', () => {
    renderWithProvider();

    expect(screen.getByTestId('order').textContent).toBe(DEFAULT_PRIORITY_ORDER.join(','));
  });

  it('uses default when localStorage has invalid JSON', async () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json');

    renderWithProvider();
    await act(async () => {});

    expect(screen.getByTestId('order').textContent).toBe(DEFAULT_PRIORITY_ORDER.join(','));
  });

  it('uses default when localStorage has wrong number of items', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['snow', 'weather']));

    renderWithProvider();
    await act(async () => {});

    expect(screen.getByTestId('order').textContent).toBe(DEFAULT_PRIORITY_ORDER.join(','));
  });

  it('uses default when localStorage has duplicate items', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['snow', 'snow', 'snow', 'snow']));

    renderWithProvider();
    await act(async () => {});

    expect(screen.getByTestId('order').textContent).toBe(DEFAULT_PRIORITY_ORDER.join(','));
  });

  it('uses default when localStorage has unknown factor names', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['snow', 'weather', 'price', 'unknown']));

    renderWithProvider();
    await act(async () => {});

    expect(screen.getByTestId('order').textContent).toBe(DEFAULT_PRIORITY_ORDER.join(','));
  });

  it('updates localStorage when resetting to default', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    // First reorder
    await user.click(screen.getByTestId('reorder'));
    expect(localStorage.getItem(STORAGE_KEY)).toBe(
      JSON.stringify(['price', 'distance', 'snow', 'weather'])
    );

    // Then reset
    await user.click(screen.getByTestId('reset'));
    expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(DEFAULT_PRIORITY_ORDER));
  });
});
