'use client';

import { Ticket } from 'lucide-react';
import { FactorIndicator } from '@/components/resort/factor-indicator';
import { getPriceQualityLevel } from '@/lib/utils/conditions';

interface TicketPriceDisplayProps {
  adultTicketPrice: number | null;
}

export function TicketPriceDisplay({ adultTicketPrice }: TicketPriceDisplayProps) {
  if (adultTicketPrice === null) return null;

  const qualityLevel = getPriceQualityLevel(adultTicketPrice);

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Ticket className="size-4 text-muted-foreground" />
        <p className="text-sm font-semibold">Lift Ticket</p>
        <FactorIndicator level={qualityLevel} label="Lift ticket price" />
      </div>

      {/* Price data */}
      <div className="text-sm">
        <p className="font-medium">&euro;{adultTicketPrice} adult day pass</p>
      </div>
    </div>
  );
}
