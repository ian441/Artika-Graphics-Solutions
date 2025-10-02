const { pool } = require('../../db');

class Order {
  constructor({ id, user_id, amount, status, created_at }) {
    this.id = id;
    this.user_id = user_id;
    this.amount = amount;
    this.status = status;
    this.created_at = created_at;
  }

  // Create a new order
  static async create(orderData) {
    const { user_id, amount, status = 'pending' } = orderData;
    const query = `
      INSERT INTO orders (user_id, amount, status)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [user_id, amount, status]);
      return new Order(result.rows[0]);
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  }

  // Find orders by user ID
  static async findByUserId(userId) {
    const query = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC';
    try {
      const result = await pool.query(query, [userId]);
      return result.rows.map(row => new Order(row));
    } catch (error) {
      throw new Error(`Error fetching orders: ${error.message}`);
    }
  }

  // Find order by ID
  static async findById(id) {
    const query = 'SELECT * FROM orders WHERE id = $1';
    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return new Order(result.rows[0]);
    } catch (error) {
      throw new Error(`Error fetching order: ${error.message}`);
    }
  }

  // Update order status
  static async updateStatus(id, status) {
    const query = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
    try {
      const result = await pool.query(query, [status, id]);
      if (result.rows.length === 0) {
        throw new Error('Order not found');
      }
      return new Order(result.rows[0]);
    } catch (error) {
      throw new Error(`Error updating order: ${error.message}`);
    }
  }
}

module.exports = Order;
