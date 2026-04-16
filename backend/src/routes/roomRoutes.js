const express = require('express');
const Room = require('../models/Room');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to fetch rooms' });
  }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const room = await Room.create(req.body);
    return res.status(201).json(room);
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Failed to create room' });
  }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    return res.status(200).json(updatedRoom);
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Failed to update room' });
  }
});

module.exports = router;
