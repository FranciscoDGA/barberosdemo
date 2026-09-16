/**
 * supabase-admin.ts
 *
 * Server-side Supabase client using the SERVICE_ROLE_KEY.
 * This client BYPASSES Row Level Security (RLS).
 *
 * IMPORTANT: Only use this in API routes (server-side).
 * Never import this in client components.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
 * (get it from: Supabase Dashboard → Settings → API → service_role key)
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabaseAdmin: SupabaseClient;

if (supabaseUrl && serviceRoleKey) {
  supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
} else {
  // Graceful fallback for build time and demo mode
  // API routes will fail at runtime if Supabase is not configured
  supabaseAdmin = createClient('https://placeholder.supabase.co', 'placeholder-key');
  if (typeof window === 'undefined') {
    console.warn('[BarberOS] supabase-admin: SUPABASE_SERVICE_ROLE_KEY not set. API routes requiring admin access will fail.');
  }
}

export { supabaseAdmin };
