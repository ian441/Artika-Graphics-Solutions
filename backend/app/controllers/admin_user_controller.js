const User = require('../models/user');

class AdminUserController {
  // Get all users for admin
  static async getUsers(req, res) {
    try {
      const { role, is_active } = req.query;
      const filters = {};

      if (role) filters.role = role;
      if (is_active !== undefined) filters.is_active = is_active === 'true';

      const users = await User.getAllUsers(filters);
      res.json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch users',
        error: error.message
      });
    }
  }

  // Update user role
  static async updateUserRole(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!['admin', 'team', 'client'].includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role. Must be admin, team, or client'
        });
      }

      const user = await User.updateUserRole(id, role);
      res.json({
        success: true,
        data: user,
        message: 'User role updated successfully'
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update user role',
        error: error.message
      });
    }
  }

  // Ban user
  static async banUser(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      if (!reason || reason.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Ban reason is required'
        });
      }

      const user = await User.banUser(id, reason);
      res.json({
        success: true,
        data: user,
        message: 'User banned successfully'
      });
    } catch (error) {
      console.error('Error banning user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to ban user',
        error: error.message
      });
    }
  }

  // Unban user
  static async unbanUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.unbanUser(id);
      res.json({
        success: true,
        data: user,
        message: 'User unbanned successfully'
      });
    } catch (error) {
      console.error('Error unbanning user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to unban user',
        error: error.message
      });
    }
  }

  // Get user statistics
  static async getUserStats(req, res) {
    try {
      const stats = await User.getUserStats();
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user statistics',
        error: error.message
      });
    }
  }
}

module.exports = AdminUserController;
