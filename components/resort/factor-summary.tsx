'use client';

import type { QualityLevel } from '@/lib/utils/conditions';
import { countQualityLevels } from '@/lib/utils/conditions';

interface FactorSummaryProps {
  levels: QualityLevel[];
}

export function FactorSummary({ levels }: FactorSummaryProps) {
  const counts = countQualityLevels(levels);

  return (
    <div className="flex items-center gap-3 text-sm" aria-label="Factor summary">
      {counts.good > 0 && (
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-green-500" aria-hidden="true" />
          <span>{counts.good}</span>
        </span>
      )}
      {counts.moderate > 0 && (
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-yellow-500" aria-hidden="true" />
          <span>{counts.moderate}</span>
        </span>
      )}
      {counts.poor > 0 && (
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-red-500" aria-hidden="true" />
          <span>{counts.poor}</span>
        </span>
      )}
      <span className="sr-only">
        {counts.good} good, {counts.moderate} moderate, {counts.poor} poor
      </span>
    </div>
  );
}
