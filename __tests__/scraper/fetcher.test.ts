import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BASE_URL, USER_AGENT, DELAY_MS, MAX_RETRIES } from '@/lib/scraper/fetcher';

// We need to re-import for each test to work with mocked timers properly
// Use dynamic import in tests that need timer control

describe('fetchResortPage', () => {
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

    const { fetchResortPage } = await import('@/lib/scraper/fetcher');
    await fetchResortPage('chamonix-mont-blanc');

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_URL}/chamonix-mont-blanc/`,
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
      text: () => Promise.resolve('<html>resort page</html>'),
    });

    const { fetchResortPage } = await import('@/lib/scraper/fetcher');
    const result = await fetchResortPage('test-resort');
    expect(result).toBe('<html>resort page</html>');
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

    const { fetchResortPage } = await import('@/lib/scraper/fetcher');
    const result = await fetchResortPage('test-resort');

    expect(result).toBe('<html>success</html>');
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it('throws after exhausting all retries', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const { fetchResortPage } = await import('@/lib/scraper/fetcher');
    await expect(fetchResortPage('test-resort')).rejects.toThrow('Network error');
  });

  it('throws on HTTP error status', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const { fetchResortPage } = await import('@/lib/scraper/fetcher');
    await expect(fetchResortPage('nonexistent')).rejects.toThrow('HTTP 404');
  });

  it('exports expected constants', () => {
    expect(BASE_URL).toBe('https://www.skiresort.info/ski-resort');
    expect(USER_AGENT).toContain('PeakPick');
    expect(DELAY_MS).toBe(1500);
    expect(MAX_RETRIES).toBe(2);
  });
});
