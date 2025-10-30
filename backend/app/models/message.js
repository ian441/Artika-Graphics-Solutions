const { pool } = require('../../db');

class Message {
  constructor({ id, user_id, sender_id, title, content, message_type, is_read, created_at }) {
    this.id = id;
    this.user_id = user_id;
    this.sender_id = sender_id;
    this.title = title;
    this.content = content;
    this.message_type = message_type;
    this.is_read = is_read;
    this.created_at = created_at;
  }

  // Create a new message
  static async create(messageData) {
    const { user_id, sender_id, title, content, message_type } = messageData;
    const query = `
      INSERT INTO messages (user_id, sender_id, title, content, message_type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [user_id, sender_id, title, content, message_type]);
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

  // Create admin message to user
  static async createAdminMessage(adminId, userId, title, content) {
    const messageData = {
      user_id: userId,
      sender_id: adminId,
      title,
      content,
      message_type: 'admin_to_user'
    };
    return this.create(messageData);
  }

  // Create user reply to admin
  static async createUserReply(userId, title, content) {
    const messageData = {
      user_id: userId, // Admin's ID would be needed here, but for now we'll use a placeholder
      sender_id: userId,
      title,
      content,
      message_type: 'user_to_admin'
    };
    return this.create(messageData);
  }

  // Get all messages for admin (both directions)
  static async getAllMessagesForAdmin() {
    const query = `
      SELECT m.*,
             u.email as sender_email,
             u2.email as recipient_email
      FROM messages m
      LEFT JOIN users u ON m.sender_id = u.id
      LEFT JOIN users u2 ON m.user_id = u2.id
      ORDER BY m.created_at DESC
    `;
    try {
      const result = await pool.query(query);
      return result.rows.map(row => ({
        ...new Message(row),
        sender_email: row.sender_email,
        recipient_email: row.recipient_email
      }));
    } catch (error) {
      throw new Error(`Error fetching all messages: ${error.message}`);
    }
  }
}

module.exports = Message;
