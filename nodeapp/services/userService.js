const User = require('../models/user');
const subUser = require('../models/subUser');
const bcrypt = require('bcrypt');

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const getUserById = async (userID) => {
  try {
    // Veritabanı sorgusu yaparak kullanıcıyı bulun
    const user = await User.findOne({ where: { id: userID } });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      name: user.name,
      email: user.email,
      username: user.username
    };
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};

const getUserRole = async (username) => {
  try {
    // Önce User tablosunda arama yap
    let user = await User.findOne({ where: { username } });

    // Eğer User tablosunda kullanıcı bulunamazsa, subUser tablosunda ara
    if (!user) {
      user = await subUser.findOne({ where: { username } });
    }

    // Kullanıcı bulunamazsa null döndür
    if (!user) {
      return null;
    }

    // Kullanıcının rolünü döndür
    return user.role;
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error;
  }
};

const updateUserRole = async (userId, newRole) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return null;
    }

    user.role = newRole;
    await user.save();
    return user;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const result = await User.destroy({
      where: { id: userId }
    });
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const updateInfo = async (email, name, username) => {
  try {
    const [updated] = await User.update(
      { name, username }, // Güncellenecek alanlar
      { where: { email } }   // Şartlar
    );

    if (updated) {
      return { message: 'Profile updated successfully' };
    }

    throw new Error('User not found');
  } catch (err) {
    console.error('Error updating user profile in service:', err);
    throw new Error('Failed to update user profile.');
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

module.exports = { getUsers, getUserById, getUserRole, updateUserRole, deleteUser, updateInfo };