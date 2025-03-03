import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://rbumhlgjljzcwaosefif.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJidW1obGdqbGp6Y3dhb3NlZmlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNTQxMTYsImV4cCI6MjA1NTgzMDExNn0.wC53zINy4iyxOzMfmqN9xw6Z2-bIjFMblXY95bS3kOQ';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
