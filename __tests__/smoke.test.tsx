import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkiMapWrapper } from '@/components/map/ski-map-wrapper';
import type { ResortWithConditions } from '@/lib/types/database';

// Mock resorts data for testing
const mockResorts: ResortWithConditions[] = [
  {
    id: 'test-resort-1',
    name: 'Test Resort',
    slug: 'test-resort',
    latitude: 45.5,
    longitude: 6.5,
    altitude_min: 1200,
    altitude_max: 3000,
    website_url: 'https://test.com',
    webcam_url: 'https://test.com/webcam',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    conditions: null,
  },
];

describe('Smoke Tests', () => {
  describe('SkiMapWrapper Component', () => {
    it('renders without crashing', () => {
      // Note: SkiMap shows Mapbox error since token isn't set in tests
      render(<SkiMapWrapper resorts={[]} />);
      // Should render the component without throwing
      expect(document.body).toBeDefined();
    });

    it('shows mapbox token error when token not configured', () => {
      render(<SkiMapWrapper resorts={mockResorts} />);
      expect(screen.getByText(/Mapbox token not configured/i)).toBeDefined();
    });
  });
});
