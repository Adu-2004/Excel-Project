const router = require('express').Router();
const { adminLogin } = require('../controllers/adminController.js');
//const ensureAdmin = require('../middleware/adminAuth.js');
const adminController = require('../controllers/adminController.js');
// Login route for admin
router.post('/login', adminLogin);

// Example protected admin route
//router.get('/dashboard', ensureAdmin, (req, res) => {
  //res.json({ message: 'Welcome, Admin!' });
//});

router.get('/dashboard', adminController.getDashboardStats);


// Add middleware to check admin auth here if needed

router.get('/total-users', adminController.getTotalUsers);
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);

router.get('/total-files', adminController.getTotalFiles);
router.get('/files', adminController.getAllFiles);
router.delete('/files/:id', adminController.deleteFile);
router.put('/files/:id', adminController.updateFile);


module.exports = router;


