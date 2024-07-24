const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/registerUser', authController.registerUser);
router.post('/login', authController.login);
router.post('/refreshToken', authController.refreshToken);
router.get('/validateToken', authController.validateToken);
router.put('/update', authController.update);

module.exports = router;