'use client';

import { Users } from 'lucide-react';
import { FactorIndicator } from '@/components/resort/factor-indicator';
import { getCrowdQualityLevel, formatCrowdLevel } from '@/lib/utils/conditions';
import type { CrowdLevel } from '@/lib/types/database';

interface CrowdLevelDisplayProps {
  crowdLevel: CrowdLevel;
}

export function CrowdLevelDisplay({ crowdLevel }: CrowdLevelDisplayProps) {
  const qualityLevel = getCrowdQualityLevel(crowdLevel);

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Users className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold">Crowd Level</p>
        <FactorIndicator level={qualityLevel} label="Crowd level" />
      </div>

      {/* Crowd data */}
      <div className="text-sm">
        <p className="font-medium">{formatCrowdLevel(crowdLevel)}</p>
      </div>
    </div>
  );
}
