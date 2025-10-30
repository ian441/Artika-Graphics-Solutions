// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
  adminEmail: process.env.REACT_APP_ADMIN_EMAIL || 'atkingsclouse@gmail.com',
  supportEmail: process.env.REACT_APP_SUPPORT_EMAIL || 'ayiloian09@gmail.com',
  responseTime: '24 hours',
};
