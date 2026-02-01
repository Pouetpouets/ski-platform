import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock next-intl for all tests
// Returns the message key as the translated string; appends param values for parameterized messages
function createMockT() {
  return (key: string, params?: Record<string, string | number>) => {
    if (!params || Object.keys(params).length === 0) return key;
    return `${key} ${Object.values(params).join(' ')}`;
  };
}

vi.mock('next-intl', () => ({
  useTranslations: () => createMockT(),
  useLocale: () => 'fr',
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('next-intl/server', () => ({
  getTranslations: async () => createMockT(),
  getLocale: async () => 'fr',
  getMessages: async () => ({}),
}));
