const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const machineRoutes = require('./routes/machineRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const userRoutes = require('./routes/userRoutes');
const subUserRoutes = require('./routes/subUserRoutes');
const fileRoutes = require('./routes/fileRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const authenticateToken = require('./middlewares/authenticateToken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const sequelize = require('./models/dbConnection');
const bcrypt = require('bcrypt'); // bcryptjs'i içe aktarın
const rateLimit = require('express-rate-limit');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiLimiter);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/machines', machineRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/token', tokenRoutes);
app.use('/api/sub', subUserRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://85.95.231.92:${PORT}`);
  });
}).catch(err => {
  console.error('Veritabanı senkronizasyon hatası:', err);
});
