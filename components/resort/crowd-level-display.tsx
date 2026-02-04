'use client';

import { Users } from 'lucide-react';
import { FactorIndicator } from '@/components/resort/factor-indicator';
import { getCrowdQualityLevel } from '@/lib/utils/conditions';
import type { CrowdLevel } from '@/lib/types/database';

interface CrowdLevelDisplayProps {
  crowdLevel: CrowdLevel;
}

const crowdLevelLabels: Record<string, string> = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  very_high: 'Very High',
};

export function CrowdLevelDisplay({ crowdLevel }: CrowdLevelDisplayProps) {
  const qualityLevel = getCrowdQualityLevel(crowdLevel);

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Users className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold">Crowd Level</p>
        <FactorIndicator level={qualityLevel} label="Crowd Level" />
      </div>

      {/* Crowd data */}
      <div className="text-sm">
        <p className="font-medium">{crowdLevelLabels[crowdLevel] ?? crowdLevel}</p>
      </div>
    </div>
  );
}
