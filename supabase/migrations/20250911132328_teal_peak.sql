/*
  # Fix User Registration RLS Policy

  1. Security Updates
    - Update RLS policy to allow user registration
    - Allow users to insert their own profile during signup
    - Maintain security for read/update operations

  2. Changes
    - Add INSERT policy for authenticated users to create their profile
    - Keep existing SELECT and UPDATE policies
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Create new policies that allow registration
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Allow users to insert their own profile during registration
CREATE POLICY "Users can create own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);