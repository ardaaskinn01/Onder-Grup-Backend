const subUser = require('../models/subUser');
const sequelize = require('../models/dbConnection');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const createSubUser = async (ownerUser, name, username, email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Şifreyi hashle
  const query = 'INSERT INTO SubUser (ownerUser, name, username, email, password, role) VALUES (?, ?, ?, ?, ?, ?)';
  const result = await sequelize.query(query, {
    replacements: [ownerUser, name, username, email, hashedPassword, role],
    type: QueryTypes.INSERT
  });
  return result;
};

const deleteSubUsers = async (id) => {
  try {
    const result = await subUser.destroy({
      where: { id: id }
    });
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const editSubUsers = async (userID, name, username, email, password, role) => {
  // Değiştiriciler dizisini tanımla ve zorunlu alanları ekle
  console.log(userID);
  const replacements = [name, username, email, role];

  // Temel sorguyu tanımla
  let query = 'UPDATE SubUser SET name = ?, username = ?, email = ?, role = ?';

  // Şifre boş veya null değilse hash'le ve sorguya ekle
  if (password && password.trim() !== '') {
    const hashedPassword = await bcrypt.hash(password, 10);
    query += ', password = ?';
    // Hashed şifreyi ekle
    replacements.splice(4, 0, hashedPassword);
  }

  // Belirli bir userID için WHERE koşulunu ekle
  query += ' WHERE id = ?';
  replacements.push(userID);
  console.log(query);
  console.log(replacements);
  // Sorguyu çalıştır
  const result = await sequelize.query(query, {
    replacements: replacements,
    type: QueryTypes.UPDATE,
  });

  return result;
};


const getSubUsers = async (username) => {
  try {
    console.log(username);
    // `ownerUser` alanı `userID` ile eşleşen kullanıcıları getir
    const users = await subUser.findAll({
      where: {
        ownerUser: username
      }
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};


module.exports = { createSubUser, deleteSubUsers, editSubUsers, getSubUsers };