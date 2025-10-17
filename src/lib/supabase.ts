import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.\n' +
    'Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
  );
}

// Log configuration (without exposing the key)
console.log('Supabase Configuration:', {
  url: supabaseUrl,
  keyPrefix: supabaseAnonKey.substring(0, 20) + '...',
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
});

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'swift-room-haven-auth',
    flowType: 'pkce',
  },
  global: {
    headers: {
      'x-application-name': 'swift-room-haven',
    },
  },
});
