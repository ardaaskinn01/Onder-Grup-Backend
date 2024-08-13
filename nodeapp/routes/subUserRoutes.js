const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const subUserController = require('../controllers/subUserController');

router.post('/createSubUser', authenticateToken, subUserController.createSubUser);
router.delete('/deleteSubUser', subUserController.deleteSubUser);
router.put('/editSubUser', subUserController.editSubUser);
router.get('/getSubUsers', authenticateToken, subUserController.getSubUsers);

module.exports = router;