const { defaultForbiddenMsg } = require('../utils/errorMessages');

class ForbiddenError extends Error {
  constructor(message = defaultForbiddenMsg) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
