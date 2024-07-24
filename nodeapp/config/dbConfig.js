require('dotenv').config();

module.exports = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  dialect: 'mysql',
  port: process.env.DATABASE_PORT || 3306,
};