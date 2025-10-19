# Admin Dashboard Extension - TODO List

## Database Migrations
- [ ] Create migration 006_add_user_roles.sql - Add role column to users table
- [ ] Create migration 007_add_project_status.sql - Add status column to projects and portfolio_projects tables
- [ ] Create migration 008_create_system_settings.sql - Create system_settings table
- [ ] Create migration 009_create_blog_posts.sql - Create blog_posts table

## Backend Models & Controllers
- [ ] Update user.js model - Add role field and related methods
- [ ] Update project.js model - Add status field and methods
- [ ] Update portfolio_project.js model - Add status field if needed
- [ ] Create system_settings.js model
- [ ] Create blog_post.js model
- [ ] Create admin_user_controller.js - User management for admin
- [ ] Create system_settings_controller.js
- [ ] Create blog_controller.js
- [ ] Update existing controllers for new functionality

## Admin Routes Extension
- [ ] Extend admin_routes.js with user management endpoints
- [ ] Add order/revenue analytics endpoints
- [ ] Add message/support ticket management endpoints
- [ ] Add system settings CRUD endpoints
- [ ] Add blog post management endpoints

## Frontend Updates
- [ ] Update api.js with new admin API functions
- [ ] Update AdminDashboard.jsx - Add new tabs (Users, Orders/Revenue, Messages/Support, Settings, Blog)
- [ ] Implement user management interface
- [ ] Add revenue dashboard with order analytics
- [ ] Add support ticket management interface
- [ ] Add system settings panel
- [ ] Add blog content management interface
- [ ] Integrate Google Analytics setup

## Followup Steps
- [ ] Run database migrations
- [ ] Test new API endpoints
- [ ] Implement Google Analytics integration
- [ ] Add project assignment features
- [ ] Test user deactivation/banning functionality
