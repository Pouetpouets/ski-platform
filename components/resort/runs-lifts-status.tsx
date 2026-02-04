'use client';

import { Route, CableCar } from 'lucide-react';
import { FactorIndicator } from '@/components/resort/factor-indicator';
import { getRunsLiftsQualityLevel } from '@/lib/utils/conditions';

interface RunsLiftsStatusProps {
  slopesOpenKm: number;
  slopesTotalKm: number;
  liftsOpen: number;
  liftsTotal: number;
}

function getOpenPercentage(open: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((open / total) * 100);
}

export function RunsLiftsStatus({
  slopesOpenKm,
  slopesTotalKm,
  liftsOpen,
  liftsTotal,
}: RunsLiftsStatusProps) {
  const qualityLevel = getRunsLiftsQualityLevel(slopesOpenKm, slopesTotalKm, liftsOpen, liftsTotal);
  const slopesPercent = getOpenPercentage(slopesOpenKm, slopesTotalKm);
  const liftsPercent = getOpenPercentage(liftsOpen, liftsTotal);

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Route className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold">Runs &amp; Lifts</p>
        <FactorIndicator level={qualityLevel} label="Runs and lifts availability" />
      </div>

      {/* Data grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Route className="size-3.5 text-muted-foreground shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Runs</p>
            <p className="font-medium">{slopesOpenKm}km / {slopesTotalKm}km</p>
          </div>
          <span className="text-xs text-muted-foreground">{slopesPercent}%</span>
        </div>

        <div className="flex items-center gap-2">
          <CableCar className="size-3.5 text-muted-foreground shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Lifts</p>
            <p className="font-medium">{liftsOpen}/{liftsTotal}</p>
          </div>
          <span className="text-xs text-muted-foreground">{liftsPercent}%</span>
        </div>
      </div>
    </div>
  );
}
