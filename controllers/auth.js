const UserSchema = require('../dbmodels/auth');
const { StatusCodes } = require('http-status-codes');
const { UnauthenticatedError, NotFoundError } = require('../errors');

const register = async (req, res, next) => {
    const reqData = req.body;
    await UserSchema.create(reqData);
    res.status(StatusCodes.CREATED).json({ success: true, msg: 'User register successfully.' })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email }).select('-location -projects -exprience -skills');
    if (!user)
        throw new UnauthenticatedError('Invalid email or password. Please check your credentials and try again.');

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect)
        throw new UnauthenticatedError('Invalid email or password. Please check your credentials and try again.');


    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ success: true, user: { name: user.name, role: user.role }, accessToken: token, expiresIn: (Date.now() + Number(process.env.JWT_LFIETIME)) })
}

const getProfile = async (req, res) => {
    const userId = req.user.userId;
    const user = await UserSchema.findOne({ _id: userId }).select('-password');
    if (!user)
        throw new NotFoundError('User not found');

    res.status(StatusCodes.OK).json({ success: true, user: user })
}

const saveProfile = async (req, res) => {
    const reqData = req.body;
    const userId = req.user.userId;
    const profile = await UserSchema.findByIdAndUpdate({
        _id: userId,
    }, reqData, { new: true, runValidators: true })

    if (!profile)
        throw new NotFoundError('User not found');

    res.status(StatusCodes.OK).json({ success: true, msg: 'Profile updated successfully.' })
}

module.exports = {
    register,
    login,
    getProfile,
    saveProfile
}

