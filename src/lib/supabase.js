import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrY3V5b3hicmJsYm9jYXpzamZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1ODM2NzAsImV4cCI6MjA5NDE1OTY3MH0.EDUnpxC_6QQiofjZDk37NExKIHPKdbLhBIzUfJ9Q-iY'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
