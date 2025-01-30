// supabaseConfig.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // From .env
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // From .env

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Export supabase instance
export { supabase };
