const express = require('express');
const router = express.Router();
const {
    getAllJobs,
    getJob,
    createJob,  
    updateJob,
    deleteJob,
} = require('../controllers/job');

const { sendEmail } = require('../controllers/email');

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);
router.route('/email').post(sendEmail);


module.exports = router