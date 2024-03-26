const UserSchema = require('../dbmodels/auth');
const { OTP, TOKEN } = require('../dbmodels/other-models');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError, NotFoundError, BadRequestError } = require('../errors');
const cookieOptions = {
    httpOnly: true,
    SameSite: process.env.NODE_ENV == 'production' ? 'Strict' : 'None',
    Secure : process.env.NODE_ENV == 'production'
}

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


    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();
    
    const token = await TOKEN.findOneAndUpdate({
        userId: user._id
    }, {
        refreshToken: refreshToken
    }, { new: true, runValidators: true })
    
    if (!token)
        await TOKEN.create({ userId: user._id, refreshToken: refreshToken })
    
    res.status(StatusCodes.OK)
        .cookie("accessToken", accessToken, {...cookieOptions, maxAge: process.env.ACCESS_TOKEN_LIFETIME })
        .cookie("refreshToken", refreshToken, {...cookieOptions, maxAge: process.env.REFRESH_TOKEN_LIFETIME})
        .json({ success: true, user: { name: user.name, role: user.role } });
    // res.status(StatusCodes.OK).json({ success: true, user: { name: user.name, role: user.role }, accessToken: token, expiresIn: (Date.now() + Number(process.env.ACCESS_TOKEN_LIFETIME)) })
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

    if (!data)
        throw new BadRequestError('Invalid OTP. The code you entered is incorrect or has expired.');

    // delete otp once it's validated 
    await OTP.findByIdAndDelete({
        _id: data._id
    })

    res.status(StatusCodes.OK).json({ success: true })
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

const refreshAccessToken = async (req, res) => {
    const reqRefreshToken = req.cookies.refreshToken;

    if (!reqRefreshToken)
        throw new UnauthenticatedError('Provide refresh token.');

    const decodedToken = jwt.verify(reqRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const tokenDetails = await TOKEN.findOne({ userId: decodedToken?.userId });
    const user = await UserSchema.findById(tokenDetails.userId);

    if (!user)
        throw new UnauthenticatedError('Refresh token invalid or expired.');

    if (tokenDetails.refreshToken !== reqRefreshToken)
        throw new UnauthenticatedError('Invalid refresh token.');

    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();
    await TOKEN.findOneAndUpdate({
        userId: user._id
    }, {
        refreshToken: refreshToken
    }, { new: true, runValidators: true })

    res.status(StatusCodes.OK)
        .cookie("accessToken", accessToken, {...cookieOptions, maxAge: process.env.ACCESS_TOKEN_LIFETIME })
        .cookie("refreshToken", refreshToken, {...cookieOptions, maxAge: process.env.REFRESH_TOKEN_LIFETIME})
        .json({ success: true, user: { name: user.name, role: user.role } });
}

const clearCookies = (req, res)=>{
    res.status(StatusCodes.OK)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({ success: true, msg: "Logout successfully." });
}

module.exports = {
    register,
    login,
    getProfile,
    saveProfile,
    validateOTP,
    saveNewPassword,
    refreshAccessToken,
    clearCookies
}

