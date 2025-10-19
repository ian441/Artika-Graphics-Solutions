const { pool } = require('../../db');
const bcrypt = require('bcrypt');

class User {
  constructor({ id, email, password, created_at, name, avatar, updated_at, role, is_active, banned_at, ban_reason }) {
    this.id = id;
    this.email = email;
    this.password = password; // Store hashed password
    this.created_at = created_at;
    this.name = name;
    this.avatar = avatar;
    this.updated_at = updated_at;
    this.role = role || 'client';
    this.is_active = is_active !== undefined ? is_active : true;
    this.banned_at = banned_at;
    this.ban_reason = ban_reason;
  }

  // Create a new user
  static async create(userData) {
    const { email, password } = userData;
    
    // Hash the password before storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [email, hashedPassword]);
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    
    try {
      const result = await pool.query(query, [email]);
      if (result.rows.length === 0) {
        return null;
      }
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  // Find user by ID
  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    
    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  // Verify password
  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // Update user profile
  static async updateProfile(userId, profileData) {
    const { name, avatar } = profileData;
    const query = `
      UPDATE users
      SET name = $1, avatar = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [name, avatar, userId]);
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error(`Error updating profile: ${error.message}`);
    }
  }

  // Get user's projects
  static async getProjects(userId) {
    const query = 'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC';
    try {
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching projects: ${error.message}`);
    }
  }

  // Get user's messages
  static async getMessages(userId) {
    const query = 'SELECT * FROM messages WHERE user_id = $1 ORDER BY created_at DESC';
    try {
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching messages: ${error.message}`);
    }
  }

  // Get unread message count
  static async getUnreadMessageCount(userId) {
    const query = 'SELECT COUNT(*) as count FROM messages WHERE user_id = $1 AND is_read = FALSE';
    try {
      const result = await pool.query(query, [userId]);
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw new Error(`Error fetching unread count: ${error.message}`);
    }
  }

  // Get user's favorites
  static async getFavorites(userId) {
    const query = `
      SELECT p.* FROM projects p
      JOIN user_favorites uf ON p.id = uf.project_id
      WHERE uf.user_id = $1 ORDER BY uf.created_at DESC
    `;
    try {
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching favorites: ${error.message}`);
    }
  }

  // Get user's orders
  static async getOrders(userId) {
    const query = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC';
    try {
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching orders: ${error.message}`);
    }
  }

  // Admin methods for user management
  static async getAllUsers(filters = {}) {
    let query = `
      SELECT id, email, name, avatar, role, is_active, banned_at, ban_reason, created_at, updated_at
      FROM users
    `;
    const conditions = [];
    const params = [];

    if (filters.role) {
      conditions.push(`role = $${params.length + 1}`);
      params.push(filters.role);
    }

    if (filters.is_active !== undefined) {
      conditions.push(`is_active = $${params.length + 1}`);
      params.push(filters.is_active);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    try {
      const result = await pool.query(query, params);
      return result.rows.map(row => new User(row));
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  static async updateUserRole(userId, role) {
    const query = `
      UPDATE users
      SET role = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [role, userId]);
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error(`Error updating user role: ${error.message}`);
    }
  }

  static async banUser(userId, reason) {
    const query = `
      UPDATE users
      SET is_active = FALSE, banned_at = CURRENT_TIMESTAMP, ban_reason = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [reason, userId]);
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error(`Error banning user: ${error.message}`);
    }
  }

  static async unbanUser(userId) {
    const query = `
      UPDATE users
      SET is_active = TRUE, banned_at = NULL, ban_reason = NULL, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [userId]);
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      return new User(result.rows[0]);
    } catch (error) {
      throw new Error(`Error unbanning user: ${error.message}`);
    }
  }

  static async getUserStats() {
    const query = `
      SELECT
        COUNT(*) as total_users,
        COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_count,
        COUNT(CASE WHEN role = 'team' THEN 1 END) as team_count,
        COUNT(CASE WHEN role = 'client' THEN 1 END) as client_count,
        COUNT(CASE WHEN is_active = FALSE THEN 1 END) as banned_count
      FROM users
    `;

    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching user stats: ${error.message}`);
    }
  }
}

module.exports = User;
