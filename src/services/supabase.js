import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mkaqsnyttxfwlrwnoeop.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rYXFzbnl0dHhmd2xyd25vZW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMzMwNjEsImV4cCI6MjA1MDcwOTA2MX0.c4eXDOdLpHaNBLlOw2vFwlKzEK5c1Om6v8l7K3ae3eg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
