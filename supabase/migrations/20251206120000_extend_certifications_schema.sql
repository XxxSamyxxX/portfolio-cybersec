-- Extend certifications table with customizable content blocks and learning outcomes
-- Migration: 20251206120000_extend_certifications_schema.sql

-- Add content_blocks JSONB column for customizable side-by-side blocks
-- Structure: [{title: string, items: [{icon?: string, text: string}]}]
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS content_blocks JSONB DEFAULT '[]'::jsonb;

-- Add learning_outcomes array for "Ce que prouve cette certification" section
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS learning_outcomes TEXT[] DEFAULT '{}';

-- Add verification_url for the separate "Vérifier" button
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS verification_url TEXT;

-- Add date_display for custom date format override (e.g., "2025 - 2027" for BTS)
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS date_display TEXT;

-- Add comment for documentation
COMMENT ON COLUMN certifications.content_blocks IS 'Array of content blocks with title and items. Each item has optional icon and text. Structure: [{title: string, items: [{icon?: string, text: string}]}]';
COMMENT ON COLUMN certifications.learning_outcomes IS 'Array of strings for "Ce que prouve cette certification" section';
COMMENT ON COLUMN certifications.verification_url IS 'URL for credential verification (separate from certificate_url)';
COMMENT ON COLUMN certifications.date_display IS 'Custom date display override (e.g., "2025 - 2027" for multi-year certifications)';
