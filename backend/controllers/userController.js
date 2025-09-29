const Upload = require("../models/Upload.js");
const User = require("../models/User.js");

// GET all uploads (admin only)
const getAllUploads = async (req, res) => {
  try {
    const uploads = await Upload.find().populate("userId", "name email");
    res.json(uploads);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch all uploads" });
  }
};

// GET all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// DELETE user (admin only)
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete error", error: err.message });
  }
};
module.exports = {
  deleteUser,
  getAllUploads,
  getAllUsers
}
