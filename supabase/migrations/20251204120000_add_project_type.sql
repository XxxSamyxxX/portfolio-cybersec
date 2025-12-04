-- ============================================
-- Migration: Add project_type field
-- Date: 2025-12-04
-- Description: Distinguer les Articles (contenu long avec page dédiée) 
--              des Projets Showcase (carte concise avec modal)
-- ============================================

-- Ajouter le champ project_type
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_type text 
  CHECK (project_type IN ('article', 'showcase')) 
  DEFAULT 'showcase';

-- Mettre à jour les projets existants basé sur article_url
-- Les projets AVEC article_url sont des Articles
UPDATE projects SET project_type = 'article' WHERE article_url IS NOT NULL;

-- Les projets SANS article_url sont des Showcase
UPDATE projects SET project_type = 'showcase' WHERE article_url IS NULL;

-- Rendre le champ NOT NULL après la mise à jour
ALTER TABLE projects ALTER COLUMN project_type SET NOT NULL;

-- Index pour filtrage rapide par type
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(project_type);

-- Commentaire pour documentation
COMMENT ON COLUMN projects.project_type IS 'Type de projet: article (page dédiée complète) ou showcase (modal avec détails courts)';
