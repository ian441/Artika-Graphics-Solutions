const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const PortfolioController = require('../controllers/portfolio_controller');
const ContactController = require('../controllers/contact_controller');
const AdminUserController = require('../controllers/admin_user_controller');
const SystemSettingsController = require('../controllers/system_settings_controller');
const BlogController = require('../controllers/blog_controller');
const Project = require('../models/project');
const Order = require('../models/order');
const Message = require('../models/message');
const ContactSubmission = require('../models/contact_submission');
const PortfolioProject = require('../models/portfolio_project');

const router = express.Router();

// Apply authentication middleware to all admin routes
router.use(authenticateToken);
router.use(requireAdmin);

// Portfolio management routes
router.get('/portfolio', PortfolioController.getProjects);
router.post('/portfolio', PortfolioController.createProject);
router.put('/portfolio/:id', PortfolioController.updateProject);
router.delete('/portfolio/:id', PortfolioController.deleteProject);

// Contact submissions management routes
router.get('/contacts', ContactController.getSubmissions);
router.get('/contacts/:id', ContactController.getSubmissionById);
router.put('/contacts/:id', ContactController.updateSubmission);
router.put('/contacts/:id/reply', ContactController.replyToSubmission);
router.put('/contacts/:id/read', ContactController.markAsRead);
router.delete('/contacts/:id', ContactController.deleteSubmission);
router.get('/contacts/statistics', ContactController.getStatistics);

// Dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    // Get total projects count
    const totalProjects = await PortfolioProject.getCount();

    // Get total contact submissions count
    const totalContacts = await ContactSubmission.getCount();

    // Get recent activity
    const recentProjects = await PortfolioProject.getRecent(5);
    const recentContacts = await ContactSubmission.getRecent(5);

    res.json({
      success: true,
      data: {
        statistics: {
          totalProjects,
          totalContacts
        },
        recentActivity: {
          projects: recentProjects,
          contacts: recentContacts
        }
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: error.message
    });
  }
});

// User management routes
router.get('/users', AdminUserController.getUsers);
router.put('/users/:id/role', AdminUserController.updateUserRole);
router.put('/users/:id/ban', AdminUserController.banUser);
router.put('/users/:id/unban', AdminUserController.unbanUser);
router.get('/users/stats', AdminUserController.getUserStats);

// Project management routes
router.get('/projects', async (req, res) => {
  try {
    const { status, assigned_to } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (assigned_to) filters.assigned_to = parseInt(assigned_to);

    const projects = await Project.getAllProjects(filters);
    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: error.message
    });
  }
});

router.put('/projects/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assigned_to, deadline } = req.body;

    const project = await Project.updateProjectStatus(id, status, assigned_to, deadline);
    res.json({
      success: true,
      data: project,
      message: 'Project status updated successfully'
    });
  } catch (error) {
    console.error('Error updating project status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project status',
      error: error.message
    });
  }
});

router.get('/projects/stats', async (req, res) => {
  try {
    const stats = await Project.getProjectStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching project stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project statistics',
      error: error.message
    });
  }
});

// Order/Revenue analytics routes
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findByUserId(null); // Get all orders for admin
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

router.get('/orders/stats', async (req, res) => {
  try {
    const { pool } = require('../../db');
    const query = `
      SELECT
        COUNT(*) as total_orders,
        SUM(amount) as total_revenue,
        AVG(amount) as average_order_value,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_orders
      FROM orders
    `;

    const result = await pool.query(query);
    const stats = result.rows[0];

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching order stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order statistics',
      error: error.message
    });
  }
});

// Message/Support ticket routes
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.getAllMessagesForAdmin();
    res.json({
      success: true,
      messages: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: error.message
    });
  }
});

// Send message from admin to user
router.post('/messages/send', async (req, res) => {
  try {
    const { user_id, title, content } = req.body;
    const admin_id = req.user?.id; // Assuming auth middleware sets req.user

    if (!user_id || !title || !content) {
      return res.status(400).json({
        success: false,
        message: 'user_id, title, and content are required'
      });
    }

    const message = await Message.createAdminMessage(admin_id, user_id, title, content);
    res.json({
      success: true,
      data: message,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
});

router.get('/messages/stats', async (req, res) => {
  try {
    const { pool } = require('../../db');
    const query = `
      SELECT
        COUNT(*) as total_messages,
        COUNT(CASE WHEN is_read = FALSE THEN 1 END) as unread_count
      FROM messages
    `;

    const result = await pool.query(query);
    const stats = result.rows[0];

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching message stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch message statistics',
      error: error.message
    });
  }
});

// System settings routes
router.get('/settings', SystemSettingsController.getSettings);
router.put('/settings/:key', SystemSettingsController.updateSetting);
router.put('/settings', SystemSettingsController.updateMultipleSettings);
router.get('/settings/object', SystemSettingsController.getSettingsObject);

// Blog management routes
router.get('/blog', BlogController.getPosts);
router.get('/blog/published', BlogController.getPublishedPosts);
router.get('/blog/stats', BlogController.getStats);
router.get('/blog/slug/:slug', BlogController.getPostBySlug);
router.get('/blog/:id', BlogController.getPost);
router.post('/blog', BlogController.createPost);
router.put('/blog/:id', BlogController.updatePost);
router.delete('/blog/:id', BlogController.deletePost);

module.exports = router;
