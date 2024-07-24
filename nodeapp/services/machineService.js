const Machine = require('../models/machine'); // machine.js dosyasına göre yolu ayarlayın
const sequelize = require('../models/dbConnection');
const { QueryTypes } = require('sequelize');

const addMachine = async (machineID, machineName, machineType, ownerUser) => {

  try {
    // Sequelize ile makine ekleme işlemi
    const newMachine = await Machine.create({
      machineID,
      machineName,
      machineType,
      ownerUser
    });

    return newMachine; // Sonuç döndür
  } catch (error) {
    console.error('Makine ekleme hatası:', error);
    throw error; // Hata fırlat
  }
};

const getMachines = async () => {
  const query = 'SELECT * FROM Machines';
  try {
    const machines = await sequelize.query(query, {
      type: QueryTypes.SELECT
    });
    return machines;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

const getMachineDetails = async (machineID) => {
  console.log(machineID);
  const query = 'SELECT * FROM Machines WHERE machineID = ?';
  const machines = await sequelize.query(query, {
    replacements: [machineID],
    type: QueryTypes.SELECT
  });
  return machines[0];
};

const updateMachine = async (machineID, key, value) => {
  const query = `UPDATE Machines SET ${key} = ? WHERE machineID = ?`;
  console.log('Update query:', query);
  const result = await sequelize.query(query, {
    replacements: [value, machineID],
    type: QueryTypes.UPDATE
  });
  console.log('Update result:', result);
  return result;
};

const deleteMachine = async (machineID) => {
  const query = 'DELETE FROM Machines WHERE machineID = ?';
  const result = await sequelize.query(query, {
    replacements: [machineID],
    type: QueryTypes.DELETE
  });
  return result;
};

module.exports = { addMachine, getMachines, getMachineDetails, updateMachine, deleteMachine };