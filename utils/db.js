const mongoose = require('mongoose');
require("dotenv").config();
// Define your MongoDB connection URI
const mongoURI = process.env.MONGO_URL;

// Connect to the MongoDB database
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Database connection error:', error);
});

db.once('open', () => {
    console.log('Connected to the database');
});

module.exports = {
    connect: () => {
        return mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            createIndexes: true,
        });
    },
};
