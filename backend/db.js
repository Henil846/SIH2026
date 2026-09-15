const mongoose = require('mongoose');
const dns = require('dns');

// Set default DNS servers to avoid querySrv ECONNREFUSED issues with local/ISP DNS resolvers
dns.setServers(['8.8.8.8', '1.1.1.1']);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Log but don't crash — the HTTP server stays up and returns error responses
    console.error('MongoDB connection failed:', error.message);
  }
}

module.exports = connectDB;