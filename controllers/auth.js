const UserSchema = require('../dbmodels/auth');
const OTP = require('../dbmodels/otp');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const { UnauthenticatedError, NotFoundError, BadRequestError } = require('../errors');

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

validateOTP = async (req, res) => {
    const { otp } = req.body;
    if (!otp)
        throw new BadRequestError('Provide OTP');

    const data = await OTP.findOne({
        otp: otp,
        expireIn: { $gte: Date.now() }
    })

    if(!data)
        throw new BadRequestError('Invalid OTP');

    // delete otp once it's validated 
    await OTP.findByIdAndDelete({
        _id: data._id
    })

    res.status(StatusCodes.OK).json({ success:true })
}

const saveNewPassword = async (req, res) => {
    let { email, password } = req.body;

    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt);

    const user = await UserSchema.findOneAndUpdate({
        email: email,
    }, {
        password: password
    }, { new: true, runValidators: true })

    if (!user)
        throw new BadRequestError();

    res.status(StatusCodes.OK).json({ success: true, msg: 'Password updated successfully.' })
}

module.exports = {
    register,
    login,
    getProfile,
    saveProfile,
    validateOTP,
    saveNewPassword
}

