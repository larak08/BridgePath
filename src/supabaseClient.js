import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '';
const supabaseAnonKey = ''; // Use the ANON key for frontend

export const supabase = createClient(supabaseUrl, supabaseAnonKey);