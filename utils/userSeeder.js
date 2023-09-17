const mongoose = require('mongoose');
const User = require('../src/models/userModel');
const bcrypt = require("bcrypt");

const db = require('./db');
db.connect();

const users = [
    {
        name: 'User1',
        email: 'user1@example.com',
        password: bcrypt.hashSync('password1', 10), // Hashed password
        role: 'student',
        registrationNumber: '12345',
        fatherName: 'Father1',
        mobileNumber: '1234567890',
        branch: 'Branch1',
        batchYear: '2020',
        address: 'Address1',
        bloodGroup: 'A+',
    },
    {
        name: 'Bharat',
        email: 'bhaarat.ranjan@gmail.com',
        password: bcrypt.hashSync('Bharat1998@', 10), // Hashed password
        role: 'administrator',
        registrationNumber: '12345',
        fatherName: 'Father1',
        mobileNumber: '1234567890',
        branch: 'Branch1',
        batchYear: '2020',
        address: 'Address1',
        bloodGroup: 'A+',
    },
    {
        name: 'User2',
        email: 'user2@example.com',
        password: bcrypt.hashSync('password2', 10),
        role: 'student',
        registrationNumber: '54321',
        fatherName: 'Father2',
        mobileNumber: '9876543210',
        branch: 'Branch2',
        batchYear: '2021',
        address: 'Address2',
        bloodGroup: 'B-',
    },
    {
        name: 'User3',
        email: 'user3@example.com',
        password: bcrypt.hashSync('password3', 10),
        role: 'student',
        registrationNumber: '98765',
        fatherName: 'Father3',
        mobileNumber: '5555555555',
        branch: 'Branch3',
        batchYear: '2022',
        address: 'Address3',
        bloodGroup: 'O+',
    },
    {
        name: 'User4',
        email: 'user4@example.com',
        password: bcrypt.hashSync('password4', 10),
        role: 'student',
        registrationNumber: '24680',
        fatherName: 'Father4',
        mobileNumber: '1111111111',
        branch: 'Branch4',
        batchYear: '2020',
        address: 'Address4',
        bloodGroup: 'AB+',
    },
    {
        name: 'User5',
        email: 'user5@example.com',
        password: bcrypt.hashSync('password5', 10),
        role: 'student',
        registrationNumber: '13579',
        fatherName: 'Father5',
        mobileNumber: '9999999999',
        branch: 'Branch5',
        batchYear: '2021',
        address: 'Address5',
        bloodGroup: 'B+',
    },
    {
        name: 'User6',
        email: 'user6@example.com',
        password: bcrypt.hashSync('password6', 10),
        role: 'student',
        registrationNumber: '11111',
        fatherName: 'Father6',
        mobileNumber: '7777777777',
        branch: 'Branch6',
        batchYear: '2022',
        address: 'Address6',
        bloodGroup: 'A-',
    },
    {
        name: 'User7',
        email: 'user7@example.com',
        password: bcrypt.hashSync('password7', 10),
        role: 'student',
        registrationNumber: '22222',
        fatherName: 'Father7',
        mobileNumber: '8888888888',
        branch: 'Branch7',
        batchYear: '2020',
        address: 'Address7',
        bloodGroup: 'O-',
    },
    {
        name: 'User8',
        email: 'user8@example.com',
        password: bcrypt.hashSync('password8', 10),
        role: 'student',
        registrationNumber: '33333',
        fatherName: 'Father8',
        mobileNumber: '6666666666',
        branch: 'Branch8',
        batchYear: '2021',
        address: 'Address8',
        bloodGroup: 'AB-',
    },
    {
        name: 'User9',
        email: 'user9@example.com',
        password: bcrypt.hashSync('password9', 10),
        role: 'student',
        registrationNumber: '44444',
        fatherName: 'Father9',
        mobileNumber: '5555555555',
        branch: 'Branch9',
        batchYear: '2022',
        address: 'Address9',
        bloodGroup: 'A+',
    },
    {
        name: 'User10',
        email: 'user10@example.com',
        password: bcrypt.hashSync('password10', 10),
        role: 'student',
        registrationNumber: '55555',
        fatherName: 'Father10',
        mobileNumber: '4444444444',
        branch: 'Branch10',
        batchYear: '2020',
        address: 'Address10',
        bloodGroup: 'B+',
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
