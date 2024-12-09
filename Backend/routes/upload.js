const express = require('express');
const router = express.Router();
const upload = require('multer')();
const { fileUpload, getUploadFile, deleteFile } = require('../controllers/upload');

router.post('/', upload.single('file'), fileUpload);
router.get('/:id', getUploadFile);
router.delete('/:id', deleteFile);

module.exports = router;