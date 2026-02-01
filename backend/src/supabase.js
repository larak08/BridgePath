import { createClient } from "@supabase/supabase-js";

// Used for verifying tokens (supabase.auth.getUser)
export const getSupabase = () => createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Used for database reads/writes AS the logged-in user (so RLS applies)
export function supabaseAsUser(accessToken) {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}
