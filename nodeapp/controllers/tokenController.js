const tokenService = require('../services/tokenService');

const refreshToken = async (req, res) => {
  try {
    const { oldToken } = req.body;
    if (!oldToken) {
      return res.status(400).send({ error: 'Old token is required' });
    }

    const newToken = await tokenService.refreshToken(oldToken);
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

    const isValid = await tokenService.validateToken(tokenValue);

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

module.exports = { refreshToken, validateToken };