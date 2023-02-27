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

async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if(data.session)
  {
    return data.session
  }
  return null;  
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
}

async function uploadSbom(sbom) {
  const session = await getSession();
  const { data, error } = await supabase
    .from('vendor-sboms')
    .insert([
      { vendor_id: session.user.id, software_name: sbom.name, sbom:sbom.sbomData, version:sbom.version }
    ])
}

async function getSboms(){
  const session = await getSession();
  const { data, error } = await supabase
    .from('vendor-sboms')  
    .select()
    .eq('vendor_id',session.user.id)
  return data;
}

async function getMySbom(id){
  const session = await getSession();
  const { data, error } = await supabase
    .from('vendor-sboms')  
    .select()
    .eq('id',id)
  return data.length > 0 ? data[0] : null;
}

async function getVendorSbom(id){
  const session = await getSession();
  const { data, error } = await supabase
    .from('sboms')  
    .select()
    .eq('sbom_id',id)
  return data.length > 0 ? data[0] : null;
}

async function getVendorName(){
  const session = await getSession();
  if(!session)
    return null
  const { data, error } = await supabase
    .from('vendors')  
    .select()
    .eq('id',session.user.id)
  if(data.length > 0)
    return data[0].name;
  return session.user.email + "'s Company";
}

async function setVendorName(name){
  const session = await getSession();
  const { data, error } = await supabase
    .from('vendors')  
    .select()
    .eq('id',session.user.id)
  if(data.length > 0)
  {
    const { idata, ierror } = await supabase
      .from('vendors')
      .update([
        { id: session.user.id, name: name }
      ])
  }
  const { idata, ierror } = await supabase
      .from('vendors')
      .insert([
        { id: session.user.id, name: name }
      ])
}

async function searchSboms(searchTerm){
  const { data, error } = await supabase
    .from('sboms')  
    .select()
    .textSearch('software_name', `'` + searchTerm + `'`)
  return data;
}

async function getClientSubscriptions(){
  const session = await getSession();
  const { data, error } = await supabase
    .from('client-sboms')  
    .select()
    .eq('client_id',session.user.id)
  let sboms = [];
  for(var i =0; i< data.length; i++){
    sboms.push(await getVendorSbom(data[i].sbom_id))
  }
  return sboms;
}

async function getVendorSubscriptions(sbom_id){
  const session = await getSession();
  const { data, error } = await supabase
    .from('client-sboms')  
    .select('sbom_id, vendor-sboms(*), vendors(name), cvss')
    .eq('sbom_id',sbom_id)

  return data;
}


async function createSubscription(sbom_id){
  const session = await getSession();
  const { data, error } = await supabase
    .from('client-sboms')  
    .insert([
      { client_id: session.user.id, sbom_id: sbom_id }
    ])
  return data;
}


export { signOut, signUp, signInWithEmail , uploadSbom, getSession, getSboms, getVendorName, setVendorName, searchSboms, getMySbom, getVendorSbom, getClientSubscriptions, createSubscription, getVendorSubscriptions };
