-- ============================================
-- Migration: Fix RLS policies for admin access
-- Date: 2025-12-06
-- Description: Allow reading all certifications for admin dashboard
-- ============================================

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Public can read published certifications" ON certifications;

-- New policy: Allow reading ALL certifications (for admin + portfolio)
-- The portfolio will filter by published=true in the query
CREATE POLICY "Anyone can read certifications" 
  ON certifications 
  FOR SELECT 
  USING (true);

-- Keep write access for service role only
-- (Already exists: "Service role has full access")

-- ============================================
-- Same fix for other tables if needed
-- ============================================

-- Projects
DROP POLICY IF EXISTS "Public can read published projects" ON projects;
CREATE POLICY "Anyone can read projects" 
  ON projects 
  FOR SELECT 
  USING (true);

-- Articles  
DROP POLICY IF EXISTS "Public can read published articles" ON articles;
CREATE POLICY "Anyone can read articles" 
  ON articles 
  FOR SELECT 
  USING (true);

-- Article sections
DROP POLICY IF EXISTS "Public can read sections of published articles" ON article_sections;
CREATE POLICY "Anyone can read article_sections" 
  ON article_sections 
  FOR SELECT 
  USING (true);

-- Writeups
DROP POLICY IF EXISTS "Public can read published writeups" ON writeups;
CREATE POLICY "Anyone can read writeups" 
  ON writeups 
  FOR SELECT 
  USING (true);
