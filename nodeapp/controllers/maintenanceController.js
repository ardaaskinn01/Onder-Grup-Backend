const maintenanceService = require('../services/maintenanceService');

const addMaintenance = async (req, res) => {
  const { machineID, maintenanceId, maintenanceDate, maintenanceStatuses, notes, username } = req.body;
  console.log(req.body);

  if (!machineID || !maintenanceId || !maintenanceDate) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await maintenanceService.addMaintenance(machineID, maintenanceId, maintenanceDate, maintenanceStatuses, notes, username);
    res.status(201).send({ message: 'Maintenance added successfully', maintenanceId: result.insertId });
  } catch (error) {
    res.status(500).send({ error: 'Failed to add maintenance. Please try again later.' });
  }
};

const editMaintenance = async (req, res) => {
  console.log('Gelen istek gövdesi:', req.body);
  const { maintenanceID, maintenanceStatuses, notes, username } = req.body;

  try {
    await maintenanceService.editMaintenance(maintenanceID, maintenanceStatuses, notes, username);
    res.status(200).send({ message: 'Maintenance updated successfully' });
  } catch (error) {
    console.error('Error updating machine:', error);
    res.status(500).send({ error: 'Failed to update maintenance. Please try again later.' });
  }
};

const deleteMaintenance = async (req, res) => {
  const { maintenanceID } = req.body;

  if (!maintenanceID) {
    return res.status(400).json({ error: 'Missing maintenanceID parameter' });
  }

  try {
    const result = await maintenanceService.deleteMaintenance(maintenanceID);
    res.status(200).json({ message: 'Maintenance deleted successfully' });
  } catch (error) {
    console.error('Error deleting maintenance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { addMaintenance, editMaintenance, deleteMaintenance };