-- Create community_projects table for user-uploaded projects
CREATE TABLE public.community_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  uploader_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.community_projects ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view projects
CREATE POLICY "Anyone can view community projects" 
ON public.community_projects 
FOR SELECT 
USING (true);

-- Allow anyone to insert projects (public community feature)
CREATE POLICY "Anyone can add community projects" 
ON public.community_projects 
FOR INSERT 
WITH CHECK (true);

-- Create storage bucket for project files
INSERT INTO storage.buckets (id, name, public) VALUES ('project-files', 'project-files', true);

-- Allow public read access to project files
CREATE POLICY "Project files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-files');

-- Allow public upload to project files bucket
CREATE POLICY "Anyone can upload project files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-files');

-- Enable realtime for community engagement
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_projects;