const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getRole', userController.getRole);
router.get('/list', userController.getUsers);
router.post('/update', userController.updateInfo);
router.post('/updatePass', userController.updatePassword);

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