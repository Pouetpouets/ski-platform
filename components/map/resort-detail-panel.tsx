'use client';

import type { ResortWithConditions } from '@/lib/types/database';
import type { DistanceInfo } from '@/lib/utils/distance';
import { getScoreColor } from '@/lib/utils/score';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Snowflake,
  Mountain,
  Users,
  Ticket,
  Car,
  ExternalLink,
  MapPin,
  CloudSnow,
  Thermometer,
  CableCar,
} from 'lucide-react';

interface ResortDetailPanelProps {
  resort: ResortWithConditions | null;
  isOpen: boolean;
  onClose: () => void;
  score: number | null;
  distanceInfo: DistanceInfo | null;
}

export function ResortDetailPanel({
  resort,
  isOpen,
  onClose,
  score,
  distanceInfo,
}: ResortDetailPanelProps) {
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
                  : `Resort details for ${resort.name}`}
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
            <div className="grid grid-cols-2 gap-4 text-sm">
              <ConditionItem
                icon={<Snowflake className="size-4" />}
                label="Base snow"
                value={`${conditions.snow_depth_base ?? '?'}cm`}
              />
              <ConditionItem
                icon={<Mountain className="size-4" />}
                label="Summit snow"
                value={`${conditions.snow_depth_summit ?? '?'}cm`}
              />
              <ConditionItem
                icon={<Snowflake className="size-4" />}
                label="Runs"
                value={`${conditions.runs_open}/${conditions.runs_total}`}
              />
              <ConditionItem
                icon={<CableCar className="size-4" />}
                label="Lifts"
                value={`${conditions.lifts_open}/${conditions.lifts_total}`}
              />
              <ConditionItem
                icon={<Users className="size-4" />}
                label="Crowd"
                value={conditions.crowd_level.replace('_', ' ')}
                className="capitalize"
              />
              {conditions.weather_condition && (
                <ConditionItem
                  icon={<Thermometer className="size-4" />}
                  label="Weather"
                  value={conditions.weather_condition.replace('_', ' ')}
                  className="capitalize"
                />
              )}
              {conditions.temperature_min !== null && conditions.temperature_max !== null && (
                <ConditionItem
                  icon={<Thermometer className="size-4" />}
                  label="Temp"
                  value={`${conditions.temperature_min}° / ${conditions.temperature_max}°C`}
                />
              )}
              {conditions.adult_ticket_price !== null && (
                <ConditionItem
                  icon={<Ticket className="size-4" />}
                  label="Day pass"
                  value={`€${conditions.adult_ticket_price}`}
                />
              )}
              <ConditionItem
                icon={<Car className="size-4" />}
                label="Parking"
                value={conditions.parking_status.replace('_', ' ')}
                className="capitalize"
              />
              {conditions.parking_price !== null && (
                <ConditionItem
                  icon={<Car className="size-4" />}
                  label="Parking price"
                  value={conditions.parking_price === 0 ? 'Free' : `€${conditions.parking_price}`}
                />
              )}
              {conditions.fresh_snow_24h > 0 && (
                <ConditionItem
                  icon={<CloudSnow className="size-4" />}
                  label="Fresh snow"
                  value={`+${conditions.fresh_snow_24h}cm`}
                />
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No conditions data available</p>
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
                Website
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
                Webcams
              </a>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

function ConditionItem({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`font-medium truncate ${className ?? ''}`}>{value}</p>
      </div>
    </div>
  );
}
