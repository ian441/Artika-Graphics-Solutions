const Booking = require('../models/booking');

const createBooking = async (req, res) => {
  try {
    const { user_name, email, service_type, date, time, notes } = req.body;

    // Validate required fields
    if (!user_name || !email || !service_type || !date || !time) {
      return res.status(400).json({
        message: 'Missing required fields: user_name, email, service_type, date, time'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate date is not in the past
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return res.status(400).json({ message: 'Cannot book appointments in the past' });
    }

    const bookingData = {
      user_name,
      email,
      service_type,
      date,
      time,
      notes
    };

    const booking = await Booking.create(bookingData);

    res.status(201).json({
      message: 'Booking created successfully',
      booking: {
        id: booking.id,
        user_name: booking.user_name,
        email: booking.email,
        service_type: booking.service_type,
        date: booking.date,
        time: booking.time,
        status: booking.status,
        notes: booking.notes,
        created_at: booking.created_at
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json({
      bookings: bookings.map(booking => ({
        id: booking.id,
        user_name: booking.user_name,
        email: booking.email,
        service_type: booking.service_type,
        date: booking.date,
        time: booking.time,
        status: booking.status,
        notes: booking.notes,
        created_at: booking.created_at,
        updated_at: booking.updated_at
      }))
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookingsByDate = async (req, res) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    const bookings = await Booking.findByDate(date);
    res.json({
      date,
      bookings: bookings.map(booking => ({
        id: booking.id,
        user_name: booking.user_name,
        email: booking.email,
        service_type: booking.service_type,
        date: booking.date,
        time: booking.time,
        status: booking.status,
        notes: booking.notes,
        created_at: booking.created_at
      }))
    });
  } catch (error) {
    console.error('Error fetching bookings by date:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Booking ID is required' });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({
      booking: {
        id: booking.id,
        user_name: booking.user_name,
        email: booking.email,
        service_type: booking.service_type,
        date: booking.date,
        time: booking.time,
        status: booking.status,
        notes: booking.notes,
        created_at: booking.created_at,
        updated_at: booking.updated_at
      }
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Booking ID is required' });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const updatedBooking = await booking.update(updateData);

    res.json({
      message: 'Booking updated successfully',
      booking: {
        id: updatedBooking.id,
        user_name: updatedBooking.user_name,
        email: updatedBooking.email,
        service_type: updatedBooking.service_type,
        date: updatedBooking.date,
        time: updatedBooking.time,
        status: updatedBooking.status,
        notes: updatedBooking.notes,
        updated_at: updatedBooking.updated_at
      }
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Booking ID is required' });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.delete();

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingsByDate,
  getBookingById,
  updateBooking,
  deleteBooking
};
