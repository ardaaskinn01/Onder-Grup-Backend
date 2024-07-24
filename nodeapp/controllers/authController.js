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
    const { email, password } = req.body;
    console.log('Received email:', email);
    console.log('Received password:', password);

    if (!email || !password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    const { token, user } = await authService.login(email, password);
    res.status(200).send({ token, user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(401).send({ error: error.message });
  }
};

const update = async (req, res) => {
  // Implement update logic here
  res.send('Update user information');
};

const refreshToken = async (req, res) => {
  try {
    const { oldToken } = req.body;
    if (!oldToken) {
      return res.status(400).send({ error: 'Old token is required' });
    }

    const newToken = await authService.refreshToken(oldToken);
    res.status(200).json({ token: newToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(401).send({ error: 'Token refresh failed' });
  }
};

const validateToken = async (req, res) => {
  const token = req.headers.authorization; // Token'ı headers içinden al

  try {
    // 'Bearer ' prefix'i ile gelen token'i ayıkla
    const tokenValue = token.split(' ')[1];

    const isValid = await authService.validateToken(tokenValue);

    if (isValid) {
      res.status(200).json({ message: 'Token is valid' });
    } else {
      res.status(405).json({ message: 'Token is invalid' });
    }
  } catch (error) {
    console.error('Error validating token:', error);
    res.status(500).json({ error: 'Token validation failed' });
  }
};

module.exports = { registerUser, login, update, refreshToken, validateToken };
