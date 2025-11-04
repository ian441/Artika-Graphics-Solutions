const db = require('../../db');

class Booking {
  constructor(data) {
    this.id = data.id;
    this.user_name = data.user_name;
    this.email = data.email;
    this.service_type = data.service_type;
    this.date = data.date;
    this.time = data.time;
    this.status = data.status || 'pending';
    this.notes = data.notes;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async create(bookingData) {
    const query = `
      INSERT INTO bookings (user_name, email, service_type, date, time, status, notes, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING *
    `;
    const values = [
      bookingData.user_name,
      bookingData.email,
      bookingData.service_type,
      bookingData.date,
      bookingData.time,
      bookingData.status || 'pending',
      bookingData.notes
    ];

    try {
      const result = await db.query(query, values);
      return new Booking(result.rows[0]);
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  static async findAll() {
    const query = 'SELECT * FROM bookings ORDER BY date DESC, time DESC';
    try {
      const result = await db.query(query);
      return result.rows.map(row => new Booking(row));
    } catch (error) {
      console.error('Error finding bookings:', error);
      throw error;
    }
  }

  static async findByDate(date) {
    const query = 'SELECT * FROM bookings WHERE date = $1 ORDER BY time ASC';
    try {
      const result = await db.query(query, [date]);
      return result.rows.map(row => new Booking(row));
    } catch (error) {
      console.error('Error finding bookings by date:', error);
      throw error;
    }
  }

  static async findById(id) {
    const query = 'SELECT * FROM bookings WHERE id = $1';
    try {
      const result = await db.query(query, [id]);
      return result.rows.length > 0 ? new Booking(result.rows[0]) : null;
    } catch (error) {
      console.error('Error finding booking by id:', error);
      throw error;
    }
  }

  async update(updateData) {
    const query = `
      UPDATE bookings
      SET user_name = $1, email = $2, service_type = $3, date = $4, time = $5, status = $6, notes = $7, updated_at = NOW()
      WHERE id = $8
      RETURNING *
    `;
    const values = [
      updateData.user_name || this.user_name,
      updateData.email || this.email,
      updateData.service_type || this.service_type,
      updateData.date || this.date,
      updateData.time || this.time,
      updateData.status || this.status,
      updateData.notes || this.notes,
      this.id
    ];

    try {
      const result = await db.query(query, values);
      return new Booking(result.rows[0]);
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  }

  async delete() {
    const query = 'DELETE FROM bookings WHERE id = $1';
    try {
      await db.query(query, [this.id]);
      return true;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  }
}

module.exports = Booking;
