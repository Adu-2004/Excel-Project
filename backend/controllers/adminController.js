const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.js');
const Upload = require('../models/Upload.js');

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




const getDashboardStats = async (req, res) => {
  try {
    const users = await UserModel.find();
    const activeUsers = await UserModel.countDocuments({ isActive: true });
    const totalFiles = await Upload.countDocuments();
    res.json({
      users,
      activeUsers,
      totalFiles
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
///////////////////////////////////////////////////

// Get all users with required fields
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, 'name email role isActive lastLogin createdAt')
      .sort({ createdAt: -1 });  // newest first
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get total users count
const getTotalUsers = async (req, res) => {
  try {
    const count = await UserModel.countDocuments();
    res.json({ totalUsers: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get total files count
const getTotalFiles = async (req, res) => {
  try {
    const count = await Upload.countDocuments();
    res.json({ totalFiles: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all uploads with user info
const getAllFiles = async (req, res) => {
  try {
    const files = await Upload.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete uploaded file by ID
const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    // Optionally delete from cloudinary as well here

    const file = await Upload.findByIdAndDelete(id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update file metadata (example: filename)
const updateFile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // e.g. { filename: "newname.xlsx" }
    const updated = await Upload.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return res.status(404).json({ message: 'File not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = { adminLogin,
                getDashboardStats,
                updateFile,
                deleteFile,
                getAllFiles,
                getTotalFiles,
                getTotalUsers, 
                 getAllUsers,
                deleteUser,                 
 };

