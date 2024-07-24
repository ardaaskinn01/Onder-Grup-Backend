const { DataTypes } = require('sequelize');
const sequelize = require('./dbConnection');

const Machine = sequelize.define('Machine', {
  machineID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  machineName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  machineType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ownerUser: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastUpdate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
  devirmeYuruyusSecim: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  calismaSekli: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emniyetCercevesi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  yavaslamaLimit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  altLimit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kapiTablaAcKonum: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  basincSalteri: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kapiSecimler: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kapiAcTipi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kapi1Tip: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kapi1AcSure: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kapi2Tip: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kapi2AcSure: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kapitablaTip: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kapiTablaAcSure: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  yukariYavasLimit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  devirmeYukariIleriLimit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  devirmeAsagiGeriLimit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  devirmeSilindirTipi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  platformSilindirTipi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  yukariValfTmr: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  asagiValfTmr: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  devirmeYukariIleriTmr: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  devirmeAsagiGeriTmr: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  makineCalismaTmr: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  buzzer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  demoMode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  calismaSayisi1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  calismaSayisi10: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  calismaSayisi100: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  calismaSayisi10000: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dilSecim: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eepromData38: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eepromData39: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eepromData40: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eepromData41: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eepromData42: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eepromData43: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eepromData44: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eepromData45: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eepromData46: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eepromData47: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lcdBacklightSure: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
});

module.exports = Machine;