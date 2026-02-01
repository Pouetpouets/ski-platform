'use client';

import { Snowflake, Mountain, CloudSnow } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FactorIndicator } from '@/components/resort/factor-indicator';
import {
  getSnowQualityLevel,
  POWDER_ALERT_THRESHOLD_CM,
} from '@/lib/utils/conditions';

interface SnowConditionsProps {
  snowDepthBase: number | null;
  snowDepthSummit: number | null;
  freshSnow24h: number;
}

export function SnowConditions({
  snowDepthBase,
  snowDepthSummit,
  freshSnow24h,
}: SnowConditionsProps) {
  const qualityLevel = getSnowQualityLevel(snowDepthBase, freshSnow24h);
  const isPowderAlert = freshSnow24h > POWDER_ALERT_THRESHOLD_CM;

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Snowflake className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold">Snow Conditions</p>
        <FactorIndicator level={qualityLevel} label="Snow quality" />
      </div>

      {/* Snow data grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Snowflake className="size-3.5 text-muted-foreground shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Base</p>
            <p className="font-medium">{snowDepthBase ?? '?'}cm</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Mountain className="size-3.5 text-muted-foreground shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Summit</p>
            <p className="font-medium">{snowDepthSummit ?? '?'}cm</p>
          </div>
        </div>

        {freshSnow24h > 0 && (
          <div className="flex items-center gap-2 col-span-2">
            <CloudSnow className="size-3.5 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Fresh (24h)</p>
              <p className={`font-medium ${isPowderAlert ? 'text-blue-600' : ''}`}>
                +{freshSnow24h}cm
              </p>
            </div>
            {isPowderAlert && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                Powder Alert
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
