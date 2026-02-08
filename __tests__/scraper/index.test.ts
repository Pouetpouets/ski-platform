import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the fetchers and parsers
vi.mock('@/lib/scraper/fetcher', () => ({
  fetchResortPage: vi.fn(),
  rateLimitDelay: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/lib/scraper/fetcher-snowforecast', () => ({
  fetchSnowForecastPage: vi.fn(),
  rateLimitDelaySnowForecast: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/lib/scraper/parser', () => ({
  parseConditionsPage: vi.fn(),
}));

vi.mock('@/lib/scraper/parser-snowforecast', () => ({
  parseSnowForecastPage: vi.fn(),
}));

vi.mock('@/lib/scraper/mapper', () => ({
  mapToConditionsUpdate: vi.fn((data) => {
    // Return non-empty object if data has values
    if (data.snowDepthBase !== null || data.snowDepthSummit !== null) {
      return { snow_depth_base: data.snowDepthBase, snow_depth_summit: data.snowDepthSummit };
    }
    return {};
  }),
}));

describe('scrapeAllResorts', () => {
  let mockSupabase: {
    from: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          not: vi.fn().mockResolvedValue({
            data: [
              {
                id: 'resort-1',
                slug: 'chamonix',
                skiresort_info_slug: 'brevent-flegere-chamonix',
                snow_forecast_slug: 'Chamonix',
              },
            ],
            error: null,
          }),
        }),
        upsert: vi.fn().mockResolvedValue({ error: null }),
      }),
    };
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('uses primary source when data is valid', async () => {
    const { fetchResortPage } = await import('@/lib/scraper/fetcher');
    const { fetchSnowForecastPage } = await import('@/lib/scraper/fetcher-snowforecast');
    const { parseConditionsPage } = await import('@/lib/scraper/parser');
    const { parseSnowForecastPage } = await import('@/lib/scraper/parser-snowforecast');
    const { scrapeAllResorts } = await import('@/lib/scraper/index');

    vi.mocked(fetchResortPage).mockResolvedValue('<html>primary</html>');
    vi.mocked(parseConditionsPage).mockReturnValue({
      snowDepthBase: 100,
      snowDepthSummit: 200,
      freshSnow24h: 20,
      slopesOpenKm: null,
      slopesTotalKm: null,
      liftsOpen: null,
      liftsTotal: null,
      temperature: null,
      weatherCondition: null,
      adultTicketPrice: null,
    });

    const result = await scrapeAllResorts(mockSupabase as never);

    expect(fetchResortPage).toHaveBeenCalledWith('brevent-flegere-chamonix');
    expect(fetchSnowForecastPage).not.toHaveBeenCalled();
    expect(result.success).toContain('chamonix');
  });

  it('falls back to snow-forecast when primary fails', async () => {
    const { fetchResortPage } = await import('@/lib/scraper/fetcher');
    const { fetchSnowForecastPage } = await import('@/lib/scraper/fetcher-snowforecast');
    const { parseConditionsPage } = await import('@/lib/scraper/parser');
    const { parseSnowForecastPage } = await import('@/lib/scraper/parser-snowforecast');
    const { scrapeAllResorts } = await import('@/lib/scraper/index');

    vi.mocked(fetchResortPage).mockRejectedValue(new Error('Primary failed'));
    vi.mocked(fetchSnowForecastPage).mockResolvedValue('<html>fallback</html>');
    vi.mocked(parseSnowForecastPage).mockReturnValue({
      snowDepthBase: 80,
      snowDepthSummit: 150,
      freshSnow24h: 15,
      slopesOpenKm: null,
      slopesTotalKm: null,
      liftsOpen: null,
      liftsTotal: null,
      temperature: null,
      weatherCondition: null,
      adultTicketPrice: null,
    });

    const result = await scrapeAllResorts(mockSupabase as never);

    expect(fetchResortPage).toHaveBeenCalled();
    expect(fetchSnowForecastPage).toHaveBeenCalledWith('Chamonix');
    expect(result.success).toContain('chamonix (fallback)');
  });

  it('falls back when primary returns no valid data', async () => {
    const { fetchResortPage } = await import('@/lib/scraper/fetcher');
    const { fetchSnowForecastPage } = await import('@/lib/scraper/fetcher-snowforecast');
    const { parseConditionsPage } = await import('@/lib/scraper/parser');
    const { parseSnowForecastPage } = await import('@/lib/scraper/parser-snowforecast');
    const { scrapeAllResorts } = await import('@/lib/scraper/index');

    vi.mocked(fetchResortPage).mockResolvedValue('<html>empty</html>');
    vi.mocked(parseConditionsPage).mockReturnValue({
      snowDepthBase: null,
      snowDepthSummit: null,
      freshSnow24h: null,
      slopesOpenKm: null,
      slopesTotalKm: null,
      liftsOpen: null,
      liftsTotal: null,
      temperature: null,
      weatherCondition: null,
      adultTicketPrice: null,
    });
    vi.mocked(fetchSnowForecastPage).mockResolvedValue('<html>fallback</html>');
    vi.mocked(parseSnowForecastPage).mockReturnValue({
      snowDepthBase: 80,
      snowDepthSummit: 150,
      freshSnow24h: null,
      slopesOpenKm: null,
      slopesTotalKm: null,
      liftsOpen: null,
      liftsTotal: null,
      temperature: null,
      weatherCondition: null,
      adultTicketPrice: null,
    });

    const result = await scrapeAllResorts(mockSupabase as never);

    expect(fetchSnowForecastPage).toHaveBeenCalledWith('Chamonix');
    expect(result.success).toContain('chamonix (fallback)');
  });

  it('fails when both sources fail', async () => {
    const { fetchResortPage } = await import('@/lib/scraper/fetcher');
    const { fetchSnowForecastPage } = await import('@/lib/scraper/fetcher-snowforecast');
    const { scrapeAllResorts } = await import('@/lib/scraper/index');

    vi.mocked(fetchResortPage).mockRejectedValue(new Error('Primary failed'));
    vi.mocked(fetchSnowForecastPage).mockRejectedValue(new Error('Fallback also failed'));

    const result = await scrapeAllResorts(mockSupabase as never);

    expect(result.failed).toHaveLength(1);
    expect(result.failed[0]).toEqual({
      slug: 'chamonix',
      error: 'No data from any source',
    });
  });

  it('does not call fallback if resort has no snow_forecast_slug', async () => {
    mockSupabase.from = vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        not: vi.fn().mockResolvedValue({
          data: [
            {
              id: 'resort-1',
              slug: 'small-resort',
              skiresort_info_slug: 'small-resort',
              snow_forecast_slug: null, // No fallback slug
            },
          ],
          error: null,
        }),
      }),
      upsert: vi.fn().mockResolvedValue({ error: null }),
    });

    const { fetchResortPage } = await import('@/lib/scraper/fetcher');
    const { fetchSnowForecastPage } = await import('@/lib/scraper/fetcher-snowforecast');
    const { scrapeAllResorts } = await import('@/lib/scraper/index');

    vi.mocked(fetchResortPage).mockRejectedValue(new Error('Primary failed'));

    const result = await scrapeAllResorts(mockSupabase as never);

    expect(fetchSnowForecastPage).not.toHaveBeenCalled();
    expect(result.failed).toHaveLength(1);
  });
});
