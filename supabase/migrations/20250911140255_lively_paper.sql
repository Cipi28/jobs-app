/*
  # Setup RLS policies for users table

  1. Security
    - Enable RLS on users table
    - Add policy for users to create their own profile during registration
    - Add policy for users to read their own data
    - Add policy for users to update their own data

  2. Indexes
    - Add index on email for faster lookups
*/

-- Enable RLS on the users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy for INSERT: Users can create their own profile during registration
CREATE POLICY "Users can create own profile" ON public.users
FOR INSERT 
TO authenticated
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

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users USING btree (email);