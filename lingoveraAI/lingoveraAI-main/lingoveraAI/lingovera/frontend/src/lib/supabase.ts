import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yazlirpnjlkpxkkpedse.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhemxpcnBuamxrcHhra3BlZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2OTc1MTIsImV4cCI6MjA1NzI3MzUxMn0.RP-7erxDM7L-VW7Ucq8El9bvjI3VX92rFzc9Hb5bBAk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);