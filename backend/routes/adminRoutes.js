const router = require('express').Router();
const { adminLogin } = require('../controllers/adminController.js');
const ensureAdmin = require('../middleware/adminAuth.js');

// Login route for admin
router.post('/login', adminLogin);

// Example protected admin route
router.get('/dashboard', ensureAdmin, (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;
