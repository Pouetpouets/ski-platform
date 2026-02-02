'use client';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface ResortSearchContextValue {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ResortSearchContext = createContext<ResortSearchContextValue | null>(null);

export function ResortSearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQueryState] = useState('');

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);

  const value = useMemo(
    () => ({ searchQuery, setSearchQuery }),
    [searchQuery, setSearchQuery]
  );

  return (
    <ResortSearchContext.Provider value={value}>
      {children}
    </ResortSearchContext.Provider>
  );
}

export function useResortSearch(): ResortSearchContextValue {
  const context = useContext(ResortSearchContext);
  if (!context) {
    throw new Error('useResortSearch must be used within a ResortSearchProvider');
  }
  return context;
}
