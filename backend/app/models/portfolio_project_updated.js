const { pool } = require('../../db');

class PortfolioProject {
  constructor({
    id,
    title,
    client,
    category,
    image,
    description,
    challenge,
    solution,
    results,
    process,
    duration,
    featured = false,
    created_at,
    updated_at
  }) {
    this._id = id; // Frontend expects _id
    this.id = id;
    this.title = title;
    this.client = client;
    this.category = category;
    this.image = image;
    this.description = description;
    this.challenge = challenge;
    this.solution = solution;
    this.results = results;
    this.process = process;
    this.duration = duration;
    this.featured = featured;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  // Create a new project
  static async create(projectData) {
    const {
      title,
      client,
      category,
      image,
      description,
      challenge,
      solution,
      results,
      process,
      duration,
      featured
    } = projectData;

    const query = `
      INSERT INTO portfolio_projects (
        title, client, category, image, description, challenge,
        solution, results, process, duration, featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;

    const values = [
      title,
      client,
      category,
      image,
      description,
      challenge,
      solution,
      results,
      process,
      duration,
      featured
    ];

    try {
      const result = await pool.query(query, values);
      return new PortfolioProject(result.rows[0]);
    } catch (error) {
      throw new Error(`Error creating project: ${error.message}`);
    }
  }

  // Get all projects with optional filtering
  static async findAll(filters = {}) {
    let query = 'SELECT * FROM portfolio_projects WHERE 1=1';
    const values = [];
    let paramCount = 1;

    if (filters.category && filters.category !== 'all') {
      query += ` AND category = $${paramCount}`;
      values.push(filters.category);
      paramCount++;
    }

    if (filters.featured) {
      query += ` AND featured = $${paramCount}`;
      values.push(filters.featured);
      paramCount++;
    }

    if (filters.limit) {
      query += ` LIMIT $${paramCount}`;
      values.push(filters.limit);
      paramCount++;
    }

    if (filters.offset) {
      query += ` OFFSET $${paramCount}`;
      values.push(filters.offset);
      paramCount++;
    }

    try {
      const result = await pool.query(query, values);
      return result.rows.map(row => new PortfolioProject(row));
    } catch (error) {
      throw new Error(`Error fetching projects: ${error.message}`);
    }
  }

  // Get project by ID
  static async findById(id) {
    const query = 'SELECT * FROM portfolio_projects WHERE id = $1';

    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return new PortfolioProject(result.rows[0]);
    } catch (error) {
      throw new Error(`Error fetching project: ${error.message}`);
    }
  }

  // Update project
  async update(updateData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(updateData[key]);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      return this;
    }

    values.push(this.id);
    const query = `
      UPDATE portfolio_projects
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `;

    try {
      const result = await pool.query(query, values);
      return new PortfolioProject(result.rows[0]);
    } catch (error) {
      throw new Error(`Error updating project: ${error.message}`);
    }
  }

  // Delete project
  async delete() {
    const query = 'DELETE FROM portfolio_projects WHERE id = $1';

    try {
      await pool.query(query, [this.id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting project: ${error.message}`);
    }
  }

  // Get featured projects
  static async getFeatured(limit = 6) {
    const query = 'SELECT * FROM portfolio_projects WHERE featured = true LIMIT $1';

    try {
      const result = await pool.query(query, [limit]);
      return result.rows.map(row => new PortfolioProject(row));
    } catch (error) {
      throw new Error(`Error fetching featured projects: ${error.message}`);
    }
  }

  // Get projects by category
  static async getByCategory(category, limit = 12) {
    const query = 'SELECT * FROM portfolio_projects WHERE category = $1 LIMIT $2';

    try {
      const result = await pool.query(query, [category, limit]);
      return result.rows.map(row => new PortfolioProject(row));
    } catch (error) {
      throw new Error(`Error fetching projects by category: ${error.message}`);
    }
  }

  // Get total count of projects
  static async getCount() {
    const query = 'SELECT COUNT(*) as count FROM portfolio_projects';

    try {
      const result = await pool.query(query);
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw new Error(`Error counting projects: ${error.message}`);
    }
  }

  // Get recent projects
  static async getRecent(limit = 5) {
    const query = 'SELECT * FROM portfolio_projects ORDER BY created_at DESC LIMIT $1';

    try {
      const result = await pool.query(query, [limit]);
      return result.rows.map(row => new PortfolioProject(row));
    } catch (error) {
      throw new Error(`Error fetching recent projects: ${error.message}`);
    }
  }
}

module.exports = PortfolioProject;
