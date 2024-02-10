const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    mail: String,
    password: String,
    history: [{ search: String, timestamp: Date }],
    isAdmin: Boolean
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
