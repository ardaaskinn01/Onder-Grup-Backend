const subUserService = require('../services/subUserService');

const createSubUser = async (req, res) => {
  const { name, username, email, password, role } = req.body;
  const ownerUser = req.user.username;

  try {
    const result = await subUserService.createSubUser(ownerUser, name, username, email, password, role);
    res.status(201).send({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error('Error creating sub user:', error);
    res.status(500).send({ error: 'Failed to create sub user. Please try again later.' });
  }
};

const deleteSubUser = async (req, res) => {
  const id = req.body.id;

  try {
    const result = await subUserService.deleteSubUsers(id);
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

const editSubUser = async (req, res) => {
  const { id, name, username, email, password, role } = req.body;
  console.log(req.body);
  console.log(id);

  try {
    const updatedUser = await subUserService.editSubUsers(id, name, username, email, password, role);
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

const getSubUsers = async (req, res) => {
  const ownerUser = req.user.username;
  try {
    const users = await subUserService.getSubUsers(ownerUser);
    res.status(200).send(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).send({ error: 'Failed to get users. Please try again later.' });
  }
};


module.exports = { createSubUser, deleteSubUser, editSubUser, getSubUsers };