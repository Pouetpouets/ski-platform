import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PrioritySettingsPanel } from '@/components/map/priority-settings-panel';
import { PrioritiesProvider } from '@/lib/contexts/priorities-context';
import { DEFAULT_PRIORITY_ORDER, PRIORITY_WEIGHT_DISTRIBUTION } from '@/lib/utils/score';

// Mock the DB preferences module
vi.mock('@/lib/data/preferences', () => ({
  fetchUserPriorities: vi.fn().mockResolvedValue(null),
  saveUserPriorities: vi.fn().mockResolvedValue(false),
}));

beforeEach(() => {
  localStorage.clear();
});

function renderPanel(isOpen = true) {
  const onClose = vi.fn();
  const result = render(
    <PrioritiesProvider>
      <PrioritySettingsPanel isOpen={isOpen} onClose={onClose} />
    </PrioritiesProvider>
  );
  return { ...result, onClose };
}

describe('PrioritySettingsPanel', () => {
  it('renders title and description when open', () => {
    renderPanel();

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
  });

  it('renders nothing visible when closed', () => {
    renderPanel(false);

    expect(screen.queryByText('title')).not.toBeInTheDocument();
  });

  it('displays all 6 factors', () => {
    renderPanel();

    // Mock useTranslations returns the key, so factor names are their keys
    for (const name of DEFAULT_PRIORITY_ORDER) {
      expect(screen.getByTestId(`priority-item-${name}`)).toBeInTheDocument();
    }
  });

  it('displays rank numbers 1-6', () => {
    renderPanel();

    const items = screen.getAllByTestId(/priority-item-/);
    expect(items).toHaveLength(6);

    for (let i = 0; i < 6; i++) {
      expect(within(items[i]).getByText(String(i + 1))).toBeInTheDocument();
    }
  });

  it('displays weight percentages', () => {
    renderPanel();

    for (const weight of PRIORITY_WEIGHT_DISTRIBUTION) {
      expect(screen.getByText(`${Math.round(weight * 100)}%`)).toBeInTheDocument();
    }
  });

  it('displays factor descriptions', () => {
    renderPanel();

    expect(screen.getByText('snowDesc')).toBeInTheDocument();
    expect(screen.getByText('crowdDesc')).toBeInTheDocument();
  });

  it('has drag handles for each factor', () => {
    renderPanel();

    // Mock returns "dragLabel {factorKey}" for parameterized translations
    for (const name of DEFAULT_PRIORITY_ORDER) {
      expect(screen.getByLabelText(`dragLabel ${name}`)).toBeInTheDocument();
    }
  });

  it('has up/down buttons for each factor', () => {
    renderPanel();

    for (const name of DEFAULT_PRIORITY_ORDER) {
      expect(screen.getByLabelText(`moveUp ${name}`)).toBeInTheDocument();
      expect(screen.getByLabelText(`moveDown ${name}`)).toBeInTheDocument();
    }
  });

  it('disables up button for first item', () => {
    renderPanel();

    const firstFactor = DEFAULT_PRIORITY_ORDER[0];
    const upButton = screen.getByLabelText(`moveUp ${firstFactor}`);
    expect(upButton).toBeDisabled();
  });

  it('disables down button for last item', () => {
    renderPanel();

    const lastFactor = DEFAULT_PRIORITY_ORDER[5];
    const downButton = screen.getByLabelText(`moveDown ${lastFactor}`);
    expect(downButton).toBeDisabled();
  });

  it('moves factor up when clicking up button', async () => {
    const user = userEvent.setup();
    renderPanel();

    // Second factor is 'crowd' by default - move it up
    const upButton = screen.getByLabelText('moveUp crowd');
    await user.click(upButton);

    // Now crowd should be first (rank 1)
    const items = screen.getAllByTestId(/priority-item-/);
    expect(items[0]).toHaveAttribute('data-testid', 'priority-item-crowd');
    expect(items[1]).toHaveAttribute('data-testid', 'priority-item-snow');
  });

  it('moves factor down when clicking down button', async () => {
    const user = userEvent.setup();
    renderPanel();

    // First factor is 'snow' by default - move it down
    const downButton = screen.getByLabelText('moveDown snow');
    await user.click(downButton);

    const items = screen.getAllByTestId(/priority-item-/);
    expect(items[0]).toHaveAttribute('data-testid', 'priority-item-crowd');
    expect(items[1]).toHaveAttribute('data-testid', 'priority-item-snow');
  });

  it('has a Reset to Default button', () => {
    renderPanel();

    expect(screen.getByText('resetToDefault')).toBeInTheDocument();
  });

  it('disables Reset to Default when order is default', () => {
    renderPanel();

    const resetButton = screen.getByText('resetToDefault');
    expect(resetButton.closest('button')).toBeDisabled();
  });

  it('enables Reset to Default after reordering', async () => {
    const user = userEvent.setup();
    renderPanel();

    // Move crowd up to change order
    await user.click(screen.getByLabelText('moveUp crowd'));

    const resetButton = screen.getByText('resetToDefault');
    expect(resetButton.closest('button')).not.toBeDisabled();
  });

  it('restores default order when Reset is clicked', async () => {
    const user = userEvent.setup();
    renderPanel();

    // Change order
    await user.click(screen.getByLabelText('moveUp crowd'));

    // Verify changed
    let items = screen.getAllByTestId(/priority-item-/);
    expect(items[0]).toHaveAttribute('data-testid', 'priority-item-crowd');

    // Reset
    await user.click(screen.getByText('resetToDefault'));

    // Verify back to default
    items = screen.getAllByTestId(/priority-item-/);
    expect(items[0]).toHaveAttribute('data-testid', 'priority-item-snow');
    expect(items[1]).toHaveAttribute('data-testid', 'priority-item-crowd');
  });

  it('weight percentages update when order changes', async () => {
    const user = userEvent.setup();
    renderPanel();

    // Snow is first, should have 30%
    const snowItem = screen.getByTestId('priority-item-snow');
    expect(within(snowItem).getByText('30%')).toBeInTheDocument();

    // Move snow down
    await user.click(screen.getByLabelText('moveDown snow'));

    // Snow is now second, should have 25%
    const snowItemAfter = screen.getByTestId('priority-item-snow');
    expect(within(snowItemAfter).getByText('25%')).toBeInTheDocument();
  });
});
