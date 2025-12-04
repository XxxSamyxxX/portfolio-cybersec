-- ============================================
-- Migration: Create projects table
-- Date: 2025-12-04
-- Description: Table pour stocker les projets du portfolio
-- ============================================

-- Supprimer la table si elle existe (pour reset propre)
DROP TABLE IF EXISTS projects CASCADE;

-- Créer la table projects
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  long_description text,
  image text NOT NULL,
  tags text[] DEFAULT '{}',
  features text[] DEFAULT '{}',
  technical_details text[] DEFAULT '{}',
  github_url text,
  demo_url text,
  article_url text,
  status text CHECK (status IN ('completed', 'in-progress')) DEFAULT 'completed',
  timeline text,
  display_order integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index pour améliorer les performances
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_published ON projects(published);
CREATE INDEX idx_projects_display_order ON projects(display_order);

-- Activer Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Lecture publique pour les projets publiés
CREATE POLICY "Public can read published projects" 
  ON projects 
  FOR SELECT 
  USING (published = true);

-- Policy: Service role peut tout faire (pour l'admin local)
CREATE POLICY "Service role has full access" 
  ON projects 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour updated_at
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Commentaires sur la table
COMMENT ON TABLE projects IS 'Projets du portfolio cybersécurité';
COMMENT ON COLUMN projects.slug IS 'URL-friendly identifier unique';
COMMENT ON COLUMN projects.display_order IS 'Ordre d''affichage (0 = premier)';
COMMENT ON COLUMN projects.article_url IS 'Lien vers article détaillé si disponible';
