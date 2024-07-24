const express = require('express');
const router = express.Router();
const { addMaintenance, getMaintenance } = require('../controllers/maintenanceController');

router.post('/add', addMaintenance);
router.get('/list', getMaintenance);

module.exports = router;