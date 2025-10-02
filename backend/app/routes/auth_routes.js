const express = require('express');
const AuthController = require('../controllers/auth_controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Register a new user
router.post('/register', AuthController.register);

// Login user
router.post('/login', AuthController.login);

// Get user profile (protected route)
router.get('/profile', authenticateToken, AuthController.getProfile);

// Update user profile (protected route)
router.patch('/profile', authenticateToken, AuthController.updateProfile);

module.exports = router;
