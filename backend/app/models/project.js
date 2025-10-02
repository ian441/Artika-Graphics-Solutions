const { pool } = require('../../db');

class Project {
  constructor({ id, user_id, title, description, image, created_at }) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.created_at = created_at;
  }

  // Create a new project
  static async create(projectData) {
    const { user_id, title, description, image } = projectData;
    const query = `
      INSERT INTO projects (user_id, title, description, image)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [user_id, title, description, image]);
      return new Project(result.rows[0]);
    } catch (error) {
      throw new Error(`Error creating project: ${error.message}`);
    }
  }

  // Find projects by user ID
  static async findByUserId(userId) {
    const query = 'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC';
    try {
      const result = await pool.query(query, [userId]);
      return result.rows.map(row => new Project(row));
    } catch (error) {
      throw new Error(`Error fetching projects: ${error.message}`);
    }
  }

  // Find project by ID
  static async findById(id) {
    const query = 'SELECT * FROM projects WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return new Project(result.rows[0]);
    } catch (error) {
      throw new Error(`Error fetching project: ${error.message}`);
    }
  }

  // Update project
  static async update(id, updateData) {
    const { title, description, image } = updateData;
    const query = `
      UPDATE projects
      SET title = $1, description = $2, image = $3
      WHERE id = $4
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [title, description, image, id]);
      if (result.rows.length === 0) {
        throw new Error('Project not found');
      }
      return new Project(result.rows[0]);
    } catch (error) {
      throw new Error(`Error updating project: ${error.message}`);
    }
  }

  // Delete project
  static async delete(id) {
    const query = 'DELETE FROM projects WHERE id = $1';
    try {
      await pool.query(query, [id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting project: ${error.message}`);
    }
  }
}

module.exports = Project;
