import { createClient } from '@supabase/supabase-js';

// For this development environment, we are hardcoding the Supabase credentials
// to resolve the configuration issue. In a real-world production application,
// these should be stored securely as environment variables and accessed via
// `process.env.SUPABASE_URL` and `process.env.SUPABASE_ANON_KEY`.
const supabaseUrl = 'https://dimhzjpkhvcovkmwyqih.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpbWh6anBreHZjb3ZrbXd5cWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5Njk4MjQsImV4cCI6MjA3NzU0NTgyNH0.8jQKORf2iBkNoaO-pb5vlPaOz0r2VeUHMy9jMtBF0fk';

if (!supabaseUrl || !supabaseKey) {
  // This error will not be thrown now, but is kept as a safeguard.
  throw new Error(
    'Supabase credentials are not provided. ' +
    'Please ensure the hardcoded values in supabase/client.ts are correct.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
