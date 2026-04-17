const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Room = require('../models/Room');
const LoginEvent = require('../models/LoginEvent');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

const buildDateSeries = (days) => {
  const dates = [];

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - offset);
    date.setUTCHours(0, 0, 0, 0);
    dates.push(date);
  }

  return dates;
};

const mapSeries = (dates, groupedData, metricKey) => {
  const groupedMap = new Map(groupedData.map((item) => [item._id, item[metricKey] || 0]));

  return dates.map((date) => {
    const key = date.toISOString().slice(0, 10);
    return {
      date: key,
      value: groupedMap.get(key) || 0
    };
  });
};

router.get('/dashboard', protect, adminOnly, async (_req, res) => {
  try {
    const days = 7;
    const dateSeries = buildDateSeries(days);
    const startDate = dateSeries[0];

    const [
      totalUsers,
      blockedUsers,
      totalRooms,
      availableRooms,
      totalBookings,
      totalRevenueResult,
      bookingGrouped,
      loginGrouped,
      recentBookings,
      recentLogins
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      User.countDocuments({ role: 'user', isBlocked: true }),
      Room.countDocuments({}),
      Room.countDocuments({ isAvailable: true }),
      Booking.countDocuments({}),
      Booking.aggregate([{ $group: { _id: null, total: { $sum: '$totalPrice' } } }]),
      Booking.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$createdAt'
              }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      LoginEvent.aggregate([
        { $match: { createdAt: { $gte: startDate }, role: 'user', success: true } },
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$createdAt'
              }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      Booking.find({})
        .populate('user', 'name email')
        .populate('room', 'roomNumber title')
        .sort({ createdAt: -1 })
        .limit(5),
      LoginEvent.find({ role: 'user', success: true })
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .limit(6)
    ]);

    const bookingTrend = mapSeries(dateSeries, bookingGrouped, 'count');
    const loginTrend = mapSeries(dateSeries, loginGrouped, 'count');
    const activeUsers = Math.max(totalUsers - blockedUsers, 0);
    const totalRevenue = totalRevenueResult[0]?.total || 0;
    const occupancyRate = totalRooms > 0 ? Number((((totalRooms - availableRooms) / totalRooms) * 100).toFixed(1)) : 0;

    return res.status(200).json({
      generatedAt: new Date().toISOString(),
      stats: {
        totalUsers,
        activeUsers,
        blockedUsers,
        totalRooms,
        availableRooms,
        occupancyRate,
        totalBookings,
        totalRevenue
      },
      trends: {
        bookingTrend,
        loginTrend
      },
      recentBookings,
      recentLogins
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to fetch dashboard analytics' });
  }
});

module.exports = router;
