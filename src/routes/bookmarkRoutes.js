// routes/seatRoutes.js
const express = require('express');
const router = express.Router();
const bookmarkController = require('../controller/bookmarkController');
const authenticate = require('../middleware/auth');

// Route to get all seats
router.get('/bookmark', authenticate, bookmarkController.getBookmark);

module.exports = router;
