import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResortDetailPanel } from '@/components/map/resort-detail-panel';
import { ForecastDayProvider } from '@/lib/contexts/forecast-day-context';
import type { ResortWithConditions } from '@/lib/types/database';
import type { DistanceInfo } from '@/lib/utils/distance';

// Helper to wrap component in required providers
function renderPanel(props: React.ComponentProps<typeof ResortDetailPanel>) {
  return render(
    <ForecastDayProvider>
      <ResortDetailPanel {...props} />
    </ForecastDayProvider>
  );
}

const mockResort: ResortWithConditions = {
  id: 'test-resort-1',
  name: 'Les Arcs',
  slug: 'les-arcs',
  latitude: 45.5708,
  longitude: 6.8281,
  altitude_min: 1200,
  altitude_max: 3226,
  country: 'France',
  region: 'Savoie',
  skiresort_info_slug: 'les-arcs-bourg-saint-maurice',
  website_url: 'https://www.lesarcs.com',
  webcam_url: 'https://www.lesarcs.com/webcams.html',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  conditions: {
    id: 'cond-1',
    resort_id: 'test-resort-1',
    snow_depth_base: 120,
    snow_depth_summit: 180,
    fresh_snow_24h: 15,
    slopes_open_km: 98,
    slopes_total_km: 106,
    lifts_open: 45,
    lifts_total: 51,
    crowd_level: 'low',
    weather_condition: 'sunny',
    temperature_min: -8,
    temperature_max: -2,
    adult_ticket_price: 59.0,
    parking_status: 'available',
    parking_price: 15.0,
    updated_at: '2024-01-01T00:00:00Z',
  },
};

const mockResortNoConditions: ResortWithConditions = {
  ...mockResort,
  id: 'test-resort-2',
  name: 'Test Resort',
  country: null,
  region: null,
  skiresort_info_slug: null,
  conditions: null,
  website_url: null,
  webcam_url: null,
};

const mockDistanceInfo: DistanceInfo = {
  distance: 165.3,
  formattedDistance: '165 km',
  drivingTime: '~3h 18min',
  fromLocation: 'Lyon',
};

