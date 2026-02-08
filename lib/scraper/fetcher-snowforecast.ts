/**
 * HTTP fetcher for snow-forecast.com pages with retry logic and rate limiting
 * Backup data source when skiresort.info fails
 */

const BASE_URL = 'https://www.snow-forecast.com/resorts';
const USER_AGENT = 'PeakPick/1.0 (ski conditions aggregator)';
const DELAY_MS = 2000; // Slightly longer delay for backup source
const MAX_RETRIES = 2;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch the conditions page for a resort from snow-forecast.com
 * Uses the 6-day mid-mountain forecast view
 *
 * @param slug - The resort slug on snow-forecast.com (e.g., 'Chamonix', 'Val-Thorens')
 * @returns HTML content of the page
 */
export async function fetchSnowForecastPage(slug: string): Promise<string> {
  const url = `${BASE_URL}/${slug}/6day/mid`;
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

  throw lastError ?? new Error(`Failed to fetch ${slug} from snow-forecast.com after ${MAX_RETRIES + 1} attempts`);
}

/**
 * Delay between resort fetches for rate limiting
 */
export async function rateLimitDelaySnowForecast(): Promise<void> {
  await delay(DELAY_MS);
}

export { BASE_URL, USER_AGENT, DELAY_MS, MAX_RETRIES };
