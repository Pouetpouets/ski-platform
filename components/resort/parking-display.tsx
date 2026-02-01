'use client';

import { useTranslations } from 'next-intl';
import { Car } from 'lucide-react';
import { FactorIndicator } from '@/components/resort/factor-indicator';
import { getParkingQualityLevel } from '@/lib/utils/conditions';
import type { ParkingStatus } from '@/lib/types/database';

interface ParkingDisplayProps {
  parkingStatus: ParkingStatus;
  parkingPrice: number | null;
}

export function ParkingDisplay({ parkingStatus, parkingPrice }: ParkingDisplayProps) {
  const t = useTranslations('resort');
  const tParking = useTranslations('parkingStatus');
  const qualityLevel = getParkingQualityLevel(parkingStatus, parkingPrice);

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Car className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold">{t('parking')}</p>
        <FactorIndicator level={qualityLevel} label={t('parking')} />
      </div>

      {/* Parking data */}
      <div className="flex items-center gap-4 text-sm">
        <span className="font-medium">{tParking(parkingStatus)}</span>
        {parkingPrice !== null && (
          <span className="text-muted-foreground">
            {parkingPrice === 0 ? t('free') : `€${parkingPrice}${t('perDay')}`}
          </span>
        )}
      </div>
    </div>
  );
}
