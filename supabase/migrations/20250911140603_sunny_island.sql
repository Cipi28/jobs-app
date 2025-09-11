-- Fix RLS policy for users table to allow registration
-- This addresses the "new row violates row-level security policy" error

-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Users can create own profile" ON public.users;
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy for INSERT: Allow both anon and authenticated users to create their profile
-- This is crucial because during registration, the user might still be 'anon'
CREATE POLICY "Users can create own profile" ON public.users
FOR INSERT 
TO anon, authenticated
WITH CHECK (auth.uid() = id);

-- Policy for SELECT: Users can read their own data
CREATE POLICY "Users can read own data" ON public.users
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Policy for UPDATE: Users can update their own data
CREATE POLICY "Users can update own data" ON public.users
FOR UPDATE 
TO authenticated
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);

-- Add index on email for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);