const jwt = require('jsonwebtoken');
const UserSchema = require('../dbmodels/auth');
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
    let authToken = req.headers.authorization;

    if (!(authToken && authToken.startsWith('Bearer ')))
        throw new UnauthenticatedError('Invalid authorization token.');

    authToken = authToken.split(' ')[1];
    try {
        const jwtRes = await jwt.verify(authToken, process.env.JWT_SECRET);
        let user = await UserSchema.findById(jwtRes.userId).select('_id name email role');
        user = { userId: user._id, name: user.name, role: user.role, email: user.email };
        req.user = user;
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid authorization token.');
    }

}

const validateEmail = async (req, res, next) => {
    const { type, email } = req.body;
    const user = await UserSchema.findOne({ email });
    if (!user)
        throw new UnauthenticatedError('Invalid email.');
    req.body = {
        type: type
    }
    req.user = {
        email: email
    }
    next();
}

module.exports = { authenticationMiddleware, validateEmail };