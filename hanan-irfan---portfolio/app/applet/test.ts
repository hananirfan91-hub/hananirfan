import { createClient } from '@supabase/supabase-js';
try {
  createClient('https://agnjjlzuzihuqorpcfan.supabase.co', 'placeholder-anon-key');
  console.log('Success');
} catch (e) {
  console.error(e);
}
