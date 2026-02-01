import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsocdiqdwtzlyrdlldsp.supabase.co/';
const supabaseAnonKey = 'sb_publishable_B-fZf2ZPbN1-f5rwFaSXmg_W5fTTaT6'; // Use the ANON key for frontend

export const supabase = createClient(supabaseUrl, supabaseAnonKey);