const mongoose = require('mongoose');
require('dotenv').config();

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit();
    }
};

module.exports = connectMongoDB;
