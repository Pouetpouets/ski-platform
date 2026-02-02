import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the scraper module
vi.mock('@/lib/scraper', () => ({
  scrapeAllResorts: vi.fn(),
}));

// Mock the admin client
vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: vi.fn().mockReturnValue({}),
}));

import { GET } from '@/app/api/cron/scrape-conditions/route';
import { scrapeAllResorts } from '@/lib/scraper';

describe('Cron scrape-conditions route', () => {
  const CRON_SECRET = 'test-cron-secret';

  beforeEach(() => {
    vi.stubEnv('CRON_SECRET', CRON_SECRET);
    vi.mocked(scrapeAllResorts).mockReset();
  });

  function makeRequest(authHeader?: string): Request {
    const headers = new Headers();
    if (authHeader) {
      headers.set('Authorization', authHeader);
    }
    return new Request('http://localhost:3000/api/cron/scrape-conditions', {
      method: 'GET',
      headers,
    });
  }

  it('returns 401 when no Authorization header is provided', async () => {
    const response = await GET(makeRequest());
    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Unauthorized');
  });

  it('returns 401 when Authorization header is incorrect', async () => {
    const response = await GET(makeRequest('Bearer wrong-secret'));
    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Unauthorized');
  });

  it('returns 200 with scrape results on valid auth', async () => {
    vi.mocked(scrapeAllResorts).mockResolvedValue({
      success: ['chamonix', 'val-disere'],
      failed: [{ slug: 'broken-resort', error: 'timeout' }],
    });

    const response = await GET(makeRequest(`Bearer ${CRON_SECRET}`));
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.success).toBe(2);
    expect(body.failed).toBe(1);
    expect(body.details.success).toEqual(['chamonix', 'val-disere']);
    expect(body.details.failed).toEqual([{ slug: 'broken-resort', error: 'timeout' }]);
  });

  it('returns 500 when scraper throws', async () => {
    vi.mocked(scrapeAllResorts).mockRejectedValue(new Error('DB connection failed'));

    const response = await GET(makeRequest(`Bearer ${CRON_SECRET}`));
    expect(response.status).toBe(500);

    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.error).toBe('DB connection failed');
  });

  it('returns 500 when CRON_SECRET is not configured', async () => {
    vi.stubEnv('CRON_SECRET', '');

    const response = await GET(makeRequest(`Bearer ${CRON_SECRET}`));
    // When CRON_SECRET is empty string, it's falsy
    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body.error).toBe('CRON_SECRET not configured');
  });
});
