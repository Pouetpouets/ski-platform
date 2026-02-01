'use client';

import { Car } from 'lucide-react';
import { FactorIndicator } from '@/components/resort/factor-indicator';
import { getParkingQualityLevel, formatParkingStatus } from '@/lib/utils/conditions';
import type { ParkingStatus } from '@/lib/types/database';

interface ParkingDisplayProps {
  parkingStatus: ParkingStatus;
  parkingPrice: number | null;
}

export function ParkingDisplay({ parkingStatus, parkingPrice }: ParkingDisplayProps) {
  const qualityLevel = getParkingQualityLevel(parkingStatus, parkingPrice);

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Car className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold">Parking</p>
        <FactorIndicator level={qualityLevel} label="Parking" />
      </div>

      {/* Parking data */}
      <div className="flex items-center gap-4 text-sm">
        <span className="font-medium">{formatParkingStatus(parkingStatus)}</span>
        {parkingPrice !== null && (
          <span className="text-muted-foreground">
            {parkingPrice === 0 ? 'Free' : `€${parkingPrice}/day`}
          </span>
        )}
      </div>
    </div>
  );
}
