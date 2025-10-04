const express = require('express');
const PortfolioController = require('../controllers/portfolio_controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all categories
router.get('/categories', PortfolioController.getCategories);

// Get featured projects
router.get('/featured', PortfolioController.getFeaturedProjects);

// Get projects by category
router.get('/category/:category', PortfolioController.getProjectsByCategory);

// Get projects by client (user) - protected route
router.get('/my-projects', authenticateToken, PortfolioController.getProjectsByClient);

// Get all projects
router.get('/', PortfolioController.getProjects);

// Get project by ID
router.get('/:id', PortfolioController.getProjectById);

// Create new project (admin only)
router.post('/', PortfolioController.createProject);

// Update project (admin only)
router.put('/:id', PortfolioController.updateProject);

// Delete project (admin only)
router.delete('/:id', PortfolioController.deleteProject);

module.exports = router;
