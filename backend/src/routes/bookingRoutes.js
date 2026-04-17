const express = require('express');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).select('isBlocked');
    if (!currentUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (currentUser.isBlocked) {
      return res.status(403).json({ message: 'Your account is blocked. Booking is disabled.' });
    }

    const { roomId, checkInDate, checkOutDate, guests } = req.body;

    if (!roomId || !checkInDate || !checkOutDate || !guests) {
      return res.status(400).json({ message: 'All booking fields are required' });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      return res.status(400).json({ message: 'Check-out date must be after check-in date' });
    }

    const totalNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    const booking = await Booking.create({
      user: req.user.id,
      room: room._id,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      totalPrice: room.pricePerNight * totalNights
    });

    const detailedBooking = await Booking.findById(booking._id).populate('room');

    return res.status(201).json(detailedBooking);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Booking failed' });
  }
});

router.get('/my-bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('room')
      .sort({ createdAt: -1 });

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to fetch bookings' });
  }
});

router.get('/all', protect, adminOnly, async (_req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('room')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to fetch bookings' });
  }
});

module.exports = router;
