import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Graceful fallback when env vars are missing (demo mode, build time, etc.)
// In production, these MUST be set or Supabase operations will fail at runtime.
let supabase: SupabaseClient;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  // Create a dummy client that will fail gracefully on any operation
  // This allows the app to build and render without Supabase configured
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
  if (typeof window !== 'undefined') {
    console.warn('[BarberOS] Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  }
}

export { supabase };
