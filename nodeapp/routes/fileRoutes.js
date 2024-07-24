const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { uploadFile, downloadFile } = require('../controllers/fileController');

router.post('/upload', upload.single('file'), uploadFile);
router.get('/download/:fileName', downloadFile);

module.exports = router;