const User = require('../models/user');
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

const getUserRole = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return user.role;
  } catch (error) {
    console.error('Error fetching user role:', error);
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

module.exports = { getUsers, getUserRole, updateInfo, updatePassword };