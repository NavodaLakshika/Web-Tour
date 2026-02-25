import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a client only if we have the credentials, or use placeholders
// to prevent @supabase/ssr from throwing an error during the Next.js build process.
export const supabase = createBrowserClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials missing! Database features will not work. Please check your .env file.");
}
