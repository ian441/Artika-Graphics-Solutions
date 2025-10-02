const { pool } = require('../../db');

class Message {
  constructor({ id, user_id, title, content, is_read, created_at }) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.content = content;
    this.is_read = is_read;
    this.created_at = created_at;
  }

  // Create a new message
  static async create(messageData) {
    const { user_id, title, content } = messageData;
    const query = `
      INSERT INTO messages (user_id, title, content)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [user_id, title, content]);
      return new Message(result.rows[0]);
    } catch (error) {
      throw new Error(`Error creating message: ${error.message}`);
    }
  }

  // Find messages by user ID
  static async findByUserId(userId) {
    const query = 'SELECT * FROM messages WHERE user_id = $1 ORDER BY created_at DESC';
    try {
      const result = await pool.query(query, [userId]);
      return result.rows.map(row => new Message(row));
    } catch (error) {
      throw new Error(`Error fetching messages: ${error.message}`);
    }
  }

  // Find message by ID
  static async findById(id) {
    const query = 'SELECT * FROM messages WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return new Message(result.rows[0]);
    } catch (error) {
      throw new Error(`Error fetching message: ${error.message}`);
    }
  }

  // Mark message as read
  static async markAsRead(id) {
    const query = 'UPDATE messages SET is_read = TRUE WHERE id = $1 RETURNING *';
    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        throw new Error('Message not found');
      }
      return new Message(result.rows[0]);
    } catch (error) {
      throw new Error(`Error marking message as read: ${error.message}`);
    }
  }

  // Get unread count for user
  static async getUnreadCount(userId) {
    const query = 'SELECT COUNT(*) as count FROM messages WHERE user_id = $1 AND is_read = FALSE';
    try {
      const result = await pool.query(query, [userId]);
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw new Error(`Error fetching unread count: ${error.message}`);
    }
  }

  // Delete message
  static async delete(id) {
    const query = 'DELETE FROM messages WHERE id = $1';
    try {
      await pool.query(query, [id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting message: ${error.message}`);
    }
  }
}

module.exports = Message;
