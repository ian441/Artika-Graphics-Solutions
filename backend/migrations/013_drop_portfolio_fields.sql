-- Drop the challenge, solution, results, and process columns from portfolio_projects table
ALTER TABLE portfolio_projects
DROP COLUMN IF EXISTS challenge,
DROP COLUMN IF EXISTS solution,
DROP COLUMN IF EXISTS results,
DROP COLUMN IF EXISTS process;
