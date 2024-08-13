const Maintenance = require('../models/maintenance');
const sequelize = require('../models/dbConnection');
const { QueryTypes } = require('sequelize');


const addMaintenance = async (machineID, maintenanceID, maintenanceDate, maintenanceStatuses, notes, username) => {
  try {
    const maintenanceFields = {};

    // Kontrol alanlarını doldur
    const kontrolKeys = [
      'kontrol11', 'kontrol12', 'kontrol13', 'kontrol14',
      'kontrol21', 'kontrol22', 'kontrol23', 'kontrol24',
      'kontrol31', 'kontrol32', 'kontrol33', 'kontrol34', 'kontrol35', 'kontrol36',
      'kontrol41', 'kontrol42', 'kontrol43', 'kontrol44', 'kontrol45', 'kontrol46',
      'kontrol51', 'kontrol52', 'kontrol53', 'kontrol54', 'kontrol55', 'kontrol56',
      'kontrol61', 'kontrol62', 'kontrol63',
      'kontrol71', 'kontrol72',
      'kontrol81', 'kontrol82', 'kontrol83'
    ];

    // Kontrol alanlarını dinamik olarak ekle
    kontrolKeys.forEach((key, index) => {
      if (maintenanceStatuses[index] !== null && maintenanceStatuses[index] !== undefined) {
        maintenanceFields[key] = maintenanceStatuses[index];
      }
    });

    // Notes alanlarını kontrol91'den kontrol99'a kadar olan değerlerle doldur
    const notesKeys = [
      'kontrol91', 'kontrol92', 'kontrol93', 'kontrol94', 'kontrol95', 'kontrol96',
      'kontrol97', 'kontrol98', 'kontrol99'
    ];

    notesKeys.forEach((key, i) => {
      if (notes[i] && notes[i].trim() !== '') {
        maintenanceFields[key] = notes[i];
      } else {
        // If note is empty, you may choose to set it to null or omit it
        maintenanceFields[key] = null;
      }
    });

    console.log('Maintenance Fields:', maintenanceFields);

    // Veriyi oluşturun
    const result = await Maintenance.create({
      maintenanceID: maintenanceID,
      machineID: machineID,
      maintenanceDate: maintenanceDate,
      technician: username,
      ...maintenanceFields // Dinamik alanları ekleyin
    });

    return result;
  } catch (error) {
    console.error('Error adding maintenance:', error);
    throw error;
  }
};

const editMaintenance = async (maintenanceID, maintenanceStatuses, notes, username) => {
  try {
    const maintenanceFields = {};

    // Kontrol alanlarını doldur
    const kontrolKeys = [
      'kontrol11', 'kontrol12', 'kontrol13', 'kontrol14',
      'kontrol21', 'kontrol22', 'kontrol23', 'kontrol24',
      'kontrol31', 'kontrol32', 'kontrol33', 'kontrol34', 'kontrol35', 'kontrol36',
      'kontrol41', 'kontrol42', 'kontrol43', 'kontrol44', 'kontrol45', 'kontrol46',
      'kontrol51', 'kontrol52', 'kontrol53', 'kontrol54', 'kontrol55', 'kontrol56',
      'kontrol61', 'kontrol62', 'kontrol63',
      'kontrol71', 'kontrol72',
      'kontrol81', 'kontrol82', 'kontrol83'
    ];

    // Kontrol alanlarını dinamik olarak ekle
    kontrolKeys.forEach((key, index) => {
      if (maintenanceStatuses[index] !== null && maintenanceStatuses[index] !== undefined) {
        maintenanceFields[key] = maintenanceStatuses[index];
      }
    });

    // Notes alanlarını kontrol91'den kontrol99'a kadar olan değerlerle doldur
    const notesKeys = [
      'kontrol91', 'kontrol92', 'kontrol93', 'kontrol94', 'kontrol95', 'kontrol96',
      'kontrol97', 'kontrol98', 'kontrol99'
    ];

    notesKeys.forEach((key, i) => {
      if (notes[i] && notes[i].trim() !== '') {
        maintenanceFields[key] = notes[i];
      } else {
        maintenanceFields[key] = null;
      }
    });

    console.log('Maintenance Fields:', maintenanceFields);

    // Mevcut veriyi güncelle
    const result = await Maintenance.update(
      {
        technician: username,
        ...maintenanceFields // Dinamik alanları ekleyin
      },
      {
        where: { maintenanceID: maintenanceID }
      }
    );

    return result;
  } catch (error) {
    console.error('Error editing maintenance:', error);
    throw error;
  }
};

const deleteMaintenance = async (maintenanceID) => {
  const query = 'DELETE FROM maintenances WHERE maintenanceID = ?';
  const result = await sequelize.query(query, {
    replacements: [maintenanceID],
    type: QueryTypes.DELETE
  });
  return result;
};

module.exports = { addMaintenance, editMaintenance, deleteMaintenance };