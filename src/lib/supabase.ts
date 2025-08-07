import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ytdpzdtguiyqbvbllwxq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0ZHB6ZHRndWl5cWJ2Ymxsd3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NDYyODksImV4cCI6MjA2ODQyMjI4OX0.pIR4j1UclM9nXFidaKhZIvcKEZ31UyjSuocHmeTVT2I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
