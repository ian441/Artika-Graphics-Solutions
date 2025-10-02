const express = require('express');
const FavoriteController = require('../controllers/favorite_controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Add a favorite (protected)
router.post('/', authenticateToken, FavoriteController.add);

// Get all favorites for user (protected)
router.get('/', authenticateToken, FavoriteController.getAll);

// Check if favorite exists (protected)
router.get('/check/:projectId', authenticateToken, FavoriteController.check);

// Remove a favorite (protected)
router.delete('/:projectId', authenticateToken, FavoriteController.remove);

module.exports = router;
