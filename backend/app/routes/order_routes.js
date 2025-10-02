const express = require('express');
const OrderController = require('../controllers/order_controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create a new order (protected)
router.post('/', authenticateToken, OrderController.create);

// Get all orders for user (protected)
router.get('/', authenticateToken, OrderController.getAll);

// Get order by ID (protected)
router.get('/:id', authenticateToken, OrderController.getById);

// Update order status (protected)
router.patch('/:id/status', authenticateToken, OrderController.updateStatus);

module.exports = router;
