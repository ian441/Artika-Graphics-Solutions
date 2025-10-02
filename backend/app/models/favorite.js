const { pool } = require('../../db');

class Favorite {
  constructor({ id, user_id, project_id, created_at }) {
    this.id = id;
    this.user_id = user_id;
    this.project_id = project_id;
    this.created_at = created_at;
  }

  // Add a favorite
  static async add(userId, projectId) {
    const query = `
      INSERT INTO user_favorites (user_id, project_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, project_id) DO NOTHING
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [userId, projectId]);
      if (result.rows.length === 0) {
        throw new Error('Favorite already exists');
      }
      return new Favorite(result.rows[0]);
    } catch (error) {
      throw new Error(`Error adding favorite: ${error.message}`);
    }
  }

  // Remove a favorite
  static async remove(userId, projectId) {
    const query = 'DELETE FROM user_favorites WHERE user_id = $1 AND project_id = $2';
    try {
      await pool.query(query, [userId, projectId]);
      return true;
    } catch (error) {
      throw new Error(`Error removing favorite: ${error.message}`);
    }
  }

  // Find favorites by user ID
  static async findByUserId(userId) {
    const query = `
      SELECT uf.*, p.title, p.description, p.image
      FROM user_favorites uf
      JOIN projects p ON uf.project_id = p.id
      WHERE uf.user_id = $1 ORDER BY uf.created_at DESC
    `;
    try {
      const result = await pool.query(query, [userId]);
      return result.rows.map(row => ({
        id: row.id,
        user_id: row.user_id,
        project_id: row.project_id,
        created_at: row.created_at,
        project: {
          title: row.title,
          description: row.description,
          image: row.image
        }
      }));
    } catch (error) {
      throw new Error(`Error fetching favorites: ${error.message}`);
    }
  }

  // Check if favorite exists
  static async exists(userId, projectId) {
    const query = 'SELECT 1 FROM user_favorites WHERE user_id = $1 AND project_id = $2';
    try {
      const result = await pool.query(query, [userId, projectId]);
      return result.rows.length > 0;
    } catch (error) {
      throw new Error(`Error checking favorite: ${error.message}`);
    }
  }
}

module.exports = Favorite;
