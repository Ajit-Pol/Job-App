const mongoose = require('mongoose');

const OTP = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    expireIn: {
        type: Number,
        required: true
    },
})

const TOKEN = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
})


module.exports = {
    OTP: mongoose.model('otps', OTP),
    TOKEN: mongoose.model('tokens', TOKEN)
}