const { DataTypes } = require('sequelize');
const sequelize = require('./dbConnection');

const Maintenance = sequelize.define('Maintenance', {
  maintenanceID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  machineID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  technician: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  maintenanceDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  kontrol11: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol12: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol13: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol14: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol21: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol22: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol23: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol24: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol31: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol32: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol33: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol34: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol35: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol36: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol41: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol42: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol43: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol44: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol45: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol46: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol51: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol52: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol53: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol54: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol55: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol56: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol61: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol62: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol63: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol71: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol72: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol81: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol82: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol83: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol91: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol92: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol93: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol94: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol95: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol96: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol97: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol98: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kontrol99: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'maintenances',
  timestamps: false,
});

module.exports = Maintenance;
