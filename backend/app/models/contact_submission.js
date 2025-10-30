const { pool } = require('../../db');

class ContactSubmission {
  constructor({ id, name, email, company, message, created_at, is_read, admin_reply, replied_at, replied_by }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.company = company;
    this.message = message;
    this.created_at = created_at;
    this.is_read = is_read;
    this.admin_reply = admin_reply;
    this.replied_at = replied_at;
    this.replied_by = replied_by;
  }

  // Create a new contact submission
  static async create(submissionData) {
    const { name, email, company, message } = submissionData;

    const query = `
      INSERT INTO contact_submissions (name, email, company, message)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [name, email, company, message]);
      return new ContactSubmission(result.rows[0]);
    } catch (error) {
      throw new Error(`Error creating contact submission: ${error.message}`);
    }
  }

  // Get all contact submissions
  static async findAll(filters = {}) {
    let query = 'SELECT * FROM contact_submissions WHERE 1=1';
    const values = [];
    let paramCount = 1;

    if (filters.email) {
      query += ` AND email = $${paramCount}`;
      values.push(filters.email);
      paramCount++;
    }

    if (filters.startDate) {
      query += ` AND created_at >= $${paramCount}`;
      values.push(filters.startDate);
      paramCount++;
    }

    if (filters.endDate) {
      query += ` AND created_at <= $${paramCount}`;
      values.push(filters.endDate);
      paramCount++;
    }

    query += ' ORDER BY created_at DESC';

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
      return result.rows.map(row => new ContactSubmission(row));
    } catch (error) {
      throw new Error(`Error fetching contact submissions: ${error.message}`);
    }
  }

  // Get contact submission by ID
  static async findById(id) {
    const query = 'SELECT * FROM contact_submissions WHERE id = $1';
    
    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return new ContactSubmission(result.rows[0]);
    } catch (error) {
      throw new Error(`Error fetching contact submission: ${error.message}`);
    }
  }

  // Get submissions by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM contact_submissions WHERE email = $1 ORDER BY created_at DESC';
    
    try {
      const result = await pool.query(query, [email]);
      return result.rows.map(row => new ContactSubmission(row));
    } catch (error) {
      throw new Error(`Error fetching submissions by email: ${error.message}`);
    }
  }

  // Update contact submission (for admin purposes)
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
      UPDATE contact_submissions 
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    try {
      const result = await pool.query(query, values);
      return new ContactSubmission(result.rows[0]);
    } catch (error) {
      throw new Error(`Error updating contact submission: ${error.message}`);
    }
  }

  // Delete contact submission
  async delete() {
    const query = 'DELETE FROM contact_submissions WHERE id = $1';
    
    try {
      await pool.query(query, [this.id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting contact submission: ${error.message}`);
    }
  }

  // Get submission count
  static async getCount(filters = {}) {
    let query = 'SELECT COUNT(*) FROM contact_submissions WHERE 1=1';
    const values = [];
    let paramCount = 1;

    if (filters.email) {
      query += ` AND email = $${paramCount}`;
      values.push(filters.email);
      paramCount++;
    }

    if (filters.startDate) {
      query += ` AND created_at >= $${paramCount}`;
      values.push(filters.startDate);
      paramCount++;
    }

    if (filters.endDate) {
      query += ` AND created_at <= $${paramCount}`;
      values.push(filters.endDate);
      paramCount++;
    }

    try {
      const result = await pool.query(query, values);
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw new Error(`Error counting contact submissions: ${error.message}`);
    }
  }

  // Get recent submissions
  static async getRecent(limit = 10) {
    const query = 'SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT $1';
    
    try {
      const result = await pool.query(query, [limit]);
      return result.rows.map(row => new ContactSubmission(row));
    } catch (error) {
      throw new Error(`Error fetching recent submissions: ${error.message}`);
    }
  }
}

module.exports = ContactSubmission;
