const Favorite = require('../models/favorite');

class FavoriteController {
  // Add a favorite
  static async add(req, res) {
    try {
      const userId = req.user.id;
      const { projectId } = req.body;
      const favorite = await Favorite.add(userId, projectId);

      res.status(201).json({
        success: true,
        message: 'Favorite added successfully',
        data: favorite
      });
    } catch (error) {
      console.error('Error adding favorite:', error);
      if (error.message === 'Favorite already exists') {
        return res.status(409).json({
          success: false,
          message: 'Favorite already exists'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Failed to add favorite',
        error: error.message
      });
    }
  }

  // Remove a favorite
  static async remove(req, res) {
    try {
      const userId = req.user.id;
      const { projectId } = req.params;
      await Favorite.remove(userId, parseInt(projectId));

      res.json({
        success: true,
        message: 'Favorite removed successfully'
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to remove favorite',
        error: error.message
      });
    }
  }

  // Get all favorites for user
  static async getAll(req, res) {
    try {
      const userId = req.user.id;
      const favorites = await Favorite.findByUserId(userId);

      res.json({
        success: true,
        data: favorites
      });
    } catch (error) {
      console.error('Error fetching favorites:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch favorites',
        error: error.message
      });
    }
  }

  // Check if favorite exists
  static async check(req, res) {
    try {
      const userId = req.user.id;
      const { projectId } = req.params;
      const exists = await Favorite.exists(userId, parseInt(projectId));

      res.json({
        success: true,
        data: { isFavorite: exists }
      });
    } catch (error) {
      console.error('Error checking favorite:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to check favorite',
        error: error.message
      });
    }
  }
}

module.exports = FavoriteController;
