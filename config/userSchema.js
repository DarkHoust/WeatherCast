const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    mail: {
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
            },
            responseData: {
                weather: Object,
                coordinates: Object,
                time: Object
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
