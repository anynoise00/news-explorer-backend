const { messageDefaultUnauthenticated } = require('../utils/constants');

class UnauthenticatedError extends Error {
  constructor(message = messageDefaultUnauthenticated) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthenticatedError;
