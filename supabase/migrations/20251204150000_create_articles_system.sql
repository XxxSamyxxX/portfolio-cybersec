-- ============================================
-- Migration: Create articles system
-- Date: 2025-12-04
-- Description: Tables pour gérer les articles dynamiques avec sous-pages
-- ============================================

-- ============================================
-- TABLE: articles (Table principale des articles)
-- ============================================
DROP TABLE IF EXISTS article_sections CASCADE;
DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Informations de base
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  
  -- Image header (optionnel)
  header_image text,
  
  -- Bloc Introduction / "Pourquoi ce projet ?"
  intro_title text DEFAULT 'Pourquoi ce projet ?',
  intro_icon text DEFAULT 'Laptop', -- Nom de l'icône Lucide
  intro_content text, -- Paragraphe de présentation
  
  -- Cartes d'introduction (JSON array)
  -- Format: [{"icon": "Shield", "title": "Sécurité", "description": "..."}]
  intro_cards jsonb DEFAULT '[]'::jsonb,
  
  -- Diagramme SVG (optionnel, stocké en JSON)
  -- Format: {"type": "boot-diagram", "nodes": [...], "connections": [...]}
  diagram jsonb,
  
  -- Métadonnées
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL, -- Lien vers le projet parent
  display_order integer DEFAULT 0,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published ON articles(published);
CREATE INDEX idx_articles_project ON articles(project_id);

-- RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published articles" 
  ON articles 
  FOR SELECT 
  USING (published = true);

CREATE POLICY "Service role has full access on articles" 
  ON articles 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Trigger updated_at
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLE: article_sections (Sous-pages/onglets)
-- ============================================
CREATE TABLE article_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  
  -- Identifiant et affichage de l'onglet
  tab_key text NOT NULL, -- "installation", "configuration", "faq"...
  tab_label text NOT NULL, -- "Installation", "Configuration"...
  tab_icon text DEFAULT 'FileText', -- Icône Lucide
  
  -- Contenu structuré (JSON)
  -- Format: { "blocks": [...] }
  -- Types de blocs supportés:
  --   - { "type": "text", "content": "..." }
  --   - { "type": "code", "language": "bash", "code": "...", "title": "..." }
  --   - { "type": "steps", "items": [{"title": "...", "content": "...", "code": "..."}] }
  --   - { "type": "comparison", "items": [{"name": "...", "option1": {...}, "option2": {...}}] }
  --   - { "type": "faq", "items": [{"question": "...", "answer": "..."}] }
  --   - { "type": "grid", "columns": 2, "items": [{"icon": "...", "title": "...", "items": ["..."]}] }
  --   - { "type": "alert", "variant": "info|warning|success", "content": "..." }
  content jsonb NOT NULL DEFAULT '{"blocks": []}'::jsonb,
  
  -- Ordre d'affichage
  display_order integer DEFAULT 0,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contrainte unique: un seul tab_key par article
ALTER TABLE article_sections ADD CONSTRAINT unique_article_tab 
  UNIQUE (article_id, tab_key);

-- Index
CREATE INDEX idx_article_sections_article ON article_sections(article_id);
CREATE INDEX idx_article_sections_order ON article_sections(article_id, display_order);

-- RLS
ALTER TABLE article_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read sections of published articles" 
  ON article_sections 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM articles 
      WHERE articles.id = article_sections.article_id 
      AND articles.published = true
    )
  );

CREATE POLICY "Service role has full access on sections" 
  ON article_sections 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Trigger updated_at
DROP TRIGGER IF EXISTS update_article_sections_updated_at ON article_sections;
CREATE TRIGGER update_article_sections_updated_at
  BEFORE UPDATE ON article_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMMENTAIRES
-- ============================================
COMMENT ON TABLE articles IS 'Articles détaillés avec structure dynamique (header, intro, sections)';
COMMENT ON TABLE article_sections IS 'Sous-pages/onglets des articles avec contenu structuré en blocs';
COMMENT ON COLUMN articles.intro_cards IS 'JSON: [{"icon": "Shield", "title": "...", "description": "..."}]';
COMMENT ON COLUMN articles.diagram IS 'JSON: {"type": "flow|comparison", "nodes": [...], "connections": [...]}';
COMMENT ON COLUMN article_sections.content IS 'JSON structuré avec blocs: text, code, steps, comparison, faq, grid, alert';
