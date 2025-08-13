const router = require('express').Router();
const { signup, login } = require('../controllers/authController.js');
const { signupValidation,loginValidation  } = require('../middleware/authValidation.js');
const { adminLogin } = require('../controllers/adminController.js');

//Register
router.post("/signup", signupValidation, signup); 
   
//Login
router.post("/login", loginValidation,login);
  


module.exports = router;