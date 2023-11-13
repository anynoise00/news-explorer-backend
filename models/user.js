const mongoose = require('mongoose');
const validator = require('validator');
const UnauthenticatedError = require('../errors/unauthenticated-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validator: (v) => validator.isEmail(v),
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Elise',
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user)
        return Promise.reject(
          new UnauthenticatedError('E-mail ou senha incorretos')
        );
      return bcrypt.compare(password, user.password).then((match) => {
        if (!match)
          return Promise.reject(
            new UnauthenticatedError('E-mail ou senha incorretos')
          );
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
