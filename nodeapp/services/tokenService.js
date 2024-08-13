const jwt = require('jsonwebtoken');

const refreshToken = async (oldToken) => {
  try {
    const decoded = jwt.verify(oldToken, process.env.JWT_SECRET, { ignoreExpiration: true });
    const user = decoded;

    // Yeni token oluştur
    const newToken = jwt.sign(
      { userID: user.id, username: user.username }, // Payload içinde user bilgilerini ekleyin
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );
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

module.exports = { refreshToken, validateToken };