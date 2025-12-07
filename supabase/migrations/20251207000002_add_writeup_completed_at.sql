/*
  # Add completed_at field to writeups

  1. Changes
    - Add `completed_at` field for the date when the writeup was completed
    - This allows displaying custom completion dates separate from created_at

  2. Purpose
    - Show when the CTF/machine was actually completed
    - More accurate timeline for portfolio visitors
*/

-- Add completed_at column for writeup completion date
ALTER TABLE writeups 
ADD COLUMN IF NOT EXISTS completed_at timestamptz DEFAULT now();

-- Update existing writeups to use created_at as completed_at
UPDATE writeups 
SET completed_at = created_at 
WHERE completed_at IS NULL;
