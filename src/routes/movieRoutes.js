// routes/seatRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controller/movieController');
const authenticate = require('../middleware/auth');

// Route to get all seats
router.get('/movies', authenticate, movieController.getMovies);

module.exports = router;
