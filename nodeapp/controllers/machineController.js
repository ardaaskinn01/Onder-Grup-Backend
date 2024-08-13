const machineService = require('../services/machineService');

const addMachine = async (req, res) => {
  // Hata durumunda kontrol
  if (!req.body) {
    return res.status(400).json({ error: 'Gelen istek gövdesi eksik.' });
  }

  // Destructure request body
  const { machineID, machineName, machineType, ownerUser } = req.body;

  try {
    // Service fonksiyonunu çağır
    const result = await machineService.addMachine(machineID, machineName, machineType, ownerUser);
    console.log('Makine ekleme başarılı:', result);
    res.status(201).json({
      message: 'Makine başarıyla eklendi.',
      machineID: result.insertId // Sequelize'den gelen ID'yi ekleyin
    });
  } catch (error) {
    console.error('Makine ekleme hatası:', error);
    res.status(500).json({
      error: 'Makine ekleme hatası: ' + error.message
    });
  }
};

const getMachines = async (req, res) => {
  try {
    const username = req.user.username;
    const machines = await machineService.getMachinesByUserId(username);
    res.status(200).send(machines);
  } catch (error) {
    console.error('Error getting machines:', error);
    res.status(500).send({ error: 'Failed to get machines. Please try again later.' });
  }
};

const getAllMachines = async (req, res) => {
  try {
    const machines = await machineService.getAllMachines();
    res.status(200).send(machines);
  } catch (error) {
    console.error('Error getting machines:', error);
    res.status(500).send({ error: 'Failed to get machines. Please try again later.' });
  }
};

const getMachineDetails = async (req, res) => {
  const { machineID } = req.query;
  console.log(machineID);
  if (!machineID) {
    return res.status(400).json({ error: 'Missing machineID parameter' });
  }

  try {
    const machine = await machineService.getMachineDetails(machineID);
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    res.status(200).json(machine);
  } catch (error) {
    console.error('Error getting machine details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMaintenance = async (req, res) => {
  const machineID = req.query.machineID; // URL parametresinden machineID'yi al
  try {
    const maintenance = await machineService.getMaintenance(machineID);
    res.status(200).send(maintenance);
  } catch (error) {
    console.error('Error getting maintenance:', error);
    res.status(500).send({ error: 'Failed to get maintenance. Please try again later.' });
  }
};

const getAllMaintenance = async (req, res) => {
  try {
    const maintenance = await maintenanceService.getMaintenance();
    res.status(200).send(maintenance);
  } catch (error) {
    console.error('Error getting maintenance:', error);
    res.status(500).send({ error: 'Failed to get maintenance. Please try again later.' });
  }
};

const updateMachine = async (req, res) => {
  console.log('Gelen istek gövdesi:', req.body);
  const { machineID, key, value } = req.body;

  if (!machineID || !key || value === undefined) {
    return res.status(400).send({ error: 'Machine ID, key, and value are required.' });
  }

  console.log('Machine ID:', machineID);
  console.log('Key:', key);
  console.log('Value:', value);

  try {
    await machineService.updateMachine(machineID, key, value);
    res.status(200).send({ message: 'Machine updated successfully' });
  } catch (error) {
    console.error('Error updating machine:', error);
    res.status(500).send({ error: 'Failed to update machine. Please try again later.' });
  }
};

const deleteMachine = async (req, res) => {
  const { machineID } = req.query;

  if (!machineID) {
    return res.status(400).json({ error: 'Missing machineID parameter' });
  }

  try {
    const result = await machineService.deleteMachine(machineID);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    res.status(200).json({ message: 'Machine deleted successfully' });
  } catch (error) {
    console.error('Error deleting machine:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { addMachine, getMachines, getAllMachines, getMaintenance, getAllMaintenance, getMachineDetails, updateMachine, deleteMachine };