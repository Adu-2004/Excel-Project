/*const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Mongoose schema for uploaded files history
const uploadSchema = new mongoose.Schema({
  originalname: { type: String, required: true },
  cloudinaryUrl: { type: String }, // Optional: URL of the uploaded file
   public_id: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Fix OverwriteModelError by using existing model if available
const Upload = mongoose.models.Upload || mongoose.model('Upload', uploadSchema);

// GET: Fetch recent uploads history (max 50, latest first)
router.get('/uploads', async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ createdAt: -1 }).limit(50);
    res.json(uploads);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
});




// POST: Save new upload info after successful file upload
router.post('/uploads', async (req, res) => {
  const { originalname, cloudinaryUrl } = req.body;
  if (!originalname) {
    return res.status(400).json({ message: "Missing originalname" });
  }
  try {
    const upload = new Upload({ originalname, cloudinaryUrl });
    await upload.save();
    res.status(201).json(upload);
  } catch (e) {
    res.status(500).json({ message: "Failed to save file to history" });
  }
});

// DELETE upload by ID
router.delete('/uploads/:id', async (req, res) => {
  try {
    const upload = await Upload.findById(req.params.id);
    if (!upload) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Delete from Cloudinary if public_id exists
    if (upload.public_id) {
      await cloudinary.uploader.destroy(upload.public_id, { resource_type: 'raw' });
    }

    // Delete from MongoDB
    await upload.deleteOne();

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete file', error: err.message });
  }
});



module.exports = router; */

// routes/history.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cloudinary = require('../utils/cloudinary'); // make sure this has your creds

// Schema for uploads
const uploadSchema = new mongoose.Schema({
  originalname: { type: String, required: true },
  cloudinaryUrl: { type: String },
  public_id: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Upload = mongoose.models.Upload || mongoose.model('Upload', uploadSchema);

// GET recent uploads
router.get('/uploads', async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ createdAt: -1 }).limit(50);
    res.json(uploads);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

// POST new upload info (if you do it in two steps from frontend)
router.post('/uploads', async (req, res) => {
  const { originalname, cloudinaryUrl, public_id } = req.body;
  if (!originalname) {
    return res.status(400).json({ message: "Missing originalname" });
  }
  try {
    const upload = new Upload({ originalname, cloudinaryUrl, public_id });
    await upload.save();
    res.status(201).json(upload);
  } catch (e) {
    res.status(500).json({ message: "Failed to save file to history" });
  }
});

// DELETE by ID (removes from Cloudinary + MongoDB)
router.delete('/uploads', async (req, res) => {
  try {
    const upload = await Upload.findById(req.params.id);
    if (!upload) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Remove from Cloudinary
    if (upload.public_id) {
      await cloudinary.uploader.destroy(upload.public_id, { resource_type: 'raw' });
    }

    // Remove from MongoDB
    await upload.deleteOne();

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete file', error: err.message });
  }
});

module.exports = router;

