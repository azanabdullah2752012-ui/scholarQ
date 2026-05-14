const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrY3V5b3hicmJsYm9jYXpzamZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1ODM2NzAsImV4cCI6MjA5NDE1OTY3MH0.EDUnpxC_6QQiofjZDk37NExKIHPKdbLhBIzUfJ9Q-iY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
  console.log('--- Checking Doubts Table ---');
  const { data: doubts, error: dError } = await supabase.from('doubts').select('*').limit(1);
  if (dError) console.error('Doubts Error:', dError);
  else console.log('Doubts Columns:', Object.keys(doubts[0] || {}));

  console.log('\n--- Checking Profiles Table ---');
  const { data: profiles, error: pError } = await supabase.from('profiles').select('*').limit(1);
  if (pError) console.error('Profiles Error:', pError);
  else console.log('Profiles Columns:', Object.keys(profiles[0] || {}));
}

checkSchema();
