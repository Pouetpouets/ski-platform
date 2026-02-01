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
import { ChevronUp, ChevronDown, RotateCcw, GripVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePriorities } from '@/lib/contexts/priorities-context';
import {
  FACTOR_LABELS,
  FACTOR_EMOJI,
  FACTOR_DESCRIPTIONS,
  PRIORITY_WEIGHT_DISTRIBUTION,
  DEFAULT_PRIORITY_ORDER,
} from '@/lib/utils/score';
import type { FactorName } from '@/lib/utils/score';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PrioritySettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrioritySettingsPanel({ isOpen, onClose }: PrioritySettingsPanelProps) {
  const t = useTranslations('priorities');
  const tFactors = useTranslations('factors');
  const tCommon = useTranslations('common');
  const { priorityOrder, setPriorityOrder } = usePriorities();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = priorityOrder.indexOf(active.id as FactorName);
    const newIndex = priorityOrder.indexOf(over.id as FactorName);

    const newOrder = [...priorityOrder];
    newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, active.id as FactorName);
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
            {t('title')}
          </SheetTitle>
          <SheetDescription>
            {t('description')}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-2 p-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={priorityOrder} strategy={verticalListSortingStrategy}>
              {priorityOrder.map((factor, index) => (
                <SortablePriorityItem
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
            </SortableContext>
          </DndContext>
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
            {tCommon('resetToDefault')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface SortablePriorityItemProps {
  factor: FactorName;
  rank: number;
  weight: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

function SortablePriorityItem({
  factor,
  rank,
  weight,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
}: SortablePriorityItemProps) {
  const t = useTranslations('priorities');
  const tFactors = useTranslations('factors');
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: factor });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 rounded-lg border bg-card p-3 ${
        isDragging ? 'opacity-50 shadow-lg z-50' : ''
      }`}
      data-testid={`priority-item-${factor}`}
    >
      {/* Drag handle */}
      <button
        className="touch-none cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground shrink-0"
        aria-label={t('dragLabel', { factor: tFactors(factor) })}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" />
      </button>

      {/* Rank number */}
      <span className="text-sm font-bold text-muted-foreground w-5 text-center shrink-0">
        {rank}
      </span>

      {/* Factor info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{FACTOR_EMOJI[factor]}</span>
          <span className="text-sm font-medium">{tFactors(factor)}</span>
          <span className="text-xs text-muted-foreground ml-auto tabular-nums">
            {Math.round(weight * 100)}%
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {tFactors(`${factor}Desc`)}
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
          aria-label={t('moveUp', { factor: tFactors(factor) })}
        >
          <ChevronUp className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onMoveDown}
          disabled={isLast}
          aria-label={t('moveDown', { factor: tFactors(factor) })}
        >
          <ChevronDown className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
