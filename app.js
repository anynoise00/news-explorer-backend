require('dotenv').config();

const { PORT = 3000, NODE_ENV, DB_URL } = process.env;

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler, routeNotFound } = require('./middlewares/handlers');

const app = express();
const router = require('./routes/router');
const { rateLimiter } = require('./utils/helpers');

mongoose.connect(
  NODE_ENV === 'production' && DB_URL
    ? DB_URL
    : 'mongodb://127.0.0.1:27017/testdb'
);

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(helmet());

app.use(rateLimiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);
app.use(routeNotFound);

app.listen(PORT);
