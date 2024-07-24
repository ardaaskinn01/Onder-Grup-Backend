const { Sequelize } = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'mysql',
    port: dbConfig.port,
  }
);

// Veritabanı bağlantısını test edin
sequelize.authenticate()
  .then(() => {
    console.log('Veritabanına başarılı bir şekilde bağlanıldı.');
  }).catch(err => {
    console.error('Veritabanına bağlanırken hata oluştu:', err);
});



module.exports = sequelize;