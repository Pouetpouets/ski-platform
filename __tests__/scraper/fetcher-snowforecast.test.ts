import { describe, it, expect, vi, afterEach } from 'vitest';
import { BASE_URL, USER_AGENT, DELAY_MS, MAX_RETRIES } from '@/lib/scraper/fetcher-snowforecast';

describe('fetchSnowForecastPage', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('fetches the correct URL for a given slug', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('<html>test</html>'),
    });
    globalThis.fetch = mockFetch;

    const { fetchSnowForecastPage } = await import('@/lib/scraper/fetcher-snowforecast');
    await fetchSnowForecastPage('Chamonix');

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_URL}/Chamonix/6day/mid`,
      expect.objectContaining({
        headers: expect.objectContaining({
          'User-Agent': USER_AGENT,
        }),
      })
    );
  });

  it('returns HTML on successful response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('<html>snow forecast page</html>'),
    });

    const { fetchSnowForecastPage } = await import('@/lib/scraper/fetcher-snowforecast');
    const result = await fetchSnowForecastPage('Val-Thorens');
    expect(result).toBe('<html>snow forecast page</html>');
  });

  it('retries on failure up to MAX_RETRIES times', async () => {
    const mockFetch = vi.fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('<html>success</html>'),
      });
    globalThis.fetch = mockFetch;

    const { fetchSnowForecastPage } = await import('@/lib/scraper/fetcher-snowforecast');
    const result = await fetchSnowForecastPage('test-resort');

    expect(result).toBe('<html>success</html>');
    expect(mockFetch).toHaveBeenCalledTimes(3);
  }, 15000); // Extended timeout for retry delays

  it('throws after exhausting all retries', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const { fetchSnowForecastPage } = await import('@/lib/scraper/fetcher-snowforecast');
    await expect(fetchSnowForecastPage('test-resort')).rejects.toThrow('Network error');
  }, 15000); // Extended timeout for retry delays

  it('throws on HTTP error status', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const { fetchSnowForecastPage } = await import('@/lib/scraper/fetcher-snowforecast');
    await expect(fetchSnowForecastPage('nonexistent')).rejects.toThrow('HTTP 404');
  }, 15000); // Extended timeout for retry delays

  it('exports expected constants', () => {
    expect(BASE_URL).toBe('https://www.snow-forecast.com/resorts');
    expect(USER_AGENT).toContain('PeakPick');
    expect(DELAY_MS).toBe(2000); // Slightly longer for backup source
    expect(MAX_RETRIES).toBe(2);
  });
});
