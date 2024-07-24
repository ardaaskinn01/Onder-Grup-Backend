const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const { addMachine, getMachines, getMachineDetails, updateMachine, deleteMachine } = require('../controllers/machineController');

router.post('/add', authenticateToken, addMachine);
router.get('/list', getMachines);
router.get('/details', getMachineDetails);
router.put('/update', updateMachine);
router.delete('/delete', deleteMachine);

module.exports = router;