-- Add user roles for admin functionality
ALTER TABLE users
ADD COLUMN role VARCHAR(50) DEFAULT 'client' CHECK (role IN ('admin', 'team', 'client')),
ADD COLUMN is_active BOOLEAN DEFAULT TRUE,
ADD COLUMN banned_at TIMESTAMP NULL,
ADD COLUMN ban_reason TEXT NULL;
