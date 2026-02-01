'use client';

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import type { FactorName } from '@/lib/utils/score';
import { DEFAULT_PRIORITY_ORDER, FACTOR_NAMES, priorityOrderToWeights } from '@/lib/utils/score';
import { fetchUserPriorities, saveUserPriorities } from '@/lib/data/preferences';

const STORAGE_KEY = 'ski-platform-priorities';

interface PrioritiesContextValue {
  priorityOrder: FactorName[];
  weights: Record<FactorName, number>;
  setPriorityOrder: (order: FactorName[]) => void;
}

const PrioritiesContext = createContext<PrioritiesContextValue | null>(null);

/**
 * Load priority order from localStorage.
 * Returns null if unavailable, corrupted, or invalid.
 */
function loadFromStorage(): FactorName[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length !== FACTOR_NAMES.length) return null;

    // Validate every item is a known factor name
    const factorSet = new Set<string>(FACTOR_NAMES);
    const seen = new Set<string>();
    for (const item of parsed) {
      if (typeof item !== 'string' || !factorSet.has(item) || seen.has(item)) return null;
      seen.add(item);
    }

    return parsed as FactorName[];
  } catch {
    return null;
  }
}

/**
 * Save priority order to localStorage.
 * Silently fails if localStorage is unavailable.
 */
function saveToStorage(order: FactorName[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    // Silently ignore storage errors
  }
}

export function PrioritiesProvider({ children }: { children: React.ReactNode }) {
  const [priorityOrder, setPriorityOrderState] = useState<FactorName[]>(DEFAULT_PRIORITY_ORDER);

  // Load preferences: DB takes precedence over localStorage
  useEffect(() => {
    async function loadPriorities() {
      // First, load from localStorage for immediate display
      const stored = loadFromStorage();
      if (stored) {
        setPriorityOrderState(stored);
      }

      // Then try to fetch from DB (authenticated users)
      const dbPriorities = await fetchUserPriorities();
      if (dbPriorities) {
        // DB takes precedence - update state and sync localStorage
        setPriorityOrderState(dbPriorities);
        saveToStorage(dbPriorities);
      }
    }

    loadPriorities();
  }, []);

  const setPriorityOrder = useCallback((order: FactorName[]) => {
    setPriorityOrderState(order);
    saveToStorage(order);
    // Fire-and-forget save to DB for authenticated users
    saveUserPriorities(order);
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

export { STORAGE_KEY };
