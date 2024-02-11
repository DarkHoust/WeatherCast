const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    searchHistory: [
        {
        cityName: {
            type: String,
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
