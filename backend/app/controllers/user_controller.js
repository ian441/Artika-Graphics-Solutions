const User = require('../models/user');

class UserController {
  // Get dashboard data
  static async getDashboard(req, res) {
    try {
      const userId = req.user.id;

      const [projects, messages, favorites, orders] = await Promise.all([
        User.getProjects(userId),
        User.getMessages(userId),
        User.getFavorites(userId),
        User.getOrders(userId)
      ]);

      const unreadCount = await User.getUnreadMessageCount(userId);

      res.json({
        success: true,
        data: {
          projects: {
            count: projects.length,
            items: projects.slice(0, 5) // Recent 5
          },
          messages: {
            count: messages.length,
            unreadCount,
            items: messages.slice(0, 5)
          },
          favorites: {
            count: favorites.length,
            items: favorites.slice(0, 5)
          },
          orders: {
            count: orders.length,
            items: orders.slice(0, 5)
          }
        }
      });
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard data',
        error: error.message
      });
    }
  }
}

module.exports = UserController;
