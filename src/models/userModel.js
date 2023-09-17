const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        // Store password hashes, not plain text passwords
        select: false, // Do not include in query results by default
    },
    role: {
        type: String,
        enum: ['student', 'administrator'],
        default: 'student', // Default role for new users
    },
    registrationNumber: {
        type: String,
        required: true,
    },
    fatherName: String,
    mobileNumber: String,
    branch: String,
    batchYear: {
        type: String,
        match: /^\d{4}$/, // Ensure it's in a 4-digit year format
    },
    address: String,
    bloodGroup: String,
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const saltRounds = 10;
    try {
        const hash = await bcrypt.hash(this.password, saltRounds);
        this.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

// Compare a given password with the stored hash
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;



