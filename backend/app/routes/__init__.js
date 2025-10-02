// Import all route files
const authRoutes = require('./auth_routes');
const portfolioRoutes = require('./portfolio_routes');
const contactRoutes = require('./contact_routes');
const adminRoutes = require('./admin_routes');
const userRoutes = require('./user_routes');
const projectRoutes = require('./project_routes');
const messageRoutes = require('./message_routes');
const favoriteRoutes = require('./favorite_routes');
const orderRoutes = require('./order_routes');

// Export all routes
module.exports = {
  authRoutes,
  portfolioRoutes,
  contactRoutes,
  adminRoutes,
  userRoutes,
  projectRoutes,
  messageRoutes,
  favoriteRoutes,
  orderRoutes
};
