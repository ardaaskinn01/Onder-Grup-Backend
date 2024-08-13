const express = require('express');
const router = express.Router();
const authController = require('../controllers/tokenController');


router.post('/refreshToken', authController.refreshToken);
router.get('/validateToken', authController.validateToken);

module.exports = router;