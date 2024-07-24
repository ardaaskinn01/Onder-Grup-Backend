const userService = require('../services/userService');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).send({ error: 'Failed to get users. Please try again later.' });
  }
};

const getRole = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    console.error('Missing email parameter');
    return res.status(400).json({ error: 'Missing email parameter' });
  }

  try {
    const role = await userService.getUserRole(email);
    if (!role) {
      console.error('User not found or role not defined');
      return res.status(404).json({ error: 'User not found or role not defined' });
    }

    console.log('Role:', role); // Role konsola yazdırılıyor
    return res.status(200).json({ role });
  } catch (error) {
    console.error('Error getting user role:', error); // Hata konsola yazdırılıyor
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateInfo = async (req, res) => {
  try {
    console.log(req.body);
    const { name, username, email } = req.body;

    await userService.updateInfo(email, name, username);

    res.status(200).send({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error in update Info controller:', err);
    res.status(500).send({ error: 'Failed to update user profile.' });
  }
};

const updatePassword = async (req, res) => {
  const { newPassword, email } = req.body;

  if (!newPassword) {
    return res.status(400).send({ error: 'Missing newPassword' });
  }

  try {
    await userService.updatePassword(email, newPassword);
    res.status(200).send({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error in updatePassword controller:', error);
    res.status(500).send({ error: 'Failed to change password' });
  }
};


module.exports = { getUsers, getRole, updateInfo, updatePassword };