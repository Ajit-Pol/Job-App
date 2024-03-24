const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: [3, 'Minimum 3 character are required'],
        maxlength: [50, 'Maximum 50 character are allowed']
    },

    email: {
        type: String,
        required: [true, 'Please provide email.'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email'],
        unique: true
    },

    location: {
        type: String,
        required: [true, 'Please provide location'],
    },

    skills: {
        type: String,
    },

    exprience: {
        type: String,
    },

    projects: {
        type: String,
    },

    role: {
        type: String,
        enum:['reader','creator'],
        default:'reader'
    },

    password: {
        type: String,
        required: [true, 'Please provide password.'],
        minlength: [8, 'Minimum 8 character are required in password'],
    }
}, { timestamps: true });


UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name, role:this.role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME })
}

UserSchema.methods.createRefreshToken = function () {
    return jwt.sign({ userId: this._id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFETIME })
}

UserSchema.methods.comparePassword = function (userInput) {
    return bcrypt.compare(userInput, this.password);
}

module.exports = mongoose.model('User', UserSchema);