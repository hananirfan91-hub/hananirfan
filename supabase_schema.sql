-- Run this script in your Supabase SQL Editor to set up the database schema

-- Create the messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS) for messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert access for messages
CREATE POLICY "Allow public insert access for messages" ON public.messages
    FOR INSERT
    WITH CHECK (true);

-- Create policy to allow authenticated users to read messages
CREATE POLICY "Allow authenticated users to read messages" ON public.messages
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Create the projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    live_url TEXT,
    github_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.projects
    FOR SELECT
    USING (true);

-- Create policy to allow authenticated users to insert projects
-- (You can restrict this further to only your admin email if you prefer)
CREATE POLICY "Allow authenticated users to insert projects" ON public.projects
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update projects
CREATE POLICY "Allow authenticated users to update projects" ON public.projects
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete projects
CREATE POLICY "Allow authenticated users to delete projects" ON public.projects
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- Optional: Insert some sample data
INSERT INTO public.projects (title, description, category, image_url, live_url, github_url)
VALUES 
('AI Image Generator', 'A full-stack application that generates images from text prompts using advanced AI models.', 'AI Development', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop', 'https://example.com', 'https://github.com'),
('E-Commerce Dashboard', 'A modern, responsive dashboard for managing e-commerce inventory and sales analytics.', 'Full Stack', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', 'https://example.com', 'https://github.com'),
('Brand Identity Design', 'Complete brand identity including logo, typography, and marketing materials for a tech startup.', 'Graphic Design', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop', 'https://example.com', null);
