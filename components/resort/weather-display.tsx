'use client';

import {
  Sun,
  CloudSun,
  Cloud,
  Snowflake,
  CloudRain,
  CloudLightning,
  Wind,
  Thermometer,
  Droplets,
  ShieldAlert,
} from 'lucide-react';
import { FactorIndicator } from '@/components/resort/factor-indicator';
import { getWeatherQualityLevel } from '@/lib/utils/conditions';

interface WeatherDisplayProps {
  weatherCondition: string | null;
  temperatureMin: number | null;
  temperatureMax: number | null;
  precipitationSum?: number | null;
  snowfallSum?: number | null;
  windSpeedMax?: number | null;
  windGustsMax?: number | null;
  uvIndexMax?: number | null;
  forecastDate?: string | null;
}

const WEATHER_ICONS: Record<string, React.ReactNode> = {
  sunny: <Sun className="size-4" />,
  partly_cloudy: <CloudSun className="size-4" />,
  cloudy: <Cloud className="size-4" />,
  overcast: <Cloud className="size-4" />,
  snowing: <Snowflake className="size-4" />,
  rain: <CloudRain className="size-4" />,
  storm: <CloudLightning className="size-4" />,
  high_winds: <Wind className="size-4" />,
  foggy: <Cloud className="size-4" />,
};

const weatherConditionLabels: Record<string, string> = {
  sunny: 'Sunny',
  partly_cloudy: 'Partly Cloudy',
  cloudy: 'Cloudy',
  overcast: 'Overcast',
  snowing: 'Snowing',
  rain: 'Rain',
  storm: 'Storm',
  high_winds: 'High Winds',
  foggy: 'Foggy',
};

export function WeatherDisplay({
  weatherCondition,
  temperatureMin,
  temperatureMax,
  precipitationSum,
  snowfallSum,
  windSpeedMax,
  windGustsMax,
  uvIndexMax,
}: WeatherDisplayProps) {
  if (!weatherCondition && temperatureMin === null && temperatureMax === null) {
    return null;
  }

  const qualityLevel = getWeatherQualityLevel(weatherCondition);
  const hasForecastExtras =
    precipitationSum != null ||
    snowfallSum != null ||
    windSpeedMax != null ||
    windGustsMax != null ||
    uvIndexMax != null;

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Thermometer className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold">Weather</p>
        <FactorIndicator level={qualityLevel} label="Weather" />
      </div>

      {/* Weather data */}
      <div className="flex items-center gap-4 text-sm">
        {weatherCondition && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {WEATHER_ICONS[weatherCondition] ?? <Cloud className="size-4" />}
            </span>
            <span className="font-medium">{weatherConditionLabels[weatherCondition] ?? weatherCondition}</span>
          </div>
        )}
        {temperatureMin !== null && temperatureMax !== null && (
          <span className="text-muted-foreground">
            {temperatureMin}° / {temperatureMax}°C
          </span>
        )}
      </div>

      {/* Extended forecast data */}
      {hasForecastExtras && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          {windSpeedMax != null && (
            <div className="flex items-center gap-1.5">
              <Wind className="size-3.5" />
              <span>Wind: {windSpeedMax} km/h</span>
            </div>
          )}
          {windGustsMax != null && (
            <div className="flex items-center gap-1.5">
              <Wind className="size-3.5" />
              <span>Gusts: {windGustsMax} km/h</span>
            </div>
          )}
          {precipitationSum != null && precipitationSum > 0 && (
            <div className="flex items-center gap-1.5">
              <Droplets className="size-3.5" />
              <span>Precip: {precipitationSum} mm</span>
            </div>
          )}
          {snowfallSum != null && snowfallSum > 0 && (
            <div className="flex items-center gap-1.5">
              <Snowflake className="size-3.5" />
              <span>Snowfall: {snowfallSum} cm</span>
            </div>
          )}
          {uvIndexMax != null && (
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="size-3.5" />
              <span>UV Index: {uvIndexMax}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
