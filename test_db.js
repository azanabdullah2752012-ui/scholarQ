import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const content = fs.readFileSync('src/lib/supabase.js', 'utf8');
const urlMatch = content.match(/supabaseUrl\s*=\s*['"]([^'"]+)['"]/);
const keyMatch = content.match(/supabaseKey\s*=\s*['"]([^'"]+)['"]/);

if (urlMatch && keyMatch) {
  const supabase = createClient(urlMatch[1], keyMatch[1]);
  
  async function test() {
    const { data, error } = await supabase.from('student_requests').select('*').limit(1);
    if (error) console.log("Error:", error.message);
    else console.log("Table exists:", data);
  }
  test();
} else {
  console.log("Could not find credentials");
}
