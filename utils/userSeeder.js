const mongoose = require('mongoose');
const User = require('../src/models/userModel');

const db = require('./db');
db.connect();

const users = [
    {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'hashed_password1', // You should hash passwords in a real scenario
        role: 'student',
    },
    {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        password: 'hashed_password2',
        role: 'administrator',
    },
    {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'hashed_password3',
        role: 'student',
    },
    {
        name: 'Bob Brown',
        email: 'bob@example.com',
        password: 'hashed_password4',
        role: 'student',
    },
    {
        name: 'Eve Davis',
        email: 'eve@example.com',
        password: 'hashed_password5',
        role: 'student',
    },
    {
        name: 'Michael Clark',
        email: 'michael@example.com',
        password: 'hashed_password6',
        role: 'student',
    },
    {
        name: 'Sophia Martinez',
        email: 'sophia@example.com',
        password: 'hashed_password7',
        role: 'student',
    },
    {
        name: 'William Lee',
        email: 'william@example.com',
        password: 'hashed_password8',
        role: 'student',
    },
    {
        name: 'Olivia Adams',
        email: 'olivia@example.com',
        password: 'hashed_password9',
        role: 'student',
    },
    {
        name: 'James Wilson',
        email: 'james@example.com',
        password: 'hashed_password10',
        role: 'student',
    },
];

async function seedUsers() {
    try {
        await User.insertMany(users);
        console.log('User data seeded successfully.');
    } catch (error) {
        console.error('Error seeding user data:', error);
    } finally {
        // Close the database connection when seeding is complete
        mongoose.connection.close();
    }
}

seedUsers();
