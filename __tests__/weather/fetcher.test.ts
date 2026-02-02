import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchForecast } from '@/lib/weather/fetcher';

const mockResponse = {
  latitude: 45.9,
  longitude: 6.87,
  timezone: 'Europe/Paris',
  daily: {
    time: ['2026-02-02', '2026-02-03', '2026-02-04'],
    weather_code: [0, 71, 3],
    temperature_2m_max: [2.5, -1.0, 0.5],
    temperature_2m_min: [-5.0, -8.0, -4.0],
    precipitation_sum: [0.0, 5.2, 0.1],
    snowfall_sum: [0.0, 8.0, 0.0],
    wind_speed_10m_max: [15.0, 35.0, 20.0],
    wind_gusts_10m_max: [25.0, 55.0, 30.0],
    uv_index_max: [4.5, 1.0, 3.0],
  },
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('fetchForecast', () => {
  it('parses Open-Meteo response correctly', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 })
    );

    const days = await fetchForecast(45.9, 6.87);

    expect(days).toHaveLength(3);
    expect(days[0]).toEqual({
      date: '2026-02-02',
      weatherCode: 0,
      weatherCondition: 'sunny',
      temperatureMin: -5.0,
      temperatureMax: 2.5,
      precipitationSum: 0.0,
      snowfallSum: 0.0,
      windSpeedMax: 15.0,
      windGustsMax: 25.0,
      uvIndexMax: 4.5,
    });

    expect(days[1].weatherCondition).toBe('snowing');
    expect(days[2].weatherCondition).toBe('cloudy');
  });

  it('throws on non-OK response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('Rate limited', { status: 429, statusText: 'Too Many Requests' })
    );

    await expect(fetchForecast(45.9, 6.87)).rejects.toThrow('Open-Meteo API error: 429');
  });

  it('calls the correct URL', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 })
    );

    await fetchForecast(46.0, 7.5);

    const url = fetchSpy.mock.calls[0][0] as string;
    expect(url).toContain('latitude=46');
    expect(url).toContain('longitude=7.5');
    expect(url).toContain('forecast_days=7');
    expect(url).toContain('weather_code');
  });
});
