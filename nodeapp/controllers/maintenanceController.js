const maintenanceService = require('../services/maintenanceService');

const addMaintenance = async (req, res) => {
  const { machineID, maintenanceId, maintenanceDate, maintenanceStatuses, notes } = req.body;
  console.log(req.body);

  if (!machineID || !maintenanceId || !maintenanceDate) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await maintenanceService.addMaintenance(machineID, maintenanceId, maintenanceDate, maintenanceStatuses, notes);
    res.status(201).send({ message: 'Maintenance added successfully', maintenanceId: result.insertId });
  } catch (error) {
    res.status(500).send({ error: 'Failed to add maintenance. Please try again later.' });
  }
};

const getMaintenance = async (req, res) => {
  try {
    const maintenance = await maintenanceService.getMaintenance();
    res.status(200).send(maintenance);
  } catch (error) {
    console.error('Error getting maintenance:', error);
    res.status(500).send({ error: 'Failed to get maintenance. Please try again later.' });
  }
};

module.exports = { addMaintenance, getMaintenance };