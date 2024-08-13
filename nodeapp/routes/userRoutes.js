const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const userController = require('../controllers/userController');

router.get('/getRole', authenticateToken, userController.getRole);
router.get('/userInfo', authenticateToken, userController.getUserInfo);
router.get('/getAllUsers', authenticateToken, userController.getUsers);
router.put('/updateRole', userController.updateUserRole);
router.delete('/deleteUser', authenticateToken, userController.deleteUser);
router.post('/updateProfile', userController.updateInfo)
// Genel hata yönetimi middleware'ı
router.use((err, req, res, next) => {
  console.error(err.stack); // Hatanın izini konsolda göster

  // İstemciye uygun bir hata yanıtı gönder
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message // Opsiyonel olarak hatanın mesajını da gönderebilirsiniz
  });
});

module.exports = router;