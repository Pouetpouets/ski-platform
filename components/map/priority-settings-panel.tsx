'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, RotateCcw } from 'lucide-react';
import { usePriorities } from '@/lib/contexts/priorities-context';
import {
  FACTOR_LABELS,
  FACTOR_EMOJI,
  FACTOR_DESCRIPTIONS,
  PRIORITY_WEIGHT_DISTRIBUTION,
  DEFAULT_PRIORITY_ORDER,
} from '@/lib/utils/score';
import type { FactorName } from '@/lib/utils/score';

interface PrioritySettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrioritySettingsPanel({ isOpen, onClose }: PrioritySettingsPanelProps) {
  const { priorityOrder, setPriorityOrder } = usePriorities();

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...priorityOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setPriorityOrder(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === priorityOrder.length - 1) return;
    const newOrder = [...priorityOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setPriorityOrder(newOrder);
  };

  const resetToDefault = () => {
    setPriorityOrder([...DEFAULT_PRIORITY_ORDER]);
  };

  const isDefault = priorityOrder.every((f, i) => f === DEFAULT_PRIORITY_ORDER[i]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="left"
        aria-label="Priority settings"
        className="w-[340px] sm:max-w-[340px] overflow-y-auto"
      >
        <SheetHeader className="p-6 pb-0">
          <SheetTitle className="text-lg font-semibold">
            Your Priorities
          </SheetTitle>
          <SheetDescription>
            Reorder factors to personalize your Perfect Day Score. The top factor has the most influence.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-2 p-6">
          {priorityOrder.map((factor, index) => (
            <PriorityItem
              key={factor}
              factor={factor}
              rank={index + 1}
              weight={PRIORITY_WEIGHT_DISTRIBUTION[index]}
              isFirst={index === 0}
              isLast={index === priorityOrder.length - 1}
              onMoveUp={() => moveUp(index)}
              onMoveDown={() => moveDown(index)}
            />
          ))}
        </div>

        <SheetFooter className="p-6 pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={resetToDefault}
            disabled={isDefault}
            className="w-full"
          >
            <RotateCcw className="size-3.5 mr-1.5" />
            Reset to Default
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface PriorityItemProps {
  factor: FactorName;
  rank: number;
  weight: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

function PriorityItem({
  factor,
  rank,
  weight,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
}: PriorityItemProps) {
  return (
    <div
      className="flex items-center gap-3 rounded-lg border bg-card p-3"
      data-testid={`priority-item-${factor}`}
    >
      {/* Rank number */}
      <span className="text-sm font-bold text-muted-foreground w-5 text-center shrink-0">
        {rank}
      </span>

      {/* Factor info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{FACTOR_EMOJI[factor]}</span>
          <span className="text-sm font-medium">{FACTOR_LABELS[factor]}</span>
          <span className="text-xs text-muted-foreground ml-auto tabular-nums">
            {Math.round(weight * 100)}%
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {FACTOR_DESCRIPTIONS[factor]}
        </p>
      </div>

      {/* Up/Down buttons */}
      <div className="flex flex-col gap-0.5 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onMoveUp}
          disabled={isFirst}
          aria-label={`Move ${FACTOR_LABELS[factor]} up`}
        >
          <ChevronUp className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onMoveDown}
          disabled={isLast}
          aria-label={`Move ${FACTOR_LABELS[factor]} down`}
        >
          <ChevronDown className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
