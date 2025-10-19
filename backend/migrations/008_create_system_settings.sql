-- Create system settings table for global configurations
CREATE TABLE system_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(50) DEFAULT 'string' CHECK (type IN ('string', 'number', 'boolean', 'json')),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO system_settings (key, value, type, description) VALUES
('site_name', 'Artika Graphics Solutions', 'string', 'Website name'),
('site_description', 'Professional graphic design and web development services', 'string', 'Website description'),
('contact_email', 'info@artikagraphics.com', 'string', 'Primary contact email'),
('contact_phone', '', 'string', 'Contact phone number'),
('google_analytics_id', '', 'string', 'Google Analytics tracking ID'),
('maintenance_mode', 'false', 'boolean', 'Enable maintenance mode'),
('allow_registrations', 'true', 'boolean', 'Allow new user registrations'),
('max_upload_size', '10485760', 'number', 'Maximum file upload size in bytes (10MB)'),
('smtp_host', '', 'string', 'SMTP server host'),
('smtp_port', '587', 'number', 'SMTP server port'),
('smtp_user', '', 'string', 'SMTP username'),
('smtp_password', '', 'string', 'SMTP password'),
('email_from', 'noreply@artikagraphics.com', 'string', 'Default from email address');
