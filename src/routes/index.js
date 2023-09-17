const express = require('express');
const router = express.Router();

// Import your route modules
const userRoutes = require('./userRoutes');

// Define your routes
router.use('/users', userRoutes);

module.exports = router;
