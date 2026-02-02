/**
 * Main scraper orchestrator
 * Scrapes all resorts sequentially and upserts conditions into Supabase
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/database';
import type { ScrapeResult } from './types';
import { fetchResortPage, rateLimitDelay } from './fetcher';
import { parseConditionsPage } from './parser';
import { mapToConditionsUpdate } from './mapper';

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

  // Fetch all resorts that have a scraper slug
  const { data: resorts, error } = await supabase
    .from('resorts')
    .select('id, slug, skiresort_info_slug')
    .not('skiresort_info_slug', 'is', null) as { data: { id: string; slug: string; skiresort_info_slug: string | null }[] | null; error: { message: string } | null };

  if (error || !resorts) {
    return {
      success: [],
      failed: [{ slug: '_all', error: `Failed to fetch resorts: ${error?.message}` }],
    };
  }

  for (const resort of resorts) {
    const scraperSlug = resort.skiresort_info_slug;
    if (!scraperSlug) continue;

    try {
      // Fetch and parse the page
      const html = await fetchResortPage(scraperSlug);
      const scraped = parseConditionsPage(html);
      const update = mapToConditionsUpdate(scraped);

      // Only upsert if we got some meaningful data
      if (Object.keys(update).length === 0) {
        result.failed.push({ slug: resort.slug, error: 'No data extracted' });
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
        result.success.push(resort.slug);
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
