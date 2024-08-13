const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../models/dbConnection');
const { QueryTypes } = require('sequelize');
const User = require('../models/user');
let invalidTokens = [];

// Kullanıcı kayıt fonksiyonu
const registerUser = async (name, username, email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Şifreyi hashle
  const query = 'INSERT INTO Users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)';
  const result = await sequelize.query(query, {
    replacements: [name, username, email, hashedPassword, role],
    type: QueryTypes.INSERT
  });
  return result;
};

const login = async (username, password) => {
  try {
    // Önce Users tablosunu kontrol et
    let query = 'SELECT * FROM Users WHERE username = ?';
    let users = await sequelize.query(query, {
      replacements: [username],
      type: QueryTypes.SELECT
    });

    // Eğer Users tablosunda bulamazsak, SubUser tablosunu kontrol et
    if (!users || users.length === 0) {
      query = 'SELECT * FROM SubUser WHERE username = ?';
      users = await sequelize.query(query, {
        replacements: [username],
        type: QueryTypes.SELECT
      });
    }

    if (!users || users.length === 0) {
      throw new Error('User not found');
    }

    const user = users[0];
    if (!user.password) {
      throw new Error('Password field is missing for the user');
    }

    // Şifreyi karşılaştır
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    // Kullanıcının rolünü belirle
    const isSubUser = !!user.ownerUser;  // SubUser tablosunda 'ownerUser' varsa subuser'dır

    const token = jwt.sign({
      userID: user.id,
      username: user.username,
      isSubUser: isSubUser // Token'a kullanıcı rolünü ekleyin
    }, process.env.JWT_SECRET, { expiresIn: '12h' });
    console.log(token, user);
    return { token, user };
  } catch (error) {
    console.error('Error in login:', error);
    throw error;
  }
};

const logout = async (token) => {
  try {
    if (!invalidTokens.includes(token)) {
        invalidTokens.push(token);
      }
  } catch (error) {
    console.error('Error invalidating token:', error);
    throw error;
  }
};

const resetPassword = async (username, password) => {
  try {
    // Kullanıcıyı bul
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('Kullanıcı bulunamadı');
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 12);

    // Hashlenmiş şifreyi güncelle
    user.password = hashedPassword;
    await user.save();

    return user;
  } catch (error) {
    console.error('Şifre sıfırlama servisi hatası:', error);
    throw error;
  }
};

const updatePassword = async (email, newPassword) => {
  try {
    // Yeni parolayı hash'leyin
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Parolayı güncelleme
    const [updated] = await User.update(
      { password: hashedPassword },
      { where: { email } }
    );

    if (updated === 0) {
      throw new Error('No user found with this email');
    }

    return { message: 'Password updated successfully' };
  } catch (error) {
    console.error('Error updating password in service:', error);
    throw new Error('Failed to update password');
  }
};


module.exports = { registerUser, login, logout, resetPassword, updatePassword  };
