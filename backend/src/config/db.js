const mongoose = require('mongoose');

const connectDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MongoDB connection failed: MONGODB_URI is missing. Add it in backend/.env');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
