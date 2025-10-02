const Message = require('../models/message');

class MessageController {
  // Create a new message (could be for admin to send notifications)
  static async create(req, res) {
    try {
      const messageData = req.body;
      const message = await Message.create(messageData);

      res.status(201).json({
        success: true,
        message: 'Message created successfully',
        data: message
      });
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create message',
        error: error.message
      });
    }
  }

  // Get all messages for user
  static async getAll(req, res) {
    try {
      const userId = req.user.id;
      const messages = await Message.findByUserId(userId);

      res.json({
        success: true,
        data: messages
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch messages',
        error: error.message
      });
    }
  }

  // Get unread count
  static async getUnreadCount(req, res) {
    try {
      const userId = req.user.id;
      const count = await Message.getUnreadCount(userId);

      res.json({
        success: true,
        data: { unreadCount: count }
      });
    } catch (error) {
      console.error('Error fetching unread count:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch unread count',
        error: error.message
      });
    }
  }

  // Mark message as read
  static async markAsRead(req, res) {
    try {
      const { id } = req.params;
      const message = await Message.findById(id);

      if (!message) {
        return res.status(404).json({
          success: false,
          message: 'Message not found'
        });
      }

      if (message.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      const updatedMessage = await Message.markAsRead(id);

      res.json({
        success: true,
        message: 'Message marked as read',
        data: updatedMessage
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to mark message as read',
        error: error.message
      });
    }
  }

  // Delete message
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const message = await Message.findById(id);

      if (!message) {
        return res.status(404).json({
          success: false,
          message: 'Message not found'
        });
      }

      if (message.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      await Message.delete(id);

      res.json({
        success: true,
        message: 'Message deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete message',
        error: error.message
      });
    }
  }
}

module.exports = MessageController;
