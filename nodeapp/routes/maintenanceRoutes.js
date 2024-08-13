const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');

router.post('/createMaintenance', maintenanceController.addMaintenance);
router.put('/editMaintenance', maintenanceController.editMaintenance);
router.delete('/deleteMaintenance', maintenanceController.deleteMaintenance)

module.exports = router;