'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

const locales = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
] as const;

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (locale: string) => {
    if (locale === currentLocale) return;

    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
      window.location.reload();
    });
  };

  return (
    <div className="flex items-center gap-0.5" role="radiogroup" aria-label="Language">
      {locales.map(({ code, label }, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && <span className="text-muted-foreground mx-0.5">|</span>}
          <Button
            variant="ghost"
            size="sm"
            className={`h-auto px-1 py-0 text-xs font-medium ${
              currentLocale === code
                ? 'text-foreground underline underline-offset-2'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => switchLocale(code)}
            disabled={isPending}
            role="radio"
            aria-checked={currentLocale === code}
            aria-label={label}
          >
            {label}
          </Button>
        </span>
      ))}
    </div>
  );
}
