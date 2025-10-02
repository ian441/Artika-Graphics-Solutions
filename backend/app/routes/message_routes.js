const express = require('express');
const MessageController = require('../controllers/message_controller');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create a new message (could be public or protected, assuming protected for now)
router.post('/', authenticateToken, MessageController.create);

// Get all messages for user (protected)
router.get('/', authenticateToken, MessageController.getAll);

// Get unread count (protected)
router.get('/unread-count', authenticateToken, MessageController.getUnreadCount);

// Mark message as read (protected)
router.patch('/:id/read', authenticateToken, MessageController.markAsRead);

// Delete message (protected)
router.delete('/:id', authenticateToken, MessageController.delete);

module.exports = router;
