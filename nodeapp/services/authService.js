const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../models/dbConnection');
const { QueryTypes } = require('sequelize');

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

// Kullanıcı giriş fonksiyonu
const login = async (email, password) => {
  try {
    const query = 'SELECT * FROM Users WHERE email = ?';
    const users = await sequelize.query(query, {
      replacements: [email],
      type: QueryTypes.SELECT
    });

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

    // JWT token oluştur
    const token = jwt.sign({ userID: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
  } catch (error) {
    console.error('Error in login:', error);
    throw error;
  }
};

// Token yenileme fonksiyonu
const refreshToken = async (oldToken) => {
  try {
    const decoded = jwt.verify(oldToken, process.env.JWT_SECRET, { ignoreExpiration: true });
    const user = decoded;

    // Yeni token oluştur
    const newToken = jwt.sign({ userID: user.userID, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token: newToken };
  } catch (error) {
    console.error('Error in refreshToken:', error);
    throw error;
  }
};

const validateToken = async (token) => {
  try {
    // Token'ı çözümle ve doğrula
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Token geçerli olduğunda, expiration (exp) zamanını kontrol et
    const currentTimestamp = Math.floor(Date.now() / 1000); // Şu anki zaman UNIX timestamp olarak alınır
    console.log(decodedToken.exp);
    console.log(currentTimestamp);
    if (decodedToken.exp < currentTimestamp) {
      console.log('Token expired:', decodedToken);
      return false; // Token geçerliliği süresi dolmuş
    }

    console.log('Token is valid:', decodedToken);
    return true; // Geçerli ise true döndür
  } catch (error) {
    console.error('Error validating token:', error);
    return false; // Geçersizse veya hata oluşursa false döndür
  }
};

module.exports = { registerUser, login, refreshToken, validateToken };
