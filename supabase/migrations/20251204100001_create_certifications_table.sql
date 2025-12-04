-- ============================================
-- Migration: Create certifications table
-- Date: 2025-12-04
-- Description: Table pour stocker les certifications
-- ============================================

-- Supprimer la table si elle existe (pour reset propre)
DROP TABLE IF EXISTS certifications CASCADE;

-- Créer la table certifications
CREATE TABLE certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  provider text NOT NULL,
  description text NOT NULL,
  long_description text,
  date_obtained date,
  status text CHECK (status IN ('completed', 'in-progress', 'planned')) DEFAULT 'completed',
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  skills text[] DEFAULT '{}',
  certificate_url text,
  badge_image text,
  color text DEFAULT 'violet',
  display_order integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index pour améliorer les performances
CREATE INDEX idx_certifications_slug ON certifications(slug);
CREATE INDEX idx_certifications_published ON certifications(published);
CREATE INDEX idx_certifications_provider ON certifications(provider);
CREATE INDEX idx_certifications_status ON certifications(status);
CREATE INDEX idx_certifications_display_order ON certifications(display_order);

-- Activer Row Level Security
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Policy: Lecture publique pour les certifications publiées
CREATE POLICY "Public can read published certifications" 
  ON certifications 
  FOR SELECT 
  USING (published = true);

-- Policy: Service role peut tout faire (pour l'admin local)
CREATE POLICY "Service role has full access" 
  ON certifications 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Trigger pour updated_at (réutilise la fonction créée dans projects)
DROP TRIGGER IF EXISTS update_certifications_updated_at ON certifications;
CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON certifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Commentaires sur la table
COMMENT ON TABLE certifications IS 'Certifications et formations du portfolio';
COMMENT ON COLUMN certifications.provider IS 'Fournisseur (TryHackMe, HackTheBox, EPSI, etc.)';
COMMENT ON COLUMN certifications.progress IS 'Pourcentage de progression (0-100) pour status in-progress';
COMMENT ON COLUMN certifications.color IS 'Couleur du thème (emerald, violet, blue, etc.)';
