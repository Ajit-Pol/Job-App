const express = require('express');
const router = express.Router();
const {  register, login, getProfile, saveProfile } = require('../controllers/auth')
const { authenticationMiddleware } = require('../middlewares');

router.post('/register', register);

router.post('/login', login);

router.use(authenticationMiddleware);
router.route('/profile').get(getProfile).patch(saveProfile);

module.exports = router;
