/**
 * Main scraper orchestrator
 * Scrapes all resorts sequentially and upserts conditions into Supabase
 * Uses skiresort.info as primary source with snow-forecast.com as fallback
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/database';
import type { ScrapeResult, ScrapedConditions } from './types';
import { fetchResortPage, rateLimitDelay } from './fetcher';
import { fetchSnowForecastPage, rateLimitDelaySnowForecast } from './fetcher-snowforecast';
import { parseConditionsPage } from './parser';
import { parseSnowForecastPage } from './parser-snowforecast';
import { mapToConditionsUpdate } from './mapper';

/**
 * Check if scraped data has meaningful values
 * Returns true if at least snow depth or fresh snow data is present
 */
function hasValidData(scraped: ScrapedConditions): boolean {
  return (
    scraped.snowDepthBase !== null ||
    scraped.snowDepthSummit !== null ||
    scraped.freshSnow24h !== null
  );
}

/**
 * Scrape conditions for all resorts that have a skiresort_info_slug
 * and upsert the results into the resort_conditions table.
 *
 * Processes resorts sequentially with rate limiting between requests.
 */
export async function scrapeAllResorts(
  supabase: SupabaseClient<Database>
): Promise<ScrapeResult> {
  const result: ScrapeResult = { success: [], failed: [] };

  // Fetch all resorts that have a scraper slug (include snow_forecast_slug for fallback)
  const { data: resorts, error } = await supabase
    .from('resorts')
    .select('id, slug, skiresort_info_slug, snow_forecast_slug')
    .not('skiresort_info_slug', 'is', null) as {
      data: { id: string; slug: string; skiresort_info_slug: string | null; snow_forecast_slug: string | null }[] | null;
      error: { message: string } | null
    };

  if (error || !resorts) {
    return {
      success: [],
      failed: [{ slug: '_all', error: `Failed to fetch resorts: ${error?.message}` }],
    };
  }

  for (const resort of resorts) {
    const scraperSlug = resort.skiresort_info_slug;
    if (!scraperSlug) continue;

    let scraped: ScrapedConditions | null = null;
    let usedFallback = false;

    // 1. Try primary source (skiresort.info)
    try {
      const html = await fetchResortPage(scraperSlug);
      const primaryScraped = parseConditionsPage(html);

      if (hasValidData(primaryScraped)) {
        scraped = primaryScraped;
      } else {
        console.warn(`Primary source returned no valid data for ${resort.slug}`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`Primary source failed for ${resort.slug}: ${message}`);
    }

    // 2. Fallback to snow-forecast.com if primary failed or returned no data
    if (!scraped && resort.snow_forecast_slug) {
      try {
        await rateLimitDelaySnowForecast();
        const html = await fetchSnowForecastPage(resort.snow_forecast_slug);
        const fallbackScraped = parseSnowForecastPage(html);

        if (hasValidData(fallbackScraped)) {
          scraped = fallbackScraped;
          usedFallback = true;
          console.log(`Used snow-forecast.com fallback for ${resort.slug}`);
        } else {
          console.warn(`Backup source also returned no valid data for ${resort.slug}`);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.warn(`Backup source also failed for ${resort.slug}: ${message}`);
      }
    }

    // 3. Process the scraped data
    if (!scraped) {
      result.failed.push({ slug: resort.slug, error: 'No data from any source' });
      await rateLimitDelay();
      continue;
    }

    try {
      const update = mapToConditionsUpdate(scraped);

      // Only upsert if we got some meaningful data
      if (Object.keys(update).length === 0) {
        result.failed.push({ slug: resort.slug, error: 'No data extracted' });
        await rateLimitDelay();
        continue;
      }

      // Upsert conditions — use type assertion since we're doing a partial update
      const { error: upsertError } = await supabase
        .from('resort_conditions')
        .upsert(
          { resort_id: resort.id, ...update } as never,
          { onConflict: 'resort_id' }
        );

      if (upsertError) {
        result.failed.push({ slug: resort.slug, error: upsertError.message });
      } else {
        result.success.push(usedFallback ? `${resort.slug} (fallback)` : resort.slug);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      result.failed.push({ slug: resort.slug, error: message });
    }

    // Rate limit between resorts
    await rateLimitDelay();
  }

  return result;
}
