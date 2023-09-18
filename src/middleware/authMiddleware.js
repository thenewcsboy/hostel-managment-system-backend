const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require("dotenv").config();

// Middleware to authenticate a user using JWT
exports.authenticateUser = async (req, res, next) => {
    try {
        // Get the token from the request headers
        const token = req.headers.authorization.split(' ')[1]; // Assumes a Bearer token

        if (!token) {
            return res.status(401).json({ message: 'Authentication failed: No token provided' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        // Find the user associated with the token
        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }

        // Attach the user to the request object for further use
        req.user = user;


        // Proceed to the next middleware or route
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
};

// Middleware to authenticate an admin user
exports.authenticateAdmin = (req, res, next) => {
    // Check if the user has administrator privileges (you can customize this logic)
    if (req.user.role !== 'administrator') {
        return res.status(403).json({ message: 'Access denied: Admin privileges required' });
    }

    // Proceed to the next middleware or route
    next();
};
