'use client';

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

const STORAGE_KEY = 'peakpick-location';

export interface UserLocation {
  latitude: number;
  longitude: number;
  name: string;
  isFromGeolocation: boolean;
}

interface LocationContextValue {
  location: UserLocation | null;
  setLocation: (latitude: number, longitude: number, name: string) => void;
  setGeolocation: (latitude: number, longitude: number) => void;
  clearLocation: () => void;
}

const LocationContext = createContext<LocationContextValue | null>(null);

/**
 * Load location from localStorage.
 * Returns null if unavailable, corrupted, or invalid.
 */
function loadFromStorage(): UserLocation | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    if (
      typeof parsed !== 'object' ||
      typeof parsed.latitude !== 'number' ||
      typeof parsed.longitude !== 'number' ||
      typeof parsed.name !== 'string' ||
      typeof parsed.isFromGeolocation !== 'boolean'
    ) {
      return null;
    }

    return parsed as UserLocation;
  } catch {
    return null;
  }
}

/**
 * Save location to localStorage.
 * Silently fails if localStorage is unavailable.
 */
function saveToStorage(location: UserLocation | null): void {
  try {
    if (location) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Silently ignore storage errors
  }
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocationState] = useState<UserLocation | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      setLocationState(stored);
    }
  }, []);

  const setLocation = useCallback((latitude: number, longitude: number, name: string) => {
    const newLocation: UserLocation = {
      latitude,
      longitude,
      name,
      isFromGeolocation: false,
    };
    setLocationState(newLocation);
    saveToStorage(newLocation);
  }, []);

  const setGeolocation = useCallback((latitude: number, longitude: number) => {
    const newLocation: UserLocation = {
      latitude,
      longitude,
      name: 'Your location',
      isFromGeolocation: true,
    };
    setLocationState(newLocation);
    saveToStorage(newLocation);
  }, []);

  const clearLocation = useCallback(() => {
    setLocationState(null);
    saveToStorage(null);
  }, []);

  const value = useMemo(
    () => ({ location, setLocation, setGeolocation, clearLocation }),
    [location, setLocation, setGeolocation, clearLocation]
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation(): LocationContextValue {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

export { STORAGE_KEY };
