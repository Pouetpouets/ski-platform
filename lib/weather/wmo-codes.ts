/**
 * Maps WMO weather codes to the application's weather condition vocabulary.
 * Reference: https://open-meteo.com/en/docs#weathervariables
 */

const WMO_CODE_MAP: Record<number, string> = {
  // Clear sky
  0: 'sunny',
  // Mainly clear, partly cloudy
  1: 'partly_cloudy',
  2: 'partly_cloudy',
  // Overcast
  3: 'cloudy',
  // Fog
  45: 'foggy',
  48: 'foggy',
  // Drizzle
  51: 'rain',
  53: 'rain',
  55: 'rain',
  // Freezing drizzle
  56: 'rain',
  57: 'rain',
  // Rain
  61: 'rain',
  63: 'rain',
  65: 'rain',
  // Freezing rain
  66: 'rain',
  67: 'rain',
  // Snow fall
  71: 'snowing',
  73: 'snowing',
  75: 'snowing',
  // Snow grains
  77: 'snowing',
  // Rain showers
  80: 'rain',
  81: 'rain',
  82: 'rain',
  // Snow showers
  85: 'snowing',
  86: 'snowing',
  // Thunderstorm
  95: 'storm',
  96: 'storm',
  99: 'storm',
};

/**
 * Convert a WMO weather code to the application's weather condition string.
 * Falls back to 'cloudy' for unknown codes.
 */
export function wmoCodeToCondition(code: number): string {
  return WMO_CODE_MAP[code] ?? 'cloudy';
}
