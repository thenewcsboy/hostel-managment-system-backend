require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(express.json()); // Parse JSON requests

// Routes 
const routes = require('./src/routes');
app.use('/api/v1', routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
