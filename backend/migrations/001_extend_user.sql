-- Extend users table for profile settings
ALTER TABLE users
ADD COLUMN name VARCHAR(255),
ADD COLUMN avatar TEXT,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
