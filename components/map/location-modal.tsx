'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useLocation } from '@/lib/contexts/location-context';

interface GeocodingFeature {
  id: string;
  place_name: string;
  center: [number, number]; // [longitude, latitude]
  text: string;
  context?: Array<{ id: string; text: string }>;
}

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelected?: (coords: { latitude: number; longitude: number }) => void;
}

export function LocationModal({ isOpen, onClose, onLocationSelected }: LocationModalProps) {
  const { setLocation } = useLocation();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodingFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  const searchLocations = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || !mapboxToken) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const encodedQuery = encodeURIComponent(searchQuery);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?access_token=${mapboxToken}&types=place,locality&limit=5`
      );

      if (!response.ok) throw new Error('Geocoding request failed');

      const data = await response.json();
      setSuggestions(data.features || []);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Geocoding error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [mapboxToken]);

  const handleInputChange = useCallback((value: string) => {
    setQuery(value);

    // Clear existing debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce search
    debounceRef.current = setTimeout(() => {
      searchLocations(value);
    }, 300);
  }, [searchLocations]);

  const handleSelectSuggestion = useCallback((feature: GeocodingFeature) => {
    const [longitude, latitude] = feature.center;
    const name = feature.text;
    setLocation(latitude, longitude, name);
    onLocationSelected?.({ latitude, longitude });
    onClose();
  }, [setLocation, onLocationSelected, onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  }, [suggestions, selectedIndex, handleSelectSuggestion, onClose]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="size-5" />
            Set Your Location
          </DialogTitle>
          <DialogDescription>
            Search for a city to calculate distances from your starting point.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for a city..."
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-9 pr-9"
            />
            {isLoading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin" />
            )}
          </div>

          {suggestions.length > 0 && (
            <ul className="border rounded-lg overflow-hidden divide-y">
              {suggestions.map((feature, index) => (
                <li key={feature.id}>
                  <button
                    type="button"
                    className={`w-full px-3 py-2.5 text-left text-sm hover:bg-accent transition-colors ${
                      index === selectedIndex ? 'bg-accent' : ''
                    }`}
                    onClick={() => handleSelectSuggestion(feature)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <span className="font-medium">{feature.text}</span>
                    {feature.context && feature.context.length > 0 && (
                      <span className="text-muted-foreground ml-1">
                        , {feature.context.map((c) => c.text).join(', ')}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {query.trim() && !isLoading && suggestions.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No locations found for &quot;{query}&quot;
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
