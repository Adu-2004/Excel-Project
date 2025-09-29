// routes/uploadRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const { uploadExcel } = require('../controllers/uploadController');
const Upload = require('../models/Upload'); // <-- ADD THIS LINE

router.post('/upload-excel', upload.single('excelFile'), uploadExcel);

router.get('/:id', async (req, res) => {
  try {
    const file = await Upload.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found.' });
    res.json(file);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching file.', error: err.message });
  }
});

module.exports = router;




