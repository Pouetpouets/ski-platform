import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { scrapeAllResorts } from '@/lib/scraper';

export const maxDuration = 300; // 5 minutes (Vercel Pro)

export async function GET(request: Request) {
  // Verify authorization
  const authHeader = request.headers.get('Authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json(
      { error: 'CRON_SECRET not configured' },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const adminClient = createAdminClient();
    const result = await scrapeAllResorts(adminClient);

    return NextResponse.json({
      ok: true,
      success: result.success.length,
      failed: result.failed.length,
      details: {
        success: result.success,
        failed: result.failed,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
