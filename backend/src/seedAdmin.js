const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path = require('path');
const connectDatabase = require('./config/db');
const User = require('./models/User');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedAdmin = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in .env before running seed-admin');
    process.exit(1);
  }

  try {
    await connectDatabase();

    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin already exists for this email');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to create admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
