const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-secret' } = process.env;

const User = require('../models/user');
const ResourceNotFoundError = require('../errors/resource-not-found-error');
const { userNotLoggedMsg } = require('../utils/errorMessages');

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .orFail(new ResourceNotFoundError(userNotLoggedMsg))
    .then((user) => res.send({ data: user }))
    .catch(next);
}

function createUser(req, res, next) {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => res.send({ data: user }))
        .catch(next);
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
}

module.exports = {
  getCurrentUser,
  createUser,
  login,
};
