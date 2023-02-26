import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://192.53.127.138:8000';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function signInWithEmail(emailStr, passwdStr) {
  const { data, error } = await supabase.auth.signUp({
  email: 'rizins@zins.dynu.com',
  password: 'test1234*'
})
  console.log(error);
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
}

export { signOut, signInWithEmail };
