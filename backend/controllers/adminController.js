const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.js');

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await UserModel.findOne({ email });

    if (!admin || admin.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Admins only' });
    }

    const isPassValid = await bcrypt.compare(password, admin.password);
    if (!isPassValid) {
      return res.status(403).json({ message: 'Invalid email or password' });
    }

    const jwtToken = jwt.sign(
      { _id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Admin login successful',
      success: true,
      token: jwtToken,
      role: admin.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { adminLogin };

