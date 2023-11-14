const { defaultUnauthenticatedMsg } = require('../utils/errorMessages');

class UnauthenticatedError extends Error {
  constructor(message = defaultUnauthenticatedMsg) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthenticatedError;
