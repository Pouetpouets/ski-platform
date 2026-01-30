import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkiMapWrapper } from '@/components/map/ski-map-wrapper';
import type { ResortWithConditions } from '@/lib/types/database';
import fs from 'fs';
import path from 'path';

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

describe('App Initialization (Story 1-1)', () => {
  it('App Router directory structure exists', () => {
    const appDir = path.resolve(__dirname, '../app');
    expect(fs.existsSync(path.join(appDir, 'layout.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(appDir, 'page.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(appDir, 'globals.css'))).toBe(true);
  });

  it('.env.example contains required variables', () => {
    const envExample = fs.readFileSync(
      path.resolve(__dirname, '../.env.example'),
      'utf-8'
    );
    expect(envExample).toContain('NEXT_PUBLIC_SUPABASE_URL=');
    expect(envExample).toContain('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=');
    expect(envExample).toContain('NEXT_PUBLIC_MAPBOX_TOKEN=');
  });

  it('.gitignore excludes .env.local', () => {
    const gitignore = fs.readFileSync(
      path.resolve(__dirname, '../.gitignore'),
      'utf-8'
    );
    expect(gitignore).toContain('.env*.local');
  });
});

describe('SkiMapWrapper Component', () => {
  it('renders without crashing', () => {
    render(<SkiMapWrapper resorts={[]} />);
    expect(document.body).toBeDefined();
  });

  it('shows mapbox token error when token not configured', () => {
    render(<SkiMapWrapper resorts={mockResorts} />);
    expect(screen.getByText(/Mapbox token not configured/i)).toBeDefined();
  });
});
