// Supabase configuration
// Replace these with your actual Supabase project URL and anon key
const SUPABASE_URL = "https://gqajvzkmxqbpfigttqbv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_hM7N2mdH3ls-POf5glcnaA_VTNHSyqy";

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

console.log("SUPABASE CLIENT READY:", window.supabaseClient);
