-- Add missing fields to portfolio_projects table
ALTER TABLE portfolio_projects
ADD COLUMN IF NOT EXISTS challenge TEXT,
ADD COLUMN IF NOT EXISTS solution TEXT,
ADD COLUMN IF NOT EXISTS results TEXT,
ADD COLUMN IF NOT EXISTS process TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
