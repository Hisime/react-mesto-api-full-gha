const helmet = require('helmet');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const router = require('./routes');
const errorsHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
app.use(cors({
  credentials: true,
  origin: [
    'https://praktikum.tk',
    'http://praktikum.tk',
    'https://hisime.mesto.nomoredomains.monster',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
}));
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(helmet());
mongoose.connect('mongodb://0.0.0.0:27017/mestodb');
app.use(limiter);
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(3000, () => console.log('server started'));
