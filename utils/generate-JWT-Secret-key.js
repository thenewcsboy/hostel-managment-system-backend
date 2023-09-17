const crypto = require('crypto');

// Generate a random key of 256 bits (32 bytes)
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated Secret Key:', secretKey);
