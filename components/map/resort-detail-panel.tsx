'use client';

import { useTranslations } from 'next-intl';
import type { ResortWithConditions } from '@/lib/types/database';
import type { DistanceInfo } from '@/lib/utils/distance';
import { getScoreColor } from '@/lib/utils/score';
import type { FactorScores, FactorName } from '@/lib/utils/score';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  ExternalLink,
  MapPin,
} from 'lucide-react';
import { SnowConditions } from '@/components/resort/snow-conditions';
import { RunsLiftsStatus } from '@/components/resort/runs-lifts-status';
import { CrowdLevelDisplay } from '@/components/resort/crowd-level-display';
import { WeatherDisplay } from '@/components/resort/weather-display';
import { TicketPriceDisplay } from '@/components/resort/ticket-price-display';
import { ParkingDisplay } from '@/components/resort/parking-display';
import { FactorSummary } from '@/components/resort/factor-summary';
import { ScoreBreakdown } from '@/components/resort/score-breakdown';
import { getAllFactorLevels } from '@/lib/utils/conditions';

interface ResortDetailPanelProps {
  resort: ResortWithConditions | null;
  isOpen: boolean;
  onClose: () => void;
  score: number | null;
  factors: FactorScores | null;
  weights?: Record<FactorName, number>;
  distanceInfo: DistanceInfo | null;
}

export function ResortDetailPanel({
  resort,
  isOpen,
  onClose,
  score,
  factors,
  weights,
  distanceInfo,
}: ResortDetailPanelProps) {
  const t = useTranslations('resort');
  const tCommon = useTranslations('common');

  if (!resort) return null;

  const conditions = resort.conditions;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        aria-label="Resort details"
        className="w-[400px] sm:max-w-[400px] overflow-y-auto"
      >
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-start justify-between gap-4 pr-6">
            <div className="flex-1">
              <SheetTitle className="text-2xl font-semibold">
                {resort.name}
              </SheetTitle>
              <SheetDescription>
                {resort.altitude_min !== null || resort.altitude_max !== null
                  ? `${resort.altitude_min ?? '?'}m - ${resort.altitude_max ?? '?'}m`
                  : t('detailsFor', { name: resort.name })}
              </SheetDescription>
            </div>
            {score !== null && (
              <div
                className={`px-4 py-2 rounded-full ${getScoreColor(score)} text-white font-bold text-lg shrink-0`}
              >
                {score}%
              </div>
            )}
          </div>
          {conditions && (
            <FactorSummary levels={getAllFactorLevels(conditions)} />
          )}
        </SheetHeader>

        <div className="flex flex-col gap-6 p-6">
          {/* Distance */}
          {distanceInfo && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="size-4 text-muted-foreground shrink-0" />
              <span className="text-foreground">
                <strong>{distanceInfo.formattedDistance}</strong>
                <span className="text-muted-foreground">
                  {' '}from {distanceInfo.fromLocation} ({distanceInfo.drivingTime})
                </span>
              </span>
            </div>
          )}

          {/* Conditions */}
          {conditions ? (
            <div className="flex flex-col gap-5">
              {/* Snow Conditions Section */}
              <SnowConditions
                snowDepthBase={conditions.snow_depth_base}
                snowDepthSummit={conditions.snow_depth_summit}
                freshSnow24h={conditions.fresh_snow_24h}
              />

              {/* Runs & Lifts Section */}
              <RunsLiftsStatus
                slopesOpenKm={conditions.slopes_open_km}
                slopesTotalKm={conditions.slopes_total_km}
                liftsOpen={conditions.lifts_open}
                liftsTotal={conditions.lifts_total}
              />

              {/* Crowd Level Section */}
              <CrowdLevelDisplay crowdLevel={conditions.crowd_level} />

              {/* Weather Section */}
              <WeatherDisplay
                weatherCondition={conditions.weather_condition}
                temperatureMin={conditions.temperature_min}
                temperatureMax={conditions.temperature_max}
              />

              {/* Lift Ticket Section */}
              <TicketPriceDisplay adultTicketPrice={conditions.adult_ticket_price} />

              {/* Parking Section */}
              <ParkingDisplay
                parkingStatus={conditions.parking_status}
                parkingPrice={conditions.parking_price}
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t('noConditions')}</p>
          )}

          {/* Score Breakdown */}
          {factors && (
            <ScoreBreakdown factors={factors} weights={weights} />
          )}
        </div>

        {/* Links footer */}
        {(resort.website_url || resort.webcam_url) && (
          <SheetFooter className="p-6 pt-0 flex-row gap-4">
            {resort.website_url && (
              <a
                href={resort.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <ExternalLink className="size-3.5" />
                {tCommon('website')}
              </a>
            )}
            {resort.webcam_url && (
              <a
                href={resort.webcam_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <ExternalLink className="size-3.5" />
                {tCommon('webcams')}
              </a>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

