const express = require('express');
const router = express.Router();
const upload = require('multer')();
const { fileUpload, getUploadFile } = require('../controllers/upload');

router.post('/', upload.single('file'), fileUpload);
router.get('/:id', getUploadFile);

module.exports = router;