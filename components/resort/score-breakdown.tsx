'use client';

import type { FactorScores, FactorName } from '@/lib/utils/score';
import { DEFAULT_WEIGHTS, FACTOR_NAMES, FACTOR_LABELS, FACTOR_EMOJI } from '@/lib/utils/score';

interface ScoreBreakdownProps {
  factors: FactorScores;
  weights?: Record<FactorName, number>;
}

function getBarColor(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  if (score >= 40) return 'bg-orange-500';
  return 'bg-red-500';
}

export function ScoreBreakdown({ factors, weights = DEFAULT_WEIGHTS }: ScoreBreakdownProps) {
  // Build factor entries with contribution and sort by contribution descending
  const entries = FACTOR_NAMES.map((name) => ({
    name,
    label: FACTOR_LABELS[name],
    emoji: FACTOR_EMOJI[name],
    score: factors[name],
    weight: weights[name],
    contribution: factors[name] * weights[name],
  })).sort((a, b) => b.contribution - a.contribution);

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">Score Breakdown</p>
      <div className="space-y-2">
        {entries.map((entry) => (
          <div key={entry.name} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>
                {entry.emoji} {entry.label}
              </span>
              <span className="font-medium tabular-nums">{entry.score}/100</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted">
              <div
                className={`h-1.5 rounded-full transition-all ${getBarColor(entry.score)}`}
                style={{ width: `${entry.score}%` }}
                role="progressbar"
                aria-valuenow={entry.score}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${entry.label} score`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
