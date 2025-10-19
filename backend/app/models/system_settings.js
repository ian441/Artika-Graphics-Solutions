const { pool } = require('../../db');

class SystemSettings {
  constructor({ id, key, value, type, description, created_at, updated_at }) {
    this.id = id;
    this.key = key;
    this.value = value;
    this.type = type || 'string';
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  // Get all settings
  static async getAll() {
    const query = 'SELECT * FROM system_settings ORDER BY key';
    try {
      const result = await pool.query(query);
      return result.rows.map(row => new SystemSettings(row));
    } catch (error) {
      throw new Error(`Error fetching system settings: ${error.message}`);
    }
  }

  // Get setting by key
  static async getByKey(key) {
    const query = 'SELECT * FROM system_settings WHERE key = $1';
    try {
      const result = await pool.query(query, [key]);
      if (result.rows.length === 0) {
        return null;
      }
      return new SystemSettings(result.rows[0]);
    } catch (error) {
      throw new Error(`Error fetching system setting: ${error.message}`);
    }
  }

  // Update setting
  static async update(key, value) {
    const query = `
      UPDATE system_settings
      SET value = $1, updated_at = CURRENT_TIMESTAMP
      WHERE key = $2
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [value, key]);
      if (result.rows.length === 0) {
        throw new Error('System setting not found');
      }
      return new SystemSettings(result.rows[0]);
    } catch (error) {
      throw new Error(`Error updating system setting: ${error.message}`);
    }
  }

  // Get settings as key-value object
  static async getSettingsObject() {
    const settings = await this.getAll();
    const settingsObj = {};

    settings.forEach(setting => {
      let parsedValue = setting.value;

      // Parse based on type
      switch (setting.type) {
        case 'number':
          parsedValue = parseFloat(setting.value);
          break;
        case 'boolean':
          parsedValue = setting.value.toLowerCase() === 'true';
          break;
        case 'json':
          try {
            parsedValue = JSON.parse(setting.value);
          } catch (e) {
            parsedValue = setting.value;
          }
          break;
        default:
          parsedValue = setting.value;
      }

      settingsObj[setting.key] = parsedValue;
    });

    return settingsObj;
  }

  // Bulk update settings
  static async updateMultiple(settings) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      for (const [key, value] of Object.entries(settings)) {
        await client.query(
          'UPDATE system_settings SET value = $1, updated_at = CURRENT_TIMESTAMP WHERE key = $2',
          [value, key]
        );
      }

      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(`Error updating system settings: ${error.message}`);
    } finally {
      client.release();
    }
  }
}

module.exports = SystemSettings;
