const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbConnection'); // Veritabanı bağlantınızı içe aktarın

const FileMetadata = sequelize.define('FileMetadata', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  file_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  original_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mime_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'file_metadata',
  timestamps: false, // Eğer created_at ve updated_at otomatik oluşturulmasını istemiyorsanız
});

module.exports = FileMetadata;