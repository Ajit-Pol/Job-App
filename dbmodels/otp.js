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

module.exports = mongoose.model('otps', OTP)