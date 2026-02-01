import { createClient } from '@/lib/supabase/client';
import type { FactorName } from '@/lib/utils/score';
import { FACTOR_NAMES } from '@/lib/utils/score';

/**
 * Fetch user priorities from the database.
 * Returns null if not authenticated or no preferences saved.
 */
export async function fetchUserPriorities(): Promise<FactorName[] | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_preferences')
    .select('priorities')
    .eq('user_id', user.id)
    .single();

  if (error || !data) return null;

  // Validate the stored priorities
  const priorities = data.priorities as unknown as string[];
  if (!isValidPriorityOrder(priorities)) return null;

  return priorities as FactorName[];
}

/**
 * Save user priorities to the database (upsert).
 * Returns true on success, false on failure.
 */
export async function saveUserPriorities(priorities: FactorName[]): Promise<boolean> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from('user_preferences')
    .upsert(
      { user_id: user.id, priorities: priorities as unknown as string[] },
      { onConflict: 'user_id' }
    );

  return !error;
}

/**
 * Validate a priority order array.
 */
function isValidPriorityOrder(arr: unknown): arr is FactorName[] {
  if (!Array.isArray(arr) || arr.length !== FACTOR_NAMES.length) return false;
  const factorSet = new Set<string>(FACTOR_NAMES);
  const seen = new Set<string>();
  for (const item of arr) {
    if (typeof item !== 'string' || !factorSet.has(item) || seen.has(item)) return false;
    seen.add(item);
  }
  return true;
}
