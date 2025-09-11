-- Fix RLS policy for user registration
-- Drop existing policies and recreate them properly

DROP POLICY IF EXISTS "Users can create own profile" ON public.users;
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;

-- Create a more permissive INSERT policy for registration
-- This allows authenticated users to insert their own profile
CREATE POLICY "Enable insert for authenticated users during registration" ON public.users
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

-- Allow anon users to insert during the brief moment of registration
CREATE POLICY "Enable insert for anon users during registration" ON public.users
FOR INSERT 
TO anon
WITH CHECK (true);

-- Standard SELECT policy
CREATE POLICY "Users can read own data" ON public.users
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Standard UPDATE policy  
CREATE POLICY "Users can update own data" ON public.users
FOR UPDATE 
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);