// supabaseConfig.js

import { createClient } from '@supabase/supabase-js';

export const supabaseConfig = {
    url: import.meta.env.VITE_SUPABASE_URL || "",
    key: import.meta.env.VITE_SUPABASE_KEY || "",
  };


