-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can add community projects" ON public.community_projects;

-- Create a restrictive policy - only service role (Edge Functions) can insert
-- This prevents direct client-side inserts while allowing the Edge Function to work
CREATE POLICY "Only service role can insert projects" 
ON public.community_projects 
FOR INSERT 
TO authenticated, anon
WITH CHECK (false);

-- Update storage policy to also restrict direct uploads
-- First, drop the existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can upload project files" ON storage.objects;

-- Create restrictive policy - no direct client uploads allowed
-- The Edge Function uses service role which bypasses RLS
CREATE POLICY "No direct uploads allowed" 
ON storage.objects 
FOR INSERT 
TO authenticated, anon
WITH CHECK (bucket_id = 'project-files' AND false);