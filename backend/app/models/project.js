const { pool } = require('../../db');

class Project {
  constructor({ id, user_id, title, description, image, created_at, status, assigned_to, deadline }) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.created_at = created_at;
    this.status = status || 'draft';
    this.assigned_to = assigned_to;
    this.deadline = deadline;
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

  // Admin methods for project management
  static async getAllProjects(filters = {}) {
    let query = `
      SELECT p.*, u.name as assigned_user_name
      FROM projects p
      LEFT JOIN users u ON p.assigned_to = u.id
    `;
    const conditions = [];
    const params = [];

    if (filters.status) {
      conditions.push(`p.status = $${params.length + 1}`);
      params.push(filters.status);
    }

    if (filters.assigned_to) {
      conditions.push(`p.assigned_to = $${params.length + 1}`);
      params.push(filters.assigned_to);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY p.created_at DESC';

    try {
      const result = await pool.query(query, params);
      return result.rows.map(row => new Project(row));
    } catch (error) {
      throw new Error(`Error fetching projects: ${error.message}`);
    }
  }

  static async updateProjectStatus(id, status, assignedTo = null, deadline = null) {
    const query = `
      UPDATE projects
      SET status = $1, assigned_to = $2, deadline = $3
      WHERE id = $4
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [status, assignedTo, deadline, id]);
      if (result.rows.length === 0) {
        throw new Error('Project not found');
      }
      return new Project(result.rows[0]);
    } catch (error) {
      throw new Error(`Error updating project status: ${error.message}`);
    }
  }

  static async getProjectStats() {
    const query = `
      SELECT
        COUNT(*) as total_projects,
        COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_count,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_count,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_count,
        COUNT(CASE WHEN assigned_to IS NOT NULL THEN 1 END) as assigned_count
      FROM projects
    `;

    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching project stats: ${error.message}`);
    }
  }
}

module.exports = Project;
