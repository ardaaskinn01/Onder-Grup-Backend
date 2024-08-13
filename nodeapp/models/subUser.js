const { DataTypes } = require('sequelize');
const sequelize = require('./dbConnection');

const SubUser = sequelize.define('SubUser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ownerUser: {
  type: DataTypes.STRING,
  allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'SubUser',
  timestamps: false,
});

module.exports = SubUser;