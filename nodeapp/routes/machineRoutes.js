const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const machineController = require('../controllers/machineController');

router.post('/addMachine', machineController.addMachine);
router.get('/getMachines', authenticateToken, machineController.getMachines);
router.get('/getAllMachines', machineController.getAllMachines);
router.get('/getMaintenances', machineController.getMaintenance);
router.get('/getAllMaintenances', machineController.getAllMaintenance);
router.get('/details', machineController.getMachineDetails);
router.put('/updateMachine', authenticateToken, machineController.updateMachine);
router.delete('/delete', machineController.deleteMachine);

module.exports = router;