import type { QualityLevel } from '@/lib/utils/conditions';

const LEVEL_COLORS: Record<QualityLevel, string> = {
  good: 'bg-green-500',
  moderate: 'bg-yellow-500',
  poor: 'bg-red-500',
};

interface FactorIndicatorProps {
  level: QualityLevel;
  label: string;
}

export function FactorIndicator({ level, label }: FactorIndicatorProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`size-2 rounded-full shrink-0 ${LEVEL_COLORS[level]}`}
        aria-hidden="true"
      />
      <span className="sr-only">{label}: {level}</span>
    </span>
  );
}
