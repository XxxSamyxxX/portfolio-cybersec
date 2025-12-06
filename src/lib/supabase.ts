import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(`Invalid Supabase URL format: ${supabaseUrl}`);
}

// Debug log only in development
if (import.meta.env.DEV) {
  console.log('Supabase initialized:', { url: supabaseUrl.substring(0, 30) + '...' });
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey
    }
  }
});