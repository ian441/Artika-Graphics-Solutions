// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// Default configuration
export const DEFAULT_CONFIG = {
  contact: {
    maxMessageLength: 2000,
    maxNameLength: 100,
    maxCompanyLength: 200,
  },
  portfolio: {
    itemsPerPage: 12,
    featuredLimit: 6,
  },
};

// Email configuration (for frontend display purposes)
export const EMAIL_CONFIG = {
  adminEmail: process.env.REACT_APP_ADMIN_EMAIL || 'admin@creativestudio.com',
  supportEmail: process.env.REACT_APP_SUPPORT_EMAIL || 'support@creativestudio.com',
  responseTime: '24 hours',
};
