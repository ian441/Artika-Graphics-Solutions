-- Add project status tracking
ALTER TABLE projects
ADD COLUMN status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'cancelled')),
ADD COLUMN assigned_to INTEGER REFERENCES users(id) NULL,
ADD COLUMN deadline DATE NULL;

ALTER TABLE portfolio_projects
ADD COLUMN status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'cancelled')),
ADD COLUMN assigned_to INTEGER REFERENCES users(id) NULL,
ADD COLUMN deadline DATE NULL;
