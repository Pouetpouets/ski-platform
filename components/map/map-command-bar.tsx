'use client';

import { Search, Settings, Snowflake } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DayPicker } from './day-picker';
import { useResortSearch } from '@/lib/contexts/resort-search-context';

interface MapCommandBarProps {
  onSettingsOpen: () => void;
  snowLayerVisible: boolean;
  onSnowLayerToggle: () => void;
}

export function MapCommandBar({ onSettingsOpen, snowLayerVisible, onSnowLayerToggle }: MapCommandBarProps) {
  const { searchQuery, setSearchQuery } = useResortSearch();

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 w-[min(420px,calc(100vw-2rem))]">
      <div className="bg-background/70 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl px-3 py-2.5 flex flex-col gap-2">
        {/* Day pills */}
        <DayPicker />

        {/* Search + Settings */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search resorts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm bg-background/50 border-white/10"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`shrink-0 size-8 ${snowLayerVisible ? 'bg-blue-500/20 text-blue-400' : ''}`}
            onClick={onSnowLayerToggle}
            aria-label="Snow layer"
          >
            <Snowflake className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 size-8"
            onClick={onSettingsOpen}
            aria-label="Open priority settings"
          >
            <Settings className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
