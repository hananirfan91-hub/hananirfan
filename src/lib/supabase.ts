/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// Hardcode values to prevent "Failed to fetch" errors caused by missing or incorrect environment variables
const supabaseUrl = 'https://agnjjlzuzihuqorpcfan.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbmpqbHp1emlodXFvcnBjZmFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MTE0MTQsImV4cCI6MjA5MDk4NzQxNH0.TwqtX8O1VnwgoG4DE08ydVC4UkQCEq-cW1Lun7i4uAA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  live_url?: string;
  github_url?: string;
  tags?: string[];
  additional_images?: string[];
  created_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  tags?: string[];
  created_at: string;
};
