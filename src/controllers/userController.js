const User = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, registrationNumber } = req.body;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Create a new user
        const newUser = new User({ name, email, password, registrationNumber });
        await newUser.save();

        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email }).select('+password');

        // Check if the user exists and the password is correct
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token with user data (you can customize the payload)
        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_KEY, {
            expiresIn: '1h', // Token expiration time (adjust as needed)
        });

        // Set the token as an HttpOnly cookie
        res.cookie('jwtToken', token, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true, // Enable this in production to ensure the cookie is sent only over HTTPS
            sameSite: 'strict', // Adjust the SameSite attribute as needed
        });

        // Respond with the token
        res.status(200).json({ message: 'Login successful', token: token });
    } catch (error) {
        next(error);
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        // Retrieve the user's profile based on their ID (assuming authentication)
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the user's profile data (you can customize this as needed)
        res.status(200).json({
            name: user.name,
            MobileNumber: user.mobileNumber,
            email: user.email,
            registrationNumber: user.registrationNumber,
            role: user.role
        });
    } catch (error) {
        next(error);
    }
};

// Get all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Get user details by ID
exports.getUserDetails = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Update user details
exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: "user deleted" });
    } catch (error) {
        next(error);
    }
};

// Logout a user by clearing the JWT token cookie
exports.logoutUser = (req, res) => {
    // Clear the JWT token cookie on the client-side
    const token = req.headers.authorization.split(' ')[1]; // Assumes a Bearer token
    res.clearCookie(token, { path: '/' });

    res.status(200).json({ message: 'Logout successful' });
};

// Change the role of a user by ID
exports.changeUserRole = async (req, res, next) => {
    try {
        const { userId, newRole } = req.body; // Assuming you pass the user ID and new role in the request body

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's role
        user.role = newRole;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'User role updated successfully', user });
    } catch (error) {
        next(error);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        // Find the user by email
        const user = await User.findOne({ email }).select('+password');

        // Check if the user exists and the password is correct
        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Update the User's password
        user.password = newPassword;

        // Save the updated Password
        await user.save();

        // Respond with a success message
        res.status(200).json({ message: 'Password changed successfully' });

    } catch (error) {
        next(error);
    }
};
