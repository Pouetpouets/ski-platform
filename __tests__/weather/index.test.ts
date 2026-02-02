import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the fetcher module before importing the orchestrator
vi.mock('@/lib/weather/fetcher', () => ({
  fetchForecast: vi.fn(),
}));

import { fetchAllForecasts } from '@/lib/weather';
import { fetchForecast } from '@/lib/weather/fetcher';

const mockFetchForecast = vi.mocked(fetchForecast);

function createMockSupabase(resorts: Array<{ id: string; name: string; latitude: number; longitude: number }>) {
  const upsertFn = vi.fn().mockResolvedValue({ error: null });
  const deleteFn = vi.fn().mockReturnValue({
    lt: vi.fn().mockResolvedValue({ error: null }),
  });

  return {
    from: vi.fn((table: string) => {
      if (table === 'resorts') {
        return {
          select: vi.fn().mockResolvedValue({ data: resorts, error: null }),
        };
      }
      if (table === 'resort_weather_forecasts') {
        return {
          upsert: upsertFn,
          delete: deleteFn,
        };
      }
      return {};
    }),
    _upsertFn: upsertFn,
    _deleteFn: deleteFn,
  } as unknown as Parameters<typeof fetchAllForecasts>[0];
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('fetchAllForecasts', () => {
  it('fetches forecasts for all resorts and returns success count', async () => {
    const resorts = [
      { id: 'r1', name: 'Resort A', latitude: 45.0, longitude: 6.0 },
      { id: 'r2', name: 'Resort B', latitude: 46.0, longitude: 7.0 },
    ];

    mockFetchForecast.mockResolvedValue([
      {
        date: '2026-02-02',
        weatherCode: 0,
        weatherCondition: 'sunny',
        temperatureMin: -5,
        temperatureMax: 2,
        precipitationSum: 0,
        snowfallSum: 0,
        windSpeedMax: 10,
        windGustsMax: 20,
        uvIndexMax: 3,
      },
    ]);

    const supabase = createMockSupabase(resorts);
    const result = await fetchAllForecasts(supabase);

    expect(result.success).toHaveLength(2);
    expect(result.failed).toHaveLength(0);
    expect(mockFetchForecast).toHaveBeenCalledTimes(2);
  });

  it('records failures when fetchForecast throws', async () => {
    const resorts = [
      { id: 'r1', name: 'Resort A', latitude: 45.0, longitude: 6.0 },
    ];

    mockFetchForecast.mockRejectedValue(new Error('Network error'));

    const supabase = createMockSupabase(resorts);
    const result = await fetchAllForecasts(supabase);

    expect(result.success).toHaveLength(0);
    expect(result.failed).toHaveLength(1);
    expect(result.failed[0].error).toBe('Network error');
  });

  it('throws if resorts query fails', async () => {
    const supabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockResolvedValue({ data: null, error: { message: 'DB error' } }),
      }),
    } as unknown as Parameters<typeof fetchAllForecasts>[0];

    await expect(fetchAllForecasts(supabase)).rejects.toThrow('Failed to load resorts');
  });
});
