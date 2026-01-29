import { describe, it, expect } from 'vitest';

describe('Supabase Client', () => {
  it('can import browser client module', async () => {
    const clientModule = await import('@/lib/supabase/client');
    expect(clientModule).toBeDefined();
    expect(typeof clientModule.createClient).toBe('function');
  });

  it('can import server client module', async () => {
    const serverModule = await import('@/lib/supabase/server');
    expect(serverModule).toBeDefined();
    expect(typeof serverModule.createClient).toBe('function');
  });
});
