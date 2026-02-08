/**
 * HTML parser for snow-forecast.com resort pages
 * Extracts snow conditions, fresh snow, weather, and temperature data
 *
 * Note: snow-forecast.com does not provide lift status or ticket prices
 */

import * as cheerio from 'cheerio';
import type { ScrapedConditions } from './types';

function parseNumber(text: string | undefined | null): number | null {
  if (!text) return null;
  const cleaned = text.replace(/[^0-9.,\-]/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function extractText($: cheerio.CheerioAPI, selector: string): string | null {
  const el = $(selector).first();
  return el.length > 0 ? el.text().trim() : null;
}

/**
 * Map snow-forecast.com weather icons/text to normalized weather conditions
 */
function normalizeWeatherIcon(iconClass: string | undefined): string | null {
  if (!iconClass) return null;
  const lower = iconClass.toLowerCase();

  // snow-forecast.com uses icon classes like 'icon--cloud', 'icon--snow', etc.
  if (lower.includes('clear') || lower.includes('sun')) return 'sunny';
  if (lower.includes('part') && lower.includes('cloud')) return 'partly_cloudy';
  if (lower.includes('cloud')) return 'cloudy';
  if (lower.includes('snow') || lower.includes('flurr')) return 'snowing';
  if (lower.includes('rain') || lower.includes('drizzle')) return 'raining';
  if (lower.includes('fog') || lower.includes('mist')) return 'foggy';
  if (lower.includes('storm') || lower.includes('thunder')) return 'stormy';

  return null;
}

/**
 * Parse a snow-forecast.com resort page HTML and extract conditions data
 *
 * Snow-forecast.com structure (approximate):
 * - Snow depths in ".snow-depths" or similar section with top/bottom values
 * - Fresh snow in forecast table headers or banners
 * - Weather icons as background classes or img elements
 * - Temperature in forecast cells
 */
export function parseSnowForecastPage(html: string): ScrapedConditions {
  const $ = cheerio.load(html);

  // Initialize all values as null (snow-forecast doesn't have all data)
  let snowDepthBase: number | null = null;
  let snowDepthSummit: number | null = null;
  let freshSnow24h: number | null = null;
  let temperature: number | null = null;
  let weatherCondition: string | null = null;

  // ===== SNOW DEPTHS =====
  // Look for snow depth section - snow-forecast uses various structures
  // Try multiple selectors for robustness

  // Strategy 1: Look for labeled snow depth values
  $('[class*="snow-depth"], [class*="snowdepth"], .snow-conditions, .snow-report').each((_, el) => {
    const text = $(el).text().toLowerCase();

    // Match patterns like "Top: 180cm" or "Summit: 180 cm"
    const topMatch = text.match(/(?:top|summit|upper|berg)[:\s]*(\d+)\s*(?:cm|m)?/i);
    if (topMatch) {
      const val = parseInt(topMatch[1], 10);
      // If value looks like meters (< 20), convert to cm
      snowDepthSummit = val < 20 ? val * 100 : val;
    }

    // Match patterns like "Bottom: 80cm" or "Base: 80 cm"
    const bottomMatch = text.match(/(?:bottom|base|lower|valley|tal)[:\s]*(\d+)\s*(?:cm|m)?/i);
    if (bottomMatch) {
      const val = parseInt(bottomMatch[1], 10);
      snowDepthBase = val < 20 ? val * 100 : val;
    }
  });

  // Strategy 2: Look for table cells with snow depth data
  if (snowDepthBase === null || snowDepthSummit === null) {
    $('.snow-depths__depth, [class*="depth-value"], .depth').each((_, el) => {
      const text = $(el).text().trim();
      const parent = $(el).parent().text().toLowerCase();
      const val = parseNumber(text);

      if (val === null) return;

      if (parent.includes('top') || parent.includes('summit') || parent.includes('upper')) {
        snowDepthSummit = snowDepthSummit ?? val;
      } else if (parent.includes('bottom') || parent.includes('base') || parent.includes('lower')) {
        snowDepthBase = snowDepthBase ?? val;
      }
    });
  }

  // Strategy 3: Direct selectors for snow-forecast.com specific structure
  if (snowDepthBase === null) {
    const baseText = extractText($, '.snow-depths-table .base-depth, [data-depth="base"]');
    snowDepthBase = parseNumber(baseText);
  }
  if (snowDepthSummit === null) {
    const summitText = extractText($, '.snow-depths-table .summit-depth, [data-depth="summit"]');
    snowDepthSummit = parseNumber(summitText);
  }

  // ===== FRESH SNOW =====
  // Look for fresh snow / new snow indicators

  // Strategy 1: Look for fresh snow banner or highlight
  $('[class*="fresh-snow"], [class*="new-snow"], [class*="snowfall"], .forecast-table-snow').each((_, el) => {
    const text = $(el).text();
    // Match patterns like "15cm", "15 cm new", etc.
    const match = text.match(/(\d+)\s*cm/i);
    if (match && freshSnow24h === null) {
      freshSnow24h = parseInt(match[1], 10);
    }
  });

  // Strategy 2: Look in forecast table first column (today/last 24h)
  if (freshSnow24h === null) {
    const firstCell = $('tr.forecast-table__row--snow td:first-child, .snow-row td:first-child').first();
    if (firstCell.length) {
      const text = firstCell.text();
      const match = text.match(/(\d+)/);
      if (match) {
        freshSnow24h = parseInt(match[1], 10);
      }
    }
  }

  // ===== WEATHER CONDITION =====
  // Look for weather icons or text in current conditions

  // Strategy 1: Look for weather icon classes
  const weatherIcon = $('[class*="weather-icon"], [class*="forecast-icon"], .wx-icon').first();
  if (weatherIcon.length) {
    const classes = weatherIcon.attr('class') || '';
    weatherCondition = normalizeWeatherIcon(classes);
  }

  // Strategy 2: Look for weather image alt text
  if (!weatherCondition) {
    const weatherImg = $('[class*="weather"] img, .forecast-table img').first();
    if (weatherImg.length) {
      const alt = weatherImg.attr('alt') || weatherImg.attr('title') || '';
      weatherCondition = normalizeWeatherIcon(alt);
    }
  }

  // Strategy 3: Look for text-based weather description
  if (!weatherCondition) {
    const weatherText = extractText($, '.weather-description, [class*="conditions-text"], .current-weather');
    if (weatherText) {
      weatherCondition = normalizeWeatherIcon(weatherText);
    }
  }

  // ===== TEMPERATURE =====
  // Look for current temperature

  // Strategy 1: Look for temperature in current conditions
  const tempSelectors = [
    '.temperature .value',
    '[class*="temp"] .value',
    '.current-temp',
    '[class*="temperature"]',
    '.temp-value',
  ];

  for (const selector of tempSelectors) {
    if (temperature !== null) break;
    const tempText = extractText($, selector);
    temperature = parseNumber(tempText);
  }

  // Strategy 2: Look in forecast table (first column = current/today)
  if (temperature === null) {
    const tempCell = $('tr.forecast-table__row--temperature td:first-child, .temp-row td:first-child').first();
    if (tempCell.length) {
      temperature = parseNumber(tempCell.text());
    }
  }

  // Return parsed conditions
  // Note: snow-forecast.com doesn't provide slopes, lifts, or prices
  return {
    snowDepthBase,
    snowDepthSummit,
    freshSnow24h,
    slopesOpenKm: null,
    slopesTotalKm: null,
    liftsOpen: null,
    liftsTotal: null,
    temperature,
    weatherCondition,
    adultTicketPrice: null,
  };
}
