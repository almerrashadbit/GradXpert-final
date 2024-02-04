// routes/seatRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticate = require('../middleware/auth');

// Route to get all seats
router.post('/login', userController.loginUser);

router.post('/register', userController.registerUser);


module.exports = router;
