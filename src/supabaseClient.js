import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://batpykpnvvdozmdelrxn.supabase.co';  
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdHB5a3BudnZkb3ptZGVscnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MDgyMjgsImV4cCI6MjA4NTQ4NDIyOH0.VGDAAS2kA-2DRjBO5SSHWvC1AA1ze-0CZW2jHKe1z9E';  

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('Supabase client created:', supabase);