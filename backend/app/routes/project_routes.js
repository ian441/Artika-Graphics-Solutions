const express = require('express');
const ProjectController = require('../controllers/project_controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create a new project (protected)
router.post('/', authenticateToken, ProjectController.create);

// Get all projects for user (protected)
router.get('/', authenticateToken, ProjectController.getAll);

// Get project by ID (protected)
router.get('/:id', authenticateToken, ProjectController.getById);

// Update project (protected)
router.patch('/:id', authenticateToken, ProjectController.update);

// Delete project (protected)
router.delete('/:id', authenticateToken, ProjectController.delete);

module.exports = router;
