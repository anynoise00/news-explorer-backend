const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');

const router = express.Router();

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
    }),
  }),
  createUser
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

// check auth

router.use('/users', require('./users'));

module.exports = router;
