'use client';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { FactorName } from '@/lib/utils/score';
import { DEFAULT_PRIORITY_ORDER, priorityOrderToWeights } from '@/lib/utils/score';

interface PrioritiesContextValue {
  priorityOrder: FactorName[];
  weights: Record<FactorName, number>;
  setPriorityOrder: (order: FactorName[]) => void;
}

const PrioritiesContext = createContext<PrioritiesContextValue | null>(null);

export function PrioritiesProvider({ children }: { children: React.ReactNode }) {
  const [priorityOrder, setPriorityOrderState] = useState<FactorName[]>(DEFAULT_PRIORITY_ORDER);

  const setPriorityOrder = useCallback((order: FactorName[]) => {
    setPriorityOrderState(order);
  }, []);

  const weights = useMemo(() => priorityOrderToWeights(priorityOrder), [priorityOrder]);

  const value = useMemo(
    () => ({ priorityOrder, weights, setPriorityOrder }),
    [priorityOrder, weights, setPriorityOrder]
  );

  return (
    <PrioritiesContext.Provider value={value}>
      {children}
    </PrioritiesContext.Provider>
  );
}

export function usePriorities(): PrioritiesContextValue {
  const context = useContext(PrioritiesContext);
  if (!context) {
    throw new Error('usePriorities must be used within a PrioritiesProvider');
  }
  return context;
}
