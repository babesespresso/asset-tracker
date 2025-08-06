import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xaehxezxfxuiqswzvubv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZWh4ZXp4Znh1aXFzd3p2dWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MzIyMjcsImV4cCI6MjA3MDAwODIyN30.3FzMY8Dh5jeCxtsH_4YQQO4uAYlmeFoNNwqN8KzhMqQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
