const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingsByDate,
  getBookingById,
  updateBooking,
  deleteBooking
} = require('../controllers/booking_controller');

// Public routes (for creating bookings)
router.post('/', createBooking);

// Admin-only routes (require authentication middleware)
const auth = require('../middleware/auth');

// Get all bookings (admin)
router.get('/', auth, getAllBookings);

// Get bookings by date (admin)
router.get('/date/:date', auth, getBookingsByDate);

// Get specific booking (admin)
router.get('/:id', auth, getBookingById);

// Update booking (admin)
router.put('/:id', auth, updateBooking);

// Delete booking (admin)
router.delete('/:id', auth, deleteBooking);

module.exports = router;