describe('ResortDetailPanel', () => {
  it('renders nothing when resort is null', () => {
    const { container } = renderPanel({
      resort: null,
      isOpen: false,
      onClose: vi.fn(),
      factors: null,
      score: null,
      distanceInfo: null,
    });
    expect(container.innerHTML).toBe('');
  });

  it('does not render panel content when isOpen is false with a valid resort', () => {
    renderPanel({
      resort: mockResort,
      isOpen: false,
      onClose: vi.fn(),
      factors: null,
      score: 85,
      distanceInfo: mockDistanceInfo,
    });

    expect(screen.queryByText('Les Arcs')).not.toBeInTheDocument();
    expect(screen.queryByText('85%')).not.toBeInTheDocument();
  });

  it('renders resort name and altitude when open', () => {
    renderPanel({
      resort: mockResort,
      isOpen: true,
      onClose: vi.fn(),
      factors: null,
      score: 85,
      distanceInfo: mockDistanceInfo,
    });

    expect(screen.getByText('Les Arcs')).toBeInTheDocument();
    expect(screen.getByText('1200m - 3226m')).toBeInTheDocument();
  });

  it('renders score badge when score is provided', () => {
    renderPanel({
      resort: mockResort,
      isOpen: true,
      onClose: vi.fn(),
      factors: null,
      score: 85,
      distanceInfo: mockDistanceInfo,
    });

    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('renders conditions data correctly', () => {
    renderPanel({
      resort: mockResort,
      isOpen: true,
      onClose: vi.fn(),
      factors: null,
      score: 85,
      distanceInfo: mockDistanceInfo,
    });

    // Snow
    expect(screen.getByText('120cm')).toBeInTheDocument();
    expect(screen.getByText('180cm')).toBeInTheDocument();
    // Slopes
    expect(screen.getByText('98km / 106km')).toBeInTheDocument();
    // Lifts
    expect(screen.getByText('45/51')).toBeInTheDocument();
    // Crowd (formatted by CrowdLevelDisplay)
    expect(screen.getByText('Low')).toBeInTheDocument();
    // Price
    expect(screen.getByText(/€59/)).toBeInTheDocument();
    // Fresh snow
    expect(screen.getByText('+15cm')).toBeInTheDocument();
  });

  it('shows "No conditions data" when conditions is null', () => {
    renderPanel({
      resort: mockResortNoConditions,
      isOpen: true,
      onClose: vi.fn(),
      factors: null,
      score: 50,
      distanceInfo: mockDistanceInfo,
    });

    expect(screen.getByText('No conditions data available')).toBeInTheDocument();
  });

  it('renders distance info', () => {
    renderPanel({
      resort: mockResort,
      isOpen: true,
      onClose: vi.fn(),
      factors: null,
      score: 85,
      distanceInfo: mockDistanceInfo,
    });

    expect(screen.getByText('165 km')).toBeInTheDocument();
    expect(screen.getByText(/Lyon/)).toBeInTheDocument();
    expect(screen.getByText(/3h 18min/)).toBeInTheDocument();
  });

  it('renders website and webcam links when URLs present', () => {
    renderPanel({
      resort: mockResort,
      isOpen: true,
      onClose: vi.fn(),
      factors: null,
      score: 85,
      distanceInfo: mockDistanceInfo,
    });

    const websiteLink = screen.getByText('Website');
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink.closest('a')).toHaveAttribute('href', 'https://www.lesarcs.com');
    expect(websiteLink.closest('a')).toHaveAttribute('target', '_blank');

    const webcamLink = screen.getByText('Webcams');
    expect(webcamLink).toBeInTheDocument();
    expect(webcamLink.closest('a')).toHaveAttribute('href', 'https://www.lesarcs.com/webcams.html');
    expect(webcamLink.closest('a')).toHaveAttribute('target', '_blank');
  });

  it('hides links when URLs are null', () => {
    renderPanel({
      resort: mockResortNoConditions,
      isOpen: true,
      onClose: vi.fn(),
      factors: null,
      score: 50,
      distanceInfo: mockDistanceInfo,
    });

    expect(screen.queryByText('Website')).not.toBeInTheDocument();
    expect(screen.queryByText('Webcams')).not.toBeInTheDocument();
  });

  it('calls onClose when sheet is closed', () => {
    const onClose = vi.fn();

    renderPanel({
      resort: mockResort,
      isOpen: true,
      onClose,
      factors: null,
      score: 85,
      distanceInfo: mockDistanceInfo,
    });

    // The Sheet close button has sr-only "Close" text
    const closeButton = screen.getByText('Close').closest('button');
    closeButton?.click();

    expect(onClose).toHaveBeenCalled();
  });

  it('has accessible aria-label on sheet content', () => {
    renderPanel({
      resort: mockResort,
      isOpen: true,
      onClose: vi.fn(),
      factors: null,
      score: 85,
      distanceInfo: mockDistanceInfo,
    });

    const sheetContent = document.querySelector('[aria-label="Resort details"]');
    expect(sheetContent).toBeInTheDocument();
  });

  it('handles null altitude values gracefully', () => {
    const resortNoAltitude: ResortWithConditions = {
      ...mockResort,
      altitude_min: null,
      altitude_max: null,
    };

    renderPanel({
      resort: resortNoAltitude,
      isOpen: true,
      onClose: vi.fn(),
      factors: null,
      score: 85,
      distanceInfo: mockDistanceInfo,
    });

    expect(screen.getByText('Les Arcs')).toBeInTheDocument();
    // Should not render altitude when both are null
    expect(screen.queryByText(/null/)).not.toBeInTheDocument();
  });
});
