/**
 * Types for the skiresort.info scraper
 */

export interface ScrapedConditions {
  snowDepthBase: number | null;
  snowDepthSummit: number | null;
  freshSnow24h: number | null;
  slopesOpenKm: number | null;
  slopesTotalKm: number | null;
  liftsOpen: number | null;
  liftsTotal: number | null;
  temperature: number | null;
  weatherCondition: string | null;
  adultTicketPrice: number | null;
}

export interface ScrapeResult {
  success: string[];
  failed: { slug: string; error: string }[];
}
