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

const getUserInfo = async (req, res) => {
  try {
    const userID = req.user.userID;

    // UserService'deki fonksiyonu çağır
    const userInfo = await userService.getUserById(userID);

    res.status(200).json(userInfo);
  } catch (error) {
    console.error('Error getting user info:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getRole = async (req, res) => {
  const { username } = req.query;

  if (!username) {
    console.error('Missing email parameter');
    return res.status(400).json({ error: 'Missing email parameter' });
  }

  try {
    const role = await userService.getUserRole(username);
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

const updateUserRole = async (req, res) => {
  const userId = req.body.userID;
  const newRole = req.body.role;

  try {
    const updatedUser = await userService.updateUserRole(userId, newRole);
    if (updatedUser) {
      res.status(200).send(updatedUser);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).send({ error: 'Failed to update user role' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.body.userID;

  try {
    const result = await userService.deleteUser(userId);
    if (result) {
      res.status(200).send({ message: 'User deleted successfully.' });
    } else {
      res.status(404).send({ error: 'User not found.' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ error: 'Failed to delete user. Please try again later.' });
  }
};

const updateInfo = async (req, res) => {
  try {
    const { name, username, email } = req.body;

    await userService.updateInfo(email, name, username);

    res.status(200).send({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error in update Info controller:', err);
    res.status(500).send({ error: 'Failed to update user profile.' });
  }
};


module.exports = { getUsers, getUserInfo, getRole, updateUserRole, deleteUser, updateInfo };