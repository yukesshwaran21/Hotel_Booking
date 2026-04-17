const express = require('express');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/users', protect, adminOnly, async (_req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to fetch users' });
  }
});

router.patch('/users/:id/block', protect, adminOnly, async (req, res) => {
  try {
    const { isBlocked } = req.body;

    if (typeof isBlocked !== 'boolean') {
      return res.status(400).json({ message: 'isBlocked boolean is required' });
    }

    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (targetUser.role === 'admin') {
      return res.status(400).json({ message: 'Admin accounts cannot be blocked' });
    }

    targetUser.isBlocked = isBlocked;
    await targetUser.save();

    return res.status(200).json({
      message: isBlocked ? 'User blocked successfully' : 'User unblocked successfully',
      user: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
        isBlocked: targetUser.isBlocked
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to update block status' });
  }
});

router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (targetUser.role === 'admin') {
      return res.status(400).json({ message: 'Admin accounts cannot be deleted' });
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to delete user' });
  }
});

module.exports = router;
