'use client';

import { useTranslations } from 'next-intl';
import { Users } from 'lucide-react';
import { FactorIndicator } from '@/components/resort/factor-indicator';
import { getCrowdQualityLevel } from '@/lib/utils/conditions';
import type { CrowdLevel } from '@/lib/types/database';

interface CrowdLevelDisplayProps {
  crowdLevel: CrowdLevel;
}

export function CrowdLevelDisplay({ crowdLevel }: CrowdLevelDisplayProps) {
  const t = useTranslations('resort');
  const tCrowd = useTranslations('crowdLevels');
  const qualityLevel = getCrowdQualityLevel(crowdLevel);

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Users className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold">{t('crowdLevel')}</p>
        <FactorIndicator level={qualityLevel} label={t('crowdLevel')} />
      </div>

      {/* Crowd data */}
      <div className="text-sm">
        <p className="font-medium">{tCrowd(crowdLevel)}</p>
      </div>
    </div>
  );
}
