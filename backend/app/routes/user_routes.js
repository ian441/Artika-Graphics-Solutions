const express = require('express');
const UserController = require('../controllers/user_controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get dashboard data (protected route)
router.get('/dashboard', authenticateToken, UserController.getDashboard);

module.exports = router;
