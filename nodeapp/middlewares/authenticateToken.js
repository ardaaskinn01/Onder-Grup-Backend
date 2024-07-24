const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.error('Token missing');
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.error('Token verification failed', err);
      return res.sendStatus(403);
    }

    // Eğer token geçerliyse, decodedToken içinde istemci bilgisini taşıyan user alanı vardır.
    req.user = decodedToken;
    console.log('Token verified, user:', decodedToken);
    next();
  });
};

module.exports = authenticateToken;
