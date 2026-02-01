'use client';

import { useTranslations } from 'next-intl';
import {
  Sun,
  CloudSun,
  Cloud,
  Snowflake,
  CloudRain,
  CloudLightning,
  Wind,
  Thermometer,
} from 'lucide-react';
import { FactorIndicator } from '@/components/resort/factor-indicator';
import { getWeatherQualityLevel } from '@/lib/utils/conditions';

interface WeatherDisplayProps {
  weatherCondition: string | null;
  temperatureMin: number | null;
  temperatureMax: number | null;
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
};

export function WeatherDisplay({
  weatherCondition,
  temperatureMin,
  temperatureMax,
}: WeatherDisplayProps) {
  const t = useTranslations('resort');
  const tWeather = useTranslations('weatherConditions');

  if (!weatherCondition && temperatureMin === null && temperatureMax === null) {
    return null;
  }

  const qualityLevel = getWeatherQualityLevel(weatherCondition);

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Thermometer className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold">{t('weather')}</p>
        <FactorIndicator level={qualityLevel} label={t('weather')} />
      </div>

      {/* Weather data */}
      <div className="flex items-center gap-4 text-sm">
        {weatherCondition && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {WEATHER_ICONS[weatherCondition] ?? <Cloud className="size-4" />}
            </span>
            <span className="font-medium">{tWeather(weatherCondition)}</span>
          </div>
        )}
        {temperatureMin !== null && temperatureMax !== null && (
          <span className="text-muted-foreground">
            {temperatureMin}° / {temperatureMax}°C
          </span>
        )}
      </div>
    </div>
  );
}
