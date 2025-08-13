// backend/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin.js'); // Make sure path is correct
require('dotenv').config();

async function createAdmin() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 2. Define the new admin's credentials
    const username = 'admin';
    const passwordPlain = 'admin123';  // You will use this plaintext to log in later

    // 3. Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists with this username.');
      process.exit(0);
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(passwordPlain, 10);

    // 5. Create and save new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword
    });

    await newAdmin.save();
    console.log(`✅ Admin created!  
Username: ${username}  
Password: ${passwordPlain}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
