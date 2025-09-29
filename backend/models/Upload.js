// models/Upload.js

const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  originalname: String,
  filename: String,
  mimetype: String,
  size: Number,
  cloudinaryUrl: String,
  public_id: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Upload', uploadSchema);




