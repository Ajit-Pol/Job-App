const express = require('express');
const router = express.Router();
const { register, login, getProfile, saveProfile, validateOTP, saveNewPassword, refreshAccessToken, clearCookies } = require('../controllers/auth')
const { authenticationMiddleware, validateEmail } = require('../middlewares');
const { sendEmail } = require('../controllers/email');

router.post('/register', register);
router.post('/login', login);
router.post('/email', validateEmail, sendEmail);
router.post('/validateOTP', validateOTP);
router.post('/resetPassword', saveNewPassword);
router.get('/refresh', refreshAccessToken);
router.get('/clear', clearCookies);


router.use(authenticationMiddleware);
router.route('/profile').get(getProfile).patch(saveProfile);
router.route('/token').get((req,res)=>{
    res.status(200).json({success:true, user:{ name: req.user.name, role: req.user.role, profileId: req.user.profileId}});
})

module.exports = router;
