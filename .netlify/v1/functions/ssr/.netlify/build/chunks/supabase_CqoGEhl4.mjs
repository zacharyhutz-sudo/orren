import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://rmalhobbejzcxgolztgj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaXhjcWt5eGx4bGtuc2RpZ3JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNDM1MzAsImV4cCI6MjA5MjYxOTUzMH0.qIOAsrnIFzEglRLYNboK2N-dogROxoKbbjd1A7mE-dw";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase as s };
