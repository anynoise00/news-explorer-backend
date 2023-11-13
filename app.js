require('dotenv').config();

const { PORT = 3000 } = process.env;

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { rateLimit } = require('express-rate-limit');

const app = express();
//const router = require('./routes/router');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

mongoose.connect('mongodb://127.0.0.1:27017/newsdb');

app.use(
  cors({
    origin: '*',
  })
);
app.options(
  '*',
  cors({
    origin: '*',
  })
);

app.use(helmet());

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// log requests

// unauthorized routes
// check auth
// authorized routes

// log errors
app.use(errors());

// error handlers

app.listen(PORT);
