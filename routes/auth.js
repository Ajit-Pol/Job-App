const express = require('express');
const router = express.Router();
const { register, login, getProfile, saveProfile, validateOTP, saveNewPassword } = require('../controllers/auth')
const { authenticationMiddleware, validateEmail } = require('../middlewares');
const { sendEmail } = require('../controllers/email');

router.post('/register', register);
router.post('/login', login);
router.post('/email', validateEmail, sendEmail);
router.post('/validateOTP', validateOTP);
router.post('/resetPassword', saveNewPassword);

router.use(authenticationMiddleware);
router.route('/profile').get(getProfile).patch(saveProfile);

module.exports = router;
