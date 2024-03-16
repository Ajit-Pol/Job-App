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
        let user = await UserSchema.findById(jwtRes.userId).select('_id name role'); 
        user = { userId: user._id, name: user.name, role: user.role};
        req.user = user;
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid authorization token.');
    }

}

module.exports = authenticationMiddleware;