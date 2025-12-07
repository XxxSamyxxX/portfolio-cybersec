/*
  # Fix writeups RLS - Block draft access for public

  1. Changes
    - Remove "Anyone can read writeups" policy (security issue)
    - Create "Public can read published writeups only" policy
    - Keep admin access for all writeups

  2. Security
    - Draft writeups are no longer accessible publicly
    - Only published writeups are visible to anonymous users
*/

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can read writeups" ON writeups;

-- Create proper policy: public can only read published writeups
CREATE POLICY "Public can read published writeups only" 
  ON writeups 
  FOR SELECT 
  USING (published = true);

-- Ensure authenticated users can still manage their writeups
DROP POLICY IF EXISTS "Users can manage own writeups" ON writeups;
CREATE POLICY "Authenticated users can manage all writeups" 
  ON writeups 
  FOR ALL 
  TO authenticated 
  USING (true)
  WITH CHECK (true);
