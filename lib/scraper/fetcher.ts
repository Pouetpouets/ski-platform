/**
 * HTTP fetcher for skiresort.info pages with retry logic and rate limiting
 */

const BASE_URL = 'https://www.skiresort.info/ski-resort';
const USER_AGENT = 'PeakPick/1.0 (ski conditions aggregator)';
const DELAY_MS = 1500;
const MAX_RETRIES = 2;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch the conditions page for a resort from skiresort.info
 * Includes rate limiting (1.5s between requests) and retry logic (2 retries)
 */
export async function fetchResortPage(slug: string): Promise<string> {
  const url = `${BASE_URL}/${slug}/`;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      await delay(DELAY_MS * attempt);
    }

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  throw lastError ?? new Error(`Failed to fetch ${slug} after ${MAX_RETRIES + 1} attempts`);
}

/**
 * Delay between resort fetches for rate limiting
 */
export async function rateLimitDelay(): Promise<void> {
  await delay(DELAY_MS);
}

export { BASE_URL, USER_AGENT, DELAY_MS, MAX_RETRIES };
