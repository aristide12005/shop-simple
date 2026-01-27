-- Fix storage policies to restrict uploads/deletes to admins only

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can upload collection images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete collection images" ON storage.objects;

-- Create admin-only upload policy
CREATE POLICY "Admins can upload collection images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'collection-images' AND
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true)
);

-- Create admin-only delete policy
CREATE POLICY "Admins can delete collection images"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'collection-images' AND
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true)
);