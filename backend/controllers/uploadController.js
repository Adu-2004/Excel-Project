// controllers/uploadController.js

const cloudinary = require('../utils/cloudinary');
const Upload = require('../models/Upload');
const fs = require('fs');


exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'raw',
      folder: 'excels'
    });

    fs.unlinkSync(req.file.path);

    const uploadDoc = await Upload.create({
      originalname: req.file.originalname,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      cloudinaryUrl: result.secure_url,
      public_id: result.public_id,
         userId: req.userId,
    });

    return res.status(200).json({
      message: 'File uploaded successfully.',
      file: uploadDoc
    });

  } catch (error) {
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ message: 'Upload failed.', error: error.message });
  }
};
