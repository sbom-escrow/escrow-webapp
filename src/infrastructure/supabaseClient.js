import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nfpdjrmzwsvwkhjgtupl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mcGRqcm16d3N2d2toamd0dXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc0NDYyMzksImV4cCI6MTk5MzAyMjIzOX0.R4GbnfPXgcxmEBJid2zRLOY7SteiBXPOXm2cVKoYjYQ';
const supabase = createClient(supabaseUrl, supabaseKey);

async function signInWithEmail(emailStr, passwStr) {
  const { data, error } = await supabase.auth.signInWithPassword({
  email: emailStr,
  password: passwStr
})
  return { data, error };
}

async function signUp(emailStr, passwStr) {
  const { data, error } = await supabase.auth.signUp({
  email: emailStr,
  password: passwStr
})
  return { data, error };
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
}

async function addToVendorToTable() {
  const { data, error } = await supabase
  .from('vendor-table')
  .insert([
    { vendor_id: 'TestVendor', software_name: 'TestSoftware' },
  ])
}

export { signOut, signUp, signInWithEmail , addToVendorToTable };
