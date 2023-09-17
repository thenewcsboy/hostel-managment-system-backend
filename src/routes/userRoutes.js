const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateAdmin, authenticateUser } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// Get user profile (requires authentication)
router.get('/profile', authenticateUser, userController.getProfile);

// Get all users (admin access)
router.get('/all', authenticateUser, authenticateAdmin, userController.getAllUsers);

// Get user details by ID (admin access)
router.get('/:userId', authenticateUser, authenticateAdmin, userController.getUserDetails);

// Update user details by ID (admin access)
router.put('/:userId', authenticateUser, authenticateAdmin, userController.updateUser);

// Delete a user by ID (admin access)
router.delete('/:userId', authenticateUser, authenticateAdmin, userController.deleteUser);

module.exports = router;
