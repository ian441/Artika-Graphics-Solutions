const SystemSettings = require('../models/system_settings');

class SystemSettingsController {
  // Get all system settings
  static async getSettings(req, res) {
    try {
      const settings = await SystemSettings.getAll();
      res.json({
        success: true,
        data: settings
      });
    } catch (error) {
      console.error('Error fetching system settings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch system settings',
        error: error.message
      });
    }
  }

  // Update a single setting
  static async updateSetting(req, res) {
    try {
      const { key } = req.params;
      const { value } = req.body;

      if (value === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Value is required'
        });
      }

      const setting = await SystemSettings.update(key, value);
      res.json({
        success: true,
        data: setting,
        message: 'Setting updated successfully'
      });
    } catch (error) {
      console.error('Error updating system setting:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update system setting',
        error: error.message
      });
    }
  }

  // Update multiple settings
  static async updateMultipleSettings(req, res) {
    try {
      const settings = req.body;

      if (!settings || typeof settings !== 'object') {
        return res.status(400).json({
          success: false,
          message: 'Settings object is required'
        });
      }

      await SystemSettings.updateMultiple(settings);
      res.json({
        success: true,
        message: 'Settings updated successfully'
      });
    } catch (error) {
      console.error('Error updating system settings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update system settings',
        error: error.message
      });
    }
  }

  // Get settings as key-value object
  static async getSettingsObject(req, res) {
    try {
      const settings = await SystemSettings.getSettingsObject();
      res.json({
        success: true,
        data: settings
      });
    } catch (error) {
      console.error('Error fetching settings object:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch settings object',
        error: error.message
      });
    }
  }
}

module.exports = SystemSettingsController;
