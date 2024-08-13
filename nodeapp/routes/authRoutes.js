const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/registerUser', authController.registerUser);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/changePass', authController.updatePassword);
router.post('/resetPass', authController.resetPassword);

module.exports = router;