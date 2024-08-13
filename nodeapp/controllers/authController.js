const authService = require('../services/authService');

const registerUser = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  try {
    const result = await authService.registerUser(name, username, email, password, role);
    res.status(201).send({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ error: 'Failed to register user. Please try again later.' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received username:', username);
    console.log('Received password:', password);

    if (!username || !password) {
      return res.status(400).send({ error: 'Username and password are required' });
    }

    const { token, user } = await authService.login(username, password);
    res.status(200).send({ token, user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(401).send({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    // Authorization başlığından token'ı alıyoruz
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token formatında alıyoruz

    if (!token) {
      return res.status(400).send('Token not provided');
    }

    await authService.logout(token);

    res.status(200).send('Logout successful');
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).send('An error occurred while logging out');
  }
};

const resetPassword = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!password) {
      return res.status(400).send({ error: 'Şifre gerekli' });
    }

    // Şifreyi sıfırlama işlemini servise yönlendir
    await authService.resetPassword(username, password);

    res.status(200).send({ message: 'Şifre başarıyla sıfırlandı.' });
  } catch (error) {
    console.error('Şifre sıfırlama hatası:', error);
    res.status(500).send({ error: 'Şifre sıfırlama işlemi sırasında bir hata oluştu.' });
  }
};

const updatePassword = async (req, res) => {
  const { newPassword, email } = req.body;

  if (!newPassword) {
    return res.status(400).send({ error: 'Missing newPassword' });
  }

  try {
    await authService.updatePassword(email, newPassword);
    res.status(200).send({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error in updatePassword controller:', error);
    res.status(500).send({ error: 'Failed to change password' });
  }
};

module.exports = { registerUser, login, logout, resetPassword, updatePassword };
