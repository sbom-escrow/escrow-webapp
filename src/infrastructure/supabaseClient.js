import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nfpdjrmzwsvwkhjgtupl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mcGRqcm16d3N2d2toamd0dXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc0NDYyMzksImV4cCI6MTk5MzAyMjIzOX0.R4GbnfPXgcxmEBJid2zRLOY7SteiBXPOXm2cVKoYjYQ';
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
